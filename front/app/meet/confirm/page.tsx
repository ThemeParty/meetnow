'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MoveRight } from 'lucide-react'
import { createMeeting } from '@/actions/meeting'

import { BottomActions } from '@/components/actions'
import { PageContainer } from '@/components/page-container'
import { Button } from '@/components/ui/button'
import { useMeetingCreation } from '@/lib/context/MeetingCreationContext'

export default function Page() {
  const router = useRouter()
  const { meetingData } = useMeetingCreation()

  const handleSubmit = async () => {
    // 미팅 날짜와 시간을 ISO 8601 형식으로 결합
    const meetingDateTimes = meetingData.dates.flatMap(date => {
      const times = meetingData.times;
      if (times.length === 2) {
        return [
          `${date}T${times[0]}:00`, // 초 추가
          `${date}T${times[1]}:00`,
        ];
      }
      return [];
    });

    // 마감 날짜를 현재로부터 7일 뒤로 설정 (임의 값, 필요시 변경)
    const now = new Date();
    const closedDate = new Date(now.setDate(now.getDate() + 7)).toISOString();

    const meetingPayload = {
      name: meetingData.name,
      meetingDateTimes: meetingDateTimes,
      meetingPlaces: meetingData.places,
      closedDate: closedDate,
    };

    try {
      const result = await createMeeting(meetingPayload)
      // 미팅 생성 후 다음 페이지로 이동
      router.push(`/meet/${result.hashedMeetingId}`)
    } catch (error: any) {
      console.error('미팅 생성 실패:', error)
      alert(error?.message)
    }
  }

  return (
    <PageContainer title="이렇게 약속을 만들까요?">
      <div className="m-4">
        {/* 미팅 정보 요약 표시 */}
        <div className="space-y-4">
          <div className="font-semibold">약속 이름: {meetingData.name}</div>
          <div className="font-semibold">날짜와 시간:</div>
          {meetingData.dates.map((date, dateIndex) => (
            <div key={dateIndex} className="ml-4">
              {date}:
              {meetingData.times.map((time, timeIndex) => (
                <span key={timeIndex} className="ml-2">
                  {time}:00
                </span>
              ))}
            </div>
          ))}
          <div className="font-semibold">장소:</div>
          <div className="ml-4">
            {meetingData.places.map((place, index) => (
              <span key={index} className="ml-2">
                {place}
              </span>
            ))}
          </div>
        </div>

        <BottomActions>
          <div className="flex justify-between gap-2">
            <Button variant="outline" className="flex gap-4" asChild>
              <Link href="/meet/time" replace>
                이전 단계로
              </Link>
            </Button>
            <Button className="flex gap-4" onClick={handleSubmit}>
              약속 만들기 <MoveRight />
            </Button>
          </div>
        </BottomActions>
      </div>
    </PageContainer>
  )
}
