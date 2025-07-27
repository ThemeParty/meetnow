package meetnow.api.mapper

import meetnow.api.domain.Meeting
import meetnow.api.dto.MeetingResponse
import meetnow.api.util.toKSTLocalDateTime
import java.time.LocalDateTime

fun Meeting.toMeetingResponse(): MeetingResponse =
    MeetingResponse.fromMeeting(
        meeting = this,
        finalPlace = resolveFinalPlace(this),
        scheduleAt = resolveScheduleAt(this),
    )

private fun resolveFinalPlace(meeting: Meeting): List<String>? = meeting.finalPlace ?: meeting.getMostVotedPlaces()

private fun resolveScheduleAt(meeting: Meeting): List<LocalDateTime>? =
    meeting.scheduleAt?.map { it.toKSTLocalDateTime() }
        ?: meeting.getMostVotedDateTimes().map { it.toKSTLocalDateTime() }

object MeetingMapper
