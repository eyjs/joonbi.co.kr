'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  WAITING: 'bg-yellow-100 text-yellow-700',
  WORKING: 'bg-blue-100 text-blue-700',
  REVIEW: 'bg-purple-100 text-purple-700',
  REVISION: 'bg-orange-100 text-orange-700',
  DELIVERED: 'bg-green-100 text-green-700',
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
      <div className="min-h-screen pt-24 pb-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Button variant="ghost" onClick={() => router.push('/dashboard')}>
              ← 대시보드로 돌아가기
            </Button>
          </div>

          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{document.docName}</h1>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">
                {documentTypeLabels[document.docType]} • {document.docCode}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[document.status]}`}>
                {statusLabels[document.status]}
              </span>
              <span className="text-muted-foreground text-sm">
                생성일: {new Date(document.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Left Column - Document Preview (60%) */}
            <div className="lg:col-span-3 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>문서 정보</CardTitle>
                  <CardDescription>
                    {documentTypeLabels[document.docType]}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">문서 유형</p>
                      <p className="font-medium">{documentTypeLabels[document.docType]}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">문서 코드</p>
                      <p className="font-medium">{document.docCode}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">상태</p>
                      <p className="font-medium">{statusLabels[document.status]}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">피드백</p>
                      <p className="font-medium">{document.feedbackItemCount}/{document.feedbackLimit}</p>
                    </div>
                  </div>

                  <Button onClick={handleDownload} className="w-full" variant="outline">
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
                  </Button>
                </CardContent>
              </Card>

              {/* PDF Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>문서 미리보기</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg flex items-center justify-center aspect-[3/4]">
                    <div className="text-center">
                      <svg
                        className="w-16 h-16 mx-auto text-muted-foreground mb-4"
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
                      <p className="text-muted-foreground mb-4">PDF 미리보기</p>
                      <Button onClick={handleDownload} size="sm">
                        전체 문서 보기
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Feedback (40%) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Feedback Form */}
              <Card>
                <CardHeader>
                  <CardTitle>피드백 작성</CardTitle>
                  <CardDescription>
                    문서에 대한 의견을 작성해주세요
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmitFeedback}>
                  <CardContent className="space-y-4">
                    {error && (
                      <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                        {error}
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="feedbackType">피드백 유형</Label>
                      <select
                        id="feedbackType"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
                      <Label htmlFor="feedback">피드백 내용</Label>
                      <textarea
                        id="feedback"
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="수정이 필요한 부분이나 추가 요청사항을 자유롭게 작성해주세요 (최소 10자)"
                        value={feedbackContent}
                        onChange={(e) => setFeedbackContent(e.target.value)}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="submit"
                        variant="outline"
                        className="flex-1"
                        disabled={submitting || !feedbackContent.trim() || feedbackContent.length < 10}
                      >
                        피드백 등록
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={handleRequestRevision}
                        disabled={submitting || !feedbackContent.trim() || feedbackContent.length < 10}
                      >
                        수정 요청
                      </Button>
                    </div>

                    <Button
                      type="button"
                      className="w-full"
                      onClick={handleApprove}
                      disabled={submitting}
                    >
                      문서 승인하기
                    </Button>
                  </CardContent>
                </form>
              </Card>

              {/* Feedback History */}
              <Card>
                <CardHeader>
                  <CardTitle>피드백 내역</CardTitle>
                  <CardDescription>
                    {feedbacks.length}개의 피드백
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {feedbacks.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
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
                            className="p-4 bg-muted/50 rounded-lg space-y-2"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                                  {feedbackTypeLabels[feedback.type]}
                                </span>
                                {feedback.status && (
                                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                    feedback.status === 'RESOLVED' ? 'bg-green-100 text-green-700' :
                                    feedback.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                                    'bg-yellow-100 text-yellow-700'
                                  }`}>
                                    {feedback.status === 'RESOLVED' ? '해결됨' :
                                     feedback.status === 'REJECTED' ? '거절됨' : '대기중'}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {new Date(feedback.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <p className="text-sm">{feedback.content}</p>
                            {feedback.response && (
                              <div className="mt-2 p-2 bg-background rounded border">
                                <p className="text-xs font-medium mb-1">관리자 응답:</p>
                                <p className="text-sm">{feedback.response}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
