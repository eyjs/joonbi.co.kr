import { MessageCircleQuestion } from 'lucide-react';

export function ProblemSection(): JSX.Element {
  return (
    <section className="section">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-coral-100">
            <MessageCircleQuestion className="w-10 h-10 text-coral-500" />
          </div>
          <h2 className="heading-lg">
            개발은 모르는데...<br />
            <span className="gradient-text">
              그냥 이런 느낌으로 만들고 싶어요
            </span>
          </h2>
          <p className="text-xl text-gray max-w-2xl mx-auto">
            개발 용어도 모르고, 기획서 작성도 어렵고...<br />
            그냥 본 적 있는 웹사이트처럼 만들고 싶을 뿐인데<br />
            어디서부터 시작해야 할지 막막하셨나요?
          </p>
        </div>
      </div>
    </section>
  );
}
