import { Globe } from 'lucide-react';

export function HeroSection(): JSX.Element {
  return (
    <section className="section">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block">
              <span className="badge">AI 웹개발 에이전시</span>
            </div>
            <h1 className="heading-xl">
              참고사이트 링크<br />
              하나면 충분합니다
            </h1>
            <p className="text-xl text-gray">
              개발 지식이 없어도 괜찮아요.<br />
              원하는 웹사이트 링크만 보내주시면<br />
              AI가 분석하고 개발해드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="btn-primary">
                무료 상담 신청하기
              </a>
              <a href="#pricing" className="btn-secondary">
                가격표 확인하기
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="card p-8 lg:p-12">
              <div className="flex flex-col items-center space-y-6">
                <div className="w-full bg-gray-100 rounded-xl p-8 flex items-center justify-center">
                  <Globe className="w-24 h-24 text-blue-500" aria-hidden="true" />
                </div>
                <div className="w-full space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500" aria-hidden="true"></div>
                    링크 분석
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500" aria-hidden="true"></div>
                    AI 개발
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500" aria-hidden="true"></div>
                    완성
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
