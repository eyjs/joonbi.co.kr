'use client';

import { useState, useRef, useCallback, type DragEvent, type ChangeEvent } from 'react';
import { api } from '@/lib/api';

interface ImageUploaderProps {
  onUpload: (url: string) => void;
  currentUrl?: string;
  accept?: string;
  label?: string;
  portfolioId?: string;
  sectionType?: string;
}

interface UploadResponse {
  url: string;
}

export function ImageUploader({
  onUpload,
  currentUrl,
  accept = 'image/*',
  label = '이미지 업로드',
  portfolioId = '',
  sectionType = 'OVERVIEW',
}: ImageUploaderProps): JSX.Element {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File): Promise<void> => {
    setUploading(true);
    setError(null);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const params = new URLSearchParams();
      if (portfolioId) params.set('portfolioId', portfolioId);
      params.set('sectionType', sectionType);
      const response = await api.post<UploadResponse>(
        `/api/admin/portfolios/upload?${params.toString()}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent: { loaded: number; total?: number }) => {
            if (progressEvent.total) {
              const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setProgress(percent);
            }
          },
        } as Record<string, unknown>,
      );
      onUpload(response.url);
    } catch {
      setError('업로드에 실패했습니다.');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }, [onUpload]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
    // Reset input so the same file can be re-selected
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleDragOver = (e: DragEvent): void => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent): void => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent): void => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      uploadFile(file);
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-300">{label}</p>

      {/* Preview */}
      {currentUrl && (
        <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-gray-600 bg-gray-700">
          <img
            src={currentUrl}
            alt="미리보기"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
        }`}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            inputRef.current?.click();
          }
        }}
        aria-label="파일 선택 또는 드래그 앤 드롭"
      >
        {uploading ? (
          <div className="space-y-2">
            <p className="text-sm text-gray-400">업로드 중... {progress}%</p>
            <div className="w-full bg-gray-600 rounded-full h-1.5">
              <div
                className="bg-blue-500 h-1.5 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            <svg className="w-8 h-8 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs text-gray-400">클릭 또는 드래그하여 이미지 업로드</p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        aria-label="파일 선택"
      />

      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
