import { Search, Brain, Code2, Rocket } from 'lucide-react';

export function ProcessSection() {
  const steps = [
    {
      icon: Search,
      title: '1. 업무 분석',
      description: '의뢰하신 링크의 구조와 기능을 전문가가 분석.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
    },
    {
      icon: Brain,
      title: '2. 자동 기획',
      description: 'AI를 활용해 기획서, 화면 설계서 자동 생성.',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
    },
    {
      icon: Code2,
      title: '3. 개발 & 테스트',
      description: '최신 AI 코딩 도구로 고속 개발 및 오류 점검.',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
    },
    {
      icon: Rocket,
      title: '4. 배포 & 매뉴얼',
      description: '사이트 오픈 및 영상 매뉴얼 제공.',
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* 제목 */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              링크만 주시면,<br />나머지는 전문가가 AI와 함께 완성합니다.
            </h2>
          </div>

          {/* 프로세스 스텝 */}
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* 연결선 */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-orange-200"></div>

            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
                    {/* 아이콘 */}
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg relative z-10`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>

                    {/* 제목 */}
                    <h3 className="text-xl font-bold text-center mb-4">
                      {step.title}
                    </h3>

                    {/* 설명 */}
                    <p className="text-gray-600 text-center text-sm leading-relaxed">
                      {step.description}
                    </p>

                    {/* 배경 그라디언트 */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.bgColor} rounded-2xl opacity-0 hover:opacity-20 transition-opacity -z-10`}></div>
                  </div>

                  {/* 화살표 (모바일에서만 표시) */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden flex justify-center my-4">
                      <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 하단 메시지 */}
          <div className="mt-16 text-center">
            <div className="inline-block bg-white rounded-2xl px-8 py-6 shadow-lg">
              <p className="text-lg text-gray-700">
                ⚡ <strong>평균 개발 기간:</strong> 2~4주 (복잡도에 따라 상이)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
