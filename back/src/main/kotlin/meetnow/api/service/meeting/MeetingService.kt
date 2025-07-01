package meetnow.api.service.meeting

import meetnow.api.constant.logger
import meetnow.api.domain.Meeting
import meetnow.api.dto.MeetingCreateRequest
import meetnow.api.dto.MeetingResponse
import meetnow.api.error.MeetnowErrorCode
import meetnow.api.exception.MeetnowException
import meetnow.api.repository.MeetingRepository
import meetnow.api.util.MeetingHashedIdGenerator
import meetnow.api.util.toKSTLocalDateTime
import org.springframework.stereotype.Service

@Service
class MeetingService(
    private val repository: MeetingRepository,
) {
    fun getMeeting(hashedMeetingId: String): MeetingResponse {
        val meeting = getMeetingByHashedId(hashedMeetingId)
        logger.debug { "Meeting 조회 성공: $hashedMeetingId" }

        return MeetingResponse.fromMeeting(
            meeting = meeting,
            finalPlace = meeting.finalPlace ?: meeting.getMostVotedPlace()?.name,
            scheduleAt =
                meeting.scheduleAt?.toKSTLocalDateTime()
                    ?: meeting.getMostVotedDateTime()?.dateTime?.toKSTLocalDateTime(),
        )
    }

    private fun getMeetingByHashedId(hashedMeetingId: String): Meeting =
        repository.findByHashedId(hashedMeetingId) ?: throw MeetnowException(
            errorCode = MeetnowErrorCode.NOT_FOUND,
            message = "$hashedMeetingId Meeting을 찾을 수 없습니다.",
            exposeMessageToClient = true,
        )

    fun createMeeting(meetingCreateRequest: MeetingCreateRequest): String {
        val hashedId = makeMeetingHashedId()
        val meeting = Meeting.createWithHashedId(meetingCreateRequest, hashedId)
        repository.save(meeting)
        return hashedId
    }

    private fun makeMeetingHashedId(): String {
        var retryCount = 0
        while (true) {
            val hashedId = MeetingHashedIdGenerator.generate()
            if (!repository.existsByHashedId(hashedId)) {
                return hashedId
            }
            retryCount++
            if (retryCount >= 10) {
                val errorMessage = "Meeting의 해시 아이디를 생성하는 최대 횟수를 초과했습니다."
                throw MeetnowException(MeetnowErrorCode.INTERNAL_SERVER_ERROR, errorMessage)
            }
        }
    }
}
