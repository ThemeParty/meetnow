# Setup
```
pnpm install
pn dev
```

# Pages
- 모임 메인: /meet
 - 모임 시간 정하기: /meet/time
 - 모임 장소 정하기: /meet/place
 - 모임 확정전 확인하기: /meet/confirm
 - 모임 생성 완료: /meet/{id}/confirm
- 모임 참여 메인: /meet/{id}/participant
 - 모임 참여 시간 투표하기: /meet/{id}/participant/time
 - 모임 참여 장소 투표하기: /meet/{id}/participant/place
 - 모임 참여 완료: /meet/{id}/participant/{participantId}/finish