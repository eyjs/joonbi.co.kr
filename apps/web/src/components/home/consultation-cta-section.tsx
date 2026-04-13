import Link from 'next/link';

export function ConsultationCtaSection(): JSX.Element {
  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          프로젝트를 시작할 준비가 되셨나요?
        </h2>
        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
          간단한 프로젝트 설명만 남겨주세요.
          AI가 요구사항을 분석하고 견적까지 자동으로 제공합니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/consultation"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-blue-600 rounded-lg font-semibold text-base hover:bg-blue-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600"
          >
            무료 상담 시작하기
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-transparent text-white border border-white/40 rounded-lg font-semibold text-base hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600"
          >
            포트폴리오 먼저 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
