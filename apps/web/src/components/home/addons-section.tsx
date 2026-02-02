import { CreditCard, UserPlus, MessageSquare, Search, Lightbulb } from 'lucide-react';

export function AddonsSection() {
  const addons = [
    {
      icon: CreditCard,
      title: '결제 연동',
      price: '50만원',
      description: 'PG사 연동 (토스, 나이스 등)',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
    },
    {
      icon: UserPlus,
      title: '소셜 로그인',
      price: '종당 10만원',
      description: '카카오, 구글, 네이버 등',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
    },
    {
      icon: MessageSquare,
      title: '게시판 기능',
      price: '15~25만원',
      description: '공지사항, Q&A, 댓글 시스템',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
    },
    {
      icon: Search,
      title: '검색 기능',
      price: '5~15만원',
      description: '키워드 검색, 필터링',
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* 제목 */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              필요한 기능만 골라 담으세요
            </h2>
            <p className="text-xl text-gray-600">
              기본 패키지에 원하는 기능을 추가할 수 있습니다
            </p>
          </div>

          {/* 추가 기능 그리드 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addons.map((addon) => {
              const Icon = addon.icon;
              return (
                <div key={addon.title} className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${addon.color} rounded-2xl blur opacity-0 group-hover:opacity-20 transition`}></div>
                  <div className={`relative bg-gradient-to-br ${addon.bgColor} border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all`}>
                    <div className={`w-16 h-16 bg-gradient-to-br ${addon.color} rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-xl text-center mb-2">
                      {addon.title}
                    </h3>
                    <div className={`text-2xl font-bold text-center mb-3 bg-gradient-to-r ${addon.color} bg-clip-text text-transparent`}>
                      {addon.price}
                    </div>
                    <p className="text-sm text-gray-600 text-center">
                      {addon.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 추가 안내 */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-gray-50 rounded-2xl px-8 py-6 border border-gray-200">
              <p className="text-gray-700 flex items-start gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" aria-hidden="true" />
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
