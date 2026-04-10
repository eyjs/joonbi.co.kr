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

        if (data.documents && data.documents.length > 0) {
          const statusCompletion: Record<string, number> = {
            WAITING: 0,
            WORKING: 30,
            REVIEW: 70,
            FEEDBACK: 50,
            APPROVED: 90,
            DELIVERED: 100,
          };

          const totalWeight = data.documents.reduce((sum: number, doc: ProjectData['documents'][0]) => sum + doc.weight, 0);
          if (totalWeight > 0) {
            const totalProgress = data.documents.reduce((sum: number, doc: ProjectData['documents'][0]) => {
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
        <main className="pt-16 min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 mx-auto mb-4 relative">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
              <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
            </div>
            <p className="text-gray-500">프로젝트 정보를 불러오는 중...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !project) {
    return (
      <>
        <Header />
        <main className="pt-16 min-h-screen bg-white flex items-center justify-center">
          <div className="max-w-md w-full mx-4 bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="heading-md mb-3">접근 오류</h2>
            <p className="text-gray-500 mb-6">{error || '프로젝트를 찾을 수 없습니다'}</p>
            <Link href="/" className="btn-primary inline-block">
              홈으로 돌아가기
            </Link>
          </div>
        </main>
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

  const docStatusColors: Record<string, string> = {
    WAITING: 'bg-gray-100 text-gray-600',
    WORKING: 'bg-yellow-50 text-yellow-600',
    REVIEW: 'bg-blue-50 text-blue-600',
    FEEDBACK: 'bg-orange-50 text-orange-600',
    APPROVED: 'bg-green-50 text-green-600',
    DELIVERED: 'bg-green-50 text-green-600',
  };

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Project Header */}
          <div className="mb-8">
            <h1 className="heading-lg mb-2">{project.projectName}</h1>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>{project.projectCode}</span>
              <span className="badge badge-primary text-xs">
                {statusLabels[project.status] || project.status}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold text-gray-900">전체 진행률</h2>
              <span className="text-2xl font-bold text-blue-600">{progress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div
                className="h-3 rounded-full bg-blue-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Documents */}
            <section>
              <h2 className="heading-sm mb-4">산출물</h2>
              <div className="space-y-3">
                {project.documents && project.documents.length > 0 ? (
                  project.documents.map((doc) => (
                    <div key={doc.id} className="bg-white rounded-xl border border-gray-200 p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{doc.docName}</h3>
                          <p className="text-sm text-gray-500">{doc.docCode}</p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${docStatusColors[doc.status] || 'bg-gray-100 text-gray-600'}`}>
                          {docStatusLabels[doc.status] || doc.status}
                        </span>
                      </div>
                      {doc.filePath && (
                        <a
                          href={doc.filePath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary text-sm px-4 py-2 inline-block"
                        >
                          파일 다운로드
                        </a>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                    <p className="text-gray-500">아직 산출물이 없습니다</p>
                  </div>
                )}
              </div>
            </section>

            {/* Info */}
            <section>
              <h2 className="heading-sm mb-4">프로젝트 정보</h2>
              <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
                <h3 className="font-semibold text-gray-900 mb-3">일정</h3>
                <div className="space-y-2">
                  {project.startDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">시작일</span>
                      <span className="text-gray-700">{new Date(project.startDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  {project.expectedEndDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">예상 완료일</span>
                      <span className="text-gray-700">{new Date(project.expectedEndDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-3">결제 정보</h3>
                <div className="mb-3 pb-3 border-b border-gray-100">
                  <div className="flex justify-between text-base font-semibold">
                    <span className="text-gray-900">총 금액</span>
                    <span className="text-blue-600">{project.totalAmount.toLocaleString()}원</span>
                  </div>
                </div>
                {project.payments && project.payments.length > 0 ? (
                  <div className="space-y-2">
                    {project.payments.map((payment) => (
                      <div key={payment.id} className="flex justify-between text-sm">
                        <span className="text-gray-500">
                          {payment.paymentType === 'CONTRACT' ? '계약금' :
                           payment.paymentType === 'FINAL' ? '잔금' : '추가'}
                        </span>
                        <span className={payment.status === 'COMPLETED' ? 'text-green-600' : 'text-gray-400'}>
                          {payment.amount.toLocaleString()}원 ({payment.status === 'COMPLETED' ? '완료' : '대기'})
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">결제 정보가 없습니다</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
