import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/home/hero-section';
import { ProblemSection } from '@/components/home/problem-section';
import { ComparisonSection } from '@/components/home/comparison-section';
import { RequirementsSection } from '@/components/home/requirements-section';
import { ProcessSection } from '@/components/home/process-section';
import { DashboardSection } from '@/components/home/dashboard-section';
import { CommunicationSection } from '@/components/home/communication-section';
import { PricingReasonSection } from '@/components/home/pricing-reason-section';
import { PricingSection } from '@/components/home/pricing-section';
import { AddonsSection } from '@/components/home/addons-section';
import { TargetAudienceSection } from '@/components/home/target-audience-section';
import { WorkflowSection } from '@/components/home/workflow-section';
import { GuaranteeSection } from '@/components/home/guarantee-section';
import { CtaSection } from '@/components/home/cta-section';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        {/* 1. Hero - 임팩트 메시지 */}
        <HeroSection />

        {/* 2. 문제 제기 - 공감대 형성 */}
        <ProblemSection />

        {/* 3. 기존 vs 준비스튜디오 */}
        <ComparisonSection />

        {/* 4. 준비물 2가지 */}
        <RequirementsSection />

        {/* 5. AI 자동화 4단계 */}
        <ProcessSection />

        {/* 6. 실시간 대시보드 */}
        <DashboardSection />

        {/* 7. 채팅 전용 소통 */}
        <CommunicationSection />

        {/* 8. 40~60% 저렴한 이유 */}
        <PricingReasonSection />

        {/* 9. 투명한 가격표 */}
        <PricingSection />

        {/* 10. 추가 기능 옵션 */}
        <AddonsSection />

        {/* 11. 추천 vs 사양 */}
        <TargetAudienceSection />

        {/* 12. 의뢰 프로세스 */}
        <WorkflowSection />

        {/* 13. 납품 보장 */}
        <GuaranteeSection />

        {/* 14. 최종 CTA */}
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
