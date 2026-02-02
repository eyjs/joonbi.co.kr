import { Shield, BookOpen, FileCode } from 'lucide-react';

export function GuaranteeSection() {
  const guarantees = [
    {
      icon: Shield,
      title: '3개월 무상 A/S',
      description: '배포 후 3개월간 버그 수정과 기술 지원을 무료로 제공합니다.',
      color: 'text-deep-teal',
      borderColor: 'border-deep-teal',
    },
    {
      icon: BookOpen,
      title: '사용 매뉴얼 제공',
      description: '관리자와 사용자를 위한 상세한 사용 매뉴얼을 함께 드립니다.',
      color: 'text-burnt-orange',
      borderColor: 'border-burnt-orange',
    },
    {
      icon: FileCode,
      title: '소스코드 전달',
      description: '프로젝트 완료 후 모든 소스코드를 고객에게 이전해 드립니다.',
      color: 'text-charcoal',
      borderColor: 'border-charcoal',
    },
  ];

  return (
    <section className="py-32 bg-light-tan paper-texture">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* 제목 */}
          <div className="text-center mb-20">
            <h2 className="text-display text-4xl md:text-6xl font-bold mb-8">
              완성 후에도 안심하세요
            </h2>
            <div className="dotted-divider max-w-md mx-auto mb-6"></div>
            <p className="text-xl text-warm-gray text-korean">
              3가지 보장으로 끝까지 책임집니다
            </p>
          </div>

          {/* 보장 항목 */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {guarantees.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="scroll-reveal">
                  <div className={`atelier-card border-2 ${item.borderColor} h-full corner-bracket`}>
                    <div className={`w-20 h-20 border-2 ${item.borderColor} flex items-center justify-center mb-6 mx-auto`}>
                      <Icon className={`w-10 h-10 ${item.color}`} />
                    </div>
                    <h3 className="font-bold text-2xl text-center mb-4 text-display text-charcoal">
                      {item.title}
                    </h3>
                    <p className="text-warm-gray text-center leading-relaxed text-korean">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 추가 설명 */}
          <div className="text-center">
            <div className="inline-block atelier-card border-2 border-charcoal">
              <p className="text-lg text-charcoal mb-3 text-korean">
                <strong className="text-burnt-orange text-display">납품이 끝이 아닙니다.</strong>
              </p>
              <div className="dotted-divider my-4"></div>
              <p className="text-warm-gray text-korean">
                배포 후에도 안정적으로 운영할 수 있도록 지원합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
