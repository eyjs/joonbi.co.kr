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

type DocumentStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'REVISION_REQUESTED';
type DocumentType = 'ANALYSIS' | 'SPECIFICATION' | 'PROPOSAL' | 'ESTIMATE';

interface Feedback {
  id: string;
  content: string;
  createdAt: string;
  author: string;
}

interface Document {
  id: string;
  projectName: string;
  type: DocumentType;
  status: DocumentStatus;
  version: string;
  createdAt: string;
  pdfUrl: string;
  feedbacks: Feedback[];
}

const documentTypeLabels: Record<DocumentType, string> = {
  ANALYSIS: '분석서',
  SPECIFICATION: '명세서',
  PROPOSAL: '기획서',
  ESTIMATE: '견적서',
};

const statusLabels: Record<DocumentStatus, string> = {
  PENDING: '검토 대기',
  APPROVED: '승인 완료',
  REJECTED: '반려',
  REVISION_REQUESTED: '수정 요청',
};

const statusColors: Record<DocumentStatus, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  APPROVED: 'bg-green-100 text-green-700',
  REJECTED: 'bg-red-100 text-red-700',
  REVISION_REQUESTED: 'bg-blue-100 text-blue-700',
};

export default function DocumentReviewPage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated, user } = useAuthStore();
  const [feedbackContent, setFeedbackContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  // TODO: API에서 실제 문서 데이터 가져오기
  const mockDocument: Document = {
    id: params.id as string,
    projectName: '쇼핑몰 웹사이트',
    type: 'ANALYSIS',
    status: 'PENDING',
    version: '1.0',
    createdAt: '2024-01-20',
    pdfUrl: '/sample-document.pdf',
    feedbacks: [
      {
        id: '1',
        content: '전체적인 구성이 좋습니다. 다만 결제 모듈 부분을 좀 더 상세히 설명해주시면 감사하겠습니다.',
        createdAt: '2024-01-19',
        author: '홍길동',
      },
    ],
  };

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackContent.trim()) return;

    setLoading(true);
    setError('');

    try {
      // TODO: API 연동
      alert('피드백이 등록되었습니다. (데모)');
      setFeedbackContent('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('피드백 등록에 실패했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!confirm('이 문서를 승인하시겠습니까?')) return;

    setLoading(true);
    try {
      // TODO: API 연동
      alert('문서가 승인되었습니다. (데모)');
      router.push('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('승인 처리에 실패했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRequestRevision = async () => {
    if (!feedbackContent.trim()) {
      alert('수정 요청 사유를 입력해주세요.');
      return;
    }

    if (!confirm('수정을 요청하시겠습니까?')) return;

    setLoading(true);
    try {
      // TODO: API 연동
      alert('수정 요청이 완료되었습니다. (데모)');
      router.push('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('수정 요청에 실패했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    // TODO: 실제 파일 다운로드
    window.open(mockDocument.pdfUrl, '_blank');
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
            <h1 className="text-3xl font-bold mb-2">{mockDocument.projectName}</h1>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">
                {documentTypeLabels[mockDocument.type]} v{mockDocument.version}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[mockDocument.status]}`}>
                {statusLabels[mockDocument.status]}
              </span>
              <span className="text-muted-foreground text-sm">
                생성일: {mockDocument.createdAt}
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
                    AI가 자동으로 생성한 {documentTypeLabels[mockDocument.type]}입니다
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">문서 유형</p>
                      <p className="font-medium">{documentTypeLabels[mockDocument.type]}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">버전</p>
                      <p className="font-medium">v{mockDocument.version}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">상태</p>
                      <p className="font-medium">{statusLabels[mockDocument.status]}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">생성일</p>
                      <p className="font-medium">{mockDocument.createdAt}</p>
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
                      <Label htmlFor="feedback">피드백 내용</Label>
                      <textarea
                        id="feedback"
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="수정이 필요한 부분이나 추가 요청사항을 자유롭게 작성해주세요"
                        value={feedbackContent}
                        onChange={(e) => setFeedbackContent(e.target.value)}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="submit"
                        variant="outline"
                        className="flex-1"
                        disabled={loading || !feedbackContent.trim()}
                      >
                        피드백 등록
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={handleRequestRevision}
                        disabled={loading || !feedbackContent.trim()}
                      >
                        수정 요청
                      </Button>
                    </div>

                    <Button
                      type="button"
                      className="w-full"
                      onClick={handleApprove}
                      disabled={loading}
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
                    {mockDocument.feedbacks.length}개의 피드백
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {mockDocument.feedbacks.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      아직 피드백이 없습니다
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {mockDocument.feedbacks.map((feedback) => (
                        <div
                          key={feedback.id}
                          className="p-4 bg-muted/50 rounded-lg space-y-2"
                        >
                          <div className="flex justify-between items-start">
                            <p className="font-medium text-sm">{feedback.author}</p>
                            <p className="text-xs text-muted-foreground">
                              {feedback.createdAt}
                            </p>
                          </div>
                          <p className="text-sm">{feedback.content}</p>
                        </div>
                      ))}
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
