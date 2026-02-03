import { X } from 'lucide-react';

export function NotRecommendedSection(): JSX.Element {
  const items = [
    '대규모 엔터프라이즈 시스템이 필요한 경우',
    '매우 복잡한 커스텀 기능이 필요한 경우',
    '전화나 대면 미팅을 선호하시는 경우',
    '즉시 당장 내일까지 완성이 필요한 경우',
  ];

  return (
    <section className="section bg-red-50">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <h2 className="heading-lg">
              <span className="text-red-600">비추천</span>하는 경우
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item, index) => (
              <div key={index} className="card bg-white flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
                    <X className="w-5 h-5 text-red-600" />
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
