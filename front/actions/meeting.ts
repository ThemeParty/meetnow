'use server'
import env from '@/lib/environment'

interface MeetingData {
  name: string // 미팅 제목
  meetingDateTimes: string[] // ISO 8601 형식의 날짜 및 시간 문자열 배열 (예: ["2025-06-03T18:00:00", "2025-06-10T19:00:00"])
  meetingPlaces: string[] // 미팅 장소 문자열 배열
  closedDate: string // ISO 8601 형식의 마감 날짜 및 시간 (예: "2025-05-25T18:00:00")
}

interface CreateMeetingResponse {
  hashedMeetingId: string
}

/**
 * `/api/v1/meeting` 엔드포인트에 POST 요청을 보내 새로운 미팅을 생성하는 Next.js 서버 액션입니다.
 * @param meetingData 생성할 미팅 데이터
 * @returns 생성된 미팅의 응답 데이터
 */
export const createMeeting = async (
  meetingData: MeetingData,
): Promise<CreateMeetingResponse> => {
  // API 호출이 아직 구현되지 않았으므로 주석 처리
  const response = await fetch(`${env.API_BASE_URL}/api/v1/meetings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': env.ACCESS_KEY_SECRET,
    },
    body: JSON.stringify(meetingData),
  })

  // 입력값 확인용 로그
  console.log('createMeeting input:', meetingData)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(
      `미팅 생성 실패: ${response.status} ${response.statusText}${errorData.message ? ` - ${errorData.message}` : ''}`,
    )
  }

  return await response.json()
}

interface SaveParticipantData {
  meetingId: string
  selectedPlaces: string[]
}

interface SaveParticipantResponse {
  id: string // 생성된 참여자 ID
}

/**
 * POST /api/{meetingId}/participant 엔드포인트에 요청을 보내 참여자의 장소 선택을 저장하는 Next.js 서버 액션입니다.
 * @param data 저장할 참여자 데이터
 * @returns 저장된 데이터의 응답
 */
export const saveParticipantData = async (
  data: SaveParticipantData,
): Promise<SaveParticipantResponse> => {
  // API 호출이 아직 구현되지 않았으므로 주석 처리
  // const response = await fetch(`${env.API_BASE_URL}/api/${data.meetingId}/participant`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'x-api-key': env.ACCESS_KEY_SECRET
  //   },
  //   body: JSON.stringify(data),
  // })

  // 입력값 확인용 로그
  console.log('saveParticipantData input:', data)

  // Mock 데이터 반환
  return {
    id: 'mock-participant-id-123',
  }
}

// --- GET /api/v1/meetings/:hashedMeetingId 응답 타입 ---

interface ParticipantResponse {
  id: string
  name: string
}

interface MeetingDateTimeResponse {
  id: string
  dateTime: string // LocalDateTime as ISO 8601 string
  participants: ParticipantResponse[]
}

interface MeetingPlaceResponse {
  id: string
  placeName: string
  participants: ParticipantResponse[]
}

// 미팅 상세 정보에 대한 응답 타입 (MeetingResponse.kt 기반)
interface MeetingDetail {
  id: string
  hashedMeetingId: string
  name: string
  finalPlace: string | null
  meetingDateTimes: MeetingDateTimeResponse[]
  meetingPlaces: MeetingPlaceResponse[]
  scheduleAt: string
  voteClosedAt: string
  createdAt: string
  closedDate: string // ISO 8601 형식의 마감 날짜 및 시간
}

/**
 * `/api/v1/meetings/:hashedMeetingId` 엔드포인트에 GET 요청을 보내 특정 미팅의 상세 정보를 가져오는 Next.js 서버 액션입니다.
 * @param hashedMeetingId 가져올 미팅의 해시된 ID
 * @returns 특정 미팅의 상세 정보 응답 데이터
 */
export const getMeetingDetail = async (
  hashedMeetingId: string,
): Promise<MeetingDetail> => {
  const response = await fetch(
    `${env.API_BASE_URL}/api/v1/meetings/${hashedMeetingId}`,
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
      `미팅 생성 실패: ${response.status} ${response.statusText}${errorData.message ? ` - ${errorData.message}` : ''}`,
    )
  }

  const result = await response.json()
  console.log(result)
  return result
}
