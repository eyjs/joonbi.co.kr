import { FileText, Palette, Code2, Rocket } from 'lucide-react';

export function WorkflowSection() {
  const steps = [
    {
      icon: FileText,
      number: '01',
      title: '상담 신청',
      description: '참고 사이트 링크와 설명을 제출하면, AI가 자동으로 요구사항을 분석합니다.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
    },
    {
      icon: Palette,
      number: '02',
      title: 'AI 화면설계',
      description: '30분 내로 화면설계서(4종)가 생성됩니다. 수정 요청은 댓글로 남기세요.',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
    },
    {
      icon: Code2,
      number: '03',
      title: '개발 진행',
      description: '실시간 대시보드에서 진행률을 확인하고, 산출물에 피드백을 남길 수 있습니다.',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
    },
    {
      icon: Rocket,
      number: '04',
      title: '배포 & 인수',
      description: '최종 검수 후 배포하고, 소스코드와 사용 매뉴얼을 전달받습니다.',
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* 제목 */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              간단한 4단계로 완성됩니다
            </h2>
            <p className="text-xl text-gray-600">
              복잡한 절차 없이, 명확한 프로세스로 진행됩니다
            </p>
          </div>

          {/* 워크플로우 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative">

                  <div className="relative z-10">
                    <div className={`bg-gradient-to-br ${step.bgColor} border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all h-full`}>
                      {/* 번호 */}
                      <div className={`text-6xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-4`}>
                        {step.number}
                      </div>

                      {/* 아이콘 */}
                      <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center mb-4`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      {/* 내용 */}
                      <h3 className="font-bold text-xl mb-3">{step.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 추가 안내 */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl px-8 py-6 border-2 border-blue-200">
              <p className="text-lg font-semibold text-gray-800">
                전화나 미팅 없이, 채팅과 대시보드만으로 프로젝트가 완성됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
