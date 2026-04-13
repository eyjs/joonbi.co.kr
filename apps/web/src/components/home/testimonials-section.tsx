const testimonials = [
  {
    content: '비용 대비 만족한 결과물이었습니다. 체계적인 산출물과 투명한 진행 과정이 인상적이었어요.',
    author: '김 OO',
    company: 'S재단',
  },
];

export function TestimonialsSection(): JSX.Element {
  return (
    <section className="section">
      <div className="max-w-6xl mx-auto">
        {/* Testimonials */}
        <div className="text-center mb-10">
          <h2 className="heading-lg mb-4">고객 후기</h2>
          <p className="text-gray-500">실제 프로젝트를 진행한 고객들의 이야기입니다.</p>
        </div>

        <div className="max-w-2xl mx-auto">
          {testimonials.map((item) => (
            <div
              key={item.author}
              className="bg-white rounded-xl border border-gray-200 p-8"
            >
              <div className="mb-4">
                <svg className="w-8 h-8 text-blue-100" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10H0z" />
                </svg>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">{item.content}</p>
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
