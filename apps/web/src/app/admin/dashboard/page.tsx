'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useAuthStore } from '@/stores/auth';
import { api } from '@/lib/api';
import type { ProjectResponse } from '@/types/project';
import type { ConsultationResponse } from '@/types/consultation';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [consultations, setConsultations] = useState<ConsultationResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const [projectsData, consultationsData] = await Promise.all([
          api.get<{ data: ProjectResponse[] }>('/api/projects?page=1&limit=10'),
          api.get<ConsultationResponse[]>('/api/consultations'),
        ]);

        setProjects(projectsData.data || []);
        setConsultations(consultationsData || []);
      } catch (err: unknown) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, router]);

  if (!isAuthenticated || loading) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen pt-24 pb-12 px-4" style={{ background: 'var(--tech-bg-dark)' }}>
        <div className="container mx-auto max-w-6xl">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="tech-heading-lg mb-2">
              안녕하세요, {user?.name}님
            </h1>
            <p className="tech-text">
              프로젝트 현황을 확인하고 관리하세요
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="tech-card">
              <div className="pb-3">
                <p className="tech-text text-sm mb-2">진행중인 프로젝트</p>
                <p className="tech-heading-lg tech-glow-text">
                  {projects.filter(p => p.status === 'IN_PROGRESS').length}
                </p>
              </div>
            </div>
            <div className="tech-card">
              <div className="pb-3">
                <p className="tech-text text-sm mb-2">전체 상담</p>
                <p className="tech-heading-lg tech-glow-text">{consultations.length}</p>
              </div>
            </div>
            <div className="tech-card">
              <div className="pb-3">
                <p className="tech-text text-sm mb-2">전체 프로젝트</p>
                <p className="tech-heading-lg tech-glow-text">{projects.length}</p>
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="tech-heading-md">내 프로젝트</h2>
              <Link href="/consultation">
                <button className="tech-btn-primary">새 프로젝트 상담하기</button>
              </Link>
            </div>

            {projects.length === 0 ? (
              <div className="tech-card">
                <div className="flex flex-col items-center justify-center py-12">
                  <svg
                    className="w-16 h-16 text-gray-500 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <p className="tech-text mb-4">
                    아직 진행중인 프로젝트가 없습니다
                  </p>
                  <Link href="/consultation">
                    <button className="tech-btn-primary">새 프로젝트 상담하기</button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {projects.map((project) => {
                  const statusLabels: Record<string, string> = {
                    PENDING: '대기중',
                    IN_PROGRESS: '진행중',
                    REVIEW: '검토중',
                    COMPLETED: '완료',
                    CANCELLED: '취소됨',
                  };

                  const statusColors: Record<string, string> = {
                    PENDING: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
                    IN_PROGRESS: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
                    REVIEW: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
                    COMPLETED: 'bg-green-500/20 text-green-400 border-green-500/40',
                    CANCELLED: 'bg-gray-500/20 text-gray-400 border-gray-500/40',
                  };

                  return (
                    <div
                      key={project.id}
                      className="tech-card hover:border-cyan-500 transition-colors cursor-pointer"
                    >
                      <div className="mb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold text-white">{project.projectName}</h3>
                            <p className="tech-text text-sm mt-1">
                              {project.projectCode}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[project.status]}`}>
                            {statusLabels[project.status]}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center mt-4">
                            <span className="text-sm tech-text">
                              {project.totalAmount.toLocaleString()}원
                            </span>
                            <Link href={`/projects/${project.id}`}>
                              <button className="tech-btn-secondary text-sm px-4 py-2">
                                자세히 보기
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Consultations Section */}
          <section>
            <h2 className="tech-heading-md mb-4">상담 내역</h2>
            {consultations.length === 0 ? (
              <div className="tech-card">
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="tech-text mb-4">
                    아직 상담 내역이 없습니다
                  </p>
                  <Link href="/consultation">
                    <button className="tech-btn-primary">새 상담 신청하기</button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {consultations.map((consultation) => {
                  const statusLabels: Record<string, string> = {
                    PENDING: '대기중',
                    ANALYZING: '분석중',
                    COMPLETED: '완료',
                    REJECTED: '거절',
                  };

                  const statusColors: Record<string, string> = {
                    PENDING: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
                    ANALYZING: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
                    COMPLETED: 'bg-green-500/20 text-green-400 border-green-500/40',
                    REJECTED: 'bg-red-500/20 text-red-400 border-red-500/40',
                  };

                  return (
                    <div key={consultation.id} className="tech-card">
                      <div className="mb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-bold text-white">
                              {consultation.projectName}
                            </h3>
                            <p className="tech-text text-sm">
                              {consultation.type === 'ANALYSIS'
                                ? '분석 상담'
                                : '간편 상담'}{' '}
                              • {new Date(consultation.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[consultation.status]}`}>
                            {statusLabels[consultation.status] || consultation.status}
                          </span>
                        </div>
                      </div>
                      <div>
                        <Link href={`/consultations/${consultation.id}`}>
                          <button className="tech-btn-secondary text-sm px-4 py-2">
                            상세 보기
                          </button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
