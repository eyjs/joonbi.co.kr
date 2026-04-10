'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { Portfolio } from '@/types/portfolio';
import { CategoryFilter } from './category-filter';

interface PortfolioListClientProps {
  portfolios: Portfolio[];
}

export function PortfolioListClient({ portfolios }: PortfolioListClientProps): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = portfolios
      .map((p) => p.category)
      .filter((c): c is string => Boolean(c));
    return Array.from(new Set(cats));
  }, [portfolios]);

  const filteredPortfolios = useMemo(() => {
    if (!selectedCategory) return portfolios;
    return portfolios.filter((p) => p.category === selectedCategory);
  }, [portfolios, selectedCategory]);

  if (portfolios.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">아직 공개된 포트폴리오가 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      {categories.length > 0 && (
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPortfolios.map((portfolio) => (
          <Link
            key={portfolio.id}
            href={`/portfolio/${portfolio.slug}`}
            className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {portfolio.thumbnailUrl ? (
              <div className="aspect-video overflow-hidden bg-gray-100">
                <img
                  src={portfolio.thumbnailUrl}
                  alt={portfolio.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ) : (
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-sm">No Image</span>
              </div>
            )}

            <div className="p-5">
              {portfolio.category && (
                <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
                  {portfolio.category}
                </span>
              )}

              <h2 className="text-lg font-bold text-gray-900 mt-1 group-hover:text-blue-600 transition-colors">
                {portfolio.title}
              </h2>

              {portfolio.description && (
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                  {portfolio.description}
                </p>
              )}

              {portfolio.techStack && portfolio.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {portfolio.techStack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="badge text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {portfolio.techStack.length > 5 && (
                    <span className="text-xs text-gray-400">
                      +{portfolio.techStack.length - 5}
                    </span>
                  )}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
