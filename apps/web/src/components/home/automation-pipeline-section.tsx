export function AutomationPipelineSection(): JSX.Element {
  const steps = [
    {
      time: '0분',
      icon: '🔗',
      title: '참고사이트 제출',
      description: 'URL과 간단한 설명만 입력',
    },
    {
      time: '5분',
      icon: '🤖',
      title: 'AI 자동 분석',
      description: '사이트 구조, 기능 파악',
    },
    {
      time: '10분',
      icon: '📄',
      title: '문서 자동 생성',
      description: '업무분석서, 요구사항명세서, 견적서, 샘플기획서',
    },
    {
      time: '15분',
      icon: '🎨',
      title: '화면설계 생성',
      description: 'Stitch AI로 Figma 화면 자동 디자인',
    },
    {
      time: '30분',
      icon: '✅',
      title: '결과 전달',
      description: '이메일 + 푸시 알림',
    },
  ];

  return (
    <section className="tech-section" id="process">
      <div className="tech-container">
        <div className="text-center mb-16">
          <h2 className="tech-heading-lg mb-4">30분 자동화 프로세스</h2>
          <p className="tech-text">
            참고사이트 제출부터 화면설계까지, 모든 과정이 자동으로 진행됩니다
          </p>
        </div>

        <div className="mb-8">
          <div className="w-full bg-gray-700 rounded-full h-3 relative overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full transition-all duration-1000"
              style={{ width: '100%' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-gray-400 text-sm">
            <span>0분</span>
            <span className="tech-glow-text font-bold">30분 완료</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="tech-card h-full flex flex-col items-center text-center p-6 hover:scale-105 transition-transform">
                <div className="text-cyan-400 text-xs font-bold mb-2 uppercase tracking-wider">
                  {step.time}
                </div>
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="text-white font-bold text-lg mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <div className="text-cyan-400 text-2xl">→</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block tech-card px-8 py-4">
            <p className="text-white text-lg">
              <span className="tech-glow-text font-bold">⏱️ 총 소요시간: 약 30분</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
