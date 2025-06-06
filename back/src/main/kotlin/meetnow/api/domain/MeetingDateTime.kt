package meetnow.api.domain

import java.time.LocalDateTime
import java.util.UUID

data class MeetingDateTime(
    val id: String = UUID.randomUUID().toString(),
    val value: LocalDateTime,
    val participants: List<Participant>? = null,
)
