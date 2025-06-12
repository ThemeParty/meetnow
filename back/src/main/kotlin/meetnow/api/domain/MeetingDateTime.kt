package meetnow.api.domain

import java.time.Instant
import java.util.UUID

data class MeetingDateTime(
    val id: String = UUID.randomUUID().toString(),
    val dateTime: Instant,
    val participants: List<Participant>? = null,
)
