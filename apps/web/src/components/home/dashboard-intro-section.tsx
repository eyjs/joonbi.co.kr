export function DashboardIntroSection(): JSX.Element {
  const features = [
    {
      title: '실시간 진행률',
      description: '프로젝트 진행 상황을 퍼센트로 한눈에 확인',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      title: '산출물 확인',
      description: '기획서, 설계서, 소스코드 등 문서를 직접 확인',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: '로그인 불필요',
      description: '알림톡으로 받은 링크만으로 바로 접근',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
    },
  ];

  return (
    <section className="section section-alt">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Mockup */}
          <div className="order-2 md:order-1">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-300" />
                <span className="text-xs text-gray-400 ml-2">프로젝트 대시보드</span>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">쇼핑몰 웹사이트 개발</span>
                  <span className="text-sm font-bold text-blue-600">진행중</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div className="bg-blue-600 h-3 rounded-full" style={{ width: '65%' }} />
                </div>
                <div className="text-right text-xs text-gray-400 mt-1">65% 완료</div>
              </div>

              <div className="space-y-2">
                {['업무의뢰서', '화면설계서', 'API 설계서'].map((doc, i) => (
                  <div key={doc} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg text-sm">
                    <span className="text-gray-700">{doc}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      i < 2
                        ? 'bg-green-50 text-green-600'
                        : 'bg-yellow-50 text-yellow-600'
                    }`}>
                      {i < 2 ? '완료' : '작업중'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 md:order-2">
            <h2 className="heading-lg mb-4">
              내 프로젝트 진행 상황을
              <br />
              직접 확인하세요
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              별도의 회원가입이나 로그인 없이, 전달받은 링크만으로
              프로젝트 대시보드에 접근할 수 있습니다.
            </p>

            <div className="space-y-4">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
