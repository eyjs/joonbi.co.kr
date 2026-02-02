import { BarChart3, Cloud, PhoneOff } from 'lucide-react';

export function DashboardSection() {
  return (
    <section className="py-32 bg-light-tan paper-texture">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* 왼쪽: 설명 */}
            <div className="scroll-reveal">
              <h2 className="text-display text-4xl md:text-6xl font-bold mb-12">
                진행상황,<br />묻지 않아도 보입니다.
              </h2>

              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 border-2 border-deep-teal flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-deep-teal" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-korean text-charcoal">실시간 대시보드 제공</h3>
                    <p className="text-warm-gray text-korean">
                      현재 진행률(%)이 직관적으로 표시됩니다.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 border-2 border-burnt-orange flex items-center justify-center flex-shrink-0">
                    <Cloud className="w-6 h-6 text-burnt-orange" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-korean text-charcoal">투명한 작업 공유</h3>
                    <p className="text-warm-gray text-korean">
                      산출물이 업로드되면 즉시 확인하고 피드백을 남길 수 있습니다.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 border-2 border-charcoal flex items-center justify-center flex-shrink-0">
                    <PhoneOff className="w-6 h-6 text-charcoal" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-korean text-charcoal">기다림 없는 소통</h3>
                    <p className="text-warm-gray text-korean">
                      '어디까지 됐나요?'라고 전화할 필요가 없습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽: 대시보드 목업 */}
            <div className="relative scroll-reveal">
              <div className="bg-charcoal border-2 border-charcoal p-1">
                <div className="bg-cream p-8">
                  {/* 헤더 */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-charcoal flex items-center justify-center">
                      <span className="text-cream font-bold text-display">P</span>
                    </div>
                    <div>
                      <div className="font-bold text-korean text-charcoal">Project Dashboard</div>
                      <div className="text-sm text-warm-gray text-korean">실시간 진행 현황</div>
                    </div>
                  </div>

                  {/* 진행률 */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-lg text-korean text-charcoal">현재 진행률</span>
                      <span className="text-2xl font-bold text-burnt-orange text-display">75%</span>
                    </div>
                    <div className="h-4 bg-light-tan overflow-hidden">
                      <div className="h-full bg-burnt-orange" style={{ width: '75%' }}></div>
                    </div>
                  </div>

                  {/* 타임라인 */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 bg-white border border-light-tan p-3">
                      <div className="w-6 h-6 bg-deep-teal flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-korean text-charcoal">기획 완료</div>
                        <div className="text-xs text-warm-gray text-korean">08/15</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white border border-light-tan p-3">
                      <div className="w-6 h-6 bg-deep-teal flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-korean text-charcoal">디자인 완료</div>
                        <div className="text-xs text-warm-gray text-korean">08/20</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white border-2 border-burnt-orange p-3">
                      <div className="w-6 h-6 bg-burnt-orange flex items-center justify-center flex-shrink-0 animate-pulse">
                        <div className="w-2 h-2 bg-white"></div>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-charcoal text-korean">개발 진행중</div>
                        <div className="text-xs text-burnt-orange text-korean">진행 중...</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-light-tan border border-light-tan p-3 opacity-50">
                      <div className="w-6 h-6 bg-warm-gray flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-warm-gray text-korean">최종 검수</div>
                        <div className="text-xs text-warm-gray text-korean">예정</div>
                      </div>
                    </div>
                  </div>

                  {/* 최근 업데이트 */}
                  <div className="mt-6 bg-light-tan border border-light-tan p-4">
                    <div className="text-sm font-semibold mb-2 text-korean text-charcoal">Recent Updates</div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 border border-charcoal flex items-center justify-center">
                        <svg className="w-5 h-5 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-korean text-charcoal">산출물 v1.2.pdf</div>
                        <div className="text-xs text-warm-gray text-korean">업로드 완료 - 5분 전</div>
                      </div>
                    </div>
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
