'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

type ConsultationType = 'SIMPLE' | 'ANALYSIS';

export default function ConsultationPage() {
  const router = useRouter();
  const [type, setType] = useState<ConsultationType | null>(null);
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    referenceUrls: '',
    budgetRange: '',
    desiredDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!type) return;

    setLoading(true);
    setError('');

    try {
      // TODO: API 연동
      alert('상담 신청이 완료되었습니다. (데모)');
      router.push('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('상담 신청에 실패했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!type) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">상담 유형 선택</h1>
              <p className="text-muted-foreground">
                프로젝트에 맞는 상담 유형을 선택해주세요
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card
                className="cursor-pointer hover:border-primary transition-all hover:shadow-md"
                onClick={() => setType('SIMPLE')}
              >
                <CardHeader>
                  <div className="text-3xl font-bold text-primary mb-2">무료</div>
                  <CardTitle>간편 상담</CardTitle>
                  <CardDescription>
                    기본적인 프로젝트 정보만 제출
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>빠른 문의 답변</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>개발 가능 여부 확인</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>수동 견적 제공</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6" variant="outline">
                    간편 상담 선택
                  </Button>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:border-primary transition-all hover:shadow-md border-primary"
                onClick={() => setType('ANALYSIS')}
              >
                <CardHeader>
                  <div className="text-3xl font-bold text-primary mb-2">10만원</div>
                  <CardTitle>
                    분석 상담
                    <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                      추천
                    </span>
                  </CardTitle>
                  <CardDescription>
                    AI 자동 분석 및 화면 설계 제공
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>30분 내 AI 자동 분석</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>문서 4종 자동 생성</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>샘플 화면 설계 (Figma)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-semibold">계약 시 비용 차감</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6">
                    분석 상담 선택 (추천)
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="mb-8">
            <Button variant="ghost" onClick={() => setType(null)}>
              ← 상담 유형 다시 선택
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {type === 'SIMPLE' ? '간편 상담 신청' : '분석 상담 신청'}
              </CardTitle>
              <CardDescription>
                {type === 'SIMPLE'
                  ? '기본 정보를 입력해주세요'
                  : '상세 정보를 입력해주세요. AI가 자동으로 분석합니다.'}
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {error && (
                  <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="projectName">
                    프로젝트명 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="projectName"
                    placeholder="예: 쇼핑몰 웹사이트"
                    value={formData.projectName}
                    onChange={(e) =>
                      setFormData({ ...formData, projectName: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">
                    프로젝트 설명 <span className="text-red-500">*</span>
                  </Label>
                  <textarea
                    id="description"
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="프로젝트의 목적, 주요 기능, 일정 등을 자유롭게 작성해주세요 (최소 100자)"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                    minLength={100}
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.description.length}/100자
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="referenceUrls">
                    참고 사이트 URL <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="referenceUrls"
                    type="url"
                    placeholder="https://example.com"
                    value={formData.referenceUrls}
                    onChange={(e) =>
                      setFormData({ ...formData, referenceUrls: e.target.value })
                    }
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    여러 개인 경우 쉼표(,)로 구분해주세요
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budgetRange">예산 범위</Label>
                  <select
                    id="budgetRange"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.budgetRange}
                    onChange={(e) =>
                      setFormData({ ...formData, budgetRange: e.target.value })
                    }
                  >
                    <option value="">선택해주세요</option>
                    <option value="300만원 이하">300만원 이하</option>
                    <option value="300-500만원">300-500만원</option>
                    <option value="500-1000만원">500-1000만원</option>
                    <option value="1000만원 이상">1000만원 이상</option>
                    <option value="협의 가능">협의 가능</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="desiredDate">희망 완료 날짜</Label>
                  <Input
                    id="desiredDate"
                    type="date"
                    value={formData.desiredDate}
                    onChange={(e) =>
                      setFormData({ ...formData, desiredDate: e.target.value })
                    }
                  />
                </div>

                {type === 'ANALYSIS' && (
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-md">
                    <p className="text-sm font-medium mb-1">분석 상담 안내</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 결제 후 30분 내 AI 자동 분석 완료</li>
                      <li>• 분석서, 명세서, 기획서, 견적서 제공</li>
                      <li>• 샘플 화면 설계 (Figma) 제공</li>
                      <li>• 계약 진행 시 10만원 차감</li>
                    </ul>
                  </div>
                )}
              </CardContent>

              <div className="px-6 pb-6">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading
                    ? '신청 중...'
                    : type === 'SIMPLE'
                    ? '무료 상담 신청하기'
                    : '분석 상담 신청하기 (10만원)'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
