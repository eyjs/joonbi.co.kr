'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { api } from '@/lib/api';
import type { ConsultationType, CreateConsultationDto, ConsultationResponse } from '@/types/consultation';

export default function ConsultationPage() {
  const router = useRouter();
  const [type, setType] = useState<ConsultationType | null>(null);
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    referenceUrls: '',
    budgetRange: '',
    desiredDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!type) return;

    setLoading(true);
    setError('');

    try {
      // Convert comma-separated URLs to array
      const referenceUrlsArray = formData.referenceUrls
        .split(',')
        .map((url) => url.trim())
        .filter((url) => url.length > 0);

      const consultationData: CreateConsultationDto = {
        type,
        projectName: formData.projectName,
        description: formData.description,
        referenceUrls: referenceUrlsArray,
        budgetRange: formData.budgetRange || undefined,
        desiredDate: formData.desiredDate || undefined,
      };

      const response = await api.post<ConsultationResponse>(
        '/api/consultations',
        consultationData
      );

      alert('상담 신청이 완료되었습니다.');
      router.push('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('상담 신청에 실패했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!type) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-24 pb-12 px-4 bg-[#0a0e27]">
          <div className="tech-container max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="tech-heading-lg mb-4">상담 유형 선택</h1>
              <p className="tech-text">
                프로젝트에 맞는 상담 유형을 선택해주세요
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div
                className="tech-card cursor-pointer"
                onClick={() => setType('SIMPLE')}
              >
                <div className="mb-6">
                  <div className="text-3xl font-bold tech-glow-text mb-2">무료</div>
                  <h3 className="text-2xl font-bold text-white mb-2">간편 상담</h3>
                  <p className="tech-text text-sm">
                    기본적인 프로젝트 정보만 제출
                  </p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm text-gray-300">
                    <svg className="w-5 h-5 text-[#00d9ff] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>빠른 문의 답변</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-300">
                    <svg className="w-5 h-5 text-[#00d9ff] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>개발 가능 여부 확인</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-300">
                    <svg className="w-5 h-5 text-[#00d9ff] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>수동 견적 제공</span>
                  </li>
                </ul>
                <button className="tech-btn-secondary w-full">
                  간편 상담 선택
                </button>
              </div>

              <div
                className="tech-card cursor-pointer border-2 border-[#00d9ff]"
                onClick={() => setType('ANALYSIS')}
              >
                <div className="mb-6">
                  <div className="text-3xl font-bold tech-glow-text mb-2">10만원</div>
                  <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    분석 상담
                    <span className="tech-badge text-xs">
                      추천
                    </span>
                  </h3>
                  <p className="tech-text text-sm">
                    AI 자동 분석 및 화면 설계 제공
                  </p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm text-gray-300">
                    <svg className="w-5 h-5 text-[#00d9ff] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>30분 내 AI 자동 분석</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-300">
                    <svg className="w-5 h-5 text-[#00d9ff] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>문서 4종 자동 생성</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-300">
                    <svg className="w-5 h-5 text-[#00d9ff] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>샘플 화면 설계 (Figma)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-300">
                    <svg className="w-5 h-5 text-[#00d9ff] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-semibold">계약 시 비용 차감</span>
                  </li>
                </ul>
                <button className="tech-btn-primary w-full">
                  분석 상담 선택 (추천)
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen pt-24 pb-12 px-4 bg-[#0a0e27]">
        <div className="tech-container max-w-2xl">
          <div className="mb-8">
            <button
              className="text-[#00d9ff] hover:text-white transition-colors flex items-center gap-2"
              onClick={() => setType(null)}
            >
              ← 상담 유형 다시 선택
            </button>
          </div>

          <div className="tech-card">
            <div className="mb-6">
              <h2 className="tech-heading-md mb-2">
                {type === 'SIMPLE' ? '간편 상담 신청' : '분석 상담 신청'}
              </h2>
              <p className="tech-text text-sm">
                {type === 'SIMPLE'
                  ? '기본 정보를 입력해주세요'
                  : '상세 정보를 입력해주세요. AI가 자동으로 분석합니다.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-md">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="projectName" className="block text-sm font-medium text-white">
                  프로젝트명 <span className="text-red-400">*</span>
                </label>
                <input
                  id="projectName"
                  type="text"
                  placeholder="예: 쇼핑몰 웹사이트"
                  value={formData.projectName}
                  onChange={(e) =>
                    setFormData({ ...formData, projectName: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 bg-[#0a0e27] border border-[#00d9ff]/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00d9ff] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-white">
                  프로젝트 설명 <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="description"
                  className="w-full min-h-[120px] px-4 py-3 bg-[#0a0e27] border border-[#00d9ff]/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00d9ff] transition-colors resize-none"
                  placeholder="프로젝트의 목적, 주요 기능, 일정 등을 자유롭게 작성해주세요 (최소 100자)"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  minLength={100}
                />
                <p className="text-xs text-gray-400">
                  {formData.description.length}/100자
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="referenceUrls" className="block text-sm font-medium text-white">
                  참고 사이트 URL <span className="text-red-400">*</span>
                </label>
                <input
                  id="referenceUrls"
                  type="url"
                  placeholder="https://example.com"
                  value={formData.referenceUrls}
                  onChange={(e) =>
                    setFormData({ ...formData, referenceUrls: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 bg-[#0a0e27] border border-[#00d9ff]/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00d9ff] transition-colors"
                />
                <p className="text-xs text-gray-400">
                  여러 개인 경우 쉼표(,)로 구분해주세요
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="budgetRange" className="block text-sm font-medium text-white">
                  예산 범위
                </label>
                <select
                  id="budgetRange"
                  className="w-full px-4 py-3 bg-[#0a0e27] border border-[#00d9ff]/30 rounded-lg text-white focus:outline-none focus:border-[#00d9ff] transition-colors"
                  value={formData.budgetRange}
                  onChange={(e) =>
                    setFormData({ ...formData, budgetRange: e.target.value })
                  }
                >
                  <option value="">선택해주세요</option>
                  <option value="300만원 이하">300만원 이하</option>
                  <option value="300-500만원">300-500만원</option>
                  <option value="500-1000만원">500-1000만원</option>
                  <option value="1000만원 이상">1000만원 이상</option>
                  <option value="협의 가능">협의 가능</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="desiredDate" className="block text-sm font-medium text-white">
                  희망 완료 날짜
                </label>
                <input
                  id="desiredDate"
                  type="date"
                  value={formData.desiredDate}
                  onChange={(e) =>
                    setFormData({ ...formData, desiredDate: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#0a0e27] border border-[#00d9ff]/30 rounded-lg text-white focus:outline-none focus:border-[#00d9ff] transition-colors"
                />
              </div>

              {type === 'ANALYSIS' && (
                <div className="p-4 bg-[#00d9ff]/5 border border-[#00d9ff]/30 rounded-lg">
                  <p className="text-sm font-medium text-[#00d9ff] mb-2">분석 상담 안내</p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• 결제 후 30분 내 AI 자동 분석 완료</li>
                    <li>• 분석서, 명세서, 기획서, 견적서 제공</li>
                    <li>• 샘플 화면 설계 (Figma) 제공</li>
                    <li>• 계약 진행 시 10만원 차감</li>
                  </ul>
                </div>
              )}

              <button
                type="submit"
                className="tech-btn-primary w-full"
                disabled={loading}
              >
                {loading
                  ? '신청 중...'
                  : type === 'SIMPLE'
                  ? '무료 상담 신청하기'
                  : '분석 상담 신청하기 (10만원)'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
