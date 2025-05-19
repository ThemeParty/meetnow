package meetnow.api.controller.meeting

import meetnow.api.constant.RequestPaths
import meetnow.api.dto.MeetingCreateRequest
import meetnow.api.service.meeting.MeetingService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(RequestPaths.MEETINGS)
class MeetingController(
    private val meetingService: MeetingService
) {

    @PostMapping
    fun createMeeting(
        @RequestBody meetingCreateRequest: MeetingCreateRequest,
    ) {
        meetingService.createMeeting(meetingCreateRequest)
    }
}
