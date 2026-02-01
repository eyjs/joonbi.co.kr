# /setup - 프로젝트 초기 설정

프로젝트 초기 설정을 진행합니다.

## 실행 순서

1. **Dependencies 설치**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **환경변수 설정**
   - backend/.env 확인
   - frontend/.env.local 확인

3. **Docker 시작**
   ```bash
   docker-compose up -d db
   ```

4. **DB 마이그레이션**
   ```bash
   cd backend && npm run migration:run
   ```

5. **개발 서버 시작**
   ```bash
   # Terminal 1
   cd backend && npm run start:dev
   
   # Terminal 2
   cd frontend && npm run dev
   ```

## 확인사항

- [ ] PostgreSQL 연결 (localhost:5434)
- [ ] Backend Health Check (http://localhost:3001/health)
- [ ] Frontend 접속 (http://localhost:3000)
