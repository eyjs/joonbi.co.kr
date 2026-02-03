import { MessageCircle, Phone, Video, X, CheckCircle2 } from 'lucide-react';

export function ChatOnlySection(): JSX.Element {
  return (
    <section className="section bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <h2 className="heading-lg">
              <span className="gradient-text">채팅으로만</span> 소통합니다
            </h2>
            <p className="text-xl text-gray">
              전화나 미팅 없이 편한 시간에 채팅으로만 진행됩니다
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card bg-white/80 backdrop-blur">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
                  <MessageCircle className="w-6 h-6 text-green-500" aria-hidden="true" />
                </div>
                <h3 className="heading-sm text-green-600">채팅 소통</h3>
              </div>
              <ul className="space-y-3">
                {[
                  '24시간 언제든 메시지 전송',
                  '편한 시간에 답변 확인',
                  '대화 내용 자동 기록',
                  '파일 첨부로 간편한 공유',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card bg-white/80 backdrop-blur">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
                  <X className="w-6 h-6 text-red-500" aria-hidden="true" />
                </div>
                <h3 className="heading-sm text-red-600">불필요한 소통</h3>
              </div>
              <ul className="space-y-3">
                {[
                  { icon: Phone, text: '시간 맞춰 전화 받기' },
                  { icon: Video, text: '미팅 참석하기' },
                  { icon: Phone, text: '급한 연락 받기' },
                  { icon: Video, text: '화면 공유 회의' },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <li key={index} className="flex items-start gap-2 opacity-50 line-through">
                      <Icon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-gray-600">{item.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
