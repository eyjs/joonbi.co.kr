'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/stores/auth';
import { api } from '@/lib/api';
import type { ProjectResponse } from '@/types/project';
import type { ConsultationResponse } from '@/types/consultation';

export default function AdminDashboardPage() {
  const { user } = useAuthStore();
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [consultations, setConsultations] = useState<ConsultationResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [projectsData, consultationsData] = await Promise.all([
          api.get<{ data: ProjectResponse[] }>('/api/projects?page=1&limit=10'),
          api.get<ConsultationResponse[]>('/api/consultations'),
        ]);

        setProjects(projectsData.data || []);
        setConsultations(consultationsData || []);
      } catch (err: unknown) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-400 text-sm">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">
          안녕하세요, {user?.name}님
        </h1>
        <p className="text-sm text-gray-400">
          프로젝트 현황을 확인하고 관리하세요
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
          <p className="text-sm text-gray-400 mb-2">진행중인 프로젝트</p>
          <p className="text-3xl font-bold text-white">
            {projects.filter(p => p.status === 'IN_PROGRESS').length}
          </p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
          <p className="text-sm text-gray-400 mb-2">전체 상담</p>
          <p className="text-3xl font-bold text-white">{consultations.length}</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
          <p className="text-sm text-gray-400 mb-2">전체 프로젝트</p>
          <p className="text-3xl font-bold text-white">{projects.length}</p>
        </div>
      </div>

      {/* Projects Section */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-white">내 프로젝트</h2>
          <Link href="/consultation">
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              새 프로젝트 상담하기
            </button>
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="bg-gray-800 border border-gray-700 rounded-xl">
            <div className="flex flex-col items-center justify-center py-12">
              <svg
                className="w-16 h-16 text-gray-600 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <p className="text-gray-400 mb-4">
                아직 진행중인 프로젝트가 없습니다
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {projects.map((project) => {
              const statusLabels: Record<string, string> = {
                PENDING: '대기중',
                IN_PROGRESS: '진행중',
                REVIEW: '검토중',
                COMPLETED: '완료',
                CANCELLED: '취소됨',
              };

              const statusColors: Record<string, string> = {
                PENDING: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
                IN_PROGRESS: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
                REVIEW: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
                COMPLETED: 'bg-green-500/20 text-green-400 border-green-500/40',
                CANCELLED: 'bg-gray-500/20 text-gray-400 border-gray-500/40',
              };

              return (
                <div
                  key={project.id}
                  className="bg-gray-800 border border-gray-700 rounded-xl p-5 hover:border-blue-500/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{project.projectName}</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        {project.projectCode}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[project.status]}`}>
                      {statusLabels[project.status]}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">
                      {project.totalAmount.toLocaleString()}원
                    </span>
                    <Link href={`/projects/${project.id}`}>
                      <button
                        type="button"
                        className="text-sm px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      >
                        자세히 보기
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Consultations Section */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4">상담 내역</h2>
        {consultations.length === 0 ? (
          <div className="bg-gray-800 border border-gray-700 rounded-xl">
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-400 mb-4">
                아직 상담 내역이 없습니다
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {consultations.map((consultation) => {
              const statusLabels: Record<string, string> = {
                PENDING: '대기중',
                ANALYZING: '분석중',
                COMPLETED: '완료',
                REJECTED: '거절',
              };

              const statusColors: Record<string, string> = {
                PENDING: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
                ANALYZING: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
                COMPLETED: 'bg-green-500/20 text-green-400 border-green-500/40',
                REJECTED: 'bg-red-500/20 text-red-400 border-red-500/40',
              };

              return (
                <div key={consultation.id} className="bg-gray-800 border border-gray-700 rounded-xl p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {consultation.projectName}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {consultation.type === 'ANALYSIS'
                          ? '분석 상담'
                          : '간편 상담'}{' '}
                        / {new Date(consultation.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[consultation.status]}`}>
                      {statusLabels[consultation.status] || consultation.status}
                    </span>
                  </div>
                  <Link href={`/consultations/${consultation.id}`}>
                    <button
                      type="button"
                      className="text-sm px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      상세 보기
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
