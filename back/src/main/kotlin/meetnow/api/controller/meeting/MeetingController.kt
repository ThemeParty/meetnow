package meetnow.api.controller.meeting

import meetnow.api.constant.RequestPaths
import meetnow.api.dto.*
import meetnow.api.service.meeting.MeetingService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(RequestPaths.MEETINGS)
class MeetingController(
    private val meetingService: MeetingService,
) {
    @GetMapping("{hashedMeetingId}")
    fun getMeeting(
        @PathVariable hashedMeetingId: String,
    ): MeetingResponse = meetingService.getMeeting(hashedMeetingId)

    @PostMapping
    fun createMeeting(
        @RequestBody meetingCreateRequest: MeetingCreateRequest,
    ): MeetingCreateResponse {
        val hashedMeetingId = meetingService.createMeeting(meetingCreateRequest)
        return MeetingCreateResponse(hashedMeetingId)
    }

    @PostMapping("{hashedMeetingId}/vote")
    fun voteInMeeting(
        @PathVariable hashedMeetingId: String,
        @RequestBody voteRequest: MeetingVoteRequest,
    ): MeetingVoteResponse = meetingService.voteInMeeting(hashedMeetingId, voteRequest)
}
