'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useAuthStore } from '@/stores/auth';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  // TODO: API에서 실제 데이터 가져오기
  const mockProjects = [
    {
      id: '1',
      projectCode: 'PROJ-001',
      projectName: '쇼핑몰 웹사이트',
      status: 'IN_PROGRESS',
      progress: 65,
    },
  ];

  const mockConsultations = [
    {
      id: '1',
      projectName: 'AI 챗봇 시스템',
      type: 'ANALYSIS',
      status: 'COMPLETED',
      createdAt: '2024-01-15',
    },
  ];

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
                <CardTitle className="text-3xl">{mockProjects.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>완료된 상담</CardDescription>
                <CardTitle className="text-3xl">{mockConsultations.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>검토 대기중</CardDescription>
                <CardTitle className="text-3xl">0</CardTitle>
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

            {mockProjects.length === 0 ? (
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
                {mockProjects.map((project) => (
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
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          진행중
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">진행률</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-sm text-muted-foreground">
                            다음 마일스톤: 소스코드 검토
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
                ))}
              </div>
            )}
          </section>

          {/* Consultations Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">상담 내역</h2>
            <div className="grid gap-4">
              {mockConsultations.map((consultation) => (
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
                          • {consultation.createdAt}
                        </CardDescription>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        완료
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Link href={`/consultations/${consultation.id}`}>
                      <Button variant="outline" size="sm">
                        분석 결과 보기
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
