package meetnow.api.dto

import java.time.LocalDateTime

data class MeetingCreateRequest(
    val name: String,
    val meetingDateTimes: List<LocalDateTime>,
    val meetingPlaces: List<String>,
    val closedDate: LocalDateTime,
)