'use client';

import { useState } from 'react';
import type { PortfolioSection } from '@/types/portfolio';
import { ImageUploader } from '@/components/admin/image-uploader';

interface SectionEditorProps {
  section: PortfolioSection;
  onUpdate: (sectionId: string, data: Partial<PortfolioSection>) => Promise<void>;
  onDelete: (sectionId: string) => Promise<void>;
}

const SECTION_TYPE_LABELS: Record<string, string> = {
  OVERVIEW: '프로젝트 개요',
  BRIEF: '업무의뢰서 요약',
  VIDEO: '시연 동영상',
  DIAGRAM: '다이어그램',
  DOCUMENT: '산출문서',
  IMAGES: '이미지 갤러리',
  SCREENSHOT: '스크린샷 갤러리',
  BEFORE_AFTER: 'Before/After',
};

const INPUT_CLASS =
  'w-full px-3 py-2 border border-gray-600 bg-gray-700 rounded-lg text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500';
const LABEL_CLASS = 'block text-xs font-medium text-gray-400 mb-1';

export function SectionEditor({
  section,
  onUpdate,
  onDelete,
}: SectionEditorProps): JSX.Element {
  const [expanded, setExpanded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [localTitle, setLocalTitle] = useState(section.title || '');

  // Section-type specific local state
  const [textContent, setTextContent] = useState(section.textContent || '');
  const [videoUrl, setVideoUrl] = useState(section.videoUrl || '');
  const [diagramCode, setDiagramCode] = useState(section.diagramCode || '');
  const [diagramKind, setDiagramKind] = useState(section.diagramKind || '');
  const [fileUrl, setFileUrl] = useState(section.fileUrl || '');
  const [fileName, setFileName] = useState(section.fileName || '');
  const [caption, setCaption] = useState(section.caption || '');
  const [imageUrls, setImageUrls] = useState<string[]>(section.imageUrls || []);

  const handleSave = async (): Promise<void> => {
    setSaving(true);
    try {
      const data: Partial<PortfolioSection> = { title: localTitle || undefined };

      switch (section.sectionType) {
        case 'OVERVIEW':
        case 'BRIEF':
          data.textContent = textContent;
          break;
        case 'VIDEO':
          data.videoUrl = videoUrl;
          data.caption = caption || undefined;
          break;
        case 'DIAGRAM':
          data.diagramCode = diagramCode;
          data.diagramKind = diagramKind || undefined;
          break;
        case 'DOCUMENT':
          data.fileUrl = fileUrl;
          data.fileName = fileName || undefined;
          break;
        case 'SCREENSHOT':
          data.imageUrls = imageUrls;
          data.caption = caption || undefined;
          break;
        case 'BEFORE_AFTER':
          data.textContent = textContent;
          break;
        default:
          break;
      }

      await onUpdate(section.id, data);
    } finally {
      setSaving(false);
    }
  };

  const addImageUrl = (): void => setImageUrls((prev) => [...prev, '']);
  const removeImageUrl = (index: number): void =>
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  const updateImageUrl = (index: number, value: string): void =>
    setImageUrls((prev) => prev.map((url, i) => (i === index ? value : url)));

  const handleImageUpload = (url: string): void => {
    setImageUrls((prev) => [...prev, url]);
  };

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-900/50">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-sm font-medium text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
        >
          <span className="text-gray-500">{expanded ? 'v' : '>'}</span>
          <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded border border-blue-500/30">
            {SECTION_TYPE_LABELS[section.sectionType] || section.sectionType}
          </span>
          <span>{section.title || '(제목 없음)'}</span>
          <span className="text-xs text-gray-500">#{section.displayOrder}</span>
        </button>
        <button
          type="button"
          onClick={() => onDelete(section.id)}
          className="text-xs text-red-400 hover:text-red-300 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-1"
          aria-label="섹션 삭제"
        >
          삭제
        </button>
      </div>

      {expanded && (
        <div className="p-4 space-y-4 border-t border-gray-700">
          <div>
            <label htmlFor={`title-${section.id}`} className={LABEL_CLASS}>
              섹션 제목
            </label>
            <input
              id={`title-${section.id}`}
              type="text"
              value={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
              className={INPUT_CLASS}
            />
          </div>

          {/* OVERVIEW / BRIEF / BEFORE_AFTER */}
          {(section.sectionType === 'OVERVIEW' ||
            section.sectionType === 'BRIEF' ||
            section.sectionType === 'BEFORE_AFTER') && (
            <div>
              <label htmlFor={`text-${section.id}`} className={LABEL_CLASS}>
                마크다운 내용
              </label>
              <textarea
                id={`text-${section.id}`}
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                rows={8}
                className={`${INPUT_CLASS} font-mono`}
                placeholder="마크다운 형식으로 작성..."
              />
            </div>
          )}

          {/* VIDEO */}
          {section.sectionType === 'VIDEO' && (
            <>
              <div>
                <label htmlFor={`video-${section.id}`} className={LABEL_CLASS}>
                  동영상 URL (YouTube, Vimeo, GCS 등)
                </label>
                <input
                  id={`video-${section.id}`}
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
              <div>
                <label htmlFor={`caption-video-${section.id}`} className={LABEL_CLASS}>
                  캡션 (선택)
                </label>
                <input
                  id={`caption-video-${section.id}`}
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="영상에 대한 설명"
                />
              </div>
            </>
          )}

          {/* DIAGRAM */}
          {section.sectionType === 'DIAGRAM' && (
            <>
              <div>
                <label htmlFor={`diagramKind-${section.id}`} className={LABEL_CLASS}>
                  다이어그램 종류
                </label>
                <input
                  id={`diagramKind-${section.id}`}
                  type="text"
                  value={diagramKind}
                  onChange={(e) => setDiagramKind(e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="flowchart, sequence, erd, etc."
                />
              </div>
              <div>
                <label htmlFor={`diagram-${section.id}`} className={LABEL_CLASS}>
                  Mermaid DSL 코드
                </label>
                <textarea
                  id={`diagram-${section.id}`}
                  value={diagramCode}
                  onChange={(e) => setDiagramCode(e.target.value)}
                  rows={8}
                  className={`${INPUT_CLASS} font-mono`}
                  placeholder="graph TD&#10;  A --> B"
                />
              </div>
            </>
          )}

          {/* DOCUMENT */}
          {section.sectionType === 'DOCUMENT' && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`fileUrl-${section.id}`} className={LABEL_CLASS}>
                  파일 URL
                </label>
                <input
                  id={`fileUrl-${section.id}`}
                  type="url"
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="https://storage.googleapis.com/..."
                />
              </div>
              <div>
                <label htmlFor={`fileName-${section.id}`} className={LABEL_CLASS}>
                  원본 파일명
                </label>
                <input
                  id={`fileName-${section.id}`}
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="requirements.pdf"
                />
              </div>
            </div>
          )}

          {/* SCREENSHOT */}
          {section.sectionType === 'SCREENSHOT' && (
            <>
              <div>
                <label htmlFor={`caption-ss-${section.id}`} className={LABEL_CLASS}>
                  캡션
                </label>
                <input
                  id={`caption-ss-${section.id}`}
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="스크린샷에 대한 설명"
                />
              </div>

              {/* Image uploader for screenshots */}
              <ImageUploader
                label="스크린샷 업로드"
                onUpload={handleImageUpload}
              />

              {/* Image URL list with previews */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className={LABEL_CLASS}>업로드된 이미지 ({imageUrls.length}개)</label>
                  <button
                    type="button"
                    onClick={addImageUrl}
                    className="text-xs px-3 py-1 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors text-gray-300"
                  >
                    + URL 직접 추가
                  </button>
                </div>
                {imageUrls.length === 0 ? (
                  <p className="text-gray-500 text-sm py-2">이미지가 없습니다. 위 영역에 파일을 업로드하거나 URL을 추가하세요.</p>
                ) : (
                  <div className="space-y-2">
                    {imageUrls.map((url, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {url && (
                          <div className="w-10 h-10 rounded border border-gray-600 overflow-hidden flex-shrink-0 bg-gray-700">
                            <img src={url} alt={`스크린샷 ${index + 1}`} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <input
                          type="url"
                          value={url}
                          onChange={(e) => updateImageUrl(index, e.target.value)}
                          className={`flex-1 px-3 py-1.5 border border-gray-600 bg-gray-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          placeholder="https://example.com/screenshot.png"
                          aria-label={`스크린샷 URL ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeImageUrl(index)}
                          className="text-xs text-red-400 hover:text-red-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                          aria-label={`스크린샷 URL ${index + 1} 삭제`}
                        >
                          삭제
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm font-medium disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {saving ? '저장 중...' : '저장'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
