export function DashboardSampleSection(): JSX.Element {
  return (
    <section className="tech-section">
      <div className="tech-container">
        <div className="text-center mb-16">
          <h2 className="tech-heading-lg mb-4">이런 대시보드에서 관리합니다</h2>
          <p className="tech-text">
            개발 진행 상황부터 피드백까지, 모든 것을 한 곳에서
          </p>
        </div>

        <div className="tech-card p-0 overflow-hidden max-w-6xl mx-auto border-cyan-400/50">
          {/* Dashboard Header */}
          <div className="bg-gradient-to-r from-cyan-400/10 to-blue-500/10 border-b border-cyan-400/30 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-cyan-400/20 border border-cyan-400 flex items-center justify-center">
                  <span className="text-cyan-400 text-xl font-bold">준</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">준비스튜디오</h3>
                  <p className="text-gray-400 text-sm">프로젝트 관리 대시보드</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm font-semibold border border-green-500/30">
                  ● 진행중
                </span>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Stats Cards */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-400/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">전체 진행률</span>
                  <span className="text-cyan-400 text-2xl">📊</span>
                </div>
                <div className="text-white text-4xl font-bold mb-1 tech-glow-text">67%</div>
                <div className="text-gray-500 text-xs">목표: 2주 후 완료</div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-400/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">완료된 작업</span>
                  <span className="text-cyan-400 text-2xl">✅</span>
                </div>
                <div className="text-white text-4xl font-bold mb-1">8/12</div>
                <div className="text-gray-500 text-xs">4개 작업 남음</div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-400/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">미확인 알림</span>
                  <span className="text-cyan-400 text-2xl">🔔</span>
                </div>
                <div className="text-white text-4xl font-bold mb-1">3</div>
                <div className="text-gray-500 text-xs">새로운 댓글 2개</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
              <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-cyan-400">📝</span>
                최근 활동
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b border-gray-700">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-semibold">소스코드 업데이트</span>
                      <span className="text-gray-500 text-sm">2시간 전</span>
                    </div>
                    <p className="text-gray-400 text-sm">로그인 기능 구현이 완료되었습니다.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-4 border-b border-gray-700">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-semibold">새로운 댓글</span>
                      <span className="text-gray-500 text-sm">5시간 전</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      <span className="text-cyan-400">@개발자</span>: 메인 색상은 이렇게 변경했습니다. 확인 부탁드립니다.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-semibold">피드백 요청</span>
                      <span className="text-gray-500 text-sm">1일 전</span>
                    </div>
                    <p className="text-gray-400 text-sm">운영매뉴얼이 검토 대기중입니다.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Files Preview */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-cyan-400/50 transition-colors cursor-pointer">
                <div className="text-center">
                  <div className="text-4xl mb-2">📄</div>
                  <p className="text-white text-sm font-semibold mb-1">요구사항명세서</p>
                  <p className="text-gray-500 text-xs">PDF · 2.4MB</p>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-cyan-400/50 transition-colors cursor-pointer">
                <div className="text-center">
                  <div className="text-4xl mb-2">💻</div>
                  <p className="text-white text-sm font-semibold mb-1">소스코드</p>
                  <p className="text-gray-500 text-xs">GitHub</p>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-cyan-400/50 transition-colors cursor-pointer">
                <div className="text-center">
                  <div className="text-4xl mb-2">📖</div>
                  <p className="text-white text-sm font-semibold mb-1">운영매뉴얼</p>
                  <p className="text-gray-500 text-xs">PDF · 1.8MB</p>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-cyan-400/50 transition-colors cursor-pointer">
                <div className="text-center">
                  <div className="text-4xl mb-2">🎨</div>
                  <p className="text-white text-sm font-semibold mb-1">화면설계</p>
                  <p className="text-gray-500 text-xs">Figma</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 text-lg">
            깔끔하고 직관적인 인터페이스로 프로젝트를 쉽게 관리하세요
          </p>
        </div>
      </div>
    </section>
  );
}
