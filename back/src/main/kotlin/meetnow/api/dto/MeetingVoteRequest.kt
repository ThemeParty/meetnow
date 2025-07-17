package meetnow.api.dto

data class MeetingVoteRequest(
    // 사용자 이름
    val participantName: String,
    // 사용자가 선호하는 날짜 ID 리스트
    val preferredDateTimeIds: List<String>,
    // 사용자가 선호하는 장소 ID 리스트
    val preferredPlaceIds: List<String>,
)
