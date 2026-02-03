import { Activity, CheckCircle2, Clock } from 'lucide-react';

export function DashboardSection(): JSX.Element {
  return (
    <section className="section">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="heading-lg">
              실시간 <span className="gradient-text">대시보드</span>로<br />
              진행상황을 확인하세요
            </h2>
            <p className="text-xl text-gray">
              진행상황이 궁금할 때마다 물어볼 필요 없이<br />
              실시간 대시보드에서 모든 것을 확인할 수 있습니다.
            </p>
            <ul className="space-y-3">
              {[
                '프로젝트 진행률 실시간 확인',
                '각 단계별 상세 내역 조회',
                '완료된 작업 목록 확인',
                '예상 완료 시점 안내',
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="heading-sm flex items-center gap-2">
                <Activity className="w-6 h-6 text-blue-500" aria-hidden="true" />
                진행 현황
              </h3>
              <span className="badge">실시간</span>
            </div>
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">전체 진행률</span>
                  <span className="text-blue-500 font-bold">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" aria-hidden="true" />
                    <span className="font-medium text-sm">완료</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">8개</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-blue-500" aria-hidden="true" />
                    <span className="font-medium text-sm">진행중</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">3개</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
