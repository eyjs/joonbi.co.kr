'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useAuthStore } from '@/stores/auth';
import { api } from '@/lib/api';
import type { DocumentResponse, FeedbackResponse, CreateFeedbackDto, FeedbackType } from '@/types/document';

const documentTypeLabels: Record<string, string> = {
  REQUIREMENTS: '요구사항명세서',
  DESIGN: '설계서',
  SOURCE: '소스코드',
  TEST: '테스트문서',
  MANUAL: '매뉴얼',
};

const statusLabels: Record<string, string> = {
  WAITING: '대기중',
  WORKING: '작업중',
  REVIEW: '검토중',
  REVISION: '수정중',
  DELIVERED: '완료',
};

const statusColors: Record<string, string> = {
  WAITING: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
  WORKING: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
  REVIEW: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
  REVISION: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
  DELIVERED: 'bg-green-500/20 text-green-400 border-green-500/40',
};

export default function DocumentReviewPage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated, user } = useAuthStore();
  const [document, setDocument] = useState<DocumentResponse | null>(null);
  const [feedbacks, setFeedbacks] = useState<FeedbackResponse[]>([]);
  const [feedbackContent, setFeedbackContent] = useState('');
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('QUESTION');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchDocument = async () => {
      try {
        setLoading(true);
        const docData = await api.get<DocumentResponse>(`/api/documents/${params.id}`);
        setDocument(docData);

        // Fetch feedbacks for this document
        // Note: API might return feedbacks with the document or we fetch separately
        // For now, we'll initialize empty array
        setFeedbacks([]);
      } catch (err: unknown) {
        console.error('Failed to fetch document:', err);
        setError('문서를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [isAuthenticated, router, params.id]);

  if (!isAuthenticated || loading || !document) {
    return null;
  }

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackContent.trim()) return;

    setSubmitting(true);
    setError('');

    try {
      const feedbackData: CreateFeedbackDto = {
        content: feedbackContent,
        type: feedbackType,
        isNewFeature: false,
      };

      const newFeedback = await api.post<FeedbackResponse>(
        `/api/documents/${params.id}/feedbacks`,
        feedbackData
      );

      setFeedbacks([...feedbacks, newFeedback]);
      setFeedbackContent('');
      alert('피드백이 등록되었습니다.');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('피드백 등록에 실패했습니다.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleApprove = async () => {
    if (!confirm('이 문서를 승인하시겠습니까?')) return;

    setSubmitting(true);
    try {
      await api.post(`/api/documents/${params.id}/approve`, {});
      alert('문서가 승인되었습니다.');
      router.push('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('승인 처리에 실패했습니다.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleRequestRevision = async () => {
    if (!feedbackContent.trim()) {
      alert('수정 요청 사유를 입력해주세요.');
      return;
    }

    if (!confirm('수정을 요청하시겠습니까?')) return;

    setSubmitting(true);
    try {
      // First submit feedback, then document status will change
      const feedbackData: CreateFeedbackDto = {
        content: feedbackContent,
        type: 'IMPROVEMENT',
        isNewFeature: false,
      };

      await api.post(`/api/documents/${params.id}/feedbacks`, feedbackData);
      alert('수정 요청이 완료되었습니다.');
      router.push('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('수정 요청에 실패했습니다.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownload = () => {
    if (document.filePath) {
      // Open file in new tab or download
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      window.open(`${apiUrl}${document.filePath}`, '_blank');
    } else {
      alert('파일이 아직 업로드되지 않았습니다.');
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-24 pb-12 px-4" style={{ background: 'var(--tech-bg-dark)' }}>
        <div className="container mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <div className="mb-6">
            <button className="tech-btn-secondary text-sm px-4 py-2" onClick={() => router.push('/dashboard')}>
              ← 대시보드로 돌아가기
            </button>
          </div>

          {/* Page Title */}
          <div className="mb-8">
            <h1 className="tech-heading-lg mb-2">{document.docName}</h1>
            <div className="flex items-center gap-3">
              <span className="tech-text">
                {documentTypeLabels[document.docType]} • {document.docCode}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[document.status]}`}>
                {statusLabels[document.status]}
              </span>
              <span className="tech-text text-sm">
                생성일: {new Date(document.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Left Column - Document Preview (60%) */}
            <div className="lg:col-span-3 space-y-6">
              <div className="tech-card">
                <div className="mb-4">
                  <h2 className="tech-heading-md mb-1">문서 정보</h2>
                  <p className="tech-text text-sm">
                    {documentTypeLabels[document.docType]}
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="tech-text mb-1">문서 유형</p>
                      <p className="font-medium text-white">{documentTypeLabels[document.docType]}</p>
                    </div>
                    <div>
                      <p className="tech-text mb-1">문서 코드</p>
                      <p className="font-medium text-white">{document.docCode}</p>
                    </div>
                    <div>
                      <p className="tech-text mb-1">상태</p>
                      <p className="font-medium text-white">{statusLabels[document.status]}</p>
                    </div>
                    <div>
                      <p className="tech-text mb-1">피드백</p>
                      <p className="font-medium text-white">{document.feedbackItemCount}/{document.feedbackLimit}</p>
                    </div>
                  </div>

                  <button onClick={handleDownload} className="tech-btn-secondary w-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    PDF 다운로드
                  </button>
                </div>
              </div>

              {/* PDF Preview */}
              <div className="tech-card">
                <div className="mb-4">
                  <h2 className="tech-heading-md">문서 미리보기</h2>
                </div>
                <div>
                  <div className="bg-gray-900/50 rounded-lg flex items-center justify-center aspect-[3/4]">
                    <div className="text-center">
                      <svg
                        className="w-16 h-16 mx-auto text-gray-500 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="tech-text mb-4">PDF 미리보기</p>
                      <button onClick={handleDownload} className="tech-btn-secondary text-sm px-4 py-2">
                        전체 문서 보기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Feedback (40%) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Feedback Form */}
              <div className="tech-card">
                <div className="mb-4">
                  <h2 className="tech-heading-md mb-1">피드백 작성</h2>
                  <p className="tech-text text-sm">
                    문서에 대한 의견을 작성해주세요
                  </p>
                </div>
                <form onSubmit={handleSubmitFeedback}>
                  <div className="space-y-4">
                    {error && (
                      <div className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-md">
                        {error}
                      </div>
                    )}

                    <div className="space-y-2">
                      <label htmlFor="feedbackType" className="text-sm font-medium text-white">피드백 유형</label>
                      <select
                        id="feedbackType"
                        className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                        value={feedbackType}
                        onChange={(e) => setFeedbackType(e.target.value as FeedbackType)}
                      >
                        <option value="QUESTION">질문</option>
                        <option value="BUG">버그</option>
                        <option value="IMPROVEMENT">개선사항</option>
                        <option value="OTHER">기타</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="feedback" className="text-sm font-medium text-white">피드백 내용</label>
                      <textarea
                        id="feedback"
                        className="flex min-h-[120px] w-full rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="수정이 필요한 부분이나 추가 요청사항을 자유롭게 작성해주세요 (최소 10자)"
                        value={feedbackContent}
                        onChange={(e) => setFeedbackContent(e.target.value)}
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="tech-btn-secondary flex-1"
                        disabled={submitting || !feedbackContent.trim() || feedbackContent.length < 10}
                      >
                        피드백 등록
                      </button>
                      <button
                        type="button"
                        className="tech-btn-secondary flex-1"
                        onClick={handleRequestRevision}
                        disabled={submitting || !feedbackContent.trim() || feedbackContent.length < 10}
                      >
                        수정 요청
                      </button>
                    </div>

                    <button
                      type="button"
                      className="tech-btn-primary w-full"
                      onClick={handleApprove}
                      disabled={submitting}
                    >
                      문서 승인하기
                    </button>
                  </div>
                </form>
              </div>

              {/* Feedback History */}
              <div className="tech-card">
                <div className="mb-4">
                  <h2 className="tech-heading-md mb-1">피드백 내역</h2>
                  <p className="tech-text text-sm">
                    {feedbacks.length}개의 피드백
                  </p>
                </div>
                <div>
                  {feedbacks.length === 0 ? (
                    <p className="text-sm tech-text text-center py-8">
                      아직 피드백이 없습니다
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {feedbacks.map((feedback) => {
                        const feedbackTypeLabels: Record<string, string> = {
                          BUG: '버그',
                          IMPROVEMENT: '개선사항',
                          QUESTION: '질문',
                          OTHER: '기타',
                        };

                        return (
                          <div
                            key={feedback.id}
                            className="p-4 bg-gray-900/50 rounded-lg space-y-2 border border-gray-700"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded text-xs font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                                  {feedbackTypeLabels[feedback.type]}
                                </span>
                                {feedback.status && (
                                  <span className={`px-2 py-0.5 rounded text-xs font-medium border ${
                                    feedback.status === 'RESOLVED' ? 'bg-green-500/20 text-green-400 border-green-500/40' :
                                    feedback.status === 'REJECTED' ? 'bg-red-500/20 text-red-400 border-red-500/40' :
                                    'bg-yellow-500/20 text-yellow-400 border-yellow-500/40'
                                  }`}>
                                    {feedback.status === 'RESOLVED' ? '해결됨' :
                                     feedback.status === 'REJECTED' ? '거절됨' : '대기중'}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs tech-text">
                                {new Date(feedback.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <p className="text-sm text-white">{feedback.content}</p>
                            {feedback.response && (
                              <div className="mt-2 p-2 bg-gray-800/50 rounded border border-gray-700">
                                <p className="text-xs font-medium mb-1 text-white">관리자 응답:</p>
                                <p className="text-sm text-white">{feedback.response}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
