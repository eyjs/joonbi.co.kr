import { MessageSquareX, FileX, Code } from 'lucide-react';

export function ProblemSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* 메인 헤드라인 */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              개발은 모르는데...
              <br />
              <span className="text-gray-500">그냥 '이런 느낌'으로 만들고 싶어요.</span>
            </h2>
          </div>

          {/* 일러스트 영역 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* 왼쪽: 고민하는 사업자 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12 text-center">
                <div className="text-8xl mb-6">🤔</div>
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-4 shadow-sm flex items-start gap-3">
                    <Code className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
                    <div className="text-left">
                      <div className="font-semibold text-gray-700 mb-1">Code</div>
                      <div className="text-sm text-gray-500">복잡한 개발 용어</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-sm flex items-start gap-3">
                    <FileX className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
                    <div className="text-left">
                      <div className="font-semibold text-gray-700 mb-1">Wireframes</div>
                      <div className="text-sm text-gray-500">화면 설계서</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-sm flex items-start gap-3">
                    <MessageSquareX className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
                    <div className="text-left">
                      <div className="font-semibold text-gray-700 mb-1">Servers</div>
                      <div className="text-sm text-gray-500">서버 인프라</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽: 문제점 나열 */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-8">
                웹사이트나 앱이 필요할 때마다 드는 말들:
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-red-50 border border-red-200 rounded-xl p-5">
                  <div className="text-2xl flex-shrink-0">❌</div>
                  <div>
                    <div className="font-semibold text-red-700 mb-1">
                      "기획서는 준비되셨나요?"
                    </div>
                    <div className="text-sm text-red-600">
                      상세 기능 명세서 주세요.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-red-50 border border-red-200 rounded-xl p-5">
                  <div className="text-2xl flex-shrink-0">❌</div>
                  <div>
                    <div className="font-semibold text-red-700 mb-1">
                      "개발 용어는 아시죠?"
                    </div>
                    <div className="text-sm text-red-600">
                      API, 데이터베이스, 서버...
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-red-50 border border-red-200 rounded-xl p-5">
                  <div className="text-2xl flex-shrink-0">❌</div>
                  <div>
                    <div className="font-semibold text-red-700 mb-1">
                      "디자인 시안을 먼저 보내주세요."
                    </div>
                    <div className="text-sm text-red-600">
                      와이어프레임, 스타일가이드...
                    </div>
                  </div>
                </div>
              </div>

              {/* 하이라이트 메시지 */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mt-8">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">💙</div>
                  <div>
                    <p className="text-blue-900 leading-relaxed">
                      <strong>머릿속엔 아이디어가 있지만,</strong>
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
