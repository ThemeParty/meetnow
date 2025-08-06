package meetnow.api.service.meeting

import meetnow.api.constant.logger
import meetnow.api.domain.Meeting
import meetnow.api.domain.Participant
import meetnow.api.dto.MeetingCreateRequest
import meetnow.api.dto.MeetingResponse
import meetnow.api.dto.MeetingVoteRequest
import meetnow.api.dto.MeetingVoteResponse
import meetnow.api.error.MeetnowErrorCode
import meetnow.api.exception.MeetnowException
import meetnow.api.mapper.toMeetingResponse
import meetnow.api.repository.MeetingRepository
import meetnow.api.util.MeetingHashedIdGenerator
import org.springframework.stereotype.Service
import java.time.Instant

@Service
class MeetingService(
    private val repository: MeetingRepository,
) {
    fun getMeeting(hashedMeetingId: String): MeetingResponse {
        val meeting = getMeetingByHashedId(hashedMeetingId)
        logger.debug { "Meeting 조회 성공: $hashedMeetingId" }

        return meeting.toMeetingResponse()
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
    
    fun closeMeeting(hashedMeetingId: String): MeetingResponse {
        val meeting = getMeetingByHashedId(hashedMeetingId)
        meeting.close()
        repository.save(meeting)
        logger.debug { "Meeting 종료 성공: $meeting" }
        return meeting.toMeetingResponse()

    /** 미팅 장소 / 시간 투표 */
    fun voteInMeeting(
        hashedMeetingId: String,
        voteRequest: MeetingVoteRequest,
    ): MeetingVoteResponse {
        val meeting = getMeetingByHashedId(hashedMeetingId)

        // 참가자 생성
        val participant = Participant(name = voteRequest.participantName)

        // 날짜/시간 투표 처리
        val updatedDateTimes =
            meeting.meetingDateTimes.map { dateTime ->
                if (voteRequest.preferredDateTimeIds.contains(dateTime.id)) {
                    val updatedParticipants = (dateTime.participants ?: emptyList()) + participant
                    dateTime.copy(participants = updatedParticipants)
                } else {
                    dateTime
                }
            }

        // 장소 투표 처리
        val updatedPlaces =
            meeting.meetingPlaces.map { place ->
                if (voteRequest.preferredPlaceIds.contains(place.id)) {
                    val updatedParticipants = (place.participants ?: emptyList()) + participant
                    place.copy(participants = updatedParticipants)
                } else {
                    place
                }
            }

        // 전체 참가자 목록 업데이트
        val updatedParticipants = (meeting.participants ?: emptyList()) + participant

        // 업데이트된 미팅 저장
        val updatedMeeting =
            meeting.copy(
                meetingDateTimes = updatedDateTimes,
                meetingPlaces = updatedPlaces,
                participants = updatedParticipants,
                updatedAt = Instant.now(),
            )

        repository.save(updatedMeeting)

        // 투표한 날짜/시간 이름 리스트 추출
        val preferredDateTimes =
            updatedMeeting.meetingDateTimes
                .filter { voteRequest.preferredDateTimeIds.contains(it.id) }
                .map { it.dateTime.toString() }

        // 투표한 장소 이름 리스트 추출
        val preferredPlaceNames =
            updatedMeeting.meetingPlaces
                .filter { voteRequest.preferredPlaceIds.contains(it.id) }
                .map { it.name }

        // 변경된 MeetingVoteResponse 반환
        return MeetingVoteResponse(
            participantInfo = participant,
            preferredDateTimes = preferredDateTimes,
            preferredPlaceNames = preferredPlaceNames,
        )
    }
}
