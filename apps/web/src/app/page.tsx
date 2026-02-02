import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function HomePage() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            전문적인 외주 프로젝트 관리,
            <br />
            <span className="text-primary">준비스튜디오</span>와 함께하세요
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            체계적인 프로젝트 관리와 투명한 진행 과정으로
            <br />
            성공적인 결과를 만들어냅니다
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/consultation">
              <Button size="lg" className="text-lg px-8">
                무료 상담 신청하기
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg" className="text-lg px-8">
                서비스 자세히 보기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">왜 준비스튜디오인가요?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <CardTitle>투명한 프로젝트 관리</CardTitle>
                <CardDescription>
                  실시간 진행 현황 확인<br />
                  산출물 검토 및 피드백
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <CardTitle>체계적인 프로세스</CardTitle>
                <CardDescription>
                  요구사항 정의부터 최종 검수까지<br />
                  단계별 명확한 커뮤니케이션
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <CardTitle>안전한 결제 시스템</CardTitle>
                <CardDescription>
                  계약금-중도금-잔금 단계별 결제<br />
                  투명한 비용 관리
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">진행 프로세스</h2>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {[
              { step: 1, title: '상담 신청', desc: '프로젝트 정보 제출' },
              { step: 2, title: '견적 확인', desc: 'AI 분석 결과 확인' },
              { step: 3, title: '계약 및 착수', desc: '계약금 결제' },
              { step: 4, title: '진행 및 피드백', desc: '산출물 검토' },
              { step: 5, title: '최종 검수', desc: '납품 완료' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground text-center">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 px-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">프로젝트를 시작할 준비가 되셨나요?</h2>
          <p className="text-xl mb-8 opacity-90">무료 상담으로 프로젝트에 대해 논의해보세요</p>
          <Link href="/consultation">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              지금 상담 신청하기
            </Button>
          </Link>
          <p className="mt-4 text-sm opacity-75">평일 기준 24시간 내 연락드립니다</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
