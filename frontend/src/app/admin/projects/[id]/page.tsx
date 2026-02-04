'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Deliverable {
  id: string;
  name: string;
  type: string;
  status: string;
  fileUrl: string | null;
  createdAt: string;
}

interface Payment {
  id: string;
  amount: number;
  status: string;
  paidAt: string | null;
  createdAt: string;
}

interface Message {
  id: string;
  content: string;
  isFromClient: boolean;
  createdAt: string;
}

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
  deliverables: Deliverable[];
  payments: Payment[];
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export default function ProjectDetailPage(): JSX.Element {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  async function fetchProject(): Promise<void> {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/projects/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProject(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch project:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProgress(newProgress: number): Promise<void> {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ progress: newProgress }),
      });

      if (response.ok) {
        await fetchProject();
      }
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  }

  async function updateDeliverableStatus(deliverableId: string, newStatus: string): Promise<void> {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/deliverables/${deliverableId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        await fetchProject();
      }
    } catch (error) {
      console.error('Failed to update deliverable status:', error);
    }
  }

  async function sendMessage(): Promise<void> {
    if (!newMessage.trim()) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/projects/${id}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newMessage }),
      });

      if (response.ok) {
        setNewMessage('');
        await fetchProject();
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }

  function formatDate(dateString: string | null): string {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }

  function formatDateTime(dateString: string): string {
    return new Date(dateString).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(amount);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 tech-border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-20">
        <p className="tech-text-secondary text-lg">프로젝트를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const statusLabels: Record<string, string> = {
    PENDING: '대기중',
    IN_PROGRESS: '진행중',
    COMPLETED: '완료',
    CANCELLED: '취소',
  };

  const deliverableStatusLabels: Record<string, string> = {
    PENDING: '대기중',
    IN_PROGRESS: '진행중',
    REVIEW: '검토중',
    APPROVED: '승인',
    REJECTED: '반려',
  };

  const paymentStatusLabels: Record<string, string> = {
    PENDING: '대기중',
    COMPLETED: '완료',
    CANCELLED: '취소',
  };

  return (
    <div>
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="tech-text-secondary hover:tech-text mb-4"
        >
          ← 목록으로
        </button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="tech-heading text-3xl font-bold mb-2">{project.name}</h1>
            <p className="tech-text-secondary">클라이언트: {project.clientName}</p>
          </div>
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              project.status === 'PENDING'
                ? 'bg-yellow-500/20 text-yellow-300'
                : project.status === 'IN_PROGRESS'
                ? 'bg-blue-500/20 text-blue-300'
                : project.status === 'COMPLETED'
                ? 'bg-green-500/20 text-green-300'
                : 'bg-red-500/20 text-red-300'
            }`}
          >
            {statusLabels[project.status]}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="tech-card rounded-2xl p-6">
          <h3 className="tech-text-secondary text-sm mb-2">진행률</h3>
          <div className="flex items-end gap-2 mb-3">
            <span className="tech-heading text-3xl font-bold">{project.progress}%</span>
          </div>
          <div className="w-full h-2 tech-bg-secondary rounded-full overflow-hidden mb-3">
            <div
              className="h-full tech-gradient transition-all"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={project.progress}
            onChange={(e) => updateProgress(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="tech-card rounded-2xl p-6">
          <h3 className="tech-text-secondary text-sm mb-2">총 금액</h3>
          <p className="tech-heading text-2xl font-bold mb-1">
            {formatCurrency(project.totalAmount)}
          </p>
          <p className="tech-text-secondary text-sm">
            결제 완료: <span className="tech-accent font-semibold">{formatCurrency(project.paidAmount)}</span>
          </p>
        </div>

        <div className="tech-card rounded-2xl p-6">
          <h3 className="tech-text-secondary text-sm mb-2">기간</h3>
          <p className="tech-text font-medium">
            {formatDate(project.startDate)} ~ {formatDate(project.endDate)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="tech-card rounded-2xl p-6">
          <h2 className="tech-heading text-xl font-bold mb-4">프로젝트 설명</h2>
          <p className="tech-text whitespace-pre-wrap">{project.description}</p>
        </div>

        <div className="tech-card rounded-2xl p-6">
          <h2 className="tech-heading text-xl font-bold mb-4">산출물 관리</h2>
          {project.deliverables && project.deliverables.length > 0 ? (
            <div className="space-y-3">
              {project.deliverables.map((deliverable) => (
                <div
                  key={deliverable.id}
                  className="tech-bg-secondary rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="tech-text font-semibold">{deliverable.name}</h4>
                      <p className="tech-text-secondary text-xs">{deliverable.type}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        deliverable.status === 'APPROVED'
                          ? 'bg-green-500/20 text-green-300'
                          : deliverable.status === 'REJECTED'
                          ? 'bg-red-500/20 text-red-300'
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}
                    >
                      {deliverableStatusLabels[deliverable.status]}
                    </span>
                  </div>
                  {deliverable.fileUrl && (
                    <a
                      href={deliverable.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tech-accent text-sm hover:underline"
                    >
                      파일 다운로드
                    </a>
                  )}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => updateDeliverableStatus(deliverable.id, 'APPROVED')}
                      className="text-xs px-3 py-1 rounded bg-green-500/20 text-green-300 hover:bg-green-500/30"
                    >
                      승인
                    </button>
                    <button
                      onClick={() => updateDeliverableStatus(deliverable.id, 'REJECTED')}
                      className="text-xs px-3 py-1 rounded bg-red-500/20 text-red-300 hover:bg-red-500/30"
                    >
                      반려
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="tech-text-secondary text-sm">산출물이 없습니다.</p>
          )}
        </div>

        <div className="tech-card rounded-2xl p-6">
          <h2 className="tech-heading text-xl font-bold mb-4">결제 현황</h2>
          {project.payments && project.payments.length > 0 ? (
            <div className="space-y-3">
              {project.payments.map((payment) => (
                <div
                  key={payment.id}
                  className="tech-bg-secondary rounded-lg p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="tech-text font-semibold">
                      {formatCurrency(payment.amount)}
                    </p>
                    <p className="tech-text-secondary text-xs">
                      {payment.paidAt ? formatDateTime(payment.paidAt) : '미결제'}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      payment.status === 'COMPLETED'
                        ? 'bg-green-500/20 text-green-300'
                        : payment.status === 'CANCELLED'
                        ? 'bg-red-500/20 text-red-300'
                        : 'bg-yellow-500/20 text-yellow-300'
                    }`}
                  >
                    {paymentStatusLabels[payment.status]}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="tech-text-secondary text-sm">결제 내역이 없습니다.</p>
          )}
        </div>

        <div className="tech-card rounded-2xl p-6">
          <h2 className="tech-heading text-xl font-bold mb-4">메시지</h2>
          <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
            {project.messages && project.messages.length > 0 ? (
              project.messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-3 rounded-lg ${
                    message.isFromClient
                      ? 'tech-bg-secondary ml-8'
                      : 'tech-gradient mr-8'
                  }`}
                >
                  <p className="tech-text text-sm whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <p className="tech-text-secondary text-xs mt-2">
                    {formatDateTime(message.createdAt)}
                  </p>
                </div>
              ))
            ) : (
              <p className="tech-text-secondary text-sm">메시지가 없습니다.</p>
            )}
          </div>
          <div className="flex gap-2">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="메시지를 입력하세요..."
              className="flex-1 tech-input rounded-lg p-3 min-h-[80px]"
            />
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="tech-btn-secondary px-6"
            >
              전송
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
