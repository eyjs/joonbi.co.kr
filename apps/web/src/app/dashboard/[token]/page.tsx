'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
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
        <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center" style={{ background: 'var(--tech-bg-dark)' }}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
            <p className="tech-text">프로젝트 정보를 불러오는 중...</p>
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
        <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center" style={{ background: 'var(--tech-bg-dark)' }}>
          <div className="tech-card max-w-md w-full">
            <div className="mb-4">
              <h2 className="tech-heading-md mb-2">접근 오류</h2>
              <p className="tech-text">{error || '프로젝트를 찾을 수 없습니다'}</p>
            </div>
            <Link href="/">
              <button className="tech-btn-primary w-full">홈으로 돌아가기</button>
            </Link>
          </div>
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
      <div className="min-h-screen pt-24 pb-12 px-4" style={{ background: 'var(--tech-bg-dark)' }}>
        <div className="container mx-auto max-w-6xl">
          {/* Project Header */}
          <div className="mb-8">
            <h1 className="tech-heading-lg mb-2">{project.projectName}</h1>
            <p className="tech-text">
              {project.projectCode} • {statusLabels[project.status] || project.status}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="tech-card mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="tech-heading-md">전체 진행률</h2>
              <span className="text-3xl font-bold tech-glow-text">{progress}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-4">
              <div
                className="h-4 rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, var(--tech-gradient-start), var(--tech-gradient-end))'
                }}
              ></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Documents */}
            <section>
              <h2 className="tech-heading-md mb-4">산출물</h2>
              <div className="space-y-4">
                {project.documents && project.documents.length > 0 ? (
                  project.documents.map((doc) => (
                    <div key={doc.id} className="tech-card">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-white">{doc.docName}</h3>
                          <p className="tech-text text-sm">{doc.docCode}</p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/40">
                          {docStatusLabels[doc.status] || doc.status}
                        </span>
                      </div>
                      {doc.filePath && (
                        <a href={doc.filePath} target="_blank" rel="noopener noreferrer">
                          <button className="tech-btn-secondary text-sm px-4 py-2">
                            파일 다운로드
                          </button>
                        </a>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="tech-card py-8 text-center">
                    <p className="tech-text">아직 산출물이 없습니다</p>
                  </div>
                )}
              </div>
            </section>

            {/* Info */}
            <section>
              <h2 className="tech-heading-md mb-4">프로젝트 정보</h2>
              <div className="tech-card mb-4">
                <h3 className="text-lg font-bold text-white mb-4">일정</h3>
                <div className="space-y-2">
                  {project.startDate && (
                    <div className="flex justify-between">
                      <span className="tech-text">시작일</span>
                      <span className="text-white">{new Date(project.startDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  {project.expectedEndDate && (
                    <div className="flex justify-between">
                      <span className="tech-text">예상 완료일</span>
                      <span className="text-white">{new Date(project.expectedEndDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="tech-card">
                <h3 className="text-lg font-bold text-white mb-4">결제 정보</h3>
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-white">총 금액</span>
                    <span className="tech-glow-text">{project.totalAmount.toLocaleString()}원</span>
                  </div>
                </div>
                {project.payments && project.payments.length > 0 ? (
                  <div className="space-y-2">
                    {project.payments.map((payment) => (
                      <div key={payment.id} className="flex justify-between text-sm">
                        <span className="tech-text">
                          {payment.paymentType === 'CONTRACT' ? '계약금' :
                           payment.paymentType === 'FINAL' ? '잔금' : '추가'}
                        </span>
                        <span className={payment.status === 'COMPLETED' ? 'text-green-400' : 'text-gray-400'}>
                          {payment.amount.toLocaleString()}원 ({payment.status === 'COMPLETED' ? '완료' : '대기'})
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm tech-text">결제 정보가 없습니다</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
