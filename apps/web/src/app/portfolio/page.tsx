import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PortfolioListClient } from '@/components/portfolio/portfolio-list-client';

export const metadata: Metadata = {
  title: '포트폴리오 | 준비스튜디오',
  description: '준비스튜디오가 완료한 프로젝트 사례집을 확인해보세요.',
  openGraph: {
    title: '포트폴리오 | 준비스튜디오',
    description: '준비스튜디오가 완료한 프로젝트 사례집을 확인해보세요.',
  },
};

export default function PortfolioListPage(): JSX.Element {
  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-white">
        <section className="pt-12 pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="heading-lg mb-4">프로젝트 사례집</h1>
              <p className="text-gray-500 max-w-2xl mx-auto">
                준비스튜디오가 완료한 프로젝트들을 확인해보세요.
                업무의뢰서, 시연동영상, 구조도, 산출문서 샘플을 제공합니다.
              </p>
            </div>

            <PortfolioListClient />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
