import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/home/hero-section';
import { PortfolioGallerySection } from '@/components/home/portfolio-gallery-section';
import { WorkProcessSection } from '@/components/home/work-process-section';
import { DashboardIntroSection } from '@/components/home/dashboard-intro-section';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import { ConsultationCtaSection } from '@/components/home/consultation-cta-section';

export const dynamic = 'force-dynamic';

export default async function HomePage(): Promise<JSX.Element> {
  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-white">
        <HeroSection />
        <PortfolioGallerySection />
        <WorkProcessSection />
        <DashboardIntroSection />
        <TestimonialsSection />
        <ConsultationCtaSection />
      </main>
      <Footer />
    </>
  );
}
