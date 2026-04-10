const stats = [
  { value: '50+', label: '완료 프로젝트' },
  { value: '98%', label: '고객 만족도' },
  { value: '30분', label: '평균 분석 시간' },
  { value: '100%', label: '납품 완료율' },
];

const testimonials = [
  {
    content: '진행 상황을 실시간으로 확인할 수 있어서 안심이 됐습니다. 다른 외주와는 다른 투명한 프로세스였어요.',
    author: '김 대표',
    company: '이커머스 스타트업',
  },
  {
    content: '상담 단계에서 AI 분석 결과를 보고 프로젝트 전체 구조를 파악할 수 있었습니다. 기획 비용을 절약했습니다.',
    author: '박 팀장',
    company: '물류 관리 회사',
  },
  {
    content: '산출물이 체계적이고, 인수인계도 깔끔했습니다. 유지보수도 문제없이 진행하고 있어요.',
    author: '이 대표',
    company: '헬스케어 스타트업',
  },
];

export function TestimonialsSection(): JSX.Element {
  return (
    <section className="section px-4">
      <div className="max-w-6xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-10">
          <h2 className="heading-lg mb-4">고객 후기</h2>
          <p className="text-gray-500">실제 프로젝트를 진행한 고객들의 이야기입니다.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.author}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="mb-4">
                <svg className="w-8 h-8 text-blue-100" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10H0z" />
                </svg>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">{item.content}</p>
              <div>
                <div className="font-semibold text-gray-900">{item.author}</div>
                <div className="text-sm text-gray-500">{item.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
