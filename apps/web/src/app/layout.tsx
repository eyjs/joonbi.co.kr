import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '준비스튜디오 - 기획부터 납품까지, 외주 개발의 새로운 기준',
  description: '포트폴리오 기반 외주 개발 전문 스튜디오. 프로젝트 진행 상황을 실시간으로 확인하세요.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased bg-white text-gray-700 min-h-screen">{children}</body>
    </html>
  );
}
