'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function CtaSection() {
  const [referenceUrl, setReferenceUrl] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (referenceUrl.trim()) {
      router.push(`/consultation?reference=${encodeURIComponent(referenceUrl)}`);
    } else {
      router.push('/consultation');
    }
  };

  return (
    <section className="swiss-section" style={{ backgroundColor: 'var(--black)', color: 'var(--white)' }}>
      <div className="swiss-container">
        <div className="swiss-grid">
          <div className="swiss-col-12">
            <p className="swiss-caption mb-4" style={{ color: 'var(--gray-400)' }}>13 CALL TO ACTION</p>
            <h2 className="swiss-heading-xl mb-6" style={{ color: 'var(--white)' }}>지금 바로 시작하세요</h2>
            <p className="swiss-body mb-12" style={{ color: 'var(--gray-400)' }}>참고할 사이트만 있다면, 30분 내로 화면설계가 완성됩니다</p>
          </div>

          <div className="swiss-col-12">
            <form onSubmit={handleSubmit} className="mb-12">
              <div style={{
                display: 'flex',
                gap: 'var(--space-4)',
                border: '1px solid var(--gray-800)',
                padding: 'var(--space-4)'
              }}>
                <input
                  type="url"
                  id="reference-url"
                  aria-label="참고 사이트 URL"
                  value={referenceUrl}
                  onChange={(e) => setReferenceUrl(e.target.value)}
                  placeholder="참고하고 싶은 사이트 URL을 입력하세요 (선택사항)"
                  style={{
                    flex: 1,
                    border: 'none',
                    background: 'transparent',
                    color: 'var(--white)',
                    outline: 'none',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-mono)'
                  }}
                />
                <button
                  type="submit"
                  className="swiss-button"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  상담 신청하기
                </button>
              </div>
            </form>
          </div>

          <div className="swiss-col-12">
            <div className="swiss-hr" style={{ backgroundColor: 'var(--gray-800)' }}></div>
          </div>

          <div className="swiss-col-4">
            <p className="swiss-caption" style={{ color: 'var(--gray-400)' }}>무료 상담</p>
          </div>

          <div className="swiss-col-4">
            <p className="swiss-caption" style={{ color: 'var(--gray-400)' }}>30분 내 화면설계</p>
          </div>

          <div className="swiss-col-4">
            <p className="swiss-caption" style={{ color: 'var(--gray-400)' }}>실시간 진행 확인</p>
          </div>

          <div className="swiss-col-12">
            <div className="swiss-hr" style={{ backgroundColor: 'var(--gray-800)', margin: 'var(--space-12) 0' }}></div>
          </div>

          <div className="swiss-col-6">
            <Link href="/consultation" className="swiss-button block text-center">
              상담 신청하기
            </Link>
          </div>

          <div className="swiss-col-6">
            <Link href="/portfolio" className="swiss-button-outline block text-center">
              포트폴리오 보기
            </Link>
          </div>

          <div className="swiss-col-12">
            <div className="swiss-hr" style={{ backgroundColor: 'var(--gray-800)' }}></div>
            <p className="swiss-caption text-center" style={{ color: 'var(--gray-400)' }}>
              궁금한 점이 있으신가요? <Link href="/consultation" style={{ color: 'var(--white)', textDecoration: 'underline' }}>1:1 문의하기</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
