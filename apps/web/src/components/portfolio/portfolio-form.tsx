'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import type { Portfolio, PortfolioSection, PortfolioSectionType } from '@/types/portfolio';
import { SectionEditor } from './section-editor';

interface PortfolioFormProps {
  portfolio?: Portfolio;
  mode: 'create' | 'edit';
}

interface FormData {
  projectId: string;
  title: string;
  slug: string;
  description: string;
  thumbnailUrl: string;
  displayType: string;
  isPublic: boolean;
  techStack: string;
  category: string;
  completedAt: string;
  clientName: string;
  summary: string;
  duration: string;
  heroVideoUrl: string;
}

interface BeforeAfterItemForm {
  icon: string;
  text: string;
}

interface MilestoneForm {
  date: string;
  title: string;
  status: string;
}

const SECTION_TYPE_LABELS: Record<PortfolioSectionType, string> = {
  OVERVIEW: '프로젝트 개요',
  BRIEF: '업무의뢰서 요약',
  VIDEO: '시연 동영상',
  DIAGRAM: '다이어그램',
  DOCUMENT: '산출문서',
  IMAGES: '이미지 갤러리',
  SCREENSHOT: '스크린샷 갤러리',
  BEFORE_AFTER: 'Before/After',
};

export function PortfolioForm({ portfolio, mode }: PortfolioFormProps): JSX.Element {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<FormData>({
    projectId: portfolio?.projectId || '',
    title: portfolio?.title || '',
    slug: portfolio?.slug || '',
    description: portfolio?.description || '',
    thumbnailUrl: portfolio?.thumbnailUrl || '',
    displayType: portfolio?.displayType || 'ANONYMOUS',
    isPublic: portfolio?.isPublic ?? false,
    techStack: portfolio?.techStack?.join(', ') || '',
    category: portfolio?.category || '',
    completedAt: portfolio?.completedAt
      ? new Date(portfolio.completedAt).toISOString().split('T')[0]
      : '',
    clientName: portfolio?.clientName || '',
    summary: portfolio?.summary || '',
    duration: portfolio?.duration || '',
    heroVideoUrl: portfolio?.heroVideoUrl || '',
  });

  const [beforeItems, setBeforeItems] = useState<BeforeAfterItemForm[]>(
    portfolio?.beforeItems || [],
  );
  const [afterItems, setAfterItems] = useState<BeforeAfterItemForm[]>(
    portfolio?.afterItems || [],
  );
  const [milestones, setMilestones] = useState<MilestoneForm[]>(
    portfolio?.milestones || [],
  );

  const [sections, setSections] = useState<PortfolioSection[]>(
    portfolio?.sections || [],
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const payload = {
        ...form,
        techStack: form.techStack
          ? form.techStack.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
        completedAt: form.completedAt
          ? new Date(form.completedAt).toISOString()
          : undefined,
        clientName: form.clientName || undefined,
        category: form.category || undefined,
        description: form.description || undefined,
        thumbnailUrl: form.thumbnailUrl || undefined,
        summary: form.summary || undefined,
        duration: form.duration || undefined,
        heroVideoUrl: form.heroVideoUrl || undefined,
        beforeItems: beforeItems.length > 0 ? beforeItems : undefined,
        afterItems: afterItems.length > 0 ? afterItems : undefined,
        milestones: milestones.length > 0 ? milestones : undefined,
      };

      if (mode === 'create') {
        const result = await api.post<Portfolio>('/api/admin/portfolios', payload);
        router.push(`/admin/portfolio/${result.id}/edit`);
      } else if (portfolio) {
        const { projectId, ...updatePayload } = payload;
        await api.patch(`/api/admin/portfolios/${portfolio.id}`, updatePayload);
        router.refresh();
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '저장에 실패했습니다.';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleAddSection = async (sectionType: PortfolioSectionType): Promise<void> => {
    if (!portfolio) return;

    try {
      const newSection = await api.post<PortfolioSection>(
        `/api/admin/portfolios/${portfolio.id}/sections`,
        {
          sectionType,
          displayOrder: sections.length,
          title: SECTION_TYPE_LABELS[sectionType],
        },
      );
      setSections((prev) => [...prev, newSection]);
    } catch {
      setError('섹션 추가에 실패했습니다.');
    }
  };

  const handleUpdateSection = async (
    sectionId: string,
    data: Partial<PortfolioSection>,
  ): Promise<void> => {
    if (!portfolio) return;

    try {
      const updated = await api.patch<PortfolioSection>(
        `/api/admin/portfolios/${portfolio.id}/sections/${sectionId}`,
        data,
      );
      setSections((prev) =>
        prev.map((s) => (s.id === sectionId ? updated : s)),
      );
    } catch {
      setError('섹션 수정에 실패했습니다.');
    }
  };

  const handleDeleteSection = async (sectionId: string): Promise<void> => {
    if (!portfolio) return;
    if (!window.confirm('섹션을 삭제하시겠습니까?')) return;

    try {
      await api.delete(`/api/admin/portfolios/${portfolio.id}/sections/${sectionId}`);
      setSections((prev) => prev.filter((s) => s.id !== sectionId));
    } catch {
      setError('섹션 삭제에 실패했습니다.');
    }
  };

  // Before/After item handlers
  const addBeforeItem = (): void =>
    setBeforeItems((prev) => [...prev, { icon: 'X', text: '' }]);
  const removeBeforeItem = (index: number): void =>
    setBeforeItems((prev) => prev.filter((_, i) => i !== index));
  const updateBeforeItem = (index: number, field: keyof BeforeAfterItemForm, value: string): void =>
    setBeforeItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );

  const addAfterItem = (): void =>
    setAfterItems((prev) => [...prev, { icon: 'O', text: '' }]);
  const removeAfterItem = (index: number): void =>
    setAfterItems((prev) => prev.filter((_, i) => i !== index));
  const updateAfterItem = (index: number, field: keyof BeforeAfterItemForm, value: string): void =>
    setAfterItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );

  // Milestone handlers
  const addMilestone = (): void =>
    setMilestones((prev) => [...prev, { date: '', title: '', status: 'pending' }]);
  const removeMilestone = (index: number): void =>
    setMilestones((prev) => prev.filter((_, i) => i !== index));
  const updateMilestone = (index: number, field: keyof MilestoneForm, value: string): void =>
    setMilestones((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );

  return (
    <div className="max-w-4xl mx-auto">
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic info */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-bold text-gray-900 mb-4">기본 정보</h2>

          {mode === 'create' && (
            <div>
              <label htmlFor="projectId" className="block text-sm font-medium text-gray-700 mb-1">
                프로젝트 ID
              </label>
              <input
                id="projectId"
                name="projectId"
                type="text"
                value={form.projectId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="프로젝트 UUID"
              />
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                제목
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                Slug (URL 경로)
              </label>
              <input
                id="slug"
                name="slug"
                type="text"
                value={form.slug}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="my-project-name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              설명
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-700 mb-1">
              썸네일 URL
            </label>
            <input
              id="thumbnailUrl"
              name="thumbnailUrl"
              type="url"
              value={form.thumbnailUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="displayType" className="block text-sm font-medium text-gray-700 mb-1">
                공개 유형
              </label>
              <select
                id="displayType"
                name="displayType"
                value={form.displayType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="FULL">전체 공개</option>
                <option value="ANONYMOUS">익명 공개</option>
                <option value="PRIVATE">비공개</option>
              </select>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                카테고리
              </label>
              <input
                id="category"
                name="category"
                type="text"
                value={form.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="쇼핑몰"
              />
            </div>

            <div>
              <label htmlFor="completedAt" className="block text-sm font-medium text-gray-700 mb-1">
                완료일
              </label>
              <input
                id="completedAt"
                name="completedAt"
                type="date"
                value={form.completedAt}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="techStack" className="block text-sm font-medium text-gray-700 mb-1">
                기술 스택 (쉼표로 구분)
              </label>
              <input
                id="techStack"
                name="techStack"
                type="text"
                value={form.techStack}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="React, NestJS, PostgreSQL"
              />
            </div>

            <div>
              <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">
                클라이언트명
              </label>
              <input
                id="clientName"
                name="clientName"
                type="text"
                value={form.clientName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="isPublic"
              name="isPublic"
              type="checkbox"
              checked={form.isPublic}
              onChange={handleChange}
              className="rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="isPublic" className="text-sm text-gray-700">
              공개 여부
            </label>
          </div>
        </div>

        {/* Project overview card */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-bold text-gray-900 mb-4">프로젝트 개요 카드</h2>

          <div>
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
              한줄 요약
            </label>
            <textarea
              id="summary"
              name="summary"
              value={form.summary}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="예: 6,177개 학교 공문 자동 발송 RPA"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                프로젝트 기간
              </label>
              <input
                id="duration"
                name="duration"
                type="text"
                value={form.duration}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="2026.03 ~ 2026.04"
              />
            </div>

            <div>
              <label htmlFor="heroVideoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                대표 영상 URL
              </label>
              <input
                id="heroVideoUrl"
                name="heroVideoUrl"
                type="url"
                value={form.heroVideoUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
          </div>

          {/* Preview link */}
          {mode === 'edit' && portfolio && (
            <div className="pt-2">
              <a
                href={`/portfolio/${portfolio.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-700 underline"
              >
                포트폴리오 미리보기 (새 탭)
              </a>
            </div>
          )}
        </div>

        {/* Before/After */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Before / After</h2>
          </div>

          {/* Before items */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700">Before (기존 문제)</h3>
              <button
                type="button"
                onClick={addBeforeItem}
                className="text-xs px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              >
                + 항목 추가
              </button>
            </div>
            {beforeItems.length === 0 ? (
              <p className="text-gray-400 text-sm py-2">항목이 없습니다.</p>
            ) : (
              <div className="space-y-2">
                {beforeItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item.icon}
                      onChange={(e) => updateBeforeItem(index, 'icon', e.target.value)}
                      className="w-12 px-2 py-1.5 border border-gray-300 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="X"
                      aria-label={`Before 항목 ${index + 1} 아이콘`}
                    />
                    <input
                      type="text"
                      value={item.text}
                      onChange={(e) => updateBeforeItem(index, 'text', e.target.value)}
                      className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="기존 문제점 설명"
                      aria-label={`Before 항목 ${index + 1} 텍스트`}
                    />
                    <button
                      type="button"
                      onClick={() => removeBeforeItem(index)}
                      className="text-xs text-red-500 hover:text-red-700 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-300 rounded"
                      aria-label={`Before 항목 ${index + 1} 삭제`}
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* After items */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700">After (개선 결과)</h3>
              <button
                type="button"
                onClick={addAfterItem}
                className="text-xs px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              >
                + 항목 추가
              </button>
            </div>
            {afterItems.length === 0 ? (
              <p className="text-gray-400 text-sm py-2">항목이 없습니다.</p>
            ) : (
              <div className="space-y-2">
                {afterItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item.icon}
                      onChange={(e) => updateAfterItem(index, 'icon', e.target.value)}
                      className="w-12 px-2 py-1.5 border border-gray-300 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="O"
                      aria-label={`After 항목 ${index + 1} 아이콘`}
                    />
                    <input
                      type="text"
                      value={item.text}
                      onChange={(e) => updateAfterItem(index, 'text', e.target.value)}
                      className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="개선 결과 설명"
                      aria-label={`After 항목 ${index + 1} 텍스트`}
                    />
                    <button
                      type="button"
                      onClick={() => removeAfterItem(index)}
                      className="text-xs text-red-500 hover:text-red-700 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-300 rounded"
                      aria-label={`After 항목 ${index + 1} 삭제`}
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">타임라인</h2>
            <button
              type="button"
              onClick={addMilestone}
              className="text-xs px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
            >
              + 마일스톤 추가
            </button>
          </div>

          {milestones.length === 0 ? (
            <p className="text-gray-400 text-sm py-2">마일스톤이 없습니다.</p>
          ) : (
            <div className="space-y-2">
              {milestones.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item.date}
                    onChange={(e) => updateMilestone(index, 'date', e.target.value)}
                    className="w-32 px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="2026.03.01"
                    aria-label={`마일스톤 ${index + 1} 날짜`}
                  />
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                    className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="마일스톤 제목"
                    aria-label={`마일스톤 ${index + 1} 제목`}
                  />
                  <select
                    value={item.status}
                    onChange={(e) => updateMilestone(index, 'status', e.target.value)}
                    className="w-24 px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={`마일스톤 ${index + 1} 상태`}
                  >
                    <option value="completed">완료</option>
                    <option value="in_progress">진행중</option>
                    <option value="pending">대기</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeMilestone(index)}
                    className="text-xs text-red-500 hover:text-red-700 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-300 rounded"
                    aria-label={`마일스톤 ${index + 1} 삭제`}
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50"
          >
            {saving ? '저장 중...' : mode === 'create' ? '등록' : '수정'}
          </button>
        </div>
      </form>

      {/* Section management (edit mode only) */}
      {mode === 'edit' && portfolio && (
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">콘텐츠 섹션</h2>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(SECTION_TYPE_LABELS) as PortfolioSectionType[]).map(
                  (type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleAddSection(type)}
                      className="text-xs px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                    >
                      + {SECTION_TYPE_LABELS[type]}
                    </button>
                  ),
                )}
              </div>
            </div>

            {sections.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-8">
                아직 섹션이 없습니다. 위 버튼을 눌러 섹션을 추가하세요.
              </p>
            ) : (
              <div className="space-y-4">
                {[...sections]
                  .sort((a, b) => a.displayOrder - b.displayOrder)
                  .map((section) => (
                    <SectionEditor
                      key={section.id}
                      section={section}
                      onUpdate={handleUpdateSection}
                      onDelete={handleDeleteSection}
                    />
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
