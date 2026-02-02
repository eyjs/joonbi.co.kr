export function AddonsSection() {
  return (
    <section className="swiss-section">
      <div className="swiss-container">
        <div className="swiss-grid">
          <div className="swiss-col-12">
            <p className="swiss-caption mb-4">09 ADD-ONS</p>
            <h2 className="swiss-heading-lg mb-6">필요한 기능만 골라 담으세요</h2>
            <p className="swiss-body mb-12">기본 패키지에 원하는 기능을 추가할 수 있습니다</p>
          </div>

          <div className="swiss-col-12">
            <table className="swiss-table mb-12">
              <thead>
                <tr>
                  <th>기능</th>
                  <th>가격</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>결제 연동</td>
                  <td>50만원</td>
                  <td>PG사 연동 (토스, 나이스 등)</td>
                </tr>
                <tr>
                  <td>소셜 로그인</td>
                  <td>종당 10만원</td>
                  <td>카카오, 구글, 네이버 등</td>
                </tr>
                <tr>
                  <td>게시판 기능</td>
                  <td>15~25만원</td>
                  <td>공지사항, Q&A, 댓글 시스템</td>
                </tr>
                <tr>
                  <td>검색 기능</td>
                  <td>5~15만원</td>
                  <td>키워드 검색, 필터링</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="swiss-col-12">
            <div className="swiss-hr"></div>
            <p className="swiss-body text-center">맞춤 기능이 필요하신가요? 상담 시 자세히 알려주시면 별도 견적을 드립니다.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
