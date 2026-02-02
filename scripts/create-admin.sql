-- Admin 권한 부여
UPDATE "User"
SET role = 'ADMIN'
WHERE email = 'admin@joonbi.co.kr';

-- 확인
SELECT id, email, name, role
FROM "User"
WHERE email = 'admin@joonbi.co.kr';
