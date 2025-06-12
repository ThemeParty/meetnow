import { apiClient } from "@/lib/client";

interface MeetingData {
    name: string; // 미팅 제목
    meetingDateTimes: string[]; // ISO 8601 형식의 날짜 및 시간 문자열 배열 (예: ["2025-06-03T18:00:00", "2025-06-10T19:00:00"])
    meetingPlaces: string[]; // 미팅 장소 문자열 배열
    closedDate: string; // ISO 8601 형식의 마감 날짜 및 시간 (예: "2025-05-25T18:00:00")
}

/**
 * `/api/v1/meeting` 엔드포인트에 POST 요청을 보내 새로운 미팅을 생성하는 Next.js 서버 액션입니다.
 * @param meetingData 생성할 미팅 데이터
 * @returns 생성된 미팅의 응답 데이터
 */
export const createMeeting = async (meetingData: MeetingData) => {
    const response = await apiClient.post('/api/v1/meeting', meetingData);
    return response.data;
}; 