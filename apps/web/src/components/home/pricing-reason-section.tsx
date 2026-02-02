export function PricingReasonSection() {
  return (
    <section className="swiss-section">
      <div className="swiss-container">
        <div className="swiss-grid">
          <div className="swiss-col-12">
            <p className="swiss-caption mb-4">07 PRICING REASON</p>
            <h2 className="swiss-heading-lg mb-12">에이전시 대비 40~60% 저렴한 이유</h2>
          </div>

          <div className="swiss-col-6">
            <h3 className="swiss-heading-md mb-6">일반 에이전시</h3>
            <ul className="swiss-list mb-8">
              <li>영업 수수료</li>
              <li>PM 인건비</li>
              <li>사무실 임대료</li>
              <li>개발비</li>
            </ul>
          </div>

          <div className="swiss-col-6">
            <h3 className="swiss-heading-md mb-6">Joonbi Studio (-60%)</h3>
            <ul className="swiss-list mb-8">
              <li>개발비만 집중</li>
            </ul>
          </div>

          <div className="swiss-col-12">
            <div className="swiss-hr" style={{ margin: 'var(--space-12) 0' }}></div>
          </div>

          <div className="swiss-col-12">
            <h3 className="swiss-heading-md mb-6">3가지 이유</h3>
            <table className="swiss-table">
              <tbody>
                <tr>
                  <td>1인 운영</td>
                  <td>영업사원, PM, 사무실 임대료 거품 제거.</td>
                </tr>
                <tr>
                  <td>AI 활용</td>
                  <td>코딩과 문서 작성 시간을 획기적으로 단축.</td>
                </tr>
                <tr>
                  <td>소통 비용 제로</td>
                  <td>불필요한 미팅과 이동 시간을 없애 개발에만 집중.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
