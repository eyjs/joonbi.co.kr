'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export function HeroSection() {
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    numberRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen paper-texture pt-32 pb-20 bg-cream">
      <div className="container mx-auto px-6 max-w-[1400px]">
        {/* Editorial Header */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left: Main Headline */}
          <div className="lg:col-span-7">
            <div className="mb-8">
              <div className="inline-block px-4 py-2 border-2 border-charcoal mb-6">
                <span className="text-korean font-semibold tracking-wider text-sm">
                  NO 기획서 · NO 미팅 · NO 지식
                </span>
              </div>
            </div>

            <h1 className="text-display mb-8">
              <span className="block text-6xl md:text-8xl lg:text-9xl leading-[0.9] mb-4">
                참고사이트
              </span>
              <span className="block text-6xl md:text-8xl lg:text-9xl leading-[0.9] mb-4">
                링크
              </span>
              <span className="block text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-burnt-orange">
                하나면 충분합니다.
              </span>
            </h1>

            <div className="dotted-divider my-8"></div>

            <p className="text-korean text-xl md:text-2xl leading-relaxed text-warm-gray mb-12 max-w-xl">
              복잡한 기획서 없이, IT 전문가와 AI가 만드는 당신의 웹사이트
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link href="/consultation">
                <button className="btn-primary">
                  무료 상담 신청하기
                </button>
              </Link>
              <Link href="#pricing">
                <button className="btn-secondary">
                  가격 확인하기
                </button>
              </Link>
            </div>
          </div>

          {/* Right: Statistics Grid */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Corner Brackets */}
              <div className="corner-bracket p-8">
                <div className="bg-white border-2 border-light-tan p-8">
                  <div className="grid grid-cols-2 gap-8">
                    {[
                      { number: '30분', label: '분석 완료', delay: 0.1 },
                      { number: '4종', label: '문서 자동생성', delay: 0.2 },
                      { number: '40%', label: '비용 절감', delay: 0.3 },
                      { number: '0회', label: '불필요한 미팅', delay: 0.4 },
                    ].map((stat, index) => (
                      <div
                        key={stat.label}
                        ref={(el) => { numberRefs.current[index] = el; }}
                        className="scroll-reveal text-center"
                        style={{ transitionDelay: `${stat.delay}s` }}
                      >
                        <div className="text-display text-5xl md:text-6xl font-bold text-burnt-orange mb-2">
                          {stat.number}
                        </div>
                        <div className="text-korean text-sm text-warm-gray leading-tight">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-deep-teal opacity-20 -z-10"></div>
            </div>
          </div>
        </div>

        {/* Process Flow Visualization */}
        <div className="mt-32 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Input */}
            <div className="bg-white border-2 border-charcoal p-8">
              <div className="text-korean text-sm font-semibold mb-4 text-warm-gray">
                INPUT
              </div>
              <div className="text-display text-3xl font-semibold mb-2">
                참고 링크
              </div>
              <div className="text-korean text-sm text-warm-gray">
                https://example.com
              </div>
            </div>

            {/* Arrow */}
            <div className="text-center">
              <div className="flex items-center justify-center">
                <div className="dotted-divider flex-1"></div>
                <div className="px-6 py-3 bg-charcoal text-cream text-korean font-semibold text-sm mx-4">
                  AI 분석 + 개발
                </div>
                <div className="dotted-divider flex-1"></div>
              </div>
            </div>

            {/* Output */}
            <div className="bg-burnt-orange text-cream border-2 border-burnt-orange p-8">
              <div className="text-korean text-sm font-semibold mb-4 opacity-80">
                OUTPUT
              </div>
              <div className="text-display text-3xl font-semibold mb-2">
                완성된 사이트
              </div>
              <div className="text-korean text-sm opacity-90">
                디자인 · 개발 · 배포
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col items-center">
            <div className="text-korean text-sm text-warm-gray mb-2">
              스크롤하여 더 알아보기
            </div>
            <div className="w-px h-12 bg-warm-gray animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
