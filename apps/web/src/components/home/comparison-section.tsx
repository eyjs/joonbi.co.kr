import { DollarSign, Clock, BookOpen, CheckCircle2, XCircle } from 'lucide-react';

export function ComparisonSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* 제목 */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              기존 에이전시의 3가지 장벽
            </h2>
          </div>

          {/* 3가지 장벽 */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <DollarSign className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">비용 부담</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                단순 홈페이지도 수백만 원부터 시작하는 불투명한 견적.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">시간 낭비</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                기획 미팅, 디자인 컨펌, 끊없는 전화 통화.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">전문 지식 요구</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                의뢰인에게 개발 지식과 완벽한 문서를 요구함.
              </p>
            </div>
          </div>

          {/* 구분선 */}
          <div className="relative my-16">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-2 text-2xl font-bold text-gray-700">
                VS
              </span>
            </div>
          </div>

          {/* 준비스튜디오 차별점 */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              준비스튜디오는 <span className="text-blue-600">'준비'</span>를 요구하지 않습니다.
            </h2>
          </div>

          {/* 3가지 NO */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8">
              <div className="flex items-center justify-center gap-3 mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
                <h3 className="text-2xl font-bold text-green-900">NO 개발 지식</h3>
              </div>
              <p className="text-green-700 text-center font-medium">
                비개발자도 OK.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-8">
              <div className="flex items-center justify-center gap-3 mb-6">
                <CheckCircle2 className="w-10 h-10 text-blue-600" />
                <h3 className="text-2xl font-bold text-blue-900">NO 기획서</h3>
              </div>
              <p className="text-blue-700 text-center font-medium">
                참고 링크만 있으면 OK.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8">
              <div className="flex items-center justify-center gap-3 mb-6">
                <CheckCircle2 className="w-10 h-10 text-purple-600" />
                <h3 className="text-2xl font-bold text-purple-900">NO 전화</h3>
              </div>
              <p className="text-purple-700 text-center font-medium">
                실시간 대시보드로 확인.
              </p>
            </div>
          </div>

          {/* 하단 메시지 */}
          <div className="text-center">
            <div className="inline-block bg-white rounded-2xl px-8 py-6 shadow-lg">
              <p className="text-xl font-semibold text-gray-800">
                소규모 사업자와 스타트업을 위한 가장 쉬운 개발 파트너.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
