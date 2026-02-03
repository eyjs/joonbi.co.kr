import { Check } from 'lucide-react';

export function PricingTableSection(): JSX.Element {
  const pricing = [
    {
      name: '랜딩 페이지',
      price: '30,000원',
      unit: '/ 페이지',
      description: '1페이지 완성형',
      color: 'blue',
    },
    {
      name: '홈페이지',
      price: '500,000원 ~',
      unit: '',
      description: '5~10페이지 구성',
      color: 'purple',
      popular: true,
    },
    {
      name: '관리자 시스템',
      price: '3,000,000원 ~',
      unit: '',
      description: 'CRM, ERP 등',
      color: 'coral',
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="text-center space-y-6 mb-12">
          <h2 className="heading-lg">
            <span className="gradient-text">투명한</span> 가격표
          </h2>
          <p className="text-xl text-gray">
            숨겨진 비용 없이 명확한 가격으로 제공합니다
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricing.map((item, index) => (
            <div
              key={index}
              className={`card relative ${
                item.popular
                  ? 'border-4 border-blue-500 transform lg:-translate-y-4'
                  : ''
              }`}
            >
              {item.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                    인기
                  </span>
                </div>
              )}
              <div className="text-center space-y-6">
                <h3 className="heading-sm">{item.name}</h3>
                <div>
                  <div className="text-4xl font-bold text-blue-600">
                    {item.price}
                  </div>
                  {item.unit && (
                    <div className="text-gray-600 mt-1">{item.unit}</div>
                  )}
                </div>
                <p className="text-gray">{item.description}</p>
                <div className="pt-4 border-t">
                  <ul className="space-y-2 text-left">
                    {[
                      '반응형 디자인',
                      '소스코드 제공',
                      '3개월 무상 A/S',
                      '사용 매뉴얼',
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            최종 금액은 요구사항에 따라 달라질 수 있습니다
          </p>
        </div>
      </div>
    </section>
  );
}
