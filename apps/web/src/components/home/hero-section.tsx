export function HeroSection() {
  return (
    <section className="swiss-section bg-white">
      <div className="swiss-container">
        <div className="swiss-grid" style={{ minHeight: '80vh', alignItems: 'center' }}>
          {/* Left: Main message */}
          <div className="swiss-col-8">
            <p className="swiss-caption mb-6">JOONBI STUDIO</p>
            <h1 className="swiss-heading-xl mb-8">
              참고사이트<br />
              링크 하나면<br />
              충분합니다
            </h1>
            <p className="swiss-body text-gray-800 mb-12" style={{ maxWidth: '500px' }}>
              복잡한 기획서 없이, IT 전문가와 AI가<br />
              만드는 당신의 웹사이트
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <a href="/consultation" className="swiss-button">
                무료 상담 신청
              </a>
              <a href="#pricing" className="swiss-button-outline">
                가격 확인
              </a>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="swiss-col-4">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
              <div className="swiss-stat">
                <div className="swiss-stat-value">30분</div>
                <div className="swiss-stat-label">분석 완료</div>
              </div>
              <div className="swiss-stat">
                <div className="swiss-stat-value">4종</div>
                <div className="swiss-stat-label">문서 자동생성</div>
              </div>
              <div className="swiss-stat">
                <div className="swiss-stat-value">40%</div>
                <div className="swiss-stat-label">비용 절감</div>
              </div>
              <div className="swiss-stat">
                <div className="swiss-stat-value">0회</div>
                <div className="swiss-stat-label">불필요한 미팅</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
