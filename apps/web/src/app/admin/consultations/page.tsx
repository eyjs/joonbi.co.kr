'use client';

import { useEffect, useState, useCallback } from 'react';
import { api } from '@/lib/api';
import type { ConsultationResponse, ConsultationStatus } from '@/types/consultation';

const STATUS_LABELS: Record<ConsultationStatus, string> = {
  PENDING: '대기중',
  PROCESSING: '진행중',
  COMPLETED: '완료',
  REJECTED: '거절',
  CONVERTED: '전환됨',
};

const STATUS_COLORS: Record<ConsultationStatus, string> = {
  PENDING: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
  PROCESSING: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
  COMPLETED: 'bg-green-500/20 text-green-400 border-green-500/40',
  REJECTED: 'bg-red-500/20 text-red-400 border-red-500/40',
  CONVERTED: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
};

const ALL_STATUSES: ConsultationStatus[] = ['PENDING', 'PROCESSING', 'COMPLETED', 'REJECTED', 'CONVERTED'];

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

function formatCurrency(min: number | null, max: number | null): string {
  if (min === null && max === null) return '-';
  const format = (n: number) => `${(n / 10000).toLocaleString()}만원`;
  if (min !== null && max !== null) return `${format(min)} ~ ${format(max)}`;
  if (min !== null) return `${format(min)}~`;
  return `~${format(max!)}`;
}

