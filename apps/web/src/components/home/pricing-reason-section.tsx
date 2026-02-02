import { Users, Sparkles, Zap } from 'lucide-react';

export function PricingReasonSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* 제목 */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              에이전시 대비 <span className="text-red-600">40~60%</span> 저렴한 이유
            </h2>
          </div>

          {/* 비교 차트 */}
          <div className="grid md:grid-cols-2 gap-12 mb-16 items-end">
            {/* 일반 에이전시 */}
            <div>
              <h3 className="text-2xl font-bold text-center mb-8">일반 에이전시</h3>
              <div className="relative h-96 bg-gray-100 rounded-3xl p-6 flex flex-col justify-end">
                <div className="space-y-3">
                  <div className="bg-red-200 rounded-lg p-4 text-center font-semibold">
                    영업 수수료
                  </div>
                  <div className="bg-red-300 rounded-lg p-4 text-center font-semibold">
                    PM 인건비
                  </div>
                  <div className="bg-red-400 rounded-lg p-4 text-center font-semibold">
                    사무실 임대료
                  </div>
                  <div className="bg-red-500 text-white rounded-lg p-6 text-center font-bold text-lg">
                    개발비
                  </div>
                </div>
              </div>
            </div>

            {/* 준비스튜디오 */}
            <div>
              <h3 className="text-2xl font-bold text-center mb-8">Joonbi Studio</h3>
              <div className="relative h-96 bg-gray-100 rounded-3xl p-6 flex flex-col justify-end">
                {/* -60% 표시 */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-4xl font-bold px-8 py-4 rounded-full shadow-xl">
                  -60%
                </div>

                <div className="space-y-3 mt-auto">
                  <div className="bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-lg p-12 text-center font-bold text-2xl">
                    개발비
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3가지 이유 */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-8">
              <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl text-center mb-4">1인 운영</h3>
              <p className="text-gray-700 text-center">
                영업사원, PM, 사무실 임대료 거품 제거.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8">
              <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl text-center mb-4">AI 활용</h3>
              <p className="text-gray-700 text-center">
                코딩과 문서 작성 시간을 획기적으로 단축.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8">
              <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl text-center mb-4">소통 비용 제로</h3>
              <p className="text-gray-700 text-center">
                불필요한 미팅과 이동 시간을 없애 개발에만 집중.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
