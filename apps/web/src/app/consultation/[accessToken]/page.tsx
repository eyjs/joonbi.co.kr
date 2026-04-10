'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { StepIndicator } from '@/components/consultation/step-indicator';
import { WaitingStep } from '@/components/consultation/waiting-step';
import { SpecReviewStep } from '@/components/consultation/spec-review-step';
import { InfoCollectionStep } from '@/components/consultation/info-collection-step';
import { DiagramStep } from '@/components/consultation/diagram-step';
import { PaymentStep } from '@/components/consultation/payment-step';
import type { ConsultationResponse, ConsultationStep } from '@/types/consultation';
import Link from 'next/link';

export default function ConsultationStepsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const accessToken = params.accessToken as string;
  const stepParam = searchParams.get('step');
  const currentStep = (stepParam ? parseInt(stepParam, 10) : 2) as ConsultationStep;

  const [consultation, setConsultation] = useState<ConsultationResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConsultation = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
        const res = await fetch(`${apiUrl}/api/consultations/by-token/${accessToken}`);

        if (!res.ok) {
          throw new Error('상담 정보를 찾을 수 없습니다.');
        }

        const data: ConsultationResponse = await res.json();
        setConsultation(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '상담 정보를 불러올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchConsultation();
    }
  }, [accessToken, currentStep]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-16 min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 mx-auto mb-4 relative">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
              <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
            </div>
            <p className="text-gray-500">상담 정보를 불러오는 중...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !consultation) {
    return (
      <>
        <Header />
        <main className="pt-16 min-h-screen bg-white flex items-center justify-center">
          <div className="max-w-md w-full mx-4 bg-white rounded-xl border border-gray-200 p-8 text-center">
            <h2 className="heading-md mb-3">접근 오류</h2>
            <p className="text-gray-500 mb-6">{error || '상담 정보를 찾을 수 없습니다.'}</p>
            <Link href="/consultation" className="btn-primary">
              새 상담 시작
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-white">
        <section className="py-12 px-4">
          <div className="max-w-2xl mx-auto">
            <StepIndicator currentStep={currentStep} />

            {currentStep === 2 && (
              <WaitingStep consultation={consultation} accessToken={accessToken} />
            )}
            {currentStep === 3 && (
              <SpecReviewStep consultation={consultation} accessToken={accessToken} />
            )}
            {currentStep === 4 && (
              <InfoCollectionStep accessToken={accessToken} />
            )}
            {currentStep === 5 && (
              <DiagramStep accessToken={accessToken} />
            )}
            {currentStep === 6 && (
              <PaymentStep consultation={consultation} />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
