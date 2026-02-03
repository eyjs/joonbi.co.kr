import { Link, FileText } from 'lucide-react';

export function RequirementsSection(): JSX.Element {
  return (
    <section className="section">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="heading-lg">
            준비물은 딱 <span className="gradient-text">2가지</span>
          </h2>
          <p className="text-xl text-gray">
            복잡한 기획서도, 어려운 용어도 필요 없습니다
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="card border-4 border-blue-500 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
                <Link className="w-6 h-6 text-blue-500" />
              </div>
              <div className="flex-1">
                <div className="inline-block px-3 py-1 bg-red-500 text-white text-sm font-bold rounded">
                  필수
                </div>
              </div>
            </div>
            <h3 className="heading-sm">참고사이트 링크</h3>
            <p className="text-gray">
              만들고 싶은 웹사이트와 비슷한 사이트의 URL만 보내주세요.
              AI가 디자인과 기능을 분석합니다.
            </p>
            <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm break-all">
              https://example.com
            </div>
          </div>

          <div className="card space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                <FileText className="w-6 h-6 text-gray-500" />
              </div>
              <div className="flex-1">
                <div className="inline-block px-3 py-1 bg-gray-300 text-gray-700 text-sm font-bold rounded">
                  선택
                </div>
              </div>
            </div>
            <h3 className="heading-sm">대략적인 설명</h3>
            <p className="text-gray">
              추가로 원하는 기능이나 변경하고 싶은 부분이 있다면
              편하게 말씀해주세요.
            </p>
            <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-600 italic">
              예: 메인 색상은 파란색으로,<br />
              회원가입 기능은 제외해주세요
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
