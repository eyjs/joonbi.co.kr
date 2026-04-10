'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ConsultationForm } from '@/components/consultation/consultation-form';

export default function ConsultationPage() {
  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-white">
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="heading-lg mb-4">상담 신청</h1>
              <p className="text-gray-500">
                프로젝트에 대해 간단히 알려주세요.
                <br />
                AI가 요구사항을 분석하고 견적을 제공합니다.
              </p>
            </div>

            <ConsultationForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
