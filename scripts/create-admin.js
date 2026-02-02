// Admin 권한 부여 스크립트
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'postgresql://admin:vmffpdl2%40@localhost:5435/joonbi'
    }
  }
});

async function main() {
  console.log('🔧 Admin 권한 부여 중...');

  const result = await prisma.user.update({
    where: { email: 'admin@joonbi.co.kr' },
    data: { role: 'ADMIN' },
  });

  console.log('✅ Admin 권한 부여 완료!');
  console.log('📧 Email:', result.email);
  console.log('👤 Name:', result.name);
  console.log('🔑 Role:', result.role);
}

main()
  .catch((e) => {
    console.error('❌ Error:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
