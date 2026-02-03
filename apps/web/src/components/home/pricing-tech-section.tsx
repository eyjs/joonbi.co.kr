export function PricingTechSection(): JSX.Element {
  return (
    <section className="tech-section" id="pricing">
      <div className="tech-container">
        <div className="text-center mb-12">
          <div className="inline-block tech-badge mb-4 animate-pulse">
            🎉 오픈 이벤트
          </div>
          <h2 className="tech-heading-lg mb-4">분석 상담 무료</h2>
          <p className="tech-text mb-8">
            선착순 10명에게 10만원 상당의 분석 상담을 무료로 제공합니다
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="tech-card p-12 border-cyan-400 shadow-2xl shadow-cyan-400/30 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-3 rounded-full text-base font-bold shadow-lg">
                ⚠️ 3명 남음
              </span>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-white font-bold text-3xl mb-6">분석 상담</h3>

              <div className="mb-4">
                <span className="line-through text-gray-500 text-2xl">10만원</span>
              </div>

              <div className="tech-glow-text text-6xl font-bold mb-4">무료</div>

              <div className="text-gray-400 text-lg">~30분 내 완료</div>
            </div>

            <div className="border-t border-gray-700 pt-8 mb-8">
              <h4 className="text-white font-bold text-xl mb-6 text-center">제공 내역</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 text-2xl flex-shrink-0">✓</span>
                  <div>
                    <p className="text-white font-semibold">참고사이트 AI 분석</p>
                    <p className="text-gray-400 text-sm">구조, 기능, 디자인 파악</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 text-2xl flex-shrink-0">✓</span>
                  <div>
                    <p className="text-white font-semibold">업무분석서 PDF</p>
                    <p className="text-gray-400 text-sm">프로젝트 개요, 요청사항 정리</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 text-2xl flex-shrink-0">✓</span>
                  <div>
                    <p className="text-white font-semibold">요구사항명세서 PDF</p>
                    <p className="text-gray-400 text-sm">기능별 상세 명세, 화면 목록</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 text-2xl flex-shrink-0">✓</span>
                  <div>
                    <p className="text-white font-semibold">샘플기획서 PDF</p>
                    <p className="text-gray-400 text-sm">서비스 소개, 기능 설명</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 text-2xl flex-shrink-0">✓</span>
                  <div>
                    <p className="text-white font-semibold">견적서 PDF</p>
                    <p className="text-gray-400 text-sm">기능별 단가, 할인, 결제 조건</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 text-2xl flex-shrink-0">✓</span>
                  <div>
                    <p className="text-white font-semibold tech-glow-text">샘플 화면설계 (Figma)</p>
                    <p className="text-gray-400 text-sm">주요 화면 UI 디자인</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4 text-center">
              <p className="text-yellow-400 font-semibold">💡 계약 진행 시 계약금에서 10만원 차감</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 text-lg">
            정확한 개발 비용은 분석 후 견적서에서 확인하실 수 있습니다
          </p>
        </div>
      </div>
    </section>
  );
}
