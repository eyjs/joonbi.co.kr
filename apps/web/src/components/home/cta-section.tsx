'use client';

import { useState } from 'react';
import { Link2, Send, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CtaSection() {
  const [referenceUrl, setReferenceUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 상담 페이지로 이동하면서 URL을 쿼리 파라미터로 전달
    if (referenceUrl.trim()) {
      window.location.href = `/consultation?reference=${encodeURIComponent(referenceUrl)}`;
    } else {
      window.location.href = '/consultation';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* 제목 */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12">
            참고할 사이트만 있다면, 30분 내로 화면설계가 완성됩니다
          </p>

          {/* URL 입력 폼 */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="bg-white rounded-2xl p-3 shadow-2xl flex flex-col md:flex-row gap-3">
              <div className="flex-1 flex items-center gap-3 px-4">
                <Link2 className="w-6 h-6 text-gray-400 flex-shrink-0" />
                <input
                  type="url"
                  value={referenceUrl}
                  onChange={(e) => setReferenceUrl(e.target.value)}
                  placeholder="참고하고 싶은 사이트 URL을 입력하세요 (선택사항)"
                  className="flex-1 outline-none text-lg"
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                상담 신청하기
              </button>
            </div>
          </form>

          {/* 부가 안내 */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>무료 상담</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>30분 내 화면설계</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>실시간 진행 확인</span>
            </div>
          </div>

          {/* 추가 액션 버튼 */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="/consultation">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6"
              >
                상담 신청하기
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6"
              >
                포트폴리오 보기
              </Button>
            </Link>
          </div>

          {/* 문의 안내 */}
          <div className="mt-12 text-white/80 text-sm">
            궁금한 점이 있으신가요?{' '}
            <Link href="/consultation" className="underline hover:text-white">
              1:1 문의하기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
