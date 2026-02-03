import { DollarSign, Clock, BookOpen } from 'lucide-react';

export function BarriersSection(): JSX.Element {
  const barriers = [
    {
      icon: DollarSign,
      title: '비용 부담',
      description: '최소 300만원 이상의\n높은 개발 비용',
    },
    {
      icon: Clock,
      title: '시간 낭비',
      description: '미팅, 전화, 수정 요청\n반복되는 커뮤니케이션',
    },
    {
      icon: BookOpen,
      title: '전문 지식 요구',
      description: '기획서, 와이어프레임\n개발 용어 이해 필수',
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="heading-lg">
            기존 에이전시의<br />
            <span className="text-coral-500">3가지 장벽</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {barriers.map((barrier, index) => {
            const Icon = barrier.icon;
            return (
              <div key={index} className="card text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mx-auto">
                  <Icon className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="heading-sm">{barrier.title}</h3>
                <p className="text-gray whitespace-pre-line">
                  {barrier.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
