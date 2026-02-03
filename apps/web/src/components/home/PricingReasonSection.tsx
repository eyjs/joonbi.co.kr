import { User, Bot, MessageSquare } from 'lucide-react';

export function PricingReasonSection(): JSX.Element {
  const reasons = [
    {
      icon: User,
      title: '1인 운영',
      description: '별도의 팀 운영비가\n들지 않습니다',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-500',
    },
    {
      icon: Bot,
      title: 'AI 활용',
      description: '개발 시간을 70%\n단축합니다',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-500',
    },
    {
      icon: MessageSquare,
      title: '소통 비용 제로',
      description: '미팅과 전화가\n없습니다',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-500',
    },
  ];

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="text-center space-y-6 mb-12">
          <div className="inline-block px-6 py-2 bg-coral-100 text-coral-600 rounded-full font-bold">
            40~60% 저렴
          </div>
          <h2 className="heading-lg">
            어떻게 이렇게<br />
            <span className="gradient-text">저렴할 수 있을까요?</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div key={index} className="card text-center space-y-4 hover:shadow-xl transition-shadow">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${reason.bgColor} mx-auto`}>
                  <Icon className={`w-8 h-8 ${reason.iconColor}`} aria-hidden="true" />
                </div>
                <h3 className="heading-sm">{reason.title}</h3>
                <p className="text-gray whitespace-pre-line">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <div className="inline-block card bg-gradient-to-r from-coral-500 to-orange-500 text-white">
            <p className="text-3xl font-bold mb-2">평균 50%</p>
            <p className="text-white/90">일반 에이전시 대비 절감</p>
          </div>
        </div>
      </div>
    </section>
  );
}
