package meetnow.api.controller

import com.ninjasquad.springmockk.MockkBean
import io.mockk.every
import meetnow.api.controller.meeting.MeetingController
import meetnow.api.dto.MeetingDateTimeResponse
import meetnow.api.dto.MeetingPlaceResponse
import meetnow.api.dto.MeetingResponse
import meetnow.api.dto.ParticipantResponse
import meetnow.api.service.meeting.MeetingService
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get
import org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest
import org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse
import org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint
import org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath
import org.springframework.restdocs.payload.PayloadDocumentation.relaxedResponseFields
import org.springframework.restdocs.request.RequestDocumentation.parameterWithName
import org.springframework.restdocs.request.RequestDocumentation.pathParameters
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import java.time.LocalDateTime

@WebMvcTest(
    controllers = [MeetingController::class],
    excludeAutoConfiguration = [
        SecurityAutoConfiguration::class,
    ],
)
@AutoConfigureRestDocs
@ActiveProfiles("test")
class MeetingControllerTest {
    @Autowired
    private lateinit var mockMvc: MockMvc

    @MockkBean
    private lateinit var meetingService: MeetingService

    @Test
    @DisplayName("/api/v1/meetings/{hashedMeetingId}를 호출하면 모임 정보가 반환된다.")
    fun `should return meeting details when calling getMeeting API`() {
        // given
        val hashedMeetingId = "test-hashed-id"
        val response =
            MeetingResponse(
                hashedMeetingId = hashedMeetingId,
                name = "테스트 모임",
                finalPlace = "강남역",
                scheduleAt = LocalDateTime.of(2024, 1, 15, 18, 0),
                voteClosedAt = LocalDateTime.of(2024, 1, 10, 23, 59),
                meetingDateTimes =
                    listOf(
                        MeetingDateTimeResponse(
                            id = "test-meeting-date-time-id-1",
                            dateTime = LocalDateTime.of(2024, 1, 15, 18, 0),
                            participants =
                                listOf(
                                    ParticipantResponse(
                                        id = "test-participant-id-1",
                                        name = "호랑이",
                                    ),
                                    ParticipantResponse(
                                        id = "test-participant-id-2",
                                        name = "원숭이",
                                    ),
                                ),
                        ),
                        MeetingDateTimeResponse(
                            id = "test-meeting-date-time-id-2",
                            dateTime = LocalDateTime.of(2024, 1, 16, 19, 0),
                            participants =
                                listOf(
                                    ParticipantResponse(
                                        id = "test-participant-id-2",
                                        name = "원숭이",
                                    ),
                                    ParticipantResponse(
                                        id = "test-participant-id-3",
                                        name = "까치",
                                    ),
                                ),
                        ),
                    ),
                meetingPlaces =
                    listOf(
                        MeetingPlaceResponse(
                            id = "test-meeting-place-id-1",
                            placeName = "강남역",
                            participants =
                                listOf(
                                    ParticipantResponse(
                                        id = "test-participant-id-1",
                                        name = "호랑이",
                                    ),
                                    ParticipantResponse(
                                        id = "test-participant-id-3",
                                        name = "까치",
                                    ),
                                ),
                        ),
                        MeetingPlaceResponse(
                            id = "test-meeting-place-id-2",
                            placeName = "홍대입구역",
                            participants =
                                listOf(
                                    ParticipantResponse(
                                        id = "test-participant-id-1",
                                        name = "호랑이",
                                    ),
                                    ParticipantResponse(
                                        id = "test-participant-id-2",
                                        name = "원숭이",
                                    ),
                                ),
                        ),
                    ),
                createdAt = LocalDateTime.of(2024, 1, 1, 10, 0),
            )

        every { meetingService.getMeeting(hashedMeetingId) } returns response

        // when & then
        mockMvc
            .perform(
                get("/api/v1/meetings/{hashedMeetingId}", hashedMeetingId).header("X-API-KEY", "test-api-key"),
            ).andExpect(status().isOk)
            .andExpect(jsonPath("$.hashedMeetingId").value(hashedMeetingId))
            .andExpect(jsonPath("$.name").value("테스트 모임"))
            .andExpect(jsonPath("$.finalPlace").value("강남역"))
            .andExpect(jsonPath("$.meetingDateTimes").isArray)
            .andExpect(jsonPath("$.meetingPlaces").isArray)
            .andDo(
                document(
                    "get-meeting",
                    preprocessRequest(prettyPrint()),
                    preprocessResponse(prettyPrint()),
                    pathParameters(
                        parameterWithName("hashedMeetingId").description("모임의 해시된 ID"),
                    ),
                    relaxedResponseFields(
                        // responseFields 대신 relaxedResponseFields 사용
                        fieldWithPath("hashedMeetingId").description("모임의 해시된 ID"),
                        fieldWithPath("name").description("모임 이름"),
                        fieldWithPath("finalPlace").description("확정된 장소 (선택사항)").optional(),
                        fieldWithPath("scheduleAt").description("확정된 일시 (선택사항)").optional(),
                        fieldWithPath("voteClosedAt").description("투표 마감일시"),
                        fieldWithPath("meetingDateTimes").description("모임 가능한 날짜시간 목록"),
                        fieldWithPath("meetingDateTimes[].id").description("날짜시간 ID"),
                        fieldWithPath("meetingDateTimes[].dateTime").description("날짜시간"),
                        fieldWithPath("meetingDateTimes[].participants").description("해당 시간을 선택한 참가자 목록"),
                        fieldWithPath("meetingDateTimes[].participants[].id").description("참가자 ID"),
                        fieldWithPath("meetingDateTimes[].participants[].name").description("참가자 이름"),
                        fieldWithPath("meetingPlaces").description("모임 가능한 장소 목록"),
                        fieldWithPath("meetingPlaces[].id").description("장소 ID"),
                        fieldWithPath("meetingPlaces[].placeName").description("장소명"),
                        fieldWithPath("meetingPlaces[].participants").description("해당 장소를 선택한 참가자 목록"),
                        fieldWithPath("meetingPlaces[].participants[].id").description("참가자 ID"),
                        fieldWithPath("meetingPlaces[].participants[].name").description("참가자 이름"),
                        fieldWithPath("createdAt").description("모임 생성일시"),
                    ),
                ),
            )
    }
}
