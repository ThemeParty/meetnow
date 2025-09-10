"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

import { MoveRight } from 'lucide-react'

import { BottomActions } from '@/components/actions'
import { PageContainer } from '@/components/page-container'
import { Button } from '@/components/ui/button'
import { ParticipantNameDisplay } from '@/components/participant-name-display'
import { getMeetingDetail } from '@/actions/meeting'
import { useVote } from '@/context/VoteContext'
import { voteInMeeting } from '@/actions/meeting'

interface MeetingPlaceResponse {
  id: string
  placeName: string
  participants: any[]
}

export default function Page() {
  const { meetingId } = useParams() as { meetingId: string }
  const router = useRouter()
  const [meeting, setMeeting] = useState<any>(null)
  const { selectedTimes, selectedPlaces, togglePlace } = useVote()

  const handleNextClick = async () => {
    if (!meetingId) return

    // localStorage에서 참여자 이름 가져오기
    const participantName = localStorage.getItem(`participant-name-${meetingId}`)
    if (!participantName) {
      alert('참여자 이름을 먼저 입력해주세요.')
      return
    }

    try {
      const result = await voteInMeeting(meetingId, {
        participantName,
        preferredDateTimeIds: selectedTimes,
        preferredPlaceIds: selectedPlaces,
      })
      router.push(`/meet/${meetingId}/participant/${result.participantInfo.id}`)
    } catch (error) {
      console.error('Failed to save vote data:', error)
      alert('투표 저장에 실패했습니다. 다시 시도해주세요.')
    }
  }

  useEffect(() => {
    if (!meetingId) return
    getMeetingDetail(meetingId).then(setMeeting)
  }, [meetingId])

  const handleSelect = (id: string) => {
    togglePlace(id)
  }

  return (
    <PageContainer title="익명의 피자님, 우리 여기서 만나요!">
      <div className="p-4">
        {/* 참여자 이름 표시 */}
        <div className="mb-4 rounded-lg bg-blue-50 p-3">
          <div className="text-sm text-blue-700 mb-1">현재 참여자</div>
          <ParticipantNameDisplay
            meetingId={meetingId}
            showEditButton={true}
            className="text-blue-800"
          />
        </div>

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
            <Button
              onClick={handleNextClick}
            >
              다음으로 <MoveRight />
            </Button>
          </div>
        </BottomActions>
      </div>

    </PageContainer>
  )
}
