export function TargetAudienceSection() {
  return (
    <section className="swiss-section" style={{ backgroundColor: 'var(--white)' }}>
      <div className="swiss-container">
        <div className="swiss-grid">
          <div className="swiss-col-12">
            <p className="swiss-caption mb-4">10 TARGET AUDIENCE</p>
            <h2 className="swiss-heading-lg mb-12">어떤 분께 적합할까요?</h2>
          </div>

          <div className="swiss-col-6">
            <h3 className="swiss-heading-md mb-6">이런 분들께 강력 추천합니다</h3>
            <ul className="swiss-list mb-8">
              <li>참고할 사이트가 있고, 비슷하게 만들고 싶은 분</li>
              <li>예산이 부족하지만 퀄리티는 포기하고 싶지 않은 분</li>
              <li>개발 지식이 없어도 사이트를 만들고 싶은 분</li>
              <li>빠르게 MVP를 만들어 시장 반응을 보고 싶은 스타트업</li>
            </ul>
          </div>

          <div className="swiss-col-6">
            <h3 className="swiss-heading-md mb-6">이런 분께는 정중히 사양합니다</h3>
            <ul className="swiss-list mb-8">
              <li>완전히 새로운 디자인을 처음부터 기획하고 싶은 분</li>
              <li>대규모 SI 프로젝트나 복잡한 레거시 시스템 통합</li>
              <li>전화나 대면 미팅으로만 소통하고 싶은 분</li>
              <li>당장 내일까지 급하게 완성이 필요한 프로젝트</li>
            </ul>
          </div>

          <div className="swiss-col-12">
            <div className="swiss-hr"></div>
            <p className="swiss-body text-center">위 내용을 확인하셨다면, 이제 상담을 시작해볼까요?</p>
          </div>
        </div>
      </div>
    </section>
  );
}
