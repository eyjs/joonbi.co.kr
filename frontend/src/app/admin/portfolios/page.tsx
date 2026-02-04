'use client';

import { useState, useEffect } from 'react';

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

export default function AdminPortfoliosPage(): JSX.Element {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'WEB',
    techStack: '',
    thumbnailUrl: '',
    demoUrl: '',
    githubUrl: '',
    isPublished: false,
  });

  const categories = ['WEB', 'MOBILE', 'DESKTOP', 'AI', 'BLOCKCHAIN', 'OTHER'];

  useEffect(() => {
    fetchPortfolios();
  }, []);

  async function fetchPortfolios(): Promise<void> {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/portfolios', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

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

  function openCreateModal(): void {
    setEditingPortfolio(null);
    setFormData({
      title: '',
      description: '',
      category: 'WEB',
      techStack: '',
      thumbnailUrl: '',
      demoUrl: '',
      githubUrl: '',
      isPublished: false,
    });
    setShowModal(true);
  }

  function openEditModal(portfolio: Portfolio): void {
    setEditingPortfolio(portfolio);
    setFormData({
      title: portfolio.title,
      description: portfolio.description,
      category: portfolio.category,
      techStack: portfolio.techStack.join(', '),
      thumbnailUrl: portfolio.thumbnailUrl || '',
      demoUrl: portfolio.demoUrl || '',
      githubUrl: portfolio.githubUrl || '',
      isPublished: portfolio.isPublished,
    });
    setShowModal(true);
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();

    const techStackArray = formData.techStack
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const payload = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      techStack: techStackArray,
      thumbnailUrl: formData.thumbnailUrl || null,
      demoUrl: formData.demoUrl || null,
      githubUrl: formData.githubUrl || null,
      isPublished: formData.isPublished,
    };

    try {
      const token = localStorage.getItem('adminToken');
      const url = editingPortfolio
        ? `/api/admin/portfolios/${editingPortfolio.id}`
        : '/api/admin/portfolios';
      const method = editingPortfolio ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setShowModal(false);
        await fetchPortfolios();
      }
    } catch (error) {
      console.error('Failed to save portfolio:', error);
    }
  }

  async function deletePortfolio(id: string): Promise<void> {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/portfolios/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchPortfolios();
      }
    } catch (error) {
      console.error('Failed to delete portfolio:', error);
    }
  }

  async function togglePublish(id: string, isPublished: boolean): Promise<void> {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/portfolios/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ isPublished: !isPublished }),
      });

      if (response.ok) {
        await fetchPortfolios();
      }
    } catch (error) {
      console.error('Failed to toggle publish:', error);
    }
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('ko-KR');
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="tech-heading text-3xl font-bold mb-2">포트폴리오 관리</h1>
          <p className="tech-text-secondary">포트폴리오를 관리합니다</p>
        </div>
        <button
          onClick={openCreateModal}
          className="tech-btn-primary px-6 py-3"
        >
          + 새 포트폴리오
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 tech-border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {portfolios.length === 0 ? (
            <div className="col-span-2 text-center py-20 tech-card rounded-2xl">
              <p className="tech-text-secondary text-lg">포트폴리오가 없습니다.</p>
            </div>
          ) : (
            portfolios.map((portfolio) => (
              <div
                key={portfolio.id}
                className="tech-card rounded-2xl overflow-hidden"
              >
                <div className="h-48 tech-bg-secondary relative">
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
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        portfolio.isPublished
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-gray-500/20 text-gray-300'
                      }`}
                    >
                      {portfolio.isPublished ? '공개' : '비공개'}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-xs tech-accent font-semibold">
                      {portfolio.category}
                    </span>
                  </div>

                  <h3 className="tech-heading text-xl font-bold mb-2">
                    {portfolio.title}
                  </h3>

                  <p className="tech-text-secondary mb-4 line-clamp-2">
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

                  <p className="tech-text-secondary text-xs mb-4">
                    생성일: {formatDate(portfolio.createdAt)}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(portfolio)}
                      className="flex-1 tech-btn-secondary py-2 text-sm"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => togglePublish(portfolio.id, portfolio.isPublished)}
                      className="flex-1 tech-btn-secondary py-2 text-sm"
                    >
                      {portfolio.isPublished ? '비공개' : '공개'}
                    </button>
                    <button
                      onClick={() => deletePortfolio(portfolio.id)}
                      className="px-4 py-2 text-sm rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="tech-card rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="tech-heading text-2xl font-bold mb-6">
              {editingPortfolio ? '포트폴리오 수정' : '새 포트폴리오'}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block tech-text mb-2">제목 *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full tech-input rounded-lg p-3"
                  />
                </div>

                <div>
                  <label className="block tech-text mb-2">설명 *</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full tech-input rounded-lg p-3 min-h-[100px]"
                  />
                </div>

                <div>
                  <label className="block tech-text mb-2">카테고리 *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full tech-input rounded-lg p-3"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block tech-text mb-2">기술 스택 (쉼표로 구분)</label>
                  <input
                    type="text"
                    value={formData.techStack}
                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                    placeholder="React, TypeScript, Node.js"
                    className="w-full tech-input rounded-lg p-3"
                  />
                </div>

                <div>
                  <label className="block tech-text mb-2">썸네일 URL</label>
                  <input
                    type="url"
                    value={formData.thumbnailUrl}
                    onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                    className="w-full tech-input rounded-lg p-3"
                  />
                </div>

                <div>
                  <label className="block tech-text mb-2">데모 URL</label>
                  <input
                    type="url"
                    value={formData.demoUrl}
                    onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                    className="w-full tech-input rounded-lg p-3"
                  />
                </div>

                <div>
                  <label className="block tech-text mb-2">GitHub URL</label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full tech-input rounded-lg p-3"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <label htmlFor="isPublished" className="tech-text">
                    공개
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 tech-btn-secondary py-3"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 tech-btn-primary py-3"
                >
                  {editingPortfolio ? '수정' : '생성'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
