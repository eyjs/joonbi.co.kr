import { MessageCircle, Clock, MessageSquare, PhoneOff } from 'lucide-react';

export function CommunicationSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* 제목 */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              전화와 미팅을 없애고,<br />속도와 정확성을 높였습니다.
            </h2>
          </div>

          {/* 비교: 전화 vs 채팅 */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* 왼쪽: 불필요한 전화/미팅 */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                <PhoneOff className="w-16 h-16 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">불필요한 전화/미팅</h3>
              <p className="text-gray-600">
                시간 낭비, 말로만 전달되어<br />
                오해의 소지가 많음
              </p>
            </div>

            {/* 오른쪽: 채팅 전용 소통 */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-16 h-16 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">채팅 전용 소통</h3>
              <p className="text-gray-600">
                기록으로 남아 명확하고<br />
                언제든 확인 가능
              </p>
            </div>
          </div>

          {/* 3가지 장점 */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl text-center mb-4">채팅 전용 소통</h3>
              <p className="text-gray-600 text-center">
                모든 대화가 기록으로 남아<br />
                오해의 소지가 없습니다.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-xl text-center mb-4">24~48시간 내 답변</h3>
              <p className="text-gray-600 text-center">
                명확한 답변 주기를<br />
                보장합니다.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-xl text-center mb-4">수정 요청은 댓글로</h3>
              <p className="text-gray-600 text-center">
                대시보드에서 수정이 필요한<br />
                부분에 바로 댓글을 남기세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
