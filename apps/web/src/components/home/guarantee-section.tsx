import { Shield, BookOpen, FileCode } from 'lucide-react';

export function GuaranteeSection() {
  const guarantees = [
    {
      icon: Shield,
      title: '3개월 무상 A/S',
      description: '배포 후 3개월간 버그 수정과 기술 지원을 무료로 제공합니다.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
    },
    {
      icon: BookOpen,
      title: '사용 매뉴얼 제공',
      description: '관리자와 사용자를 위한 상세한 사용 매뉴얼을 함께 드립니다.',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
    },
    {
      icon: FileCode,
      title: '소스코드 전달',
      description: '프로젝트 완료 후 모든 소스코드를 고객에게 이전해 드립니다.',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* 제목 */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              완성 후에도 안심하세요
            </h2>
            <p className="text-xl text-gray-600">
              3가지 보장으로 끝까지 책임집니다
            </p>
          </div>

          {/* 보장 항목 */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {guarantees.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl blur opacity-0 group-hover:opacity-20 transition`}></div>
                  <div className={`relative bg-gradient-to-br ${item.bgColor} border-2 border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all h-full`}>
                    <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="font-bold text-2xl text-center mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 추가 설명 */}
          <div className="text-center">
            <div className="inline-block bg-white rounded-2xl px-8 py-6 shadow-lg">
              <p className="text-lg text-gray-700 mb-2">
                <strong className="text-blue-600">납품이 끝이 아닙니다.</strong>
              </p>
              <p className="text-gray-600">
                배포 후에도 안정적으로 운영할 수 있도록 지원합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
