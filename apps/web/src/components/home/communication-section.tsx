import { MessageCircle, Clock, MessageSquare, PhoneOff } from 'lucide-react';

export function CommunicationSection() {
  return (
    <section className="py-32 bg-cream paper-texture">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* 제목 */}
          <div className="text-center mb-20">
            <h2 className="text-display text-4xl md:text-6xl font-bold mb-8">
              전화와 미팅을 없애고,<br />속도와 정확성을 높였습니다.
            </h2>
            <div className="dotted-divider max-w-md mx-auto"></div>
          </div>

          {/* 비교: 전화 vs 채팅 */}
          <div className="grid md:grid-cols-2 gap-16 mb-20">
            {/* 왼쪽: 불필요한 전화/미팅 */}
            <div className="text-center scroll-reveal">
              <div className="w-32 h-32 mx-auto mb-8 border-2 border-accent-red flex items-center justify-center">
                <PhoneOff className="w-16 h-16 text-accent-red" />
              </div>
              <h3 className="text-display text-2xl font-bold mb-4 text-charcoal">불필요한 전화/미팅</h3>
              <p className="text-warm-gray text-korean">
                시간 낭비, 말로만 전달되어<br />
                오해의 소지가 많음
              </p>
            </div>

            {/* 오른쪽: 채팅 전용 소통 */}
            <div className="text-center scroll-reveal">
              <div className="w-32 h-32 mx-auto mb-8 border-2 border-deep-teal flex items-center justify-center">
                <MessageCircle className="w-16 h-16 text-deep-teal" />
              </div>
              <h3 className="text-display text-2xl font-bold mb-4 text-charcoal">채팅 전용 소통</h3>
              <p className="text-warm-gray text-korean">
                기록으로 남아 명확하고<br />
                언제든 확인 가능
              </p>
            </div>
          </div>

          {/* 3가지 장점 */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="atelier-card border-2 border-deep-teal scroll-reveal">
              <div className="w-16 h-16 border-2 border-deep-teal flex items-center justify-center mb-6 mx-auto">
                <MessageSquare className="w-8 h-8 text-deep-teal" />
              </div>
              <h3 className="font-bold text-xl text-center mb-4 text-display text-charcoal">채팅 전용 소통</h3>
              <p className="text-warm-gray text-center text-korean">
                모든 대화가 기록으로 남아<br />
                오해의 소지가 없습니다.
              </p>
            </div>

            <div className="atelier-card border-2 border-burnt-orange scroll-reveal">
              <div className="w-16 h-16 border-2 border-burnt-orange flex items-center justify-center mb-6 mx-auto">
                <Clock className="w-8 h-8 text-burnt-orange" />
              </div>
              <h3 className="font-bold text-xl text-center mb-4 text-display text-charcoal">24~48시간 내 답변</h3>
              <p className="text-warm-gray text-center text-korean">
                명확한 답변 주기를<br />
                보장합니다.
              </p>
            </div>

            <div className="atelier-card border-2 border-charcoal scroll-reveal">
              <div className="w-16 h-16 border-2 border-charcoal flex items-center justify-center mb-6 mx-auto">
                <MessageCircle className="w-8 h-8 text-charcoal" />
              </div>
              <h3 className="font-bold text-xl text-center mb-4 text-display text-charcoal">수정 요청은 댓글로</h3>
              <p className="text-warm-gray text-center text-korean">
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
