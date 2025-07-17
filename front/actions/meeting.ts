'use server';
import env from '@/lib/environment';

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
      'x-api-key': 'KM1D8wQdH12F7d3UIaHSfvl5RgeAmZVsjtEhvLSqb3bkWXA1CPrQTAgYCWJ8ATaW'
    },
    body: JSON.stringify({
      name: '6월 Meetnow 스터디 모임',
      meetingDateTimes: ['2025-06-03T18:00:00', '2025-06-10T19:00:00'],
      meetingPlaces: ['MDM 타워', '10X 타워'],
      closedDate: '2025-05-25T18:00:00',
    }),
  })

  // 입력값 확인용 로그
  console.log('createMeeting input:', meetingData);

  // Mock 데이터 반환
  return await response.json()
}

interface SaveParticipantData {
  meetingId: string;
  selectedPlaces: string[];
}

interface SaveParticipantResponse {
  id: string; // 생성된 참여자 ID
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
  //     'x-api-key': 'KM1D8wQdH12F7d3UIaHSfvl5RgeAmZVsjtEhvLSqb3bkWXA1CPrQTAgYCWJ8ATaW'
  //   },
  //   body: JSON.stringify(data),
  // })

  // 입력값 확인용 로그
  console.log('saveParticipantData input:', data);

  // Mock 데이터 반환
  return {
    id: 'mock-participant-id-123'
  };
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
  id: string;
  hashedMeetingId: string;
  name: string;
  finalPlace: string | null;
  meetingDateTimes: MeetingDateTimeResponse[];
  meetingPlaces: MeetingPlaceResponse[];
  scheduleAt: string;
  voteClosedAt: string;
  createdAt: string;
  closedDate: string; // ISO 8601 형식의 마감 날짜 및 시간
}

/**
 * `/api/v1/meetings/:hashedMeetingId` 엔드포인트에 GET 요청을 보내 특정 미팅의 상세 정보를 가져오는 Next.js 서버 액션입니다.
 * @param hashedMeetingId 가져올 미팅의 해시된 ID
 * @returns 특정 미팅의 상세 정보 응답 데이터
 */
export const getMeetingDetail = async (
  hashedMeetingId: string,
): Promise<MeetingDetail> => {
  // API 호출이 아직 구현되지 않았으므로 주석 처리
  // const response = await fetch(`${env.API_BASE_URL}/api/v1/meetings/${hashedMeetingId}`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'x-api-key': 'KM1D8wQdH12F7d3UIaHSfvl5RgeAmZVsjtEhvLSqb3bkWXA1CPrQTAgYCWJ8ATaW'
  //   },
  // })

  // 입력값 확인용 로그
  console.log('getMeetingDetail input:', hashedMeetingId);

  // Mock 데이터 반환
  return {
    id: 'mock-meeting-id-123',
    hashedMeetingId: 'mock-meeting-id-123',
    name: '6월 Meetnow 스터디 모임',
    finalPlace: null,
    meetingDateTimes: [
      {
        id: 'mock-datetime-1',
        dateTime: '2025-06-03T18:00:00',
        participants: []
      },
      {
        id: 'mock-datetime-2',
        dateTime: '2025-06-10T19:00:00',
        participants: []
      }
    ],
    meetingPlaces: [
      {
        id: 'mock-place-1',
        placeName: 'MDM 타워',
        participants: []
      },
      {
        id: 'mock-place-2',
        placeName: '10X 타워',
        participants: []
      }
    ],
    scheduleAt: '2025-06-03T18:00:00',
    voteClosedAt: '2025-05-25T18:00:00',
    createdAt: '2025-07-12T10:25:40+09:00',
    closedDate: '2025-05-25T18:00:00'
  };
}
