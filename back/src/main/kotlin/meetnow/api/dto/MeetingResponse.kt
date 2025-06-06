package meetnow.api.dto

data class MeetingResponse(
    val hashedMeetingId: String,
    val name: String,
)

data class MeetingDateTimeResponse(
    val id: String,
    val dateTime: String,
    val participants: List<ParticipantResponse> = emptyList(),
)

data class MeetingPlaceResponse(
    val id: String,
    val placeName: String,
    val participants: List<ParticipantResponse> = emptyList(),
)

data class ParticipantResponse(
    val id: String,
    val name: String,
)
