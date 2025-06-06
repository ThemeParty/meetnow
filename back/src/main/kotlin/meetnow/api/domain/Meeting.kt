package meetnow.api.domain

import meetnow.api.dto.MeetingCreateRequest
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
    val voteClosedAt: Instant? = null,
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
                meetingDateTimes = request.meetingDateTimes.map { MeetingDateTime(value = it) },
                meetingPlaces = request.meetingPlaces.map { MeetingPlace(name = it) },
            )
    }
}
