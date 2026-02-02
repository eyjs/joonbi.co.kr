import { Search, Brain, Code2, Rocket, Zap } from 'lucide-react';

export function ProcessSection() {
  const steps = [
    {
      icon: Search,
      title: '1. 업무 분석',
      description: '의뢰하신 링크의 구조와 기능을 전문가가 분석.',
      color: 'text-deep-teal',
      borderColor: 'border-deep-teal',
    },
    {
      icon: Brain,
      title: '2. 자동 기획',
      description: 'AI를 활용해 기획서, 화면 설계서 자동 생성.',
      color: 'text-burnt-orange',
      borderColor: 'border-burnt-orange',
    },
    {
      icon: Code2,
      title: '3. 개발 & 테스트',
      description: '최신 AI 코딩 도구로 고속 개발 및 오류 점검.',
      color: 'text-charcoal',
      borderColor: 'border-charcoal',
    },
    {
      icon: Rocket,
      title: '4. 배포 & 매뉴얼',
      description: '사이트 오픈 및 영상 매뉴얼 제공.',
      color: 'text-accent-red',
      borderColor: 'border-accent-red',
    },
  ];

  return (
    <section className="py-32 bg-white paper-texture relative">
      <div className="display-number absolute left-1/2 top-16 -translate-x-1/2 pointer-events-none select-none">
        04
      </div>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* 제목 */}
          <div className="text-center mb-20">
            <h2 className="text-display text-4xl md:text-6xl font-bold mb-8">
              링크만 주시면,<br />나머지는 전문가가 AI와 함께 완성합니다.
            </h2>
            <div className="dotted-divider max-w-md mx-auto"></div>
          </div>

          {/* 프로세스 스텝 */}
          <div className="grid md:grid-cols-4 gap-8 relative mb-16">
            {/* 연결선 */}
            <div className="hidden md:block absolute top-24 left-0 right-0">
              <div className="dotted-divider"></div>
            </div>

            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative scroll-reveal">
                  <div className={`atelier-card border-2 ${step.borderColor} h-full`}>
                    {/* 아이콘 */}
                    <div className={`w-20 h-20 mx-auto mb-6 border-2 ${step.borderColor} flex items-center justify-center relative z-10 bg-white`}>
                      <Icon className={`w-10 h-10 ${step.color}`} />
                    </div>

                    {/* 제목 */}
                    <h3 className="text-display text-xl font-bold text-center mb-4 text-charcoal">
                      {step.title}
                    </h3>

                    {/* 설명 */}
                    <p className="text-warm-gray text-center text-sm leading-relaxed text-korean">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 하단 메시지 */}
          <div className="text-center">
            <div className="inline-block atelier-card border-2 border-charcoal">
              <p className="text-lg text-charcoal flex items-center gap-3 justify-center text-korean">
                <Zap className="w-5 h-5 text-burnt-orange" aria-hidden="true" />
                <strong>평균 개발 기간:</strong> 2~4주 (복잡도에 따라 상이)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
