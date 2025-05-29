package meetnow.api.domain

import java.util.UUID

data class Participant(
    val id: String = UUID.randomUUID().toString(),
    val name: String,
)