export default function AdminConsultationsPage(): JSX.Element {
  const [consultations, setConsultations] = useState<ConsultationResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<ConsultationStatus | 'ALL'>('ALL');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<ConsultationResponse | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    async function fetchConsultations(): Promise<void> {
      try {
        setLoading(true);
        const data = await api.get<ConsultationResponse[]>('/api/admin/consultations');
        setConsultations(data);
      } catch {
        setError('상담 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }

    fetchConsultations();
  }, []);

  const handleSelectConsultation = useCallback(async (id: string) => {
    if (selectedId === id) {
      setSelectedId(null);
      setDetail(null);
      return;
    }

    setSelectedId(id);
    setDetailLoading(true);

    try {
      const data = await api.get<ConsultationResponse>(`/api/admin/consultations/${id}`);
      setDetail(data);
    } catch {
      setDetail(null);
    } finally {
      setDetailLoading(false);
    }
  }, [selectedId]);

  const filteredConsultations = statusFilter === 'ALL'
    ? consultations
    : consultations.filter((c) => c.status === statusFilter);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-400 text-sm">로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">상담 관리</h1>
        <p className="text-sm text-gray-400">
          전체 {consultations.length}건
          {statusFilter !== 'ALL' && ` / 필터: ${STATUS_LABELS[statusFilter]} ${filteredConsultations.length}건`}
        </p>
      </div>

      {/* Status filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          type="button"
          onClick={() => setStatusFilter('ALL')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
            statusFilter === 'ALL'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          전체 ({consultations.length})
        </button>
        {ALL_STATUSES.map((status) => {
          const count = consultations.filter((c) => c.status === status).length;
          return (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                statusFilter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {STATUS_LABELS[status]} ({count})
            </button>
          );
        })}
      </div>

      {/* Table */}
      {filteredConsultations.length === 0 ? (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
          <p className="text-gray-400">
            {statusFilter === 'ALL' ? '상담 내역이 없습니다.' : `${STATUS_LABELS[statusFilter]} 상태의 상담이 없습니다.`}
          </p>
        </div>
      ) : (
        <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400">
                  <th className="text-left px-4 py-3 font-medium">프로젝트명</th>
                  <th className="text-left px-4 py-3 font-medium">유형</th>
                  <th className="text-left px-4 py-3 font-medium">상태</th>
                  <th className="text-left px-4 py-3 font-medium">예산</th>
                  <th className="text-left px-4 py-3 font-medium">AI 견적</th>
                  <th className="text-left px-4 py-3 font-medium">신청일</th>
                </tr>
              </thead>
              <tbody>
                {filteredConsultations.map((consultation) => (
                  <tr
                    key={consultation.id}
                    onClick={() => handleSelectConsultation(consultation.id)}
                    className={`border-b border-gray-700/50 cursor-pointer transition-colors ${
                      selectedId === consultation.id
                        ? 'bg-gray-700/50'
                        : 'hover:bg-gray-700/30'
                    }`}
                  >
                    <td className="px-4 py-3 text-white font-medium">
                      {consultation.projectName}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {consultation.type === 'ANALYSIS' ? '분석' : '간편'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${STATUS_COLORS[consultation.status]}`}>
                        {STATUS_LABELS[consultation.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {consultation.budgetRange || '-'}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {formatCurrency(consultation.aiEstimatedMin, consultation.aiEstimatedMax)}
                    </td>
                    <td className="px-4 py-3 text-gray-400">
                      {formatDate(consultation.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail panel */}
      {selectedId && (
        <div className="mt-6 bg-gray-800 border border-gray-700 rounded-xl p-6">
          {detailLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-gray-600 border-t-blue-500 rounded-full animate-spin" />
            </div>
          ) : detail ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">{detail.projectName}</h2>
                  <p className="text-xs text-gray-500 mt-1">ID: {detail.id}</p>
                </div>
                <button
                  type="button"
                  onClick={() => { setSelectedId(null); setDetail(null); }}
                  className="text-gray-400 hover:text-gray-200 p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                  aria-label="상세 패널 닫기"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <DetailField label="상담 유형" value={detail.type === 'ANALYSIS' ? '분석 상담' : '간편 상담'} />
                <DetailField label="상태" value={STATUS_LABELS[detail.status]} />
                <DetailField label="예산 범위" value={detail.budgetRange || '-'} />
                <DetailField label="희망 완료일" value={detail.desiredDate ? formatDate(detail.desiredDate) : '-'} />
                <DetailField label="AI 견적" value={formatCurrency(detail.aiEstimatedMin, detail.aiEstimatedMax)} />
                <DetailField label="AI 예상 개발일수" value={detail.aiEstimatedDays ? `${detail.aiEstimatedDays}일` : '-'} />
                <DetailField label="실행 가능성" value={detail.aiFeasibility || '-'} />
                <DetailField label="신청일" value={formatDate(detail.createdAt)} />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">프로젝트 설명</p>
                <p className="text-sm text-gray-200 whitespace-pre-wrap bg-gray-700/50 rounded-lg p-3">
                  {detail.description}
                </p>
              </div>

              {detail.referenceUrls.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-400 mb-1">참고 URL</p>
                  <ul className="space-y-1">
                    {detail.referenceUrls.map((url, index) => (
                      <li key={index}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-400 hover:text-blue-300 underline break-all"
                        >
                          {url}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {detail.aiFeatures && detail.aiFeatures.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-400 mb-2">AI 추출 기능 목록</p>
                  <div className="bg-gray-700/50 rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-600 text-gray-400">
                          <th className="text-left px-3 py-2 font-medium">기능명</th>
                          <th className="text-right px-3 py-2 font-medium">예상 가격</th>
                          <th className="text-center px-3 py-2 font-medium">필수</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detail.aiFeatures.map((feature, index) => (
                          <tr key={index} className="border-b border-gray-600/50">
                            <td className="px-3 py-2 text-gray-200">{feature.name}</td>
                            <td className="px-3 py-2 text-gray-300 text-right">{feature.price.toLocaleString()}원</td>
                            <td className="px-3 py-2 text-center">{feature.required ? '필수' : '선택'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {detail.aiRisks.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-400 mb-1">AI 식별 리스크</p>
                  <ul className="list-disc list-inside space-y-1">
                    {detail.aiRisks.map((risk, index) => (
                      <li key={index} className="text-sm text-yellow-400">{risk}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-400 text-sm text-center py-4">상담 정보를 불러올 수 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
}

function DetailField({ label, value }: { label: string; value: string }): JSX.Element {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm text-gray-200">{value}</p>
    </div>
  );
}
