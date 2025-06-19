# 1. 환경 변수 설정
export MONGO_DB_USERNAME="meetnow"
export MONGO_DB_PASSWORD="Nol-universe.com2025"

# 2. Docker 빌드
./docker-build.sh

# 3. Docker 실행
./docker-run.sh latest 8891 local