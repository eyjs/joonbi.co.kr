import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import type { PortfolioListResponse } from '@/types/portfolio';

export const metadata: Metadata = {
  title: '포트폴리오 | 준비스튜디오',
  description: '준비스튜디오가 완료한 프로젝트 사례집을 확인해보세요.',
  openGraph: {
    title: '포트폴리오 | 준비스튜디오',
    description: '준비스튜디오가 완료한 프로젝트 사례집을 확인해보세요.',
  },
};

// 빌드 시 API 미실행 상태에서도 빌드 가능하도록 dynamic 렌더링 사용
export const dynamic = 'force-dynamic';

async function getPortfolios(): Promise<PortfolioListResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  try {
    const res = await fetch(`${apiUrl}/api/portfolios?page=1&limit=50`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return { data: [], meta: { total: 0, page: 1, limit: 50 } };
    }

    return res.json();
  } catch {
    return { data: [], meta: { total: 0, page: 1, limit: 50 } };
  }
}

export default async function PortfolioListPage(): Promise<JSX.Element> {
  const { data: portfolios } = await getPortfolios();

  return (
    <main className="min-h-screen bg-[var(--tech-bg-dark)]">
      <Header />

      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="tech-badge mb-4 inline-block">PORTFOLIO</span>
            <h1 className="tech-heading-lg mt-4">프로젝트 사례집</h1>
            <p className="tech-text mt-4 max-w-2xl mx-auto">
              준비스튜디오가 완료한 프로젝트들을 확인해보세요.
              업무의뢰서, 시연동영상, 구조도, 산출문서 샘플을 제공합니다.
            </p>
          </div>

          {portfolios.length === 0 ? (
            <div className="text-center py-20">
              <p className="tech-text">아직 공개된 포트폴리오가 없습니다.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolios.map((portfolio) => (
                <Link
                  key={portfolio.id}
                  href={`/portfolio/${portfolio.slug}`}
                  className="tech-card group block hover:scale-[1.02] transition-transform"
                >
                  {portfolio.thumbnailUrl ? (
                    <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-white/5">
                      <img
                        src={portfolio.thumbnailUrl}
                        alt={portfolio.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video rounded-lg mb-4 bg-white/5 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">No Image</span>
                    </div>
                  )}

                  {portfolio.category && (
                    <span className="text-xs text-[var(--tech-neon-cyan)] font-medium uppercase tracking-wider">
                      {portfolio.category}
                    </span>
                  )}

                  <h2 className="text-lg font-bold text-white mt-1 group-hover:text-[var(--tech-neon-cyan)] transition-colors">
                    {portfolio.title}
                  </h2>

                  {portfolio.description && (
                    <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                      {portfolio.description}
                    </p>
                  )}

                  {portfolio.techStack && portfolio.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {portfolio.techStack.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-300 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                      {portfolio.techStack.length > 5 && (
                        <span className="text-xs px-2 py-0.5 text-gray-500">
                          +{portfolio.techStack.length - 5}
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
