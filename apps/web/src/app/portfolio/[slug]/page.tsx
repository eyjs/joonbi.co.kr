import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SectionRenderer } from '@/components/portfolio/section-renderer';
import { ImageGallery } from '@/components/portfolio/image-gallery';
import type { Portfolio } from '@/types/portfolio';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: { slug: string };
}

async function getPortfolio(slug: string): Promise<Portfolio | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  try {
    const res = await fetch(`${apiUrl}/api/portfolios/${slug}`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const portfolio = await getPortfolio(params.slug);

  if (!portfolio) {
    return { title: '포트폴리오를 찾을 수 없습니다 | 준비스튜디오' };
  }

  return {
    title: `${portfolio.title} | 준비스튜디오 포트폴리오`,
    description: portfolio.description || `${portfolio.title} - 준비스튜디오 프로젝트 사례집`,
    openGraph: {
      title: `${portfolio.title} | 준비스튜디오 포트폴리오`,
      description: portfolio.description || `${portfolio.title} - 준비스튜디오 프로젝트 사례집`,
      images: portfolio.thumbnailUrl ? [{ url: portfolio.thumbnailUrl }] : undefined,
    },
  };
}

export default async function PortfolioDetailPage({ params }: PageProps): Promise<JSX.Element> {
  const portfolio = await getPortfolio(params.slug);

  if (!portfolio) {
    notFound();
  }

  const sortedSections = [...portfolio.sections].sort(
    (a, b) => a.displayOrder - b.displayOrder,
  );

  const completedDate = portfolio.completedAt
    ? new Date(portfolio.completedAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
      })
    : null;

  return (
    <main className="min-h-screen bg-[var(--tech-bg-dark)]">
      <Header />

      <article className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* 상단 정보 */}
          <header className="mb-12">
            {portfolio.category && (
              <span className="tech-badge mb-4 inline-block">{portfolio.category}</span>
            )}

            <h1 className="tech-heading-lg mt-2">{portfolio.title}</h1>

            {portfolio.description && (
              <p className="tech-text mt-4">{portfolio.description}</p>
            )}

            <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-gray-400">
              {completedDate && (
                <span>완료: {completedDate}</span>
              )}
              {portfolio.displayType === 'FULL' && portfolio.clientName && (
                <span>클라이언트: {portfolio.clientName}</span>
              )}
            </div>

            {portfolio.techStack && portfolio.techStack.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {portfolio.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1 rounded-full border border-[var(--tech-neon-cyan)]/30 text-[var(--tech-neon-cyan)] bg-[var(--tech-neon-cyan)]/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* 썸네일 */}
          {portfolio.thumbnailUrl && (
            <div className="aspect-video rounded-xl overflow-hidden mb-12 border border-white/10">
              <img
                src={portfolio.thumbnailUrl}
                alt={portfolio.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* 섹션 블록 */}
          <div className="space-y-10">
            {sortedSections.map((section) => (
              <SectionRenderer key={section.id} section={section} />
            ))}
          </div>

          {/* 기존 이미지 갤러리 (PortfolioImage) */}
          {portfolio.images && portfolio.images.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold text-white mb-4">스크린샷</h2>
              <ImageGallery images={portfolio.images} />
            </div>
          )}
        </div>
      </article>

      <Footer />
    </main>
  );
}
