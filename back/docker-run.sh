#!/bin/bash

# Docker 실행 스크립트
set -e

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 기본 설정
IMAGE_NAME="meetnow-backend"
TAG=${1:-latest}
CONTAINER_NAME="meetnow-backend-container"
PORT=${2:-8891}
PROFILE=${3:-local}

echo -e "${GREEN}🚀 MeetNow Backend Docker 컨테이너를 실행합니다...${NC}"

# 기존 컨테이너가 실행 중인지 확인하고 중지
if [ "$(docker ps -q -f name=${CONTAINER_NAME})" ]; then
    echo -e "${YELLOW}⚠️  기존 컨테이너를 중지합니다...${NC}"
    docker stop ${CONTAINER_NAME}
fi

# 기존 컨테이너가 있는지 확인하고 제거
if [ "$(docker ps -aq -f status=exited -f name=${CONTAINER_NAME})" ]; then
    echo -e "${YELLOW}🗑️  기존 컨테이너를 제거합니다...${NC}"
    docker rm ${CONTAINER_NAME}
fi

# 환경 변수 설정
echo -e "${BLUE}🔧 환경 변수를 설정합니다...${NC}"
echo -e "${YELLOW}📝 다음 환경 변수들이 필요합니다:${NC}"
echo -e "   - MONGO_DB_USERNAME"
echo -e "   - MONGO_DB_PASSWORD"
echo -e "${YELLOW}📋 Active Profile: ${PROFILE}${NC}"

# 컨테이너 실행
echo -e "${YELLOW}🐳 Docker 컨테이너를 실행합니다...${NC}"
docker run -d \
    --name ${CONTAINER_NAME} \
    -p ${PORT}:8891 \
    -e MONGO_DB_USERNAME=${MONGO_DB_USERNAME} \
    -e MONGO_DB_PASSWORD=${MONGO_DB_PASSWORD} \
    -e SPRING_PROFILES_ACTIVE=${PROFILE} \
    --restart unless-stopped \
    ${IMAGE_NAME}:${TAG}

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ 컨테이너가 성공적으로 실행되었습니다!${NC}"
    echo -e "${GREEN}📋 컨테이너 정보:${NC}"
    docker ps -f name=${CONTAINER_NAME}
    echo -e "${GREEN}🌐 애플리케이션 접속: http://localhost:${PORT}${NC}"
    echo -e "${GREEN}📊 로그 확인: docker logs -f ${CONTAINER_NAME}${NC}"
    echo -e "${GREEN}🔧 Active Profile: ${PROFILE}${NC}"
else
    echo -e "${RED}❌ 컨테이너 실행에 실패했습니다.${NC}"
    exit 1
fi 