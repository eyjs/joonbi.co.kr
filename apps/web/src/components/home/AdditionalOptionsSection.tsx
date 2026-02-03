import { CreditCard, Users, MessageSquare, Search } from 'lucide-react';

export function AdditionalOptionsSection(): JSX.Element {
  const options = [
    {
      icon: CreditCard,
      name: '결제 연동',
      price: '500,000원',
      description: '토스페이먼츠, 카카오페이 등',
    },
    {
      icon: Users,
      name: '소셜 로그인',
      price: '100,000원 / 종',
      description: '카카오, 네이버, 구글 등',
    },
    {
      icon: MessageSquare,
      name: '게시판',
      price: '150,000원 ~',
      description: '기본형 15만원, 고급형 25만원',
    },
    {
      icon: Search,
      name: '검색 기능',
      price: '50,000원 ~',
      description: '기본 검색 5만원, 고급 검색 15만원',
    },
  ];

  return (
    <section className="section bg-gray-50">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="heading-lg">
            필요한 기능만<br />
            <span className="gradient-text">추가 옵션</span>으로
          </h2>
          <p className="text-xl text-gray">
            기본 개발에 필요한 기능을 선택해 추가하세요
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {options.map((option, index) => {
            const Icon = option.icon;
            return (
              <div key={index} className="card hover:shadow-xl transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 mx-auto">
                    <Icon className="w-7 h-7 text-blue-500" />
                  </div>
                  <h3 className="heading-sm text-center">{option.name}</h3>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {option.price}
                    </div>
                  </div>
                  <p className="text-sm text-gray text-center">
                    {option.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            이 외에도 다양한 기능 추가가 가능합니다. 문의해 주세요.
          </p>
        </div>
      </div>
    </section>
  );
}
