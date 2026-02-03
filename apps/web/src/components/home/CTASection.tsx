import { Send, Mail, MessageCircle } from 'lucide-react';

export function CTASection(): JSX.Element {
  return (
    <section className="section bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center text-white space-y-8">
          <h2 className="heading-xl text-white">
            지금 바로<br />
            참고사이트 링크를<br />
            보내주세요
          </h2>
          <p className="text-2xl text-white/90">
            링크 하나로 시작하는 웹개발
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:contact@joonbi.studio"
              className="card bg-white text-gray-800 hover:shadow-2xl transition-all transform hover:-translate-y-1 inline-flex items-center gap-3 w-full sm:w-auto"
              aria-label="이메일로 문의하기: contact@joonbi.studio"
            >
              <Mail className="w-6 h-6 text-blue-500" aria-hidden="true" />
              <div className="text-left">
                <div className="text-sm text-gray-600">이메일</div>
                <div className="font-bold">contact@joonbi.studio</div>
              </div>
            </a>
            {/* TODO: 실제 카카오톡 오픈채팅 링크로 교체 필요 */}
            <a
              href="https://open.kakao.com/o/your-link"
              className="card bg-white text-gray-800 hover:shadow-2xl transition-all transform hover:-translate-y-1 inline-flex items-center gap-3 w-full sm:w-auto"
              aria-label="카카오톡 오픈채팅으로 문의하기"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-6 h-6 text-coral-500" aria-hidden="true" />
              <div className="text-left">
                <div className="text-sm text-gray-600">카카오톡</div>
                <div className="font-bold">오픈채팅 바로가기</div>
              </div>
            </a>
          </div>
          <div className="pt-8 border-t border-white/20">
            <div className="inline-flex items-center gap-2 text-white/80">
              <Send className="w-5 h-5" aria-hidden="true" />
              <span>평균 1시간 이내 답변</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
