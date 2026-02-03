import { Check } from 'lucide-react';

export function RecommendedSection(): JSX.Element {
  const items = [
    '빠르게 웹사이트가 필요한 스타트업',
    '예산이 한정적인 개인 사업자',
    '개발 지식이 전혀 없는 분',
    '채팅으로 편하게 소통하고 싶은 분',
  ];

  return (
    <section className="section bg-green-50">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <h2 className="heading-lg">
              <span className="text-green-600">추천</span>하는 분들
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item, index) => (
              <div key={index} className="card bg-white flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <p className="text-lg font-medium text-gray-800 flex-1">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
