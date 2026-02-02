import Link from 'next/link';

export function PricingSection() {
  return (
    <section id="pricing" className="swiss-section" style={{ backgroundColor: 'var(--white)' }}>
      <div className="swiss-container">
        <div className="swiss-grid">
          <div className="swiss-col-12">
            <p className="swiss-caption mb-4">08 PRICING</p>
            <h2 className="swiss-heading-lg mb-6">투명한 가격 정책</h2>
            <p className="swiss-body mb-12">명확한 가격, 숨겨진 비용 없음</p>
          </div>

          <div className="swiss-col-12">
            <table className="swiss-table mb-12">
              <thead>
                <tr>
                  <th>패키지</th>
                  <th>가격</th>
                  <th>포함 내용</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>랜딩페이지</td>
                  <td>3만원 (1장 당)</td>
                  <td>반응형 디자인, SEO 최적화, 빠른 로딩 속도</td>
                </tr>
                <tr>
                  <td>홈페이지 (인기)</td>
                  <td>50~100만원</td>
                  <td>5~10페이지 기준, 랜딩페이지 모든 기능, 다중 페이지 구성, 문의 폼 연동, AI 화면설계 포함</td>
                </tr>
                <tr>
                  <td>관리자 시스템</td>
                  <td>300만원~</td>
                  <td>회원 관리, 데이터베이스 설계, API 개발, 관리자 대시보드</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="swiss-col-6">
            <Link href="/consultation" className="swiss-button block text-center">
              상담 신청
            </Link>
          </div>

          <div className="swiss-col-6">
            <Link href="/consultation" className="swiss-button-outline block text-center">
              지금 시작하기
            </Link>
          </div>

          <div className="swiss-col-12">
            <div className="swiss-hr"></div>
            <p className="swiss-caption text-center">계약금 30% + 잔금 70% (안전한 분할 결제)</p>
            <p className="swiss-caption text-center">*가격은 예시이며 복잡도에 따라 달라질 수 있습니다.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
