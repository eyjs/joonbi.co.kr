import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-gray-200 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-lg font-bold mb-3 text-gray-900">준비스튜디오</div>
            <p className="text-sm text-gray-500 leading-relaxed">
              기획부터 납품까지, 외주 개발의 새로운 기준.
              <br />
              프로젝트 진행 상황을 실시간으로 확인하세요.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-gray-900">바로가기</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link
                href="/#services"
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                서비스 소개
              </Link>
              <Link
                href="/#process"
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                프로세스
              </Link>
              <Link
                href="/portfolio"
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                포트폴리오
              </Link>
              <Link
                href="/consultation"
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                상담 신청
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-gray-900">연락처</h3>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <p>이메일: wnstn1342@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-gray-500">
          <div className="flex flex-col gap-1 mb-4">
            <p>상호: 준비스튜디오 | 대표: 이준수</p>
            <p>사업자등록번호: 318-08-03340</p>
            <p>주소: 서울특별시 강남구 논현로10길 30, 5층 505-S87호(개포동)</p>
          </div>
          <div className="flex justify-between items-center">
            <p>&copy; 2024 준비스튜디오. All rights reserved.</p>
            <Link
              href="/admin/login"
              className="text-xs text-gray-400 hover:text-gray-500 transition-colors"
            >
              관리자
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
