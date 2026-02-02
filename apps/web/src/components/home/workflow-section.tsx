import { FileText, Palette, Code2, Rocket } from 'lucide-react';

export function WorkflowSection() {
  const steps = [
    {
      icon: FileText,
      number: '01',
      title: '상담 신청',
      description: '참고 사이트 링크와 설명을 제출하면, AI가 자동으로 요구사항을 분석합니다.',
      color: 'text-deep-teal',
      borderColor: 'border-deep-teal',
    },
    {
      icon: Palette,
      number: '02',
      title: 'AI 화면설계',
      description: '30분 내로 화면설계서(4종)가 생성됩니다. 수정 요청은 댓글로 남기세요.',
      color: 'text-burnt-orange',
      borderColor: 'border-burnt-orange',
    },
    {
      icon: Code2,
      number: '03',
      title: '개발 진행',
      description: '실시간 대시보드에서 진행률을 확인하고, 산출물에 피드백을 남길 수 있습니다.',
      color: 'text-charcoal',
      borderColor: 'border-charcoal',
    },
    {
      icon: Rocket,
      number: '04',
      title: '배포 & 인수',
      description: '최종 검수 후 배포하고, 소스코드와 사용 매뉴얼을 전달받습니다.',
      color: 'text-accent-red',
      borderColor: 'border-accent-red',
    },
  ];

  return (
    <section className="py-32 bg-white paper-texture relative">
      <div className="display-number absolute left-8 top-16 pointer-events-none select-none">
        04
      </div>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* 제목 */}
          <div className="text-center mb-20">
            <h2 className="text-display text-4xl md:text-6xl font-bold mb-8">
              간단한 4단계로 완성됩니다
            </h2>
            <div className="dotted-divider max-w-md mx-auto mb-6"></div>
            <p className="text-xl text-warm-gray text-korean">
              복잡한 절차 없이, 명확한 프로세스로 진행됩니다
            </p>
          </div>

          {/* 워크플로우 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative scroll-reveal">
                  <div className={`atelier-card border-2 ${step.borderColor} h-full`}>
                    {/* 번호 */}
                    <div className={`text-7xl font-bold text-display ${step.color} mb-6 opacity-20`}>
                      {step.number}
                    </div>

                    {/* 아이콘 */}
                    <div className={`w-16 h-16 border-2 ${step.borderColor} flex items-center justify-center mb-4`}>
                      <Icon className={`w-8 h-8 ${step.color}`} />
                    </div>

                    {/* 내용 */}
                    <h3 className="font-bold text-xl mb-3 text-display text-charcoal">{step.title}</h3>
                    <p className="text-sm text-warm-gray leading-relaxed text-korean">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 추가 안내 */}
          <div className="text-center">
            <div className="inline-block atelier-card border-2 border-charcoal">
              <p className="text-lg font-semibold text-charcoal text-korean">
                전화나 미팅 없이, 채팅과 대시보드만으로 프로젝트가 완성됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
