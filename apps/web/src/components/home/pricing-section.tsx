import { FileText, Monitor, Settings, Star } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function PricingSection() {
  return (
    <section id="pricing" className="py-32 bg-cream paper-texture">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* 제목 */}
          <div className="text-center mb-20">
            <div className="display-number absolute left-1/2 -translate-x-1/2 -mt-16 pointer-events-none select-none">
              ₩
            </div>
            <h2 className="text-display text-5xl md:text-7xl font-bold mb-6 relative">
              투명한 가격 정책
            </h2>
            <div className="dotted-divider max-w-xs mx-auto mb-6"></div>
            <p className="text-xl text-warm-gray text-korean">
              명확한 가격, 숨겨진 비용 없음
            </p>
          </div>

          {/* 가격 카드 */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* 랜딩페이지 */}
            <div className="atelier-card scroll-reveal">
              <div className="w-16 h-16 border-2 border-charcoal flex items-center justify-center mb-6 mx-auto">
                <FileText className="w-8 h-8 text-charcoal" />
              </div>
              <h3 className="text-display text-2xl font-bold text-center mb-2">랜딩페이지</h3>
              <div className="text-center mb-8">
                <div className="text-display text-5xl font-bold text-charcoal mb-2">3만원</div>
                <div className="text-sm text-warm-gray text-korean">1장 당</div>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-burnt-orange mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-charcoal text-korean">반응형 디자인</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-burnt-orange mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-charcoal text-korean">SEO 최적화</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-burnt-orange mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-charcoal text-korean">빠른 로딩 속도</span>
                </li>
              </ul>
              <Link href="/consultation" className="block">
                <button className="btn-secondary w-full">
                  상담 신청
                </button>
              </Link>
            </div>

            {/* 홈페이지 - 인기 */}
            <div className="relative scroll-reveal md:-mt-8">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-burnt-orange text-cream px-6 py-2 text-sm font-bold flex items-center gap-2 text-korean z-10">
                <Star className="w-4 h-4" />
                인기
              </div>
              <div className="atelier-card bg-charcoal border-2 border-charcoal">
                <div className="w-16 h-16 border-2 border-cream flex items-center justify-center mb-6 mx-auto">
                  <Monitor className="w-8 h-8 text-cream" />
                </div>
                <h3 className="text-display text-2xl font-bold text-center mb-2 text-cream">홈페이지</h3>
                <div className="text-center mb-8">
                  <div className="text-display text-5xl font-bold text-cream mb-2">50~100만원</div>
                  <div className="text-sm text-warm-gray text-korean">5~10페이지 기준</div>
                </div>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-burnt-orange mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-cream text-korean">랜딩페이지 모든 기능</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-burnt-orange mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-cream text-korean">다중 페이지 구성</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-burnt-orange mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-cream text-korean">문의 폼 연동</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-burnt-orange mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-cream text-korean">AI 화면설계 포함</span>
                  </li>
                </ul>
                <Link href="/consultation" className="block">
                  <button className="btn-primary w-full">
                    지금 시작하기
                  </button>
                </Link>
              </div>
            </div>

            {/* 관리자 시스템 */}
            <div className="atelier-card scroll-reveal">
              <div className="w-16 h-16 border-2 border-charcoal flex items-center justify-center mb-6 mx-auto">
                <Settings className="w-8 h-8 text-charcoal" />
              </div>
              <h3 className="text-display text-2xl font-bold text-center mb-2">관리자 시스템</h3>
              <div className="text-center mb-8">
                <div className="text-display text-5xl font-bold text-charcoal mb-2">300만원~</div>
                <div className="text-sm text-warm-gray text-korean">복잡도에 따라</div>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-burnt-orange mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-charcoal text-korean">회원 관리</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-burnt-orange mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-charcoal text-korean">데이터베이스 설계</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-burnt-orange mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-charcoal text-korean">API 개발</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-burnt-orange mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-charcoal text-korean">관리자 대시보드</span>
                </li>
              </ul>
              <Link href="/consultation" className="block">
                <button className="btn-secondary w-full">
                  상담 신청
                </button>
              </Link>
            </div>
          </div>

          {/* 결제 안내 */}
          <div className="text-center">
            <div className="inline-block atelier-card border-2 border-charcoal">
              <p className="text-lg font-semibold text-charcoal text-korean mb-2">
                계약금 30% + 잔금 70% (안전한 분할 결제)
              </p>
              <div className="dotted-divider my-4"></div>
              <p className="text-sm text-warm-gray text-korean">
                *가격은 예시이며 복잡도에 따라 달라질 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
