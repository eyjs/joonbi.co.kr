import { FileText, Monitor, Settings, Star } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* 제목 */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              투명한 가격 정책
            </h2>
            <p className="text-xl text-gray-600">
              명확한 가격, 숨겨진 비용 없음
            </p>
          </div>

          {/* 가격 카드 */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* 랜딩페이지 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <FileText className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-2">랜딩페이지</h3>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">3만원</div>
                <div className="text-sm text-gray-500">1장 당</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600">반응형 디자인</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600">SEO 최적화</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600">빠른 로딩 속도</span>
                </li>
              </ul>
              <Link href="/consultation" className="block">
                <Button variant="outline" className="w-full">
                  상담 신청
                </Button>
              </Link>
            </div>

            {/* 홈페이지 - 인기 */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 shadow-2xl relative scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                <Star className="w-4 h-4" />
                인기
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Monitor className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-2 text-white">홈페이지</h3>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-white mb-2">50~100만원</div>
                <div className="text-sm text-white/80">5~10페이지 기준</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-white">랜딩페이지 모든 기능</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-white">다중 페이지 구성</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-white">문의 폼 연동</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-white">AI 화면설계 포함</span>
                </li>
              </ul>
              <Link href="/consultation" className="block">
                <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
                  지금 시작하기
                </Button>
              </Link>
            </div>

            {/* 관리자 시스템 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Settings className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-2">관리자 시스템</h3>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">300만원~</div>
                <div className="text-sm text-gray-500">복잡도에 따라</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600">회원 관리</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600">데이터베이스 설계</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600">API 개발</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600">관리자 대시보드</span>
                </li>
              </ul>
              <Link href="/consultation" className="block">
                <Button variant="outline" className="w-full">
                  상담 신청
                </Button>
              </Link>
            </div>
          </div>

          {/* 결제 안내 */}
          <div className="text-center">
            <div className="inline-block bg-white rounded-2xl px-8 py-6 shadow-lg">
              <p className="text-lg font-semibold text-gray-800 mb-2">
                계약금 30% + 잔금 70% (안전한 분할 결제)
              </p>
              <p className="text-sm text-gray-500">
                *가격은 예시이며 복잡도에 따라 달라질 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
