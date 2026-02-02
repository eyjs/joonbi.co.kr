'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useAuthStore } from '@/stores/auth';
import { api } from '@/lib/api';
import type { ProjectResponse } from '@/types/project';
import type { ConsultationResponse } from '@/types/consultation';

export default function DashboardPage() {
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
          api.get<{ data: ProjectResponse[] }>('/projects?page=1&limit=10'),
          api.get<ConsultationResponse[]>('/consultations'),
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
      <div className="min-h-screen pt-24 pb-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              안녕하세요, {user?.name}님
            </h1>
            <p className="text-muted-foreground">
              프로젝트 현황을 확인하고 관리하세요
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>진행중인 프로젝트</CardDescription>
                <CardTitle className="text-3xl">
                  {projects.filter(p => p.status === 'IN_PROGRESS').length}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>전체 상담</CardDescription>
                <CardTitle className="text-3xl">{consultations.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>전체 프로젝트</CardDescription>
                <CardTitle className="text-3xl">{projects.length}</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Projects Section */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">내 프로젝트</h2>
              <Link href="/consultation">
                <Button>새 프로젝트 상담하기</Button>
              </Link>
            </div>

            {projects.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <svg
                    className="w-16 h-16 text-muted-foreground mb-4"
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
                  <p className="text-muted-foreground mb-4">
                    아직 진행중인 프로젝트가 없습니다
                  </p>
                  <Link href="/consultation">
                    <Button>새 프로젝트 상담하기</Button>
                  </Link>
                </CardContent>
              </Card>
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
                    PENDING: 'bg-yellow-100 text-yellow-700',
                    IN_PROGRESS: 'bg-blue-100 text-blue-700',
                    REVIEW: 'bg-purple-100 text-purple-700',
                    COMPLETED: 'bg-green-100 text-green-700',
                    CANCELLED: 'bg-gray-100 text-gray-700',
                  };

                  return (
                    <Card
                      key={project.id}
                      className="hover:border-primary transition-colors cursor-pointer"
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{project.projectName}</CardTitle>
                            <CardDescription className="mt-1">
                              {project.projectCode}
                            </CardDescription>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                            {statusLabels[project.status]}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center mt-4">
                            <span className="text-sm text-muted-foreground">
                              {project.totalAmount.toLocaleString()}원
                            </span>
                            <Link href={`/projects/${project.id}`}>
                              <Button variant="outline" size="sm">
                                자세히 보기
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </section>

          {/* Consultations Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">상담 내역</h2>
            {consultations.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground mb-4">
                    아직 상담 내역이 없습니다
                  </p>
                  <Link href="/consultation">
                    <Button>새 상담 신청하기</Button>
                  </Link>
                </CardContent>
              </Card>
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
                    PENDING: 'bg-yellow-100 text-yellow-700',
                    ANALYZING: 'bg-blue-100 text-blue-700',
                    COMPLETED: 'bg-green-100 text-green-700',
                    REJECTED: 'bg-red-100 text-red-700',
                  };

                  return (
                    <Card key={consultation.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">
                              {consultation.projectName}
                            </CardTitle>
                            <CardDescription>
                              {consultation.type === 'ANALYSIS'
                                ? '분석 상담'
                                : '간편 상담'}{' '}
                              • {new Date(consultation.createdAt).toLocaleDateString()}
                            </CardDescription>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[consultation.status]}`}>
                            {statusLabels[consultation.status] || consultation.status}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Link href={`/consultations/${consultation.id}`}>
                          <Button variant="outline" size="sm">
                            상세 보기
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
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
