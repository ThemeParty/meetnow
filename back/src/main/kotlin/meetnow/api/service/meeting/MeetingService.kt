package meetnow.api.service.meeting

import meetnow.api.constant.logger
import meetnow.api.domain.Meeting
import meetnow.api.dto.MeetingCreateRequest
import meetnow.api.repository.MeetingRepository
import meetnow.api.util.MeetingHashedIdGenerator
import org.springframework.stereotype.Service

@Service
class MeetingService(
    private val repository: MeetingRepository,
){
    fun createMeeting(meetingCreateRequest: MeetingCreateRequest) {
        val hashedId = makeMeetingHashedId()
        val meeting = Meeting.createWithHashedId(meetingCreateRequest, hashedId)
        repository.save(meeting)
    }

    private fun makeMeetingHashedId(): String {
        var retryCount = 0
        while (true) {
            val hashedId = MeetingHashedIdGenerator.generate()
            if (repository.findByHashedId(hashedId) == null) {
                return hashedId
            }
            retryCount++
            if(retryCount >= 10) {
                // TODO: MeetnowException을 정의하여 사용하도록 변경
                val errorMessage = "Meeting의 해시 아이디를 생성하는 최대 횟수를 초과했습니다."
                logger.error(errorMessage)
                throw RuntimeException(errorMessage)
            }
        }
    }
}