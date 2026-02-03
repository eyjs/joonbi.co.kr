import { MessageCircle, FileCheck, Code2, PackageCheck } from 'lucide-react';

export function WorkflowSection(): JSX.Element {
  const steps = [
    {
      icon: MessageCircle,
      number: '1',
      title: '상담 신청',
      description: '참고사이트 링크와 함께\n간단히 문의해주세요',
    },
    {
      icon: FileCheck,
      number: '2',
      title: '계약 진행',
      description: '견적 확인 후\n계약을 진행합니다',
    },
    {
      icon: Code2,
      number: '3',
      title: '개발 진행',
      description: '실시간 대시보드로\n진행상황을 확인하세요',
    },
    {
      icon: PackageCheck,
      number: '4',
      title: '납품 완료',
      description: '최종 검수 후\n소스코드를 전달합니다',
    },
  ];

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="heading-lg">
            <span className="gradient-text">의뢰 프로세스</span>
          </h2>
          <p className="text-xl text-gray">
            간단한 4단계로 프로젝트가 완성됩니다
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="card text-center space-y-4 h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mx-auto">
                    <Icon className="w-8 h-8 text-blue-500" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    {step.number}
                  </div>
                  <h3 className="heading-sm">{step.title}</h3>
                  <p className="text-gray whitespace-pre-line">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
