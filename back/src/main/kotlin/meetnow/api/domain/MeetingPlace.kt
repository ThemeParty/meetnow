package meetnow.api.domain

import java.util.UUID

data class MeetingPlace(
    val id: String = UUID.randomUUID().toString(),
    val name: String,
    val participants: List<Participant>? = null,
)
