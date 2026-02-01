# SSL 인증서 디렉토리

이 디렉토리에 SSL 인증서를 배치하세요.

## 필요한 파일

- `fullchain.pem` - 전체 인증서 체인
- `privkey.pem` - 개인키

## Let's Encrypt 발급 예시

```bash
# Certbot 설치 (Ubuntu/Debian)
sudo apt-get install certbot

# 인증서 발급
sudo certbot certonly --standalone \
  -d joonbi.co.kr \
  -d www.joonbi.co.kr \
  -d api.joonbi.co.kr

# 인증서 복사
sudo cp /etc/letsencrypt/live/joonbi.co.kr/fullchain.pem ./
sudo cp /etc/letsencrypt/live/joonbi.co.kr/privkey.pem ./

# 권한 설정
sudo chmod 644 fullchain.pem
sudo chmod 600 privkey.pem
```

## 자동 갱신 설정

Let's Encrypt 인증서는 90일마다 갱신이 필요합니다.

```bash
# Crontab 설정
sudo crontab -e

# 매월 1일 새벽 3시에 갱신 시도
0 3 1 * * certbot renew --quiet && docker-compose restart nginx
```

## 개발 환경

개발 환경(docker-compose.dev.yml)에서는 SSL을 사용하지 않으므로 이 파일들이 필요하지 않습니다.
