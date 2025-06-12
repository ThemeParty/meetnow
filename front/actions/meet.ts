// 미팅을 생성

import { apiClient } from "@/lib/client"

interface Meeting {
    title: string
    date: Date[]
    place: string[]
}

export const createMeeting = async (meeting: Meeting) => {
    const response = await apiClient.post('/meetings', meeting)
    return response.data
}