import { Link as LinkIcon, FileText, Lightbulb } from 'lucide-react';

export function RequirementsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* 제목 */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              고객님이 준비할 것은 <span className="text-blue-600">딱 2가지</span>만 있으면 됩니다.
            </h2>
          </div>

          {/* 2가지 카드 */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* 1. 참고사이트 링크 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-3xl blur opacity-20 group-hover:opacity-30 transition"></div>
              <div className="relative bg-gradient-to-br from-orange-50 to-pink-50 border-2 border-orange-200 rounded-3xl p-10 hover:shadow-2xl transition-shadow">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg mx-auto">
                  <LinkIcon className="w-10 h-10 text-orange-500" />
                </div>
                <div className="bg-orange-500 text-white text-center py-2 px-4 rounded-full text-sm font-bold mb-6 inline-block">
                  1. 참고사이트 링크 (필수)
                </div>
                <div className="bg-white rounded-2xl p-6">
                  <p className="text-orange-900 text-lg font-medium text-center mb-4">
                    "이 사이트처럼 만들어주세요."
                  </p>
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200 flex items-center gap-2 justify-center">
                    <Lightbulb className="w-4 h-4 text-orange-600 flex-shrink-0" aria-hidden="true" />
                    <p className="text-sm text-orange-700">
                      예시: https://example.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. 대략적인 설명 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur opacity-20 group-hover:opacity-30 transition"></div>
              <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-3xl p-10 hover:shadow-2xl transition-shadow">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg mx-auto">
                  <FileText className="w-10 h-10 text-blue-500" />
                </div>
                <div className="bg-blue-500 text-white text-center py-2 px-4 rounded-full text-sm font-bold mb-6 inline-block">
                  2. 대략적인 설명
                </div>
                <div className="bg-white rounded-2xl p-6">
                  <p className="text-blue-900 text-lg font-medium text-center mb-4">
                    "우리 회사 로고와 색상은 이걸로 하고, 메뉴는 이렇게 구성하고 싶어요."
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 flex items-center gap-2 justify-center">
                    <Lightbulb className="w-4 h-4 text-blue-600 flex-shrink-0" aria-hidden="true" />
                    <p className="text-sm text-blue-700">
                      간단한 설명만으로 OK!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 강조 메시지 */}
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl px-10 py-6 shadow-xl">
              <p className="text-2xl font-bold">
                → 나머지 복잡한 과정은 저희가 알아서 합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
