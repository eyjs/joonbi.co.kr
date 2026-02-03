import { Gift, Users } from 'lucide-react';

export function EventSection(): JSX.Element {
  return (
    <section className="section bg-gradient-to-r from-coral-500 to-orange-500">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center text-white space-y-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur">
            <Gift className="w-10 h-10 text-white" />
          </div>
          <h2 className="heading-lg text-white">
            오픈 이벤트
          </h2>
          <div className="card bg-white text-gray-800">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-3">
                <Users className="w-8 h-8 text-coral-500" />
                <h3 className="heading-md">선착순 10명</h3>
              </div>
              <div className="py-6 border-y border-gray-200">
                <p className="text-4xl font-bold gradient-text mb-2">
                  무료
                </p>
                <p className="text-xl text-gray-600">
                  프로젝트 분석 상담
                </p>
              </div>
              <ul className="space-y-3 text-left max-w-md mx-auto">
                {[
                  '참고사이트 분석 리포트 제공',
                  '예상 개발 기간 및 비용 산출',
                  '기술 스택 추천',
                  '맞춤형 개발 방향 제시',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-coral-500 mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-white/90 text-lg">
            지금 신청하시면 상세한 분석 리포트를 무료로 받아보실 수 있습니다
          </p>
        </div>
      </div>
    </section>
  );
}
