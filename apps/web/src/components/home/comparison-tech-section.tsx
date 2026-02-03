export function ComparisonTechSection(): JSX.Element {
  return (
    <section className="tech-section">
      <div className="tech-container">
        <div className="text-center mb-16">
          <h2 className="tech-heading-lg mb-4">기존 외주와 뭐가 다른가요?</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent hidden lg:block"></div>

          <div className="space-y-6 opacity-60">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-400 mb-2">기존 외주</h3>
              <div className="text-4xl mb-4">⏰</div>
            </div>

            <div className="tech-card border-gray-600">
              <div className="flex items-start gap-3">
                <div className="text-red-400 text-2xl mt-1">✗</div>
                <div>
                  <p className="text-gray-300 font-semibold mb-1">견적까지 1~2주 소요</p>
                  <p className="text-gray-500 text-sm">긴 대기 시간</p>
                </div>
              </div>
            </div>

            <div className="tech-card border-gray-600">
              <div className="flex items-start gap-3">
                <div className="text-red-400 text-2xl mt-1">✗</div>
                <div>
                  <p className="text-gray-300 font-semibold mb-1">기획서/요구사항 직접 작성</p>
                  <p className="text-gray-500 text-sm">전문 지식 필요</p>
                </div>
              </div>
            </div>

            <div className="tech-card border-gray-600">
              <div className="flex items-start gap-3">
                <div className="text-red-400 text-2xl mt-1">✗</div>
                <div>
                  <p className="text-gray-300 font-semibold mb-1">화면설계 별도 비용</p>
                  <p className="text-gray-500 text-sm">추가 비용 발생</p>
                </div>
              </div>
            </div>

            <div className="tech-card border-gray-600">
              <div className="flex items-start gap-3">
                <div className="text-red-400 text-2xl mt-1">✗</div>
                <div>
                  <p className="text-gray-300 font-semibold mb-1">카톡/전화로 소통</p>
                  <p className="text-gray-500 text-sm">기록 관리 어려움</p>
                </div>
              </div>
            </div>

            <div className="tech-card border-gray-600">
              <div className="flex items-start gap-3">
                <div className="text-red-400 text-2xl mt-1">✗</div>
                <div>
                  <p className="text-gray-300 font-semibold mb-1">불투명한 진행 상황</p>
                  <p className="text-gray-500 text-sm">진행률 확인 불가</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold tech-glow-text mb-2">준비스튜디오</h3>
              <div className="text-4xl mb-4">⚡</div>
            </div>

            <div className="tech-card border-cyan-400 shadow-lg shadow-cyan-400/20">
              <div className="flex items-start gap-3">
                <div className="text-cyan-400 text-2xl mt-1">✓</div>
                <div>
                  <p className="text-white font-semibold mb-1 tech-glow-text">30분 내 자동 분석</p>
                  <p className="text-gray-400 text-sm">AI가 즉시 처리</p>
                </div>
              </div>
            </div>

            <div className="tech-card border-cyan-400 shadow-lg shadow-cyan-400/20">
              <div className="flex items-start gap-3">
                <div className="text-cyan-400 text-2xl mt-1">✓</div>
                <div>
                  <p className="text-white font-semibold mb-1">참고사이트만 제출</p>
                  <p className="text-gray-400 text-sm">URL만 있으면 OK</p>
                </div>
              </div>
            </div>

            <div className="tech-card border-cyan-400 shadow-lg shadow-cyan-400/20">
              <div className="flex items-start gap-3">
                <div className="text-cyan-400 text-2xl mt-1">✓</div>
                <div>
                  <p className="text-white font-semibold mb-1 tech-glow-text">샘플 화면설계 무료 제공</p>
                  <p className="text-gray-400 text-sm">Figma 디자인 포함</p>
                </div>
              </div>
            </div>

            <div className="tech-card border-cyan-400 shadow-lg shadow-cyan-400/20">
              <div className="flex items-start gap-3">
                <div className="text-cyan-400 text-2xl mt-1">✓</div>
                <div>
                  <p className="text-white font-semibold mb-1">사이트 내 댓글로 소통</p>
                  <p className="text-gray-400 text-sm">모든 대화 기록 보관</p>
                </div>
              </div>
            </div>

            <div className="tech-card border-cyan-400 shadow-lg shadow-cyan-400/20">
              <div className="flex items-start gap-3">
                <div className="text-cyan-400 text-2xl mt-1">✓</div>
                <div>
                  <p className="text-white font-semibold mb-1 tech-glow-text">실시간 진행률 대시보드</p>
                  <p className="text-gray-400 text-sm">투명한 프로세스</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
