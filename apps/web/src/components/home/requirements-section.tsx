export function RequirementsSection() {
  return (
    <section className="swiss-section">
      <div className="swiss-container">
        <div className="swiss-grid">
          <div className="swiss-col-12">
            <p className="swiss-caption mb-4">03 REQUIREMENTS</p>
            <h2 className="swiss-heading-lg mb-12">고객님이 준비할 것은 딱 2가지만 있으면 됩니다</h2>
          </div>

          <div className="swiss-col-6">
            <h3 className="swiss-heading-md mb-6">01. 참고사이트 링크 (필수)</h3>
            <p className="swiss-body mb-4">"이 사이트처럼 만들어주세요."</p>
            <p className="swiss-caption">예시: https://example.com</p>
            <div className="swiss-hr" style={{ marginTop: 'var(--space-8)' }}></div>
          </div>

          <div className="swiss-col-6">
            <h3 className="swiss-heading-md mb-6">02. 대략적인 설명</h3>
            <p className="swiss-body mb-4">"우리 회사 로고와 색상은 이걸로 하고, 메뉴는 이렇게 구성하고 싶어요."</p>
            <p className="swiss-caption">간단한 설명만으로 OK!</p>
            <div className="swiss-hr" style={{ marginTop: 'var(--space-8)' }}></div>
          </div>

          <div className="swiss-col-12">
            <div className="swiss-hr"></div>
            <p className="swiss-body text-center" style={{ fontSize: '1.25rem', lineHeight: '1.6' }}>
              나머지 복잡한 과정은 저희가 알아서 합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
