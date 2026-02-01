import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '준비스튜디오 - 외주관리시스템',
  description: '외주 프로젝트 및 클라이언트 관리를 위한 풀스택 웹 애플리케이션',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
