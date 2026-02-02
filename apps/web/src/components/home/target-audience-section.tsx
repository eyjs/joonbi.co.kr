import { CheckCircle2, XCircle } from 'lucide-react';

export function TargetAudienceSection() {
  const recommended = [
    '참고할 사이트가 있고, 비슷하게 만들고 싶은 분',
    '예산이 부족하지만 퀄리티는 포기하고 싶지 않은 분',
    '개발 지식이 없어도 사이트를 만들고 싶은 분',
    '빠르게 MVP를 만들어 시장 반응을 보고 싶은 스타트업',
  ];

  const notRecommended = [
    '완전히 새로운 디자인을 처음부터 기획하고 싶은 분',
    '대규모 SI 프로젝트나 복잡한 레거시 시스템 통합',
    '전화나 대면 미팅으로만 소통하고 싶은 분',
    '당장 내일까지 급하게 완성이 필요한 프로젝트',
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* 제목 */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              어떤 분께 적합할까요?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 추천 */}
            <div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 mb-6 text-white text-center">
                <CheckCircle2 className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold">이런 분들께 강력 추천합니다</h3>
              </div>
              <div className="space-y-4">
                {recommended.map((item, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-lg flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 비추천 */}
            <div>
              <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-8 mb-6 text-white text-center">
                <XCircle className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold">이런 분께는 정중히 사양합니다</h3>
              </div>
              <div className="space-y-4">
                {notRecommended.map((item, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-lg flex items-start gap-4">
                    <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 안내 메시지 */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-white rounded-2xl px-8 py-6 shadow-lg border-2 border-blue-200">
              <p className="text-lg text-gray-700">
                위 내용을 확인하셨다면, 이제 상담을 시작해볼까요?
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
