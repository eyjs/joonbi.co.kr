export function TechHeroSection(): JSX.Element {
  return (
    <section className="tech-section">
      <div className="tech-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-block">
              <span className="tech-badge">선착순 10명 무료 (원가 10만원)</span>
            </div>

            <h1 className="tech-heading-xl">
              참고사이트만 주세요,<br />
              <span className="tech-glow-text">30분 내 분석 완료</span>
            </h1>

            <p className="tech-text text-xl">
              기존 외주는 견적까지 1~2주 소요.<br />
              준비스튜디오는 AI가 30분 내 자동 분석하고<br />
              샘플 화면설계까지 제공합니다.
            </p>

            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex items-center gap-2 text-white">
                <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                <span className="font-semibold">⚡ 30분 자동 분석</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                <span className="font-semibold">📊 실시간 대시보드</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                <span className="font-semibold">🎨 샘플 화면설계 무료</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a href="#contact" className="tech-btn-primary text-center">
                무료 분석 신청하기
              </a>
              <a href="#process" className="tech-btn-secondary text-center">
                작동 원리 보기
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="tech-card p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-cyan-400 font-bold text-lg">자동 분석 진행중</span>
                  <span className="text-white text-3xl font-bold">
                    <span className="tech-glow-text">30</span>
                    <span className="text-gray-400 text-xl ml-1">분</span>
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">참고사이트 분석 중</span>
                      <span className="text-cyan-400">100%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-cyan-400 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">문서 생성 중</span>
                      <span className="text-cyan-400">75%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-cyan-400 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">화면설계 생성 중</span>
                      <span className="text-gray-500">50%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gray-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="bg-gray-800/50 border border-cyan-400/30 rounded-lg p-3 flex items-center gap-2">
                    <div className="text-cyan-400 text-2xl">📄</div>
                    <span className="text-gray-300 text-sm">PDF 문서 4종</span>
                  </div>
                  <div className="bg-gray-800/50 border border-cyan-400/30 rounded-lg p-3 flex items-center gap-2">
                    <div className="text-cyan-400 text-2xl">🎨</div>
                    <span className="text-gray-300 text-sm">Figma 링크</span>
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
