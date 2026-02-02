export function CommunicationSection() {
  return (
    <section className="swiss-section" style={{ backgroundColor: 'var(--white)' }}>
      <div className="swiss-container">
        <div className="swiss-grid">
          <div className="swiss-col-12">
            <p className="swiss-caption mb-4">06 COMMUNICATION</p>
            <h2 className="swiss-heading-lg mb-12">전화와 미팅을 없애고, 속도와 정확성을 높였습니다</h2>
          </div>

          <div className="swiss-col-6">
            <h3 className="swiss-heading-md mb-6">불필요한 전화/미팅</h3>
            <p className="swiss-body">시간 낭비, 말로만 전달되어 오해의 소지가 많음</p>
          </div>

          <div className="swiss-col-6">
            <h3 className="swiss-heading-md mb-6">채팅 전용 소통</h3>
            <p className="swiss-body">기록으로 남아 명확하고 언제든 확인 가능</p>
          </div>

          <div className="swiss-col-12">
            <div className="swiss-hr" style={{ margin: 'var(--space-12) 0' }}></div>
          </div>

          <div className="swiss-col-4">
            <h3 className="swiss-heading-md mb-4">채팅 전용 소통</h3>
            <p className="swiss-body">모든 대화가 기록으로 남아 오해의 소지가 없습니다.</p>
          </div>

          <div className="swiss-col-4">
            <h3 className="swiss-heading-md mb-4">24~48시간 내 답변</h3>
            <p className="swiss-body">명확한 답변 주기를 보장합니다.</p>
          </div>

          <div className="swiss-col-4">
            <h3 className="swiss-heading-md mb-4">수정 요청은 댓글로</h3>
            <p className="swiss-body">대시보드에서 수정이 필요한 부분에 바로 댓글을 남기세요.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
