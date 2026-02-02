export function DashboardSection() {
  return (
    <section className="swiss-section">
      <div className="swiss-container">
        <div className="swiss-grid">
          <div className="swiss-col-12">
            <p className="swiss-caption mb-4">05 DASHBOARD</p>
            <h2 className="swiss-heading-lg mb-12">진행상황, 묻지 않아도 보입니다</h2>
          </div>

          <div className="swiss-col-4">
            <h3 className="swiss-heading-md mb-4">실시간 대시보드 제공</h3>
            <p className="swiss-body">현재 진행률(%)이 직관적으로 표시됩니다.</p>
          </div>

          <div className="swiss-col-4">
            <h3 className="swiss-heading-md mb-4">투명한 작업 공유</h3>
            <p className="swiss-body">산출물이 업로드되면 즉시 확인하고 피드백을 남길 수 있습니다.</p>
          </div>

          <div className="swiss-col-4">
            <h3 className="swiss-heading-md mb-4">기다림 없는 소통</h3>
            <p className="swiss-body">'어디까지 됐나요?'라고 전화할 필요가 없습니다.</p>
          </div>

          <div className="swiss-col-12">
            <div className="swiss-hr" style={{ margin: 'var(--space-12) 0' }}></div>
          </div>

          <div className="swiss-col-12">
            <h3 className="swiss-heading-md mb-6">프로젝트 진행 현황 예시</h3>
            <table className="swiss-table">
              <thead>
                <tr>
                  <th>단계</th>
                  <th>상태</th>
                  <th>날짜</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>기획 완료</td>
                  <td>완료</td>
                  <td>08/15</td>
                </tr>
                <tr>
                  <td>디자인 완료</td>
                  <td>완료</td>
                  <td>08/20</td>
                </tr>
                <tr>
                  <td>개발 진행중</td>
                  <td>진행중 (75%)</td>
                  <td>현재</td>
                </tr>
                <tr>
                  <td>최종 검수</td>
                  <td>예정</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
