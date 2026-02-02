export function ProblemSection() {
  return (
    <section className="swiss-section">
      <div className="swiss-container">
        <div className="swiss-grid">
          <div className="swiss-col-12">
            <p className="swiss-caption mb-4">01 PROBLEM</p>
            <h2 className="swiss-heading-lg mb-12">개발은 모르는데 그냥 '이런 느낌'으로 만들고 싶어요.</h2>
          </div>

          <div className="swiss-col-6">
            <h3 className="swiss-heading-md mb-8">웹사이트나 앱이 필요할 때마다 드는 말들</h3>
            <ul className="swiss-list mb-12">
              <li>"기획서는 준비되셨나요? 상세 기능 명세서 주세요."</li>
              <li>"개발 용어는 아시죠? API, 데이터베이스, 서버..."</li>
              <li>"디자인 시안을 먼저 보내주세요. 와이어프레임, 스타일가이드..."</li>
            </ul>
          </div>

          <div className="swiss-col-6">
            <h3 className="swiss-heading-md mb-8">익숙하지 않은 개발 용어</h3>
            <table className="swiss-table mb-12">
              <tbody>
                <tr>
                  <td>Code</td>
                  <td>복잡한 개발 용어</td>
                </tr>
                <tr>
                  <td>Wireframes</td>
                  <td>화면 설계서</td>
                </tr>
                <tr>
                  <td>Servers</td>
                  <td>서버 인프라</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="swiss-col-12">
            <div className="swiss-hr"></div>
            <p className="swiss-body" style={{ maxWidth: '45rem', margin: '0 auto' }}>
              머릿속엔 아이디어가 있지만, 개발자와 소통하는 문턱은 너무 높습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
