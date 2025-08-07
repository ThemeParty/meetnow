'use server';
import env from '@/lib/environment';

interface ParticipantInfo {
  id: string
  name: string
  preferredTimes: string[]
  preferredLocations: string[]
}

export async function getParticipantInfo(
  meetingId: string,
  participantId: string,
): Promise<ParticipantInfo> {
  const response = await fetch(
    `${env.API_BASE_URL}/api/v1/meetings/${meetingId}/participants/${participantId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ACCESS_KEY_SECRET,
      },
    },
  )

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(
      `참여자 정보 조회 실패: ${response.status} ${response.statusText}${errorData.message ? ` - ${errorData.message}` : ''}`,
    )
  }

  const data = await response.json()
  
  // API 응답을 기존 인터페이스에 맞춰 변환
  return {
    id: data.id,
    name: data.name,
    preferredTimes: data.selectedDateTimes || [],
    preferredLocations: data.selectedPlaces || [],
  }
}
