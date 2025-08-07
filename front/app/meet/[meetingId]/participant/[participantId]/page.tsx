"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { CheckCircle2, Share2 } from 'lucide-react'

import { BottomActions } from '@/components/actions'
import { PageContainer } from '@/components/page-container'
import { Button } from '@/components/ui/button'
import { useVote } from '@/context/VoteContext'
import { getMeetingDetail } from '@/actions/meeting'

interface PageProps {
  params: Promise<{
    meetingId: string
    participantId: string
  }>
}

interface MeetingPlace {
  id: string
  placeName: string
}

interface MeetingDateTime {
  id: string
  dateTime: string
}

export default function Page({ params }: PageProps) {
  const { meetingId } = useParams() as { meetingId: string }
  const { selectedTimes, selectedPlaces } = useVote()
  const [meeting, setMeeting] = useState<any>(null)
  const [selectedTimeLabels, setSelectedTimeLabels] = useState<string[]>([])
  const [selectedPlaceLabels, setSelectedPlaceLabels] = useState<string[]>([])

  useEffect(() => {
    if (!meetingId) return

    getMeetingDetail(meetingId).then((meetingData) => {
      setMeeting(meetingData)

      // 선택한 시간 ID를 실제 시간으로 변환
      if (meetingData?.meetingDateTimes && selectedTimes.length > 0) {
        const timeLabels = selectedTimes.map(timeId => {
          const timeData = meetingData.meetingDateTimes.find((dt: MeetingDateTime) => dt.id === timeId)
          return timeData ? new Date(timeData.dateTime).toLocaleString('ko-KR', {
            dateStyle: 'medium',
            timeStyle: 'short',
          }) : timeId
        })
        setSelectedTimeLabels(timeLabels)
      }

      // 선택한 장소 ID를 장소명으로 변환
      if (meetingData?.meetingPlaces && selectedPlaces.length > 0) {
        const placeLabels = selectedPlaces.map(placeId => {
          const placeData = meetingData.meetingPlaces.find((p: MeetingPlace) => p.id === placeId)
          return placeData ? placeData.placeName : placeId
        })
        setSelectedPlaceLabels(placeLabels)
      }
    })
  }, [meetingId, selectedTimes, selectedPlaces])

  return (
    <PageContainer title="투표 완료">
      <div className="space-y-6 p-4">
        {/* 완료 메시지 */}
        <div className="rounded-lg bg-green-50 p-6 text-center">
          <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-600" />
          <h2 className="mb-2 text-xl font-semibold text-green-800">
            투표가 완료되었습니다!
          </h2>
          <p className="text-green-700">
            선택하신 시간과 장소가 성공적으로 저장되었습니다.
          </p>
        </div>

        {/* 선택한 시간 정보 */}
        {selectedTimeLabels.length > 0 && (
          <div className="rounded-lg bg-blue-50 p-4">
            <h3 className="mb-2 font-semibold text-blue-800">선택한 시간</h3>
            <ul className="list-disc space-y-1 pl-5">
              {selectedTimeLabels.map((time, index) => (
                <li key={index} className="text-gray-700">
                  {time}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 선택한 장소 정보 */}
        {selectedPlaceLabels.length > 0 && (
          <div className="rounded-lg bg-green-50 p-4">
            <h3 className="mb-2 font-semibold text-green-800">선택한 장소</h3>
            <ul className="list-disc space-y-1 pl-5">
              {selectedPlaceLabels.map((place, index) => (
                <li key={index} className="text-gray-700">
                  {place}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 투표가 없는 경우 */}
        {selectedTimes.length === 0 && selectedPlaces.length === 0 && (
          <div className="rounded-lg bg-yellow-50 p-4">
            <h3 className="mb-2 font-semibold text-yellow-800">투표 정보 없음</h3>
            <p className="text-yellow-700">
              아직 시간이나 장소를 선택하지 않으셨습니다.
            </p>
          </div>
        )}
      </div>

      <BottomActions>
        <div className="flex justify-end gap-2">
          <Button className="flex w-[36px] gap-4 rounded-full" asChild>
            <Link href="/meet/123/participant/time">
              <Share2 size="sm" />
            </Link>
          </Button>
        </div>
      </BottomActions>
    </PageContainer>
  )
}
