# 1. 환경 변수 설정
export MONGO_DB_USERNAME="Your Username"
export MONGO_DB_PASSWORD="Your Password"

# 2. Docker 빌드
./docker-build.sh

# 3. Docker 실행
./docker-run.sh latest 8891 local