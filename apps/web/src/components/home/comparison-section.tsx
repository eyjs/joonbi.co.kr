export function ComparisonSection() {
  return (
    <section className="swiss-section" style={{ backgroundColor: 'var(--white)' }}>
      <div className="swiss-container">
        <div className="swiss-grid">
          <div className="swiss-col-12">
            <p className="swiss-caption mb-4">02 COMPARISON</p>
            <h2 className="swiss-heading-lg mb-12">기존 에이전시의 3가지 장벽</h2>
          </div>

          <div className="swiss-col-4">
            <h3 className="swiss-heading-md mb-4">비용 부담</h3>
            <p className="swiss-body mb-8">단순 홈페이지도 수백만 원부터 시작하는 불투명한 견적.</p>
          </div>

          <div className="swiss-col-4">
            <h3 className="swiss-heading-md mb-4">시간 낭비</h3>
            <p className="swiss-body mb-8">기획 미팅, 디자인 컨펌, 끊없는 전화 통화.</p>
          </div>

          <div className="swiss-col-4">
            <h3 className="swiss-heading-md mb-4">전문 지식 요구</h3>
            <p className="swiss-body mb-8">의뢰인에게 개발 지식과 완벽한 문서를 요구함.</p>
          </div>

          <div className="swiss-col-12">
            <div className="swiss-hr" style={{ margin: 'var(--space-12) 0' }}></div>
          </div>

          <div className="swiss-col-12">
            <h2 className="swiss-heading-lg mb-12">준비스튜디오는 '준비'를 요구하지 않습니다</h2>
          </div>

          <div className="swiss-col-4">
            <table className="swiss-table">
              <tbody>
                <tr>
                  <td>NO 개발 지식</td>
                  <td>비개발자도 OK.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="swiss-col-4">
            <table className="swiss-table">
              <tbody>
                <tr>
                  <td>NO 기획서</td>
                  <td>참고 링크만 있으면 OK.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="swiss-col-4">
            <table className="swiss-table">
              <tbody>
                <tr>
                  <td>NO 전화</td>
                  <td>실시간 대시보드로 확인.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="swiss-col-12">
            <div className="swiss-hr"></div>
            <p className="swiss-body text-center">소규모 사업자와 스타트업을 위한 가장 쉬운 개발 파트너.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
