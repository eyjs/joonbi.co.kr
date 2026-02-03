import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-lg font-bold mb-4">준비스튜디오</div>
            <p className="text-sm text-muted-foreground">
              전문적인 외주 프로젝트 관리 서비스
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">바로가기</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link
                href="/#features"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                서비스
              </Link>
              <Link
                href="/#process"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                프로세스
              </Link>
              <Link
                href="/consultation"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                문의
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">연락처</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <p>이메일: wnstn1342@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-sm text-muted-foreground">
          <div className="flex flex-col gap-1 mb-4">
            <p>상호: 준비스튜디오 | 대표: 이준수</p>
            <p>사업자등록번호: 318-08-03340</p>
            <p>주소: 서울특별시 강남구 논현로10길 30, 5층 505-S87호(개포동)</p>
          </div>
          <p className="text-center">© 2024 준비스튜디오. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
