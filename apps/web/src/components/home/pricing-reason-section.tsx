import { Users, Sparkles, Zap } from 'lucide-react';

export function PricingReasonSection() {
  return (
    <section className="py-32 bg-white paper-texture relative">
      <div className="display-number absolute right-8 bottom-16 pointer-events-none select-none">
        -60%
      </div>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* 제목 */}
          <div className="text-center mb-20">
            <h2 className="text-display text-4xl md:text-6xl font-bold mb-8">
              에이전시 대비 <span className="text-accent-red">40~60%</span> 저렴한 이유
            </h2>
            <div className="dotted-divider max-w-md mx-auto"></div>
          </div>

          {/* 비교 차트 */}
          <div className="grid md:grid-cols-2 gap-16 mb-20 items-end">
            {/* 일반 에이전시 */}
            <div className="scroll-reveal">
              <h3 className="text-display text-2xl font-bold text-center mb-10 text-charcoal">일반 에이전시</h3>
              <div className="relative h-96 bg-light-tan border-2 border-light-tan p-6 flex flex-col justify-end">
                <div className="space-y-3">
                  <div className="bg-white border border-warm-gray p-4 text-center font-semibold text-korean text-charcoal">
                    영업 수수료
                  </div>
                  <div className="bg-white border border-warm-gray p-4 text-center font-semibold text-korean text-charcoal">
                    PM 인건비
                  </div>
                  <div className="bg-white border border-warm-gray p-4 text-center font-semibold text-korean text-charcoal">
                    사무실 임대료
                  </div>
                  <div className="bg-accent-red text-cream border-2 border-accent-red p-6 text-center font-bold text-lg text-korean">
                    개발비
                  </div>
                </div>
              </div>
            </div>

            {/* 준비스튜디오 */}
            <div className="scroll-reveal">
              <h3 className="text-display text-2xl font-bold text-center mb-10 text-charcoal">Joonbi Studio</h3>
              <div className="relative h-96 bg-light-tan border-2 border-light-tan p-6 flex flex-col justify-end">
                {/* -60% 표시 */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-burnt-orange text-cream text-4xl font-bold px-10 py-5 text-display border-2 border-burnt-orange">
                  -60%
                </div>

                <div className="space-y-3 mt-auto">
                  <div className="bg-charcoal text-cream border-2 border-charcoal p-12 text-center font-bold text-2xl text-display">
                    개발비
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3가지 이유 */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="atelier-card border-2 border-deep-teal scroll-reveal corner-bracket">
              <div className="w-16 h-16 border-2 border-deep-teal flex items-center justify-center mb-6 mx-auto">
                <Users className="w-8 h-8 text-deep-teal" />
              </div>
              <h3 className="font-bold text-xl text-center mb-4 text-display text-charcoal">1인 운영</h3>
              <p className="text-warm-gray text-center text-korean">
                영업사원, PM, 사무실 임대료 거품 제거.
              </p>
            </div>

            <div className="atelier-card border-2 border-burnt-orange scroll-reveal corner-bracket">
              <div className="w-16 h-16 border-2 border-burnt-orange flex items-center justify-center mb-6 mx-auto">
                <Sparkles className="w-8 h-8 text-burnt-orange" />
              </div>
              <h3 className="font-bold text-xl text-center mb-4 text-display text-charcoal">AI 활용</h3>
              <p className="text-warm-gray text-center text-korean">
                코딩과 문서 작성 시간을 획기적으로 단축.
              </p>
            </div>

            <div className="atelier-card border-2 border-charcoal scroll-reveal corner-bracket">
              <div className="w-16 h-16 border-2 border-charcoal flex items-center justify-center mb-6 mx-auto">
                <Zap className="w-8 h-8 text-charcoal" />
              </div>
              <h3 className="font-bold text-xl text-center mb-4 text-display text-charcoal">소통 비용 제로</h3>
              <p className="text-warm-gray text-center text-korean">
                불필요한 미팅과 이동 시간을 없애 개발에만 집중.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
