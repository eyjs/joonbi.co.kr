import Link from 'next/link';

export function HeroSection(): JSX.Element {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="heading-xl mb-6">
              기획부터 납품까지,
              <br />
              외주 개발의 새로운 기준
            </h1>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed max-w-lg">
              프로젝트 진행 상황을 실시간으로 확인하고,
              체계적인 프로세스로 원하는 결과를 만들어냅니다.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/portfolio" className="btn-primary">
                포트폴리오 보기
              </Link>
              <Link href="/consultation" className="btn-secondary">
                상담 시작하기
              </Link>
            </div>

            <div className="flex gap-8 mt-12">
              <div>
                <div className="text-2xl font-bold text-gray-900">5년+</div>
                <div className="text-sm text-gray-500">개발 경력</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">실시간</div>
                <div className="text-sm text-gray-500">진행 현황 공유</div>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative">
              {/* Dashboard mockup visual */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                    <span className="text-sm font-medium text-gray-700">프로젝트 진행률</span>
                    <span className="text-sm font-bold text-blue-600">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-white rounded-lg border border-gray-100">
                      <div className="text-xs text-gray-500 mb-1">산출물</div>
                      <div className="text-sm font-semibold text-gray-900">12건 완료</div>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-gray-100">
                      <div className="text-xs text-gray-500 mb-1">다음 일정</div>
                      <div className="text-sm font-semibold text-gray-900">디자인 검수</div>
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
