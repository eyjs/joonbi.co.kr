import { DollarSign, Clock, BookOpen, CheckCircle2 } from 'lucide-react';

export function ComparisonSection() {
  return (
    <section className="py-32 bg-light-tan paper-texture relative">
      <div className="display-number absolute left-8 bottom-16 pointer-events-none select-none">
        VS
      </div>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* 제목 */}
          <div className="text-center mb-20">
            <h2 className="text-display text-4xl md:text-6xl font-bold mb-8">
              기존 에이전시의 3가지 장벽
            </h2>
            <div className="dotted-divider max-w-md mx-auto"></div>
          </div>

          {/* 3가지 장벽 */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            <div className="atelier-card scroll-reveal">
              <div className="w-16 h-16 border-2 border-accent-red flex items-center justify-center mb-6 mx-auto">
                <DollarSign className="w-8 h-8 text-accent-red" />
              </div>
              <h3 className="text-display text-xl font-bold text-center mb-4">비용 부담</h3>
              <p className="text-warm-gray text-center leading-relaxed text-korean">
                단순 홈페이지도 수백만 원부터 시작하는 불투명한 견적.
              </p>
            </div>

            <div className="atelier-card scroll-reveal">
              <div className="w-16 h-16 border-2 border-burnt-orange flex items-center justify-center mb-6 mx-auto">
                <Clock className="w-8 h-8 text-burnt-orange" />
              </div>
              <h3 className="text-display text-xl font-bold text-center mb-4">시간 낭비</h3>
              <p className="text-warm-gray text-center leading-relaxed text-korean">
                기획 미팅, 디자인 컨펌, 끊없는 전화 통화.
              </p>
            </div>

            <div className="atelier-card scroll-reveal">
              <div className="w-16 h-16 border-2 border-deep-teal flex items-center justify-center mb-6 mx-auto">
                <BookOpen className="w-8 h-8 text-deep-teal" />
              </div>
              <h3 className="text-display text-xl font-bold text-center mb-4">전문 지식 요구</h3>
              <p className="text-warm-gray text-center leading-relaxed text-korean">
                의뢰인에게 개발 지식과 완벽한 문서를 요구함.
              </p>
            </div>
          </div>

          {/* 구분선 */}
          <div className="relative my-20">
            <div className="dotted-divider"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-light-tan px-8 py-3 text-3xl font-bold text-charcoal text-display border-2 border-charcoal">
                VS
              </span>
            </div>
          </div>

          {/* 준비스튜디오 차별점 */}
          <div className="text-center mb-16">
            <h2 className="text-display text-4xl md:text-6xl font-bold mb-8">
              준비스튜디오는 <span className="text-burnt-orange">'준비'</span>를 요구하지 않습니다.
            </h2>
            <div className="dotted-divider max-w-md mx-auto"></div>
          </div>

          {/* 3가지 NO */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white border-2 border-deep-teal p-10 scroll-reveal corner-bracket">
              <div className="flex items-center justify-center gap-3 mb-6">
                <CheckCircle2 className="w-10 h-10 text-deep-teal" />
                <h3 className="text-display text-2xl font-bold text-charcoal">NO 개발 지식</h3>
              </div>
              <p className="text-charcoal text-center font-medium text-korean">
                비개발자도 OK.
              </p>
            </div>

            <div className="bg-white border-2 border-deep-teal p-10 scroll-reveal corner-bracket">
              <div className="flex items-center justify-center gap-3 mb-6">
                <CheckCircle2 className="w-10 h-10 text-deep-teal" />
                <h3 className="text-display text-2xl font-bold text-charcoal">NO 기획서</h3>
              </div>
              <p className="text-charcoal text-center font-medium text-korean">
                참고 링크만 있으면 OK.
              </p>
            </div>

            <div className="bg-white border-2 border-deep-teal p-10 scroll-reveal corner-bracket">
              <div className="flex items-center justify-center gap-3 mb-6">
                <CheckCircle2 className="w-10 h-10 text-deep-teal" />
                <h3 className="text-display text-2xl font-bold text-charcoal">NO 전화</h3>
              </div>
              <p className="text-charcoal text-center font-medium text-korean">
                실시간 대시보드로 확인.
              </p>
            </div>
          </div>

          {/* 하단 메시지 */}
          <div className="text-center">
            <div className="inline-block atelier-card border-2 border-charcoal">
              <p className="text-xl font-semibold text-charcoal text-korean">
                소규모 사업자와 스타트업을 위한 가장 쉬운 개발 파트너.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
