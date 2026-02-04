'use client';

import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
}

export default function UsersPage(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('ALL');
  const [loading, setLoading] = useState<boolean>(true);

  const roles = ['ALL', 'ADMIN', 'USER'];

  const roleLabels: Record<string, string> = {
    ADMIN: '관리자',
    USER: '일반',
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedRole === 'ALL') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter(u => u.role === selectedRole));
    }
  }, [selectedRole, users]);

  async function fetchUsers(): Promise<void> {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  }

  async function toggleUserStatus(userId: string, isActive: boolean): Promise<void> {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: !isActive }),
      });

      if (response.ok) {
        await fetchUsers();
      }
    } catch (error) {
      console.error('Failed to update user status:', error);
    }
  }

  function formatDate(dateString: string | null): string {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('ko-KR', {
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
        <h1 className="tech-heading text-3xl font-bold mb-2">사용자 관리</h1>
        <p className="tech-text-secondary">시스템 사용자를 관리합니다</p>
      </div>

      <div className="flex gap-3 mb-6">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedRole === role
                ? 'tech-gradient text-white'
                : 'tech-card-hover tech-text-secondary'
            }`}
          >
            {role === 'ALL' ? '전체' : roleLabels[role] || role}
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
                <th className="px-6 py-4 text-left tech-text font-semibold">이메일</th>
                <th className="px-6 py-4 text-left tech-text font-semibold">역할</th>
                <th className="px-6 py-4 text-left tech-text font-semibold">상태</th>
                <th className="px-6 py-4 text-left tech-text font-semibold">마지막 로그인</th>
                <th className="px-6 py-4 text-left tech-text font-semibold">가입일</th>
                <th className="px-6 py-4 text-left tech-text font-semibold">작업</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center tech-text-secondary">
                    사용자가 없습니다.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t tech-border hover:tech-bg-secondary"
                  >
                    <td className="px-6 py-4 tech-text font-medium">{user.name}</td>
                    <td className="px-6 py-4 tech-text-secondary">{user.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'ADMIN'
                            ? 'bg-purple-500/20 text-purple-300'
                            : 'bg-blue-500/20 text-blue-300'
                        }`}
                      >
                        {roleLabels[user.role] || user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.isActive
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-red-500/20 text-red-300'
                        }`}
                      >
                        {user.isActive ? '활성' : '비활성'}
                      </span>
                    </td>
                    <td className="px-6 py-4 tech-text-secondary text-sm">
                      {formatDate(user.lastLoginAt)}
                    </td>
                    <td className="px-6 py-4 tech-text-secondary text-sm">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleUserStatus(user.id, user.isActive)}
                        className={`text-sm py-1 px-4 rounded-lg transition-all ${
                          user.isActive
                            ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                            : 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                        }`}
                      >
                        {user.isActive ? '비활성화' : '활성화'}
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
