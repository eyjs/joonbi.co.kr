export function GuaranteeSection() {
  return (
    <section className="swiss-section" style={{ backgroundColor: 'var(--white)' }}>
      <div className="swiss-container">
        <div className="swiss-grid">
          <div className="swiss-col-12">
            <p className="swiss-caption mb-4">12 GUARANTEE</p>
            <h2 className="swiss-heading-lg mb-6">완성 후에도 안심하세요</h2>
            <p className="swiss-body mb-12">3가지 보장으로 끝까지 책임집니다</p>
          </div>

          <div className="swiss-col-12">
            <table className="swiss-table mb-12">
              <tbody>
                <tr>
                  <td>3개월 무상 A/S</td>
                  <td>배포 후 3개월간 버그 수정과 기술 지원을 무료로 제공합니다.</td>
                </tr>
                <tr>
                  <td>사용 매뉴얼 제공</td>
                  <td>관리자와 사용자를 위한 상세한 사용 매뉴얼을 함께 드립니다.</td>
                </tr>
                <tr>
                  <td>소스코드 전달</td>
                  <td>프로젝트 완료 후 모든 소스코드를 고객에게 이전해 드립니다.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="swiss-col-12">
            <div className="swiss-hr"></div>
            <p className="swiss-body text-center">납품이 끝이 아닙니다. 배포 후에도 안정적으로 운영할 수 있도록 지원합니다.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
