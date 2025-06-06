package meetnow.api.service.meeting

import meetnow.api.constant.logger
import meetnow.api.domain.Meeting
import meetnow.api.dto.MeetingCreateRequest
import meetnow.api.error.MeetnowErrorCode
import meetnow.api.exception.MeetnowException
import meetnow.api.repository.MeetingRepository
import meetnow.api.util.MeetingHashedIdGenerator
import org.springframework.stereotype.Service

@Service
class MeetingService(
    private val repository: MeetingRepository,
) {
    fun getMeeting(hashedMeetingId: String): Meeting {
        val meeting = getMeetingByHashedId(hashedMeetingId)
        logger.debug { "Meeting 조회 성공: $hashedMeetingId" }
        return meeting
    }

    private fun getMeetingByHashedId(hashedMeetingId: String): Meeting =
        repository.findByHashedId(hashedMeetingId) ?: throw MeetnowException(
            errorCode = MeetnowErrorCode.NOT_FOUND,
            message = "$hashedMeetingId Meeting을 찾을 수 없습니다.",
            exposeMessageToClient = true,
        )

    fun createMeeting(meetingCreateRequest: MeetingCreateRequest) {
        val hashedId = makeMeetingHashedId()
        val meeting = Meeting.createWithHashedId(meetingCreateRequest, hashedId)
        repository.save(meeting)
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
                // TODO: MeetnowException을 정의하여 사용하도록 변경
                val errorMessage = "Meeting의 해시 아이디를 생성하는 최대 횟수를 초과했습니다."
                logger.error(errorMessage)
                throw RuntimeException(errorMessage)
            }
        }
    }
}
