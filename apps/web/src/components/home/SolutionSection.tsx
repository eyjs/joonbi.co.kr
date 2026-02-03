import { X, Sparkles } from 'lucide-react';

export function SolutionSection(): JSX.Element {
  const solutions = [
    {
      label: 'NO 개발 지식',
      description: '전문 용어 몰라도 됩니다',
    },
    {
      label: 'NO 기획서',
      description: '참고 링크만 있으면 됩니다',
    },
    {
      label: 'NO 전화',
      description: '채팅으로만 소통합니다',
    },
  ];

  return (
    <section className="section bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-8 mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="heading-lg">
              <span className="gradient-text">준비스튜디오</span>가<br />
              이 모든 것을 해결합니다
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <div key={index} className="card bg-white/80 backdrop-blur space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
                    <X className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="heading-sm text-lg">{solution.label}</h3>
                </div>
                <p className="text-gray">{solution.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <div className="card bg-gradient-to-r from-blue-500 to-purple-500 text-white inline-block">
              <h3 className="heading-md text-white">Joonbi Studio</h3>
              <p className="mt-2 opacity-90">AI 기반 웹개발 에이전시</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
