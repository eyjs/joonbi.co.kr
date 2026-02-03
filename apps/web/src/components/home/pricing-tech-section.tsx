export function PricingTechSection(): JSX.Element {
  const pricingPlans = [
    {
      name: '분석 상담',
      price: '무료',
      originalPrice: '10만원',
      isEvent: true,
      duration: '~30분 내 완료',
      features: [
        '참고사이트 분석',
        '업무분석서 PDF',
        '요구사항명세서 PDF',
        '샘플기획서 PDF',
        '견적서 PDF',
        '샘플 화면설계 (Figma)',
      ],
      note: '계약 시 계약금에서 차감',
    },
    {
      name: '랜딩페이지',
      price: '30~50만원',
      isPopular: true,
      features: [
        '3~5 페이지',
        '반응형 디자인',
        '소스코드 제공',
        '3개월 무상 A/S',
      ],
    },
    {
      name: '쇼핑몰/시스템',
      price: '200만원~',
      features: [
        '상품/결제 시스템',
        '관리자 대시보드',
        '실시간 진행 추적',
        '기능별 투명한 단가',
      ],
    },
  ];

  return (
    <section className="tech-section" id="pricing">
      <div className="tech-container">
        <div className="text-center mb-12">
          <div className="inline-block tech-badge mb-4 animate-pulse">
            🎉 오픈 이벤트
          </div>
          <h2 className="tech-heading-lg mb-4">투명한 가격, 파격적인 이벤트</h2>
          <div className="tech-card inline-block px-8 py-4 border-cyan-400">
            <p className="text-white text-xl">
              분석 상담 무료 <span className="tech-glow-text font-bold">(선착순 10명)</span>
            </p>
            <p className="text-gray-400 mt-2">
              <span className="line-through">10만원</span>
              <span className="tech-glow-text font-bold text-2xl ml-3">→ 0원</span>
            </p>
            <p className="text-yellow-400 text-sm mt-2 font-semibold">⚠️ 3명 남음</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`tech-card p-8 relative ${
                plan.isPopular
                  ? 'border-cyan-400 shadow-2xl shadow-cyan-400/30 transform scale-105'
                  : ''
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    인기
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-white font-bold text-2xl mb-4">{plan.name}</h3>

                {plan.isEvent && (
                  <div className="mb-3">
                    <span className="line-through text-gray-500 text-lg">{plan.originalPrice}</span>
                  </div>
                )}

                <div className="tech-glow-text text-4xl font-bold mb-2">{plan.price}</div>

                {plan.duration && (
                  <div className="text-gray-400 text-sm">{plan.duration}</div>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-cyan-400 text-lg flex-shrink-0">✓</span>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.note && (
                <div className="pt-4 border-t border-gray-700">
                  <p className="text-yellow-400 text-xs text-center">{plan.note}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#pricing-detail"
            className="text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-2"
          >
            전체 기능별 단가표 보기
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
