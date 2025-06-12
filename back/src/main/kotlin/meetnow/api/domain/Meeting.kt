package meetnow.api.domain

import meetnow.api.dto.MeetingCreateRequest
import meetnow.api.util.toUTCInstant
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.Instant

@Document
data class Meeting(
    @Id
    val id: String? = null,
    val name: String,
    val hashedId: String,
    val finalPlace: String? = null,
    val scheduleAt: Instant? = null,
    val voteClosedAt: Instant,
    val meetingDateTimes: List<MeetingDateTime>,
    val meetingPlaces: List<MeetingPlace>,
    val participants: List<Participant>? = null,
    val createdAt: Instant = Instant.now(),
    val updatedAt: Instant = Instant.now(),
) {
    companion object {
        fun createWithHashedId(
            request: MeetingCreateRequest,
            hashedId: String,
        ): Meeting =
            Meeting(
                name = request.name,
                hashedId = hashedId,
                meetingDateTimes =
                    request.meetingDateTimes.map {
                        MeetingDateTime(dateTime = it.toUTCInstant())
                    },
                meetingPlaces =
                    request.meetingPlaces.map {
                        MeetingPlace(name = it)
                    },
                voteClosedAt = request.closedDate.toUTCInstant(),
            )
    }

    fun getMostVotedPlace(): MeetingPlace? =
        meetingPlaces.maxByOrNull {
            it.participants?.size ?: 0
        }

    fun getMostVotedDateTime(): MeetingDateTime? =
        meetingDateTimes.maxByOrNull {
            it.participants?.size ?: 0
        }
}
