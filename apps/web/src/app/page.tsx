import { HeroSection } from '@/components/home/HeroSection';
import { ProblemSection } from '@/components/home/ProblemSection';
import { BarriersSection } from '@/components/home/BarriersSection';
import { SolutionSection } from '@/components/home/SolutionSection';
import { RequirementsSection } from '@/components/home/RequirementsSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { DashboardSection } from '@/components/home/DashboardSection';
import { ChatOnlySection } from '@/components/home/ChatOnlySection';
import { PricingReasonSection } from '@/components/home/PricingReasonSection';
import { PricingTableSection } from '@/components/home/PricingTableSection';
import { AdditionalOptionsSection } from '@/components/home/AdditionalOptionsSection';
import { RecommendedSection } from '@/components/home/RecommendedSection';
import { NotRecommendedSection } from '@/components/home/NotRecommendedSection';
import { WorkflowSection } from '@/components/home/WorkflowSection';
import { GuaranteeSection } from '@/components/home/GuaranteeSection';
import { EventSection } from '@/components/home/EventSection';
import { CTASection } from '@/components/home/CTASection';

export default function HomePage(): JSX.Element {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <BarriersSection />
      <SolutionSection />
      <RequirementsSection />
      <ProcessSection />
      <DashboardSection />
      <ChatOnlySection />
      <PricingReasonSection />
      <PricingTableSection />
      <AdditionalOptionsSection />
      <RecommendedSection />
      <NotRecommendedSection />
      <WorkflowSection />
      <GuaranteeSection />
      <EventSection />
      <CTASection />
    </main>
  );
}
