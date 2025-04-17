package meetnow.api.domain

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.Instant

@Document(collation = "meetings")
data class Meeting(
    @Id
    val id: String? = null,
    val name: String,
    val createdBy: String = "",
    val createdAt: Instant = Instant.now(),
) {
    /**
     * TODO 아래 필드들 추가
     * 1. 후보 장소들
     * 2. 최종 결정 장소
     * 3. 후보 시간들
     */
    var scheduleAt: Instant? = null
    var voteClosedAt: Instant? = null
    var updatedBy: String? = null
    var updatedAt: Instant? = null
}
