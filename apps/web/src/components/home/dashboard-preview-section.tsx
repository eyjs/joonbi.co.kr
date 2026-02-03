export function DashboardPreviewSection(): JSX.Element {
  const deliverables = [
    { name: '요구사항명세서', status: '납품완료', progress: 100, color: 'green' },
    { name: '소스코드', status: '작업중', progress: 70, color: 'cyan', updated: '2일 전 업데이트' },
    { name: '운영매뉴얼', status: '검토중', progress: 40, color: 'yellow' },
    { name: '관리자계정정보', status: '대기', progress: 0, color: 'gray' },
  ];

  return (
    <section className="tech-section">
      <div className="tech-container">
        <div className="text-center mb-16">
          <h2 className="tech-heading-lg mb-4">실시간 진행 상황을 투명하게</h2>
          <p className="tech-text">
            산출물별 진행률, 댓글 소통, 모든 과정을 대시보드에서 확인하세요
          </p>
        </div>

        <div className="tech-card p-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-bold text-xl mb-4">A사 쇼핑몰 개발</h3>
                <div className="flex items-center justify-center w-40 h-40 mx-auto relative">
                  <svg className="transform -rotate-90" width="160" height="160">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#374151"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="url(#gradient)"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 70 * 0.67} ${2 * Math.PI * 70}`}
                      className="transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00d9ff" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold tech-glow-text">67%</div>
                      <div className="text-gray-400 text-sm mt-1">전체 진행률</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">상태</span>
                  <span className="text-cyan-400 font-semibold">개발 중</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">시작일</span>
                  <span className="text-white">2026.01.15</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">완료 예정</span>
                  <span className="text-white">2026.02.28</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-white font-bold text-lg mb-4">산출물 진행 현황</h3>

              {deliverables.map((item, index) => (
                <div key={index} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-semibold">{item.name}</span>
                    <div className="flex items-center gap-2">
                      {item.updated && (
                        <span className="text-gray-400 text-xs">{item.updated}</span>
                      )}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.color === 'green'
                            ? 'bg-green-500/20 text-green-400'
                            : item.color === 'cyan'
                            ? 'bg-cyan-500/20 text-cyan-400'
                            : item.color === 'yellow'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          item.color === 'green'
                            ? 'bg-green-500'
                            : item.color === 'cyan'
                            ? 'bg-cyan-400'
                            : item.color === 'yellow'
                            ? 'bg-yellow-500'
                            : 'bg-gray-500'
                        }`}
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-400 text-sm font-mono w-12">{item.progress}%</span>
                  </div>
                </div>
              ))}

              <div className="mt-6 pt-6 border-t border-gray-700">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <span className="text-cyan-400">💬</span>
                  최근 활동
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <div className="text-gray-500">2시간 전</div>
                    <div className="text-gray-300">소스코드 업데이트 완료</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-gray-500">1일 전</div>
                    <div className="text-gray-300">김개발: 로그인 기능 구현 완료했습니다</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-gray-500">2일 전</div>
                    <div className="text-gray-300">고객님: 메인 색상 변경 요청드립니다</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
