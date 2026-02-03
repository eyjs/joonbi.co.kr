export function CTATechSection(): JSX.Element {
  return (
    <section className="tech-section" id="contact">
      <div className="tech-container">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block tech-badge mb-4 text-lg px-6 py-3 animate-pulse">
            선착순 10명 분석 상담 무료
          </div>

          <h2 className="tech-heading-xl">
            지금 바로 <span className="tech-glow-text">시작하세요</span>
          </h2>

          <p className="tech-text text-2xl">
            참고사이트만 준비하시면,<br />
            30분 내 모든 분석이 완료됩니다
          </p>

          <div className="tech-card inline-block px-12 py-6 border-cyan-400 mb-8">
            <p className="text-gray-400 text-lg mb-2">분석 상담 비용</p>
            <p className="text-white text-3xl">
              <span className="line-through text-gray-500">10만원</span>
              <span className="tech-glow-text font-bold text-5xl ml-4">→ 0원</span>
            </p>
          </div>

          <div className="flex flex-col items-center gap-6">
            <a
              href="/consultation"
              className="tech-btn-primary text-2xl px-16 py-6 inline-flex items-center gap-3"
            >
              무료 분석 신청하기
              <span className="text-3xl">⚡</span>
            </a>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-8">
              <div className="flex items-center justify-center gap-2 text-white">
                <span className="text-cyan-400 text-2xl">✓</span>
                <span className="font-semibold">카드 등록 불필요</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-white">
                <span className="text-cyan-400 text-2xl">✓</span>
                <span className="font-semibold">30분 내 결과 전달</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-white">
                <span className="text-cyan-400 text-2xl">✓</span>
                <span className="font-semibold">계약 시 10만원 차감</span>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-700">
            <p className="text-gray-400">
              궁금한 점이 있으신가요?{' '}
              <a href="#process" className="text-cyan-400 hover:text-cyan-300 underline">
                작동 원리 먼저 보기
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
