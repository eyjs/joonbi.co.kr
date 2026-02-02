'use client';

import { useState } from 'react';
import { Link2, Send, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function CtaSection() {
  const [referenceUrl, setReferenceUrl] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (referenceUrl.trim()) {
      router.push(`/consultation?reference=${encodeURIComponent(referenceUrl)}`);
    } else {
      router.push('/consultation');
    }
  };

  return (
    <section className="py-32 bg-charcoal paper-texture relative overflow-hidden">
      <div className="display-number absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-20">
        →
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* 제목 */}
          <h2 className="text-display text-5xl md:text-7xl font-bold text-cream mb-8">
            지금 바로 시작하세요
          </h2>
          <div className="dotted-divider max-w-md mx-auto mb-8 opacity-30"></div>
          <p className="text-xl md:text-2xl text-warm-gray text-korean mb-16">
            참고할 사이트만 있다면, 30분 내로 화면설계가 완성됩니다
          </p>

          {/* URL 입력 폼 */}
          <form onSubmit={handleSubmit} className="mb-12">
            <div className="bg-cream border-2 border-light-tan p-4 flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center gap-4 px-4">
                <Link2 className="w-6 h-6 text-warm-gray flex-shrink-0" aria-hidden="true" />
                <input
                  type="url"
                  id="reference-url"
                  aria-label="참고 사이트 URL"
                  value={referenceUrl}
                  onChange={(e) => setReferenceUrl(e.target.value)}
                  placeholder="참고하고 싶은 사이트 URL을 입력하세요 (선택사항)"
                  className="flex-1 outline-none text-lg bg-transparent text-charcoal placeholder:text-warm-gray text-korean"
                />
              </div>
              <button
                type="submit"
                className="bg-burnt-orange text-cream px-8 py-4 font-bold text-lg transition-all flex items-center justify-center gap-2 border-2 border-burnt-orange hover:bg-charcoal hover:border-charcoal text-korean"
              >
                <Send className="w-5 h-5" />
                상담 신청하기
              </button>
            </div>
          </form>

          {/* 부가 안내 */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-warm-gray text-korean mb-16">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-burnt-orange"></div>
              <span>무료 상담</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-burnt-orange"></div>
              <span>30분 내 화면설계</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-burnt-orange"></div>
              <span>실시간 진행 확인</span>
            </div>
          </div>

          {/* 추가 액션 버튼 */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link href="/consultation">
              <button className="btn-primary flex items-center gap-2">
                상담 신청하기
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/portfolio">
              <button className="border-2 border-cream text-cream px-12 py-5 font-bold text-lg transition-all hover:bg-cream hover:text-charcoal text-korean">
                포트폴리오 보기
              </button>
            </Link>
          </div>

          {/* 문의 안내 */}
          <div className="mt-16 text-warm-gray text-sm text-korean">
            궁금한 점이 있으신가요?{' '}
            <Link href="/consultation" className="text-cream border-b border-cream hover:text-burnt-orange hover:border-burnt-orange transition-colors">
              1:1 문의하기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
