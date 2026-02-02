export function ProcessSection() {
  return (
    <section className="swiss-section" style={{ backgroundColor: 'var(--white)' }}>
      <div className="swiss-container">
        <div className="swiss-grid">
          <div className="swiss-col-12">
            <p className="swiss-caption mb-4">04 PROCESS</p>
            <h2 className="swiss-heading-lg mb-12">링크만 주시면, 나머지는 전문가가 AI와 함께 완성합니다</h2>
          </div>

          <div className="swiss-col-12">
            <table className="swiss-table mb-12">
              <thead>
                <tr>
                  <th>단계</th>
                  <th>내용</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>01. 업무 분석</td>
                  <td>의뢰하신 링크의 구조와 기능을 전문가가 분석.</td>
                </tr>
                <tr>
                  <td>02. 자동 기획</td>
                  <td>AI를 활용해 기획서, 화면 설계서 자동 생성.</td>
                </tr>
                <tr>
                  <td>03. 개발 & 테스트</td>
                  <td>최신 AI 코딩 도구로 고속 개발 및 오류 점검.</td>
                </tr>
                <tr>
                  <td>04. 배포 & 매뉴얼</td>
                  <td>사이트 오픈 및 영상 매뉴얼 제공.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="swiss-col-12">
            <div className="swiss-hr"></div>
            <p className="swiss-body text-center">평균 개발 기간: 2~4주 (복잡도에 따라 상이)</p>
          </div>
        </div>
      </div>
    </section>
  );
}
