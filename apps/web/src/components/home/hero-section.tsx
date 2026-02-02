import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowDown, Link as LinkIcon } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-20">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* 메인 헤드라인 */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              참고사이트 링크
            </span>
            <br />
            하나면 충분합니다.
          </h1>

          {/* 서브 헤드라인 */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            복잡한 기획서 없이, IT 전문가와 AI가 만드는 당신의 웹사이트
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/consultation" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all"
              >
                무료 상담 신청하기
              </Button>
            </Link>
            <Link href="#pricing" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-lg px-8 py-6 border-2 hover:bg-gray-50"
              >
                가격 확인하기
              </Button>
            </Link>
          </div>

          {/* 비주얼 요소 */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              {/* 브라우저 주소창 모형 */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
                  <LinkIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">https://www.example.com</span>
                </div>
              </div>

              {/* 화살표 */}
              <div className="flex justify-center my-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg">
                  AI 자동 분석 + 개발
                </div>
              </div>

              {/* 결과 미리보기 */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-1">30분</div>
                    <div className="text-sm text-gray-600">분석 완료</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600 mb-1">4종</div>
                    <div className="text-sm text-gray-600">문서 자동생성</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-1">40%</div>
                    <div className="text-sm text-gray-600">비용 절감</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600 mb-1">0회</div>
                    <div className="text-sm text-gray-600">불필요한 미팅</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 스크롤 유도 */}
          <div className="mt-16 animate-bounce">
            <ArrowDown className="w-8 h-8 mx-auto text-gray-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
