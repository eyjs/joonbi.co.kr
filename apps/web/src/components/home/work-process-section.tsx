const steps = [
  {
    number: '01',
    title: '상담',
    description: '프로젝트 요구사항을 간단히 작성하면, AI가 자동으로 분석하여 명세서를 정리합니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: '분석',
    description: '요구사항을 기반으로 기술 스택, 일정, 비용을 분석하고 상세 견적을 제공합니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: '개발',
    description: '체계적인 프로세스로 개발을 진행하며, 대시보드에서 진행 상황을 실시간 확인합니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    number: '04',
    title: '납품',
    description: '산출물 검수 후 최종 납품합니다. 모든 문서와 소스코드를 인계합니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export function WorkProcessSection(): JSX.Element {
  return (
    <section id="process" className="section px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">작업 프로세스</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            상담부터 납품까지 체계적인 4단계 프로세스로 진행합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="relative text-center">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-[2px] bg-gray-200" />
              )}

              <div className="relative z-10 p-4">
                <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4 text-blue-600">
                  {step.icon}
                </div>
                <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                  Step {step.number}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
