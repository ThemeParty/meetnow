'use server'
import { apiClient } from "@/lib/client";

interface MeetingData {
    name: string; // 미팅 제목
    meetingDateTimes: string[]; // ISO 8601 형식의 날짜 및 시간 문자열 배열 (예: ["2025-06-03T18:00:00", "2025-06-10T19:00:00"])
    meetingPlaces: string[]; // 미팅 장소 문자열 배열
    closedDate: string; // ISO 8601 형식의 마감 날짜 및 시간 (예: "2025-05-25T18:00:00")
}

interface CreateMeetingResponse {
  hashedMeetingId: string;
}

/**
 * `/api/v1/meeting` 엔드포인트에 POST 요청을 보내 새로운 미팅을 생성하는 Next.js 서버 액션입니다.
 * @param meetingData 생성할 미팅 데이터
 * @returns 생성된 미팅의 응답 데이터
 */
export const createMeeting = async (meetingData: MeetingData): Promise<CreateMeetingResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/meeting`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(meetingData),
    });

    if (!response.ok) {
        throw new Error('Failed to create meeting');
    }

    return await response.json();
};

// --- GET /api/v1/meetings/:hashedMeetingId 응답 타입 ---

interface ParticipantResponse {
    id: string;
    name: string;
}

interface MeetingDateTimeResponse {
    id: string;
    dateTime: string; // LocalDateTime as ISO 8601 string
    participants: ParticipantResponse[];
}

interface MeetingPlaceResponse {
    id: string;
    placeName: string;
    participants: ParticipantResponse[];
}

// 미팅 상세 정보에 대한 응답 타입 (MeetingResponse.kt 기반)
interface MeetingDetail {
    hashedMeetingId: string;
    name: string;
    finalPlace: string | null;
    scheduleAt: string | null; // LocalDateTime as ISO 8601 string
    voteClosedAt: string; // LocalDateTime as ISO 8601 string
    meetingDateTimes: MeetingDateTimeResponse[];
    meetingPlaces: MeetingPlaceResponse[];
    createdAt: string; // LocalDateTime as ISO 8601 string
}

/**
 * `/api/v1/meetings/:hashedMeetingId` 엔드포인트에 GET 요청을 보내 특정 미팅의 상세 정보를 가져오는 Next.js 서버 액션입니다.
 * @param hashedMeetingId 가져올 미팅의 해시된 ID
 * @returns 특정 미팅의 상세 정보 응답 데이터
 */
export const getMeetingDetail = async (hashedMeetingId: string): Promise<MeetingDetail> => {
    const response = await apiClient.get(`/api/v1/meetings/${hashedMeetingId}`);
    return response.data as MeetingDetail;
};