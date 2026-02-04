'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

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
  generatedDocuments: string[];
  generatedScreenDesigns: string[];
  createdAt: string;
  updatedAt: string;
}

export default function ConsultationDetailPage(): JSX.Element {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);

  const statuses = ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED'];
  const statusLabels: Record<string, string> = {
    PENDING: '대기중',
    PROCESSING: '처리중',
    COMPLETED: '완료',
    CANCELLED: '취소',
  };

  useEffect(() => {
    if (id) {
      fetchConsultation();
    }
  }, [id]);

  async function fetchConsultation(): Promise<void> {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/consultations/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setConsultation(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch consultation:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(newStatus: string): Promise<void> {
    if (!consultation) return;

    setUpdating(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/consultations/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        await fetchConsultation();
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setUpdating(false);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 tech-border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!consultation) {
    return (
      <div className="text-center py-20">
        <p className="tech-text-secondary text-lg">상담 내역을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <button
            onClick={() => router.back()}
            className="tech-text-secondary hover:tech-text mb-4"
          >
            ← 목록으로
          </button>
          <h1 className="tech-heading text-3xl font-bold mb-2">상담 상세</h1>
          <p className="tech-text-secondary">상담 ID: {consultation.id}</p>
        </div>

        <div className="flex gap-3">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => updateStatus(status)}
              disabled={updating || consultation.status === status}
              className={`px-4 py-2 rounded-lg transition-all ${
                consultation.status === status
                  ? 'tech-gradient text-white'
                  : 'tech-btn-secondary'
              }`}
            >
              {statusLabels[status]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="tech-card rounded-2xl p-6">
          <h2 className="tech-heading text-xl font-bold mb-4">고객 정보</h2>
          <div className="space-y-3">
            <div>
              <label className="tech-text-secondary text-sm">이름</label>
              <p className="tech-text font-medium">{consultation.name}</p>
            </div>
            <div>
              <label className="tech-text-secondary text-sm">이메일</label>
              <p className="tech-text font-medium">{consultation.email}</p>
            </div>
            <div>
              <label className="tech-text-secondary text-sm">연락처</label>
              <p className="tech-text font-medium">{consultation.phone}</p>
            </div>
            <div>
              <label className="tech-text-secondary text-sm">신청일</label>
              <p className="tech-text font-medium">{formatDate(consultation.createdAt)}</p>
            </div>
            <div>
              <label className="tech-text-secondary text-sm">최종 수정일</label>
              <p className="tech-text font-medium">{formatDate(consultation.updatedAt)}</p>
            </div>
          </div>
        </div>

        <div className="tech-card rounded-2xl p-6">
          <h2 className="tech-heading text-xl font-bold mb-4">프로젝트 정보</h2>
          <div className="space-y-3">
            <div>
              <label className="tech-text-secondary text-sm">프로젝트 유형</label>
              <p className="tech-text font-medium">{consultation.projectType}</p>
            </div>
            <div>
              <label className="tech-text-secondary text-sm">예산</label>
              <p className="tech-text font-medium">{consultation.budget}</p>
            </div>
            <div>
              <label className="tech-text-secondary text-sm">상태</label>
              <p>
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
                  {statusLabels[consultation.status]}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="tech-card rounded-2xl p-6 lg:col-span-2">
          <h2 className="tech-heading text-xl font-bold mb-4">프로젝트 설명</h2>
          <p className="tech-text whitespace-pre-wrap">{consultation.description}</p>
        </div>

        {consultation.referenceUrls && consultation.referenceUrls.length > 0 && (
          <div className="tech-card rounded-2xl p-6 lg:col-span-2">
            <h2 className="tech-heading text-xl font-bold mb-4">참고 URL</h2>
            <ul className="space-y-2">
              {consultation.referenceUrls.map((url, idx) => (
                <li key={idx}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tech-accent hover:underline"
                  >
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {consultation.aiAnalysisResult && (
          <div className="tech-card rounded-2xl p-6 lg:col-span-2">
            <h2 className="tech-heading text-xl font-bold mb-4">AI 분석 결과</h2>
            <div className="tech-bg-secondary rounded-lg p-4">
              <pre className="tech-text whitespace-pre-wrap font-mono text-sm">
                {consultation.aiAnalysisResult}
              </pre>
            </div>
          </div>
        )}

        {consultation.generatedDocuments && consultation.generatedDocuments.length > 0 && (
          <div className="tech-card rounded-2xl p-6">
            <h2 className="tech-heading text-xl font-bold mb-4">생성된 문서</h2>
            <ul className="space-y-2">
              {consultation.generatedDocuments.map((doc, idx) => (
                <li key={idx}>
                  <a
                    href={doc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tech-accent hover:underline"
                  >
                    문서 {idx + 1}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {consultation.generatedScreenDesigns && consultation.generatedScreenDesigns.length > 0 && (
          <div className="tech-card rounded-2xl p-6">
            <h2 className="tech-heading text-xl font-bold mb-4">생성된 화면 설계</h2>
            <ul className="space-y-2">
              {consultation.generatedScreenDesigns.map((design, idx) => (
                <li key={idx}>
                  <a
                    href={design}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tech-accent hover:underline"
                  >
                    화면 설계 {idx + 1}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
