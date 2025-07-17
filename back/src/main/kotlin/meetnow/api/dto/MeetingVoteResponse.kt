package meetnow.api.dto

import meetnow.api.domain.Participant

data class MeetingVoteResponse(
    /** 투표한 사람의 ID */
    val participantInfo: Participant,
    /** 투표한 날짜 리스트 */
    val preferredDateTimes: List<String>,
    /** 투표한 장소 리스트 */
    val preferredPlaceNames: List<String>,
)
