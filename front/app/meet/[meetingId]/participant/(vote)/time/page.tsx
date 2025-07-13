'use client'

import { useEffect, use, useState } from 'react'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import { MoveRight } from 'lucide-react'

import { getMeetingDetail } from '@/actions/meeting'
import { BottomActions } from '@/components/actions'
import { PageContainer } from '@/components/page-container'
import { Button } from '@/components/ui/button'
import { useVote } from '@/context/VoteContext'

interface MeetingDateTimeResponse {
  id: string
  dateTime: string
  participants: any[]
}

export default function Page({ params }: { params: Promise<{ meetingId: string }> }) {
  const { meetingId } = use(params)
  const [meeting, setMeeting] = useState<any>(null)
  const { selectedTimes, toggleTime } = useVote()

  useEffect(() => {
    if (!meetingId) return
    console.log(meetingId)
    getMeetingDetail(meetingId).then(setMeeting)
  }, [meetingId])

  const handleSelect = (id: string) => {
    toggleTime(id)
  }

  return (
    <PageContainer title="익명의 피자님, 우리 이날 만나요!">
      <div className="p-4">
        <div>가능한 시간 블럭을 모두 선택해 주세요</div>
        <div className="my-4 flex flex-col gap-2">
          {meeting?.meetingDateTimes?.map((dt: MeetingDateTimeResponse) => (
            <Button
              key={dt.id}
              variant={selectedTimes.includes(dt.id) ? 'default' : 'outline'}
              onClick={() => handleSelect(dt.id)}
              className="justify-start"
            >
              {new Date(dt.dateTime).toLocaleString('ko-KR', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </Button>
          ))}
        </div>
        <BottomActions>
          <div className="flex justify-between gap-2">
            <Button variant="outline" asChild>
              <Link href={meetingId ? `/meet/${meetingId}/participant` : ''}>
                이전 단계로
              </Link>
            </Button>
            <Button asChild>
              <Link
                href={meetingId ? `/meet/${meetingId}/participant/place` : ''}
              >
                다음으로 <MoveRight />
              </Link>
            </Button>
          </div>
        </BottomActions>
      </div>
    </PageContainer>
  )
}
