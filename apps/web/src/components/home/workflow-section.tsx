export function WorkflowSection() {
  return (
    <section className="swiss-section">
      <div className="swiss-container">
        <div className="swiss-grid">
          <div className="swiss-col-12">
            <p className="swiss-caption mb-4">11 WORKFLOW</p>
            <h2 className="swiss-heading-lg mb-6">간단한 4단계로 완성됩니다</h2>
            <p className="swiss-body mb-12">복잡한 절차 없이, 명확한 프로세스로 진행됩니다</p>
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
                  <td>01. 상담 신청</td>
                  <td>참고 사이트 링크와 설명을 제출하면, AI가 자동으로 요구사항을 분석합니다.</td>
                </tr>
                <tr>
                  <td>02. AI 화면설계</td>
                  <td>30분 내로 화면설계서(4종)가 생성됩니다. 수정 요청은 댓글로 남기세요.</td>
                </tr>
                <tr>
                  <td>03. 개발 진행</td>
                  <td>실시간 대시보드에서 진행률을 확인하고, 산출물에 피드백을 남길 수 있습니다.</td>
                </tr>
                <tr>
                  <td>04. 배포 & 인수</td>
                  <td>최종 검수 후 배포하고, 소스코드와 사용 매뉴얼을 전달받습니다.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="swiss-col-12">
            <div className="swiss-hr"></div>
            <p className="swiss-body text-center">전화나 미팅 없이, 채팅과 대시보드만으로 프로젝트가 완성됩니다.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
