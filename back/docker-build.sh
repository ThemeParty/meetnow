#!/bin/bash

# Docker 빌드 스크립트
set -e

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 MeetNow Backend Docker 빌드를 시작합니다...${NC}"

# 이미지 이름과 태그 설정
IMAGE_NAME="meetnow-backend"
TAG=${1:-latest}

echo -e "${YELLOW}📦 이미지: ${IMAGE_NAME}:${TAG}${NC}"

# Docker 빌드 실행
echo -e "${YELLOW}🔨 Docker 이미지를 빌드합니다...${NC}"
docker build -t ${IMAGE_NAME}:${TAG} .

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Docker 빌드가 성공적으로 완료되었습니다!${NC}"
    echo -e "${GREEN}📋 이미지 정보:${NC}"
    docker images ${IMAGE_NAME}:${TAG}
else
    echo -e "${RED}❌ Docker 빌드에 실패했습니다.${NC}"
    exit 1
fi 