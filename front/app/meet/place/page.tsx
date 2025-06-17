'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { MoveRight } from 'lucide-react'

import { createMeeting } from '@/actions/meeting'
import { BottomActions } from '@/components/actions'
import { PageContainer } from '@/components/page-container'
import { Button } from '@/components/ui/button'
import { useMeetingCreation } from '@/lib/context/MeetingCreationContext'

import { Places } from './places'

export default function Page() {
  const router = useRouter()
  const { meetingData } = useMeetingCreation() // 컨텍스트에서 미팅 데이터 가져오기
  const [places, setPlaces] = useState<string[]>([])

  const handleNext = async () => {
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
      name: meetingData.name, // 컨텍스트에서 미팅 이름 사용
      meetingDateTimes: meetingDateTimes,
      meetingPlaces: places,
      closedDate: closedDate,
    };

    try {
      const result = await createMeeting(meetingPayload)
      // 미팅 생성 후 다음 페이지로 이동
      router.push(`/meet/${result.hashedMeetingId}`)
    } catch (error) {
      console.error('미팅 생성 실패:', error)
      // 에러 처리 (예: 사용자에게 알림)
    }
  }

  return (
    <PageContainer title="우리 어디서 만날까요?">
      <div className='m-4'>
        <div className='flex flex-col gap-4'>
          <div>친구들에게 5개까지 제안할 수 있어요. 투표로 결정돼요.</div>
          <div>
            <Places places={places} setPlaces={setPlaces} />
          </div>
        </div>

        <BottomActions className="flex flex-col gap-4">
          <div className="flex justify-between gap-2">
            <Button variant="outline" className="flex gap-4" asChild>
              <Link href="/meet/time" replace>
                이전 단계로
              </Link>
            </Button>
            <Button type="button" className="flex gap-4" onClick={handleNext}>
              다음으로 <MoveRight />
            </Button>
          </div>
        </BottomActions>
      </div>
    </PageContainer>
  )
}
