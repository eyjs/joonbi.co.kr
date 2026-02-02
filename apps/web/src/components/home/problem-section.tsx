import { MessageSquareX, FileX, Code, HelpCircle, XCircle, Heart } from 'lucide-react';

export function ProblemSection() {
  return (
    <section className="py-32 bg-white paper-texture relative">
      <div className="display-number absolute right-8 top-16 pointer-events-none select-none">
        ?
      </div>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* 메인 헤드라인 */}
          <div className="text-center mb-20">
            <h2 className="text-display text-4xl md:text-6xl font-bold mb-8">
              개발은 모르는데...
              <br />
              <span className="text-warm-gray">그냥 '이런 느낌'으로 만들고 싶어요.</span>
            </h2>
            <div className="dotted-divider max-w-md mx-auto"></div>
          </div>

          {/* 일러스트 영역 */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            {/* 왼쪽: 고민하는 사업자 */}
            <div className="relative scroll-reveal">
              <div className="bg-light-tan border-2 border-light-tan p-12 text-center corner-bracket">
                <div className="w-32 h-32 mb-8 mx-auto border-2 border-warm-gray flex items-center justify-center">
                  <HelpCircle className="w-20 h-20 text-warm-gray" aria-hidden="true" />
                </div>
                <div className="space-y-4">
                  <div className="bg-white border border-light-tan p-5 flex items-start gap-4">
                    <Code className="w-6 h-6 text-warm-gray flex-shrink-0 mt-1" />
                    <div className="text-left">
                      <div className="font-semibold text-charcoal text-korean mb-1">Code</div>
                      <div className="text-sm text-warm-gray text-korean">복잡한 개발 용어</div>
                    </div>
                  </div>
                  <div className="bg-white border border-light-tan p-5 flex items-start gap-4">
                    <FileX className="w-6 h-6 text-warm-gray flex-shrink-0 mt-1" />
                    <div className="text-left">
                      <div className="font-semibold text-charcoal text-korean mb-1">Wireframes</div>
                      <div className="text-sm text-warm-gray text-korean">화면 설계서</div>
                    </div>
                  </div>
                  <div className="bg-white border border-light-tan p-5 flex items-start gap-4">
                    <MessageSquareX className="w-6 h-6 text-warm-gray flex-shrink-0 mt-1" />
                    <div className="text-left">
                      <div className="font-semibold text-charcoal text-korean mb-1">Servers</div>
                      <div className="text-sm text-warm-gray text-korean">서버 인프라</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽: 문제점 나열 */}
            <div className="space-y-6 scroll-reveal">
              <h3 className="text-display text-2xl md:text-3xl font-bold mb-10 text-korean">
                웹사이트나 앱이 필요할 때마다 드는 말들:
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-5 bg-white border-2 border-accent-red p-6">
                  <XCircle className="w-6 h-6 text-accent-red flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <div className="font-semibold text-charcoal text-korean mb-2">
                      "기획서는 준비되셨나요?"
                    </div>
                    <div className="text-sm text-warm-gray text-korean">
                      상세 기능 명세서 주세요.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-5 bg-white border-2 border-accent-red p-6">
                  <XCircle className="w-6 h-6 text-accent-red flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <div className="font-semibold text-charcoal text-korean mb-2">
                      "개발 용어는 아시죠?"
                    </div>
                    <div className="text-sm text-warm-gray text-korean">
                      API, 데이터베이스, 서버...
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-5 bg-white border-2 border-accent-red p-6">
                  <XCircle className="w-6 h-6 text-accent-red flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <div className="font-semibold text-charcoal text-korean mb-2">
                      "디자인 시안을 먼저 보내주세요."
                    </div>
                    <div className="text-sm text-warm-gray text-korean">
                      와이어프레임, 스타일가이드...
                    </div>
                  </div>
                </div>
              </div>

              {/* 하이라이트 메시지 */}
              <div className="bg-white border-2 border-deep-teal p-8 mt-10">
                <div className="flex items-start gap-4">
                  <Heart className="w-6 h-6 text-deep-teal flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <p className="text-charcoal leading-relaxed text-korean">
                      <strong className="text-display">머릿속엔 아이디어가 있지만,</strong>
                      <br />
                      개발자와 소통하는 문턱은 너무 높습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
