import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PortfolioDetailClient } from '@/components/portfolio/portfolio-detail-client';
import type { Portfolio } from '@/types/portfolio';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
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
  const { slug } = await params;
  const portfolio = await getPortfolio(slug);

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
  const { slug } = await params;
  const portfolio = await getPortfolio(slug);

  if (!portfolio) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-white">
        <PortfolioDetailClient portfolio={portfolio} />
      </main>
      <Footer />
    </>
  );
}
