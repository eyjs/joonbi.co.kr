import { Link as LinkIcon, FileText, Lightbulb } from 'lucide-react';

export function RequirementsSection() {
  return (
    <section className="py-32 bg-cream paper-texture relative">
      <div className="display-number absolute right-8 top-16 pointer-events-none select-none">
        02
      </div>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* 제목 */}
          <div className="text-center mb-20">
            <h2 className="text-display text-4xl md:text-6xl font-bold mb-8">
              고객님이 준비할 것은 <span className="text-burnt-orange">딱 2가지</span>만 있으면 됩니다.
            </h2>
            <div className="dotted-divider max-w-md mx-auto"></div>
          </div>

          {/* 2가지 카드 */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* 1. 참고사이트 링크 */}
            <div className="scroll-reveal">
              <div className="atelier-card border-2 border-burnt-orange corner-bracket">
                <div className="w-20 h-20 border-2 border-burnt-orange flex items-center justify-center mb-8 mx-auto">
                  <LinkIcon className="w-10 h-10 text-burnt-orange" />
                </div>
                <div className="bg-burnt-orange text-cream text-center py-2 px-4 text-sm font-bold mb-6 inline-block text-korean">
                  1. 참고사이트 링크 (필수)
                </div>
                <div className="bg-light-tan p-8 border border-light-tan">
                  <p className="text-charcoal text-lg font-medium text-center mb-6 text-korean">
                    "이 사이트처럼 만들어주세요."
                  </p>
                  <div className="flex items-center gap-3 justify-center">
                    <Lightbulb className="w-4 h-4 text-burnt-orange flex-shrink-0" aria-hidden="true" />
                    <p className="text-sm text-warm-gray text-korean">
                      예시: https://example.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. 대략적인 설명 */}
            <div className="scroll-reveal">
              <div className="atelier-card border-2 border-deep-teal corner-bracket">
                <div className="w-20 h-20 border-2 border-deep-teal flex items-center justify-center mb-8 mx-auto">
                  <FileText className="w-10 h-10 text-deep-teal" />
                </div>
                <div className="bg-deep-teal text-cream text-center py-2 px-4 text-sm font-bold mb-6 inline-block text-korean">
                  2. 대략적인 설명
                </div>
                <div className="bg-light-tan p-8 border border-light-tan">
                  <p className="text-charcoal text-lg font-medium text-center mb-6 text-korean">
                    "우리 회사 로고와 색상은 이걸로 하고, 메뉴는 이렇게 구성하고 싶어요."
                  </p>
                  <div className="flex items-center gap-3 justify-center">
                    <Lightbulb className="w-4 h-4 text-deep-teal flex-shrink-0" aria-hidden="true" />
                    <p className="text-sm text-warm-gray text-korean">
                      간단한 설명만으로 OK!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 강조 메시지 */}
          <div className="text-center">
            <div className="inline-block bg-charcoal border-2 border-charcoal px-12 py-8">
              <p className="text-2xl md:text-3xl font-bold text-cream text-display">
                → 나머지 복잡한 과정은 저희가 알아서 합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
