# MeetNow Backend Docker 가이드

## 📋 개요

이 프로젝트는 Spring Boot Kotlin 애플리케이션을 Docker로 빌드하고 실행하기 위한 스크립트들을 포함합니다.

## 🚀 빠른 시작

### 1. 환경 변수 설정

```bash
export MONGO_DB_USERNAME="your_mongodb_username"
export MONGO_DB_PASSWORD="your_mongodb_password"
export SPRING_PROFILES_ACTIVE="local"  # 선택사항, 기본값: local
```

### 2. Docker 빌드

```bash
# 기본 태그로 빌드
./docker-build.sh

# 특정 태그로 빌드
./docker-build.sh v1.0.0
```

### 3. Docker 실행

```bash
# 기본 포트(8891)와 기본 프로필(local)로 실행
./docker-run.sh

# 특정 포트로 실행
./docker-run.sh latest 8080

# 특정 포트와 프로필로 실행
./docker-run.sh latest 8080 prod
```

## 🔧 Active Profile 설정

Spring Boot의 active profile을 설정하는 여러 방법이 있습니다:

### 방법 1: 환경 변수로 설정

```bash
# 환경 변수로 설정
export SPRING_PROFILES_ACTIVE=prod

# Docker 실행
./docker-run.sh
```

### 방법 2: 스크립트 파라미터로 설정

```bash
# 세 번째 파라미터로 프로필 지정
./docker-run.sh latest 8891 prod
```

### 방법 3: Docker Compose에서 설정

```bash
# 환경 변수로 설정
export SPRING_PROFILES_ACTIVE=prod

# Docker Compose 실행
docker-compose up -d
```

### 방법 4: 직접 Docker 명령어로 설정

```bash
docker run -d \
  --name meetnow-backend \
  -p 8891:8891 \
  -e MONGO_DB_USERNAME=${MONGO_DB_USERNAME} \
  -e MONGO_DB_PASSWORD=${MONGO_DB_PASSWORD} \
  -e SPRING_PROFILES_ACTIVE=prod \
  meetnow-backend:latest
```

## 🐳 Docker Compose 사용

### 전체 스택 실행 (Backend + MongoDB)

```bash
# 기본 프로필(local)로 실행
docker-compose up -d

# 특정 프로필로 실행
SPRING_PROFILES_ACTIVE=prod docker-compose up -d
```

### 특정 서비스만 실행

```bash
# Backend만 실행
docker-compose up -d meetnow-backend

# MongoDB만 실행
docker-compose up -d mongodb
```

### 서비스 중지

```bash
docker-compose down
```

## 📁 파일 구조

```
back/
├── Dockerfile              # 멀티스테이지 빌드 Dockerfile
├── docker-build.sh         # 빌드 스크립트
├── docker-run.sh          # 실행 스크립트
├── docker-compose.yml     # 개발 환경 구성
├── .dockerignore          # Docker 빌드 제외 파일
└── DOCKER_README.md       # 이 파일
```

## 🔧 Dockerfile 특징

- **멀티스테이지 빌드**: 빌드와 런타임을 분리하여 최종 이미지 크기 최적화
- **Java 21**: 최신 LTS 버전 사용
- **보안**: non-root 사용자로 실행
- **헬스체크**: 애플리케이션 상태 모니터링
- **캐싱 최적화**: Gradle 의존성을 먼저 복사하여 빌드 시간 단축
- **기본 프로필**: `local` 프로필이 기본으로 설정됨

## 🌐 접속 정보

- **애플리케이션**: http://localhost:8891
- **MongoDB**: mongodb://localhost:27017 (Docker Compose 사용 시)

## 📊 유용한 명령어

```bash
# 컨테이너 로그 확인
docker logs -f meetnow-backend

# 컨테이너 상태 확인
docker ps

# 컨테이너 내부 접속
docker exec -it meetnow-backend /bin/bash

# 이미지 정보 확인
docker images meetnow-backend

# 컨테이너 중지
docker stop meetnow-backend

# 컨테이너 제거
docker rm meetnow-backend

# 현재 활성 프로필 확인
docker exec meetnow-backend env | grep SPRING_PROFILES_ACTIVE
```

## 🔍 문제 해결

### 빌드 실패 시
1. Docker가 실행 중인지 확인
2. 충분한 디스크 공간 확보
3. 네트워크 연결 상태 확인

### 실행 실패 시
1. 환경 변수가 올바르게 설정되었는지 확인
2. 포트가 사용 중인지 확인
3. 로그를 확인하여 구체적인 오류 메시지 확인

### MongoDB 연결 실패 시
1. MongoDB Atlas 연결 문자열 확인
2. 네트워크 방화벽 설정 확인
3. 데이터베이스 사용자 권한 확인

### Profile 관련 문제
1. `SPRING_PROFILES_ACTIVE` 환경 변수가 올바르게 설정되었는지 확인
2. 해당 프로필의 설정 파일이 존재하는지 확인
3. 컨테이너 로그에서 프로필 로딩 상태 확인

## 📝 참고사항

- 프로덕션 환경에서는 보안을 위해 환경 변수를 `.env` 파일로 관리하는 것을 권장합니다.
- 헬스체크 엔드포인트는 Spring Boot Actuator가 필요합니다.
- 로컬 개발 시에는 `docker-compose.yml`을 사용하여 MongoDB와 함께 실행하는 것을 권장합니다.
- 기본 프로필은 `local`로 설정되어 있으며, 필요에 따라 `prod`, `dev`, `test` 등으로 변경할 수 있습니다. 