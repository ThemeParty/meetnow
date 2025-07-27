package meetnow.api.dto

import meetnow.api.domain.Meeting
import meetnow.api.domain.MeetingDateTime
import meetnow.api.domain.MeetingPlace
import meetnow.api.domain.Participant
import meetnow.api.util.toKSTLocalDateTime
import java.time.LocalDateTime

data class MeetingResponse(
    val hashedMeetingId: String,
    val name: String,
    val finalPlace: List<String>? = null,
    val scheduleAt: List<LocalDateTime>? = null,
    val voteClosedAt: LocalDateTime,
    val meetingDateTimes: List<MeetingDateTimeResponse> = emptyList(),
    val meetingPlaces: List<MeetingPlaceResponse> = emptyList(),
    val createdAt: LocalDateTime,
) {
    companion object {
        fun fromMeeting(
            meeting: Meeting,
            finalPlace: List<String>? = null,
            scheduleAt: List<LocalDateTime>? = null,
        ): MeetingResponse =
            MeetingResponse(
                hashedMeetingId = meeting.hashedId,
                name = meeting.name,
                finalPlace = finalPlace,
                scheduleAt = scheduleAt,
                voteClosedAt = meeting.voteClosedAt.toKSTLocalDateTime(),
                meetingDateTimes =
                    meeting.meetingDateTimes.map { MeetingDateTimeResponse.fromMeetingDateTime(it) },
                meetingPlaces =
                    meeting.meetingPlaces.map { MeetingPlaceResponse.fromMeetingPlace(it) },
                createdAt = meeting.createdAt.toKSTLocalDateTime(),
            )
    }
}

data class MeetingDateTimeResponse(
    val id: String,
    val dateTime: LocalDateTime,
    val participants: List<ParticipantResponse> = emptyList(),
) {
    companion object {
        fun fromMeetingDateTime(meetingDateTime: MeetingDateTime): MeetingDateTimeResponse =
            MeetingDateTimeResponse(
                id = meetingDateTime.id,
                dateTime = meetingDateTime.dateTime.toKSTLocalDateTime(),
                participants =
                    meetingDateTime.participants?.map {
                        ParticipantResponse.fromParticipant(it)
                    } ?: emptyList(),
            )
    }
}

data class MeetingPlaceResponse(
    val id: String,
    val placeName: String,
    val participants: List<ParticipantResponse> = emptyList(),
) {
    companion object {
        fun fromMeetingPlace(meetingPlace: MeetingPlace): MeetingPlaceResponse =
            MeetingPlaceResponse(
                id = meetingPlace.id,
                placeName = meetingPlace.name,
                participants =
                    meetingPlace.participants?.map {
                        ParticipantResponse.fromParticipant(it)
                    } ?: emptyList(),
            )
    }
}

data class ParticipantResponse(
    val id: String,
    val name: String,
) {
    companion object {
        fun fromParticipant(participant: Participant): ParticipantResponse =
            ParticipantResponse(
                id = participant.id,
                name = participant.name,
            )
    }
}
