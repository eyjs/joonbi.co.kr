'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Project {
  id: string;
  name: string;
  description: string;
  clientName: string;
  startDate: string;
  endDate: string | null;
  status: string;
  progress: number;
  totalAmount: number;
  paidAmount: number;
  createdAt: string;
}

export default function ProjectsPage(): JSX.Element {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [loading, setLoading] = useState<boolean>(true);

  const statuses = ['ALL', 'PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];

  const statusLabels: Record<string, string> = {
    PENDING: '대기중',
    IN_PROGRESS: '진행중',
    COMPLETED: '완료',
    CANCELLED: '취소',
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedStatus === 'ALL') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.status === selectedStatus));
    }
  }, [selectedStatus, projects]);

  async function fetchProjects(): Promise<void> {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/projects', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProjects(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateString: string | null): string {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('ko-KR');
  }

  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(amount);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="tech-heading text-3xl font-bold mb-2">프로젝트 관리</h1>
        <p className="tech-text-secondary">진행 중인 프로젝트를 관리합니다</p>
      </div>

      <div className="flex gap-3 mb-6">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedStatus === status
                ? 'tech-gradient text-white'
                : 'tech-card-hover tech-text-secondary'
            }`}
          >
            {status === 'ALL' ? '전체' : statusLabels[status] || status}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 tech-border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.length === 0 ? (
            <div className="col-span-2 text-center py-20 tech-card rounded-2xl">
              <p className="tech-text-secondary text-lg">프로젝트가 없습니다.</p>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                className="tech-card rounded-2xl p-6 hover:tech-card-hover cursor-pointer transition-all"
                onClick={() => router.push(`/admin/projects/${project.id}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="tech-heading text-xl font-bold mb-1">
                      {project.name}
                    </h3>
                    <p className="tech-text-secondary text-sm">
                      클라이언트: {project.clientName}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'PENDING'
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : project.status === 'IN_PROGRESS'
                        ? 'bg-blue-500/20 text-blue-300'
                        : project.status === 'COMPLETED'
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}
                  >
                    {statusLabels[project.status] || project.status}
                  </span>
                </div>

                <p className="tech-text-secondary text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="tech-text-secondary text-sm">진행률</span>
                    <span className="tech-accent font-semibold">{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 tech-bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full tech-gradient transition-all"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="tech-text-secondary text-xs mb-1">시작일</p>
                    <p className="tech-text text-sm font-medium">
                      {formatDate(project.startDate)}
                    </p>
                  </div>
                  <div>
                    <p className="tech-text-secondary text-xs mb-1">종료일</p>
                    <p className="tech-text text-sm font-medium">
                      {formatDate(project.endDate)}
                    </p>
                  </div>
                </div>

                <div className="border-t tech-border pt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="tech-text-secondary text-xs mb-1">총 금액</p>
                    <p className="tech-text text-sm font-bold">
                      {formatCurrency(project.totalAmount)}
                    </p>
                  </div>
                  <div>
                    <p className="tech-text-secondary text-xs mb-1">결제 완료</p>
                    <p className="tech-accent text-sm font-bold">
                      {formatCurrency(project.paidAmount)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/admin/projects/${project.id}`);
                  }}
                  className="w-full mt-4 tech-btn-secondary py-2"
                >
                  상세보기
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
