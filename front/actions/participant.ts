'use server'

import { revalidatePath } from 'next/cache'

type ParticipantInfo = {
  id: string
  name: string
  preferredTimes: string[]
  preferredLocations: string[]
}

export async function getParticipantInfo(meetingId: string, participantId: string): Promise<ParticipantInfo> {
  // TODO: Replace with actual API call
  // This is a mock implementation
  return {
    id: participantId,
    name: '참여자',
    preferredTimes: ['월요일 오후 2시', '화요일 오전 10시'],
    preferredLocations: ['서울 강남구', '서울 서초구']
  }
}
