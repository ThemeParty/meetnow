'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { MoveRight } from 'lucide-react'

import { createMeeting } from '@/actions/meeting'
import { BottomActions } from '@/components/actions'
import { PageContainer } from '@/components/page-container'
import { Button } from '@/components/ui/button'
import { useMeetingCreation } from '@/lib/context/MeetingCreationContext'

// 날짜를 한국어 형식으로 변환하는 함수
const formatKoreanDate = (dateString: string) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  // 요일 배열
  const weekdays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
  const weekday = weekdays[date.getDay()]

  return `${year}년 ${month}월 ${day}일 (${weekday})`
}

// 시간을 한국어 형식으로 변환하는 함수
const formatKoreanTime = (timeString: string) => {
  // 시간 문자열이 "HH" 또는 "HH:MM" 형식일 수 있음
  let hour: string, minute: string;

  if (timeString.includes(':')) {
    [hour, minute] = timeString.split(':');
  } else {
    hour = timeString;
    minute = '00';
  }

  const hourNum = parseInt(hour);
  const minuteNum = parseInt(minute);

  let timePrefix = '';
  if (hourNum < 12) {
    timePrefix = '오전';
  } else if (hourNum === 12) {
    timePrefix = '오후';
  } else {
    timePrefix = '오후';
  }

  // 분이 0이면 "시"만, 아니면 "시 분" 표시
  if (minuteNum === 0) {
    return `${timePrefix} ${hourNum}시`;
  } else {
    return `${timePrefix} ${hourNum}시 ${minuteNum}분`;
  }
}

export default function Page() {
  const router = useRouter()
  const { meetingData } = useMeetingCreation()

  const handleSubmit = async () => {
    // 개별 일정을 ISO 8601 형식으로 변환
    const meetingDateTimes = meetingData.schedules.map(schedule => 
      `${schedule.date}T${schedule.time}:00`
    )

    // 마감 날짜를 현재로부터 7일 뒤로 설정 (임의 값, 필요시 변경)
    const now = new Date()
    const closedDate = new Date(now.setDate(now.getDate() + 7)).toISOString()

    const meetingPayload = {
      name: meetingData.name,
      meetingDateTimes: meetingDateTimes,
      meetingPlaces: meetingData.places,
      closedDate: closedDate,
    }

    try {
      const result = await createMeeting(meetingPayload)
      router.push(`/meet/${result.hashedMeetingId}`)
    } catch (error: any) {
      console.error('미팅 생성 실패:', error)
      alert(error?.message)
    }
  }

  return (
    <PageContainer title="이렇게 약속을 만들까요?">
      <div className="max-w-2xl mx-auto p-6">
        {/* 미팅 정보 요약 표시 */}
        <div className="space-y-4">
          <div className="font-semibold">약속 이름: {meetingData.name}</div>
          <div className="font-semibold">일정 목록:</div>
          <div className="ml-4 space-y-2">
            {meetingData.schedules.map((schedule, index) => (
              <div key={index} className="p-2 border rounded bg-muted text-foreground">
                📅 {schedule.date} &nbsp;&nbsp; ⏰ {schedule.time}
              </div>
            ))}
          </div>
          <div className="font-semibold">장소:</div>
          <ul className="ml-4 list-inside list-disc">
            {meetingData.places.map((place, index) => (
              <li key={index} className="ml-2">
                {place}
              </li>
            ))}
          </ul>
        </div>

        <BottomActions>
          <div className="flex justify-between gap-4">
            <Button variant="outline" className="flex gap-2 px-6 py-3" asChild>
              <Link href="/meet/time" replace>
                이전 단계로
              </Link>
            </Button>
            <Button className="flex gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700" onClick={handleSubmit}>
              약속 만들기 <MoveRight className="w-4 h-4" />
            </Button>
          </div>
        </BottomActions>
      </div>
    </PageContainer>
  )
}
