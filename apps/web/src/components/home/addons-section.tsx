import { CreditCard, UserPlus, MessageSquare, Search, Lightbulb } from 'lucide-react';

export function AddonsSection() {
  const addons = [
    {
      icon: CreditCard,
      title: '결제 연동',
      price: '50만원',
      description: 'PG사 연동 (토스, 나이스 등)',
      color: 'text-deep-teal',
      borderColor: 'border-deep-teal',
    },
    {
      icon: UserPlus,
      title: '소셜 로그인',
      price: '종당 10만원',
      description: '카카오, 구글, 네이버 등',
      color: 'text-burnt-orange',
      borderColor: 'border-burnt-orange',
    },
    {
      icon: MessageSquare,
      title: '게시판 기능',
      price: '15~25만원',
      description: '공지사항, Q&A, 댓글 시스템',
      color: 'text-charcoal',
      borderColor: 'border-charcoal',
    },
    {
      icon: Search,
      title: '검색 기능',
      price: '5~15만원',
      description: '키워드 검색, 필터링',
      color: 'text-accent-red',
      borderColor: 'border-accent-red',
    },
  ];

  return (
    <section className="py-32 bg-light-tan paper-texture">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* 제목 */}
          <div className="text-center mb-20">
            <h2 className="text-display text-4xl md:text-6xl font-bold mb-8">
              필요한 기능만 골라 담으세요
            </h2>
            <div className="dotted-divider max-w-md mx-auto mb-6"></div>
            <p className="text-xl text-warm-gray text-korean">
              기본 패키지에 원하는 기능을 추가할 수 있습니다
            </p>
          </div>

          {/* 추가 기능 그리드 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {addons.map((addon) => {
              const Icon = addon.icon;
              return (
                <div key={addon.title} className="scroll-reveal">
                  <div className={`atelier-card border-2 ${addon.borderColor} h-full`}>
                    <div className={`w-16 h-16 border-2 ${addon.borderColor} flex items-center justify-center mb-4 mx-auto`}>
                      <Icon className={`w-8 h-8 ${addon.color}`} />
                    </div>
                    <h3 className="font-bold text-xl text-center mb-2 text-display text-charcoal">
                      {addon.title}
                    </h3>
                    <div className={`text-2xl font-bold text-center mb-3 text-display ${addon.color}`}>
                      {addon.price}
                    </div>
                    <p className="text-sm text-warm-gray text-center text-korean">
                      {addon.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 추가 안내 */}
          <div className="text-center">
            <div className="inline-block atelier-card border-2 border-charcoal">
              <p className="text-charcoal flex items-start gap-3 text-korean">
                <Lightbulb className="w-5 h-5 text-burnt-orange flex-shrink-0 mt-1" aria-hidden="true" />
                <span>
                  <strong>맞춤 기능이 필요하신가요?</strong><br />
                  상담 시 자세히 알려주시면 별도 견적을 드립니다.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
