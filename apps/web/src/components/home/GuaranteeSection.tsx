import { Shield, BookOpen, Code } from 'lucide-react';

export function GuaranteeSection(): JSX.Element {
  const guarantees = [
    {
      icon: Shield,
      title: '3개월 무상 A/S',
      description: '납품 후 3개월간 버그 수정 및 간단한 수정사항을 무료로 지원합니다',
    },
    {
      icon: BookOpen,
      title: '사용 매뉴얼 제공',
      description: '관리자와 사용자를 위한 상세한 사용 매뉴얼을 함께 제공합니다',
    },
    {
      icon: Code,
      title: '소스코드 전달',
      description: '개발된 모든 소스코드를 전달해 드리며, 향후 자유롭게 수정 가능합니다',
    },
  ];

  return (
    <section className="section bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="heading-lg">
            안심하고 맡기세요<br />
            <span className="gradient-text">확실한 납품 보장</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {guarantees.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="card bg-white/90 backdrop-blur text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 mx-auto">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="heading-sm">{item.title}</h3>
                <p className="text-gray">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
