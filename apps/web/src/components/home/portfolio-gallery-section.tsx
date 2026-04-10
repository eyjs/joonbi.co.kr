import Link from 'next/link';

const portfolioItems = [
  {
    title: '이커머스 플랫폼',
    category: '웹',
    techStack: ['Next.js', 'NestJS', 'PostgreSQL'],
    description: '상품 관리부터 결제까지 원스톱 쇼핑몰 솔루션',
  },
  {
    title: '업무 자동화 시스템',
    category: '시스템',
    techStack: ['Python', 'FastAPI', 'React'],
    description: '반복 업무를 자동화하여 생산성을 3배 향상',
  },
  {
    title: '모바일 예약 앱',
    category: '앱',
    techStack: ['React Native', 'Node.js', 'MongoDB'],
    description: '실시간 예약과 알림 기능을 갖춘 모바일 앱',
  },
];

export function PortfolioGallerySection(): JSX.Element {
  return (
    <section id="services" className="section section-alt px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">프로젝트 사례</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            다양한 산업 분야에서 실제 운영 중인 프로젝트들을 확인해보세요.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {portfolioItems.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-sm">{item.category}</span>
              </div>
              <div className="p-5">
                <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{item.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {item.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="badge text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/portfolio"
            className="btn-secondary inline-flex items-center gap-2"
          >
            전체 포트폴리오 보기
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
