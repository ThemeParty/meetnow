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
    var finalPlace: List<String>? = null,
    var scheduleAt: List<Instant>? = null,
    var voteClosedAt: Instant,
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

    fun getMostVotedPlaces(): List<String> {
        val maxVotes = meetingPlaces.maxOfOrNull { it.participants?.size ?: 0 } ?: 0
        return meetingPlaces
            .filter { (it.participants?.size ?: 0) == maxVotes }
            .map { it.name }
    }

    fun getMostVotedDateTimes(): List<Instant> {
        val maxVotes = meetingDateTimes.maxOfOrNull { it.participants?.size ?: 0 } ?: 0
        return meetingDateTimes
            .filter { (it.participants?.size ?: 0) == maxVotes }
            .map { it.dateTime }
    }

    fun close() {
        val finalPlaces = getMostVotedPlaces()
        val scheduleAtTimes = getMostVotedDateTimes()

        this.finalPlace = finalPlaces
        this.scheduleAt = scheduleAtTimes
        this.voteClosedAt = Instant.now()
    }
}
