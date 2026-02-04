'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Portfolio {
  id: string;
  title: string;
  description: string;
  category: string;
  techStack: string[];
  thumbnailUrl: string | null;
  demoUrl: string | null;
  githubUrl: string | null;
  isPublished: boolean;
  createdAt: string;
}

export default function PortfoliosPage(): JSX.Element {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState<Portfolio[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [loading, setLoading] = useState<boolean>(true);

  const categories = ['ALL', 'WEB', 'MOBILE', 'DESKTOP', 'AI', 'BLOCKCHAIN', 'OTHER'];

  useEffect(() => {
    fetchPortfolios();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'ALL') {
      setFilteredPortfolios(portfolios);
    } else {
      setFilteredPortfolios(portfolios.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, portfolios]);

  async function fetchPortfolios(): Promise<void> {
    try {
      const response = await fetch('/api/portfolios');
      if (response.ok) {
        const data = await response.json();
        setPortfolios(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch portfolios:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen tech-bg flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="tech-heading text-4xl font-bold mb-4">포트폴리오</h1>
          <p className="tech-text-secondary text-lg mb-12">
            준비스튜디오의 프로젝트를 확인하세요
          </p>

          <div className="flex gap-3 mb-12 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCategory === cat
                    ? 'tech-gradient text-white'
                    : 'tech-card-hover tech-text-secondary hover:tech-text'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 tech-border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredPortfolios.length === 0 ? (
            <div className="text-center py-20">
              <p className="tech-text-secondary text-lg">포트폴리오가 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPortfolios.map((portfolio) => (
                <div
                  key={portfolio.id}
                  className="tech-card-hover rounded-2xl overflow-hidden flex flex-col"
                >
                  <div className="h-48 tech-bg-secondary relative overflow-hidden">
                    {portfolio.thumbnailUrl ? (
                      <img
                        src={portfolio.thumbnailUrl}
                        alt={portfolio.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center tech-text-secondary">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-2">
                      <span className="text-xs tech-accent font-semibold">
                        {portfolio.category}
                      </span>
                    </div>

                    <h3 className="tech-heading text-xl font-bold mb-2">
                      {portfolio.title}
                    </h3>

                    <p className="tech-text-secondary mb-4 flex-1">
                      {portfolio.description}
                    </p>

                    {portfolio.techStack && portfolio.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {portfolio.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-3 py-1 rounded-full tech-bg-secondary tech-text-secondary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-3">
                      {portfolio.demoUrl && (
                        <a
                          href={portfolio.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tech-btn-secondary text-sm py-2 px-4"
                        >
                          데모 보기
                        </a>
                      )}
                      {portfolio.githubUrl && (
                        <a
                          href={portfolio.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tech-btn-secondary text-sm py-2 px-4"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
