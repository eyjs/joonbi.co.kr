'use client';

import { useState, useRef, useCallback, type DragEvent, type ChangeEvent } from 'react';
import { api } from '@/lib/api';

interface VideoUploaderProps {
  onUpload: (url: string) => void;
  currentUrl?: string;
  label?: string;
}

interface UploadResponse {
  url: string;
}

const ACCEPTED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];

export function VideoUploader({
  onUpload,
  currentUrl,
  label = '영상 업로드',
}: VideoUploaderProps): JSX.Element {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File): Promise<void> => {
    if (!ACCEPTED_VIDEO_TYPES.includes(file.type)) {
      setError('지원하지 않는 영상 형식입니다. MP4, WebM, MOV만 가능합니다.');
      return;
    }

    const maxSize = 500 * 1024 * 1024; // 500MB
    if (file.size > maxSize) {
      setError('영상 크기가 500MB를 초과합니다.');
      return;
    }

    setUploading(true);
    setError(null);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post<UploadResponse>(
        '/api/admin/portfolios/upload?sectionType=VIDEO',
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
      setError('영상 업로드에 실패했습니다.');
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
    if (file && ACCEPTED_VIDEO_TYPES.includes(file.type)) {
      uploadFile(file);
    } else if (file) {
      setError('지원하지 않는 영상 형식입니다. MP4, WebM, MOV만 가능합니다.');
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-300">{label}</p>

      {/* Video preview */}
      {currentUrl && (
        <div className="relative w-full max-w-sm rounded-lg overflow-hidden border border-gray-600 bg-gray-700">
          <video
            src={currentUrl}
            controls
            className="w-full h-auto max-h-48"
            preload="metadata"
          >
            <track kind="captions" />
          </video>
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
        aria-label="영상 파일 선택 또는 드래그 앤 드롭"
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
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="text-xs text-gray-400">클릭 또는 드래그하여 영상 업로드</p>
            <p className="text-xs text-gray-500">MP4, WebM, MOV (최대 500MB)</p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime"
        onChange={handleFileChange}
        className="hidden"
        aria-label="영상 파일 선택"
      />

      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
