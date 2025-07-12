"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { MoveRight } from 'lucide-react'

import { BottomActions } from '@/components/actions'
import { PageContainer } from '@/components/page-container'
import { Button } from '@/components/ui/button'
import { getMeetingDetail } from '@/actions/meeting'

interface MeetingDateTimeResponse {
  id: string
  dateTime: string
  participants: any[]
}

export default function Page() {
  const { meetingId } = useParams() as { meetingId: string }
  const [meeting, setMeeting] = useState<any>(null)
  const [selectedTimes, setSelectedTimes] = useState<string[]>([])

  useEffect(() => {
    if (!meetingId) return
    getMeetingDetail(meetingId).then(setMeeting)
  }, [meetingId])

  const handleSelect = (id: string) => {
    setSelectedTimes((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    )
  }

  return (
    <PageContainer title="익명의 피자님, 우리 이날 만나요!">
      <div>가능한 시간 블럭을 모두 선택해 주세요</div>
      <div className="flex flex-col gap-2 my-4">
        {meeting?.meetingDateTimes?.map((dt: MeetingDateTimeResponse) => (
          <Button
            key={dt.id}
            variant={selectedTimes.includes(dt.id) ? 'default' : 'outline'}
            onClick={() => handleSelect(dt.id)}
            className="justify-start"
          >
            {new Date(dt.dateTime).toLocaleString('ko-KR', { dateStyle: 'medium', timeStyle: 'short' })}
          </Button>
        ))}
      </div>
      <BottomActions>
        <div className="flex justify-between gap-2">
          <Button variant="outline" asChild>
            <Link href={meetingId ? `/meet/${meetingId}/participant` : ''}>이전 단계로</Link>
          </Button>
          <Button asChild>
            <Link href={meetingId ? `/meet/${meetingId}/participant/place` : ''}>
              다음으로 <MoveRight />
            </Link>
          </Button>
        </div>
      </BottomActions>
    </PageContainer>
  )
}
