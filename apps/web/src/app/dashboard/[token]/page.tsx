'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

interface ProjectData {
  id: string;
  projectCode: string;
  projectName: string;
  status: string;
  totalAmount: number;
  startDate?: string;
  expectedEndDate?: string;
  documents: Array<{
    id: string;
    docCode: string;
    docName: string;
    status: string;
    weight: number;
    filePath?: string;
  }>;
  messages: Array<{
    id: string;
    content: string;
    senderId: string;
    createdAt: string;
  }>;
  payments: Array<{
    id: string;
    paymentType: string;
    amount: number;
    status: string;
    paidAt?: string;
  }>;
}

export default function TokenDashboardPage() {
  const params = useParams();
  const token = params.token as string;
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/projects/by-token/${token}`);

        if (!response.ok) {
          throw new Error('유효하지 않은 접근 링크입니다');
        }

        const data = await response.json();
        setProject(data);

        // Calculate progress
        if (data.documents && data.documents.length > 0) {
          const statusCompletion: Record<string, number> = {
            WAITING: 0,
            WORKING: 30,
            REVIEW: 70,
            FEEDBACK: 50,
            APPROVED: 90,
            DELIVERED: 100,
          };

          const totalWeight = data.documents.reduce((sum: number, doc: any) => sum + doc.weight, 0);
          if (totalWeight > 0) {
            const totalProgress = data.documents.reduce((sum: number, doc: any) => {
              const completion = statusCompletion[doc.status] || 0;
              return sum + (doc.weight * completion) / 100;
            }, 0);
            setProgress(Math.round((totalProgress / totalWeight) * 100));
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : '프로젝트를 불러올 수 없습니다');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProject();
    }
  }, [token]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">프로젝트 정보를 불러오는 중...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !project) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>접근 오류</CardTitle>
              <CardDescription>{error || '프로젝트를 찾을 수 없습니다'}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/">
                <Button className="w-full">홈으로 돌아가기</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </>
    );
  }

  const statusLabels: Record<string, string> = {
    CONTRACT: '계약 대기',
    IN_PROGRESS: '진행중',
    REVIEW: '검수중',
    COMPLETED: '완료',
    CANCELLED: '취소됨',
  };

  const docStatusLabels: Record<string, string> = {
    WAITING: '대기',
    WORKING: '작업중',
    REVIEW: '검토요청',
    FEEDBACK: '수정중',
    APPROVED: '승인완료',
    DELIVERED: '전달완료',
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-24 pb-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          {/* Project Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{project.projectName}</h1>
            <p className="text-muted-foreground">
              {project.projectCode} • {statusLabels[project.status] || project.status}
            </p>
          </div>

          {/* Progress Bar */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>전체 진행률</CardTitle>
                <span className="text-3xl font-bold text-primary">{progress}%</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-primary h-4 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Documents */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">산출물</h2>
              <div className="space-y-4">
                {project.documents && project.documents.length > 0 ? (
                  project.documents.map((doc) => (
                    <Card key={doc.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{doc.docName}</CardTitle>
                            <CardDescription>{doc.docCode}</CardDescription>
                          </div>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                            {docStatusLabels[doc.status] || doc.status}
                          </span>
                        </div>
                      </CardHeader>
                      {doc.filePath && (
                        <CardContent>
                          <a href={doc.filePath} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm">
                              파일 다운로드
                            </Button>
                          </a>
                        </CardContent>
                      )}
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                      아직 산출물이 없습니다
                    </CardContent>
                  </Card>
                )}
              </div>
            </section>

            {/* Info */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">프로젝트 정보</h2>
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>일정</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {project.startDate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">시작일</span>
                      <span>{new Date(project.startDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  {project.expectedEndDate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">예상 완료일</span>
                      <span>{new Date(project.expectedEndDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>결제 정보</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 pb-4 border-b">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>총 금액</span>
                      <span>{project.totalAmount.toLocaleString()}원</span>
                    </div>
                  </div>
                  {project.payments && project.payments.length > 0 ? (
                    <div className="space-y-2">
                      {project.payments.map((payment) => (
                        <div key={payment.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {payment.paymentType === 'CONTRACT' ? '계약금' :
                             payment.paymentType === 'FINAL' ? '잔금' : '추가'}
                          </span>
                          <span className={payment.status === 'COMPLETED' ? 'text-green-600' : ''}>
                            {payment.amount.toLocaleString()}원 ({payment.status === 'COMPLETED' ? '완료' : '대기'})
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">결제 정보가 없습니다</p>
                  )}
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
