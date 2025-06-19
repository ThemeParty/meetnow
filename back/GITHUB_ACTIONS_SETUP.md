# GitHub Actions 백엔드 배포 설정 가이드

## 📋 개요

이 문서는 GitHub Actions를 사용하여 MeetNow 백엔드를 자동으로 배포하는 방법을 설명합니다.

## 🚀 생성된 워크플로우

### 1. `deploy-backend.yml` - 수동 배포
- **트리거**: GitHub Actions 탭에서 수동 실행
- **기능**: Profile 선택 가능 (prod, dev, local)
- **사용법**: GitHub Actions → Deploy Backend to Server → Run workflow

### 2. `deploy-backend-auto.yml` - 자동 배포
- **트리거**: main 브랜치에 `back/` 디렉토리 변경사항 푸시 시
- **기능**: 자동으로 prod profile로 배포
- **사용법**: main 브랜치에 백엔드 코드 푸시

## 🔧 GitHub Secrets 설정

GitHub 저장소의 Settings → Secrets and variables → Actions에서 다음 설정이 필요합니다:

### Required Secrets
```
MEETNOW_DOCKER_HUB_ACCESS_TOKEN    # Docker Hub 액세스 토큰
WONHYEONG_MAC_MINI_USERNAME        # 서버 사용자명
WONHYEONG_MAC_MINI_SSH_KEY         # 서버 SSH 개인키
MONGO_DB_USERNAME                   # MongoDB 사용자명
MONGO_DB_PASSWORD                   # MongoDB 비밀번호
WONHYEONG_MAC_MINI_MEETNOW_HOME    # 서버의 프로젝트 홈 디렉토리 경로
```

### Required Variables
```
MEETNOW_DOCKER_HUB_ID              # Docker Hub 사용자명
```

## 📝 설정 방법

### 1. Docker Hub 액세스 토큰 생성
1. Docker Hub에 로그인
2. Account Settings → Security → New Access Token
3. 토큰 생성 후 복사하여 GitHub Secrets에 저장

### 2. SSH 키 설정
```bash
# 로컬에서 SSH 키 생성 (이미 있다면 생략)
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# 공개키를 서버에 등록
ssh-copy-id username@meetnow.kr -p 25522

# 개인키를 GitHub Secrets에 등록
cat ~/.ssh/id_rsa
```

### 3. GitHub Secrets 등록
1. GitHub 저장소 → Settings → Secrets and variables → Actions
2. "New repository secret" 클릭
3. 위의 Required Secrets 목록에 따라 등록

## 🎯 사용 방법

### 수동 배포 (Profile 선택 가능)
1. GitHub 저장소 → Actions 탭
2. "Deploy Backend to Server" 워크플로우 선택
3. "Run workflow" 클릭
4. Profile 선택 (prod, dev, local)
5. "Run workflow" 클릭

### 자동 배포
```bash
# main 브랜치에 백엔드 코드 푸시
git add back/
git commit -m "Update backend code"
git push origin main
```

## 🔍 배포 확인

### 배포 상태 확인
1. GitHub Actions 탭에서 워크플로우 실행 상태 확인
2. 모든 단계가 성공적으로 완료되었는지 확인

### 서버에서 확인
```bash
# 컨테이너 상태 확인
docker ps | grep meetnow-backend

# 로그 확인
docker logs -f meetnow-backend

# 헬스체크
curl http://meetnow.kr:8891/actuator/health
```

## 🚨 문제 해결

### 배포 실패 시
1. **GitHub Secrets 확인**: 모든 필수 secrets가 등록되었는지 확인
2. **Docker Hub 로그인 확인**: 액세스 토큰이 유효한지 확인
3. **SSH 연결 확인**: 서버에 SSH 접속이 가능한지 확인
4. **포트 충돌 확인**: 8891 포트가 사용 중인지 확인

### 애플리케이션 시작 실패 시
1. **환경변수 확인**: MongoDB 연결 정보가 올바른지 확인
2. **로그 확인**: `docker logs meetnow-backend`로 오류 메시지 확인
3. **네트워크 확인**: Docker 네트워크 설정 확인

## 📊 모니터링

### 로그 모니터링
```bash
# 실시간 로그 확인
docker logs -f meetnow-backend

# 최근 로그 확인
docker logs --tail 100 meetnow-backend
```

### 상태 모니터링
```bash
# 컨테이너 상태
docker ps -a | grep meetnow-backend

# 리소스 사용량
docker stats meetnow-backend

# 헬스체크
curl -f http://meetnow.kr:8891/actuator/health
```

## 🔄 롤백 방법

### 이전 버전으로 롤백
```bash
# 특정 태그로 롤백
docker stop meetnow-backend
docker rm meetnow-backend
docker run -d \
  --name meetnow-backend \
  -p 8891:8891 \
  --restart always \
  --network meetnow_app-network \
  -e MONGO_DB_USERNAME=${MONGO_DB_USERNAME} \
  -e MONGO_DB_PASSWORD=${MONGO_DB_PASSWORD} \
  -e SPRING_PROFILES_ACTIVE=prod \
  your-dockerhub-id/meetnow-backend:previous-tag
```

## 📝 참고사항

- **보안**: 민감한 정보는 반드시 GitHub Secrets에 저장
- **백업**: 배포 전 중요한 데이터 백업
- **테스트**: 프로덕션 배포 전 로컬에서 충분히 테스트
- **모니터링**: 배포 후 애플리케이션 상태 지속적 모니터링 