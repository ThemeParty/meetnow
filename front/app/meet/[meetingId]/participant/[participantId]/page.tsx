import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Share2 } from 'lucide-react'

import { getParticipantInfo } from '@/actions/participant'
import { BottomActions } from '@/components/actions'
import { PageContainer } from '@/components/page-container'
import { Button } from '@/components/ui/button'

interface PageProps {
  params: Promise<{
    meetingId: string
    participantId: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { meetingId, participantId } = await params
  const participant = await getParticipantInfo(meetingId, participantId)

  if (!participant) {
    notFound()
  }

  return (
    <PageContainer title={`${participant.name}님의 참여 정보`}>
      <div className="space-y-6 p-4">
        <div className="rounded-lg bg-blue-50 p-4">
          <h3 className="mb-2 font-semibold text-blue-800">내 선호 시간</h3>
          <ul className="list-disc space-y-1 pl-5">
            {participant.preferredTimes.map((time, index) => (
              <li key={index} className="text-gray-700">
                {time}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg bg-green-50 p-4">
          <h3 className="mb-2 font-semibold text-green-800">내 선호 장소</h3>
          <ul className="list-disc space-y-1 pl-5">
            {participant.preferredLocations.map((location, index) => (
              <li key={index} className="text-gray-700">
                {location}
              </li>
            ))}
          </ul>
        </div>
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
