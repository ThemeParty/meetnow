"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { MoveRight } from 'lucide-react'

import { BottomActions } from '@/components/actions'
import { PageContainer } from '@/components/page-container'
import { Button } from '@/components/ui/button'
import { getMeetingDetail } from '@/actions/meeting'

interface MeetingPlaceResponse {
  id: string
  placeName: string
  participants: any[]
}

export default function Page() {
  const { meetingId } = useParams() as { meetingId: string }
  const [meeting, setMeeting] = useState<any>(null)
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([])

  useEffect(() => {
    if (!meetingId) return
    getMeetingDetail(meetingId).then(setMeeting)
  }, [meetingId])

  const handleSelect = (id: string) => {
    setSelectedPlaces((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    )
  }

  return (
    <PageContainer title="익명의 피자님, 우리 여기서 만나요!">
      <div>원하는 장소를 모두 선택해 주세요</div>
      <div className="flex flex-col gap-2 my-4">
        {meeting?.meetingPlaces?.map((place: MeetingPlaceResponse) => (
          <Button
            key={place.id}
            variant={selectedPlaces.includes(place.id) ? 'default' : 'outline'}
            onClick={() => handleSelect(place.id)}
            className="justify-start"
          >
            {place.placeName}
          </Button>
        ))}
      </div>
      <BottomActions>
        <div className="flex justify-between gap-2">
          <Button variant="outline" asChild>
            <Link href={meetingId ? `/meet/${meetingId}/participant/time` : ''}>이전 단계로</Link>
          </Button>
          <Button asChild>
            <Link href={meetingId ? `/meet/${meetingId}/participant/456` : ''}>
              다음으로 <MoveRight />
            </Link>
          </Button>
        </div>
      </BottomActions>
    </PageContainer>
  )
}
