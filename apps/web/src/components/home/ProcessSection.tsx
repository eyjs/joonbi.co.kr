import { Search, FileEdit, Code, Rocket } from 'lucide-react';

export function ProcessSection(): JSX.Element {
  const steps = [
    {
      icon: Search,
      number: '01',
      title: '업무 분석',
      description: 'AI가 참고사이트를\n자동으로 분석합니다',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-500',
    },
    {
      icon: FileEdit,
      number: '02',
      title: '자동 기획',
      description: '화면 구성과 기능을\n자동으로 기획합니다',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-500',
    },
    {
      icon: Code,
      number: '03',
      title: '개발 & 테스트',
      description: 'AI가 코드를 작성하고\n자동으로 테스트합니다',
      bgColor: 'bg-coral-100',
      iconColor: 'text-coral-500',
    },
    {
      icon: Rocket,
      number: '04',
      title: '배포 & 매뉴얼',
      description: '서버 배포와 함께\n사용 매뉴얼을 제공합니다',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-500',
    },
  ];

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="heading-lg">
            AI <span className="gradient-text">4단계</span> 자동 프로세스
          </h2>
          <p className="text-xl text-gray">
            모든 과정이 자동화되어 빠르고 정확합니다
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="card hover:shadow-xl transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={`flex items-center justify-center w-14 h-14 rounded-full ${step.bgColor}`}>
                      <Icon className={`w-7 h-7 ${step.iconColor}`} aria-hidden="true" />
                    </div>
                    <div className="text-5xl font-bold text-gray-100" aria-hidden="true">
                      {step.number}
                    </div>
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
