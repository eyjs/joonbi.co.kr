import { TechHeroSection } from '@/components/home/tech-hero-section';
import { ComparisonTechSection } from '@/components/home/comparison-tech-section';
import { AutomationPipelineSection } from '@/components/home/automation-pipeline-section';
import { DashboardSampleSection } from '@/components/home/dashboard-sample-section';
import { PricingTechSection } from '@/components/home/pricing-tech-section';
import { CTATechSection } from '@/components/home/cta-tech-section';

export default function HomePage(): JSX.Element {
  return (
    <main className="min-h-screen bg-[#0a0e27]">
      <TechHeroSection />
      <ComparisonTechSection />
      <AutomationPipelineSection />
      <DashboardSampleSection />
      <PricingTechSection />
      <CTATechSection />
    </main>
  );
}
