'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Consultation {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  referenceUrls: string[];
  description: string;
  status: string;
  aiAnalysisResult: string | null;
  createdAt: string;
}

export default function ConsultationsPage(): JSX.Element {
  const router = useRouter();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [filteredConsultations, setFilteredConsultations] = useState<Consultation[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [loading, setLoading] = useState<boolean>(true);

  const statuses = ['ALL', 'PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED'];

  const statusLabels: Record<string, string> = {
    PENDING: '대기중',
    PROCESSING: '처리중',
    COMPLETED: '완료',
    CANCELLED: '취소',
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  useEffect(() => {
    if (selectedStatus === 'ALL') {
      setFilteredConsultations(consultations);
    } else {
      setFilteredConsultations(consultations.filter(c => c.status === selectedStatus));
    }
  }, [selectedStatus, consultations]);

  async function fetchConsultations(): Promise<void> {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/consultations', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setConsultations(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch consultations:', error);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="tech-heading text-3xl font-bold mb-2">상담 관리</h1>
        <p className="tech-text-secondary">고객 상담 신청을 관리합니다</p>
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
        <div className="tech-card rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="tech-bg-secondary">
              <tr>
                <th className="px-6 py-4 text-left tech-text font-semibold">이름</th>
                <th className="px-6 py-4 text-left tech-text font-semibold">연락처</th>
                <th className="px-6 py-4 text-left tech-text font-semibold">프로젝트 유형</th>
                <th className="px-6 py-4 text-left tech-text font-semibold">예산</th>
                <th className="px-6 py-4 text-left tech-text font-semibold">상태</th>
                <th className="px-6 py-4 text-left tech-text font-semibold">신청일</th>
                <th className="px-6 py-4 text-left tech-text font-semibold">작업</th>
              </tr>
            </thead>
            <tbody>
              {filteredConsultations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center tech-text-secondary">
                    상담 내역이 없습니다.
                  </td>
                </tr>
              ) : (
                filteredConsultations.map((consultation) => (
                  <tr
                    key={consultation.id}
                    className="border-t tech-border hover:tech-bg-secondary cursor-pointer"
                    onClick={() => router.push(`/admin/consultations/${consultation.id}`)}
                  >
                    <td className="px-6 py-4 tech-text">{consultation.name}</td>
                    <td className="px-6 py-4 tech-text-secondary text-sm">
                      <div>{consultation.email}</div>
                      <div>{consultation.phone}</div>
                    </td>
                    <td className="px-6 py-4 tech-text">{consultation.projectType}</td>
                    <td className="px-6 py-4 tech-text">{consultation.budget}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          consultation.status === 'PENDING'
                            ? 'bg-yellow-500/20 text-yellow-300'
                            : consultation.status === 'PROCESSING'
                            ? 'bg-blue-500/20 text-blue-300'
                            : consultation.status === 'COMPLETED'
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-red-500/20 text-red-300'
                        }`}
                      >
                        {statusLabels[consultation.status] || consultation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 tech-text-secondary text-sm">
                      {formatDate(consultation.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/admin/consultations/${consultation.id}`);
                        }}
                        className="tech-btn-secondary py-1 px-4 text-sm"
                      >
                        상세보기
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
