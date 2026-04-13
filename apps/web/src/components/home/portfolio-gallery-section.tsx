'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Portfolio {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnailUrl?: string;
  category?: string;
  techStack: string[];
}

export function PortfolioGallerySection(): JSX.Element {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    fetch(`${apiUrl}/api/portfolios?page=1&limit=3`)
      .then((res) => (res.ok ? res.json() : { data: [] }))
      .then((json) => setPortfolios(json.data || []))
      .catch(() => setPortfolios([]));
  }, []);

  return (
    <section id="services" className="section section-alt px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">프로젝트 사례</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            다양한 산업 분야에서 실제 운영 중인 프로젝트들을 확인해보세요.
          </p>
        </div>

        {portfolios.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {portfolios.map((item) => (
              <Link
                key={item.id}
                href={`/portfolio/${item.slug}`}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                  {item.thumbnailUrl ? (
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">{item.category}</span>
                  )}
                </div>
                <div className="p-5">
                  {item.category && (
                    <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
                      {item.category}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-gray-900 mt-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{item.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.techStack.map((tech) => (
                      <span key={tech} className="badge text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400 mb-10">
            포트폴리오를 준비 중입니다.
          </div>
        )}

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
