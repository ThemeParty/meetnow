package meetnow.api.repository

import meetnow.api.client.MongoTemplateAdapter
import meetnow.api.domain.Meeting
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.stereotype.Repository

@Repository
class MeetingRepository(
    private val mongoTemplateAdapter: MongoTemplateAdapter,
) {
    private val entityClass = Meeting::class.java

    fun save(meeting: Meeting) {
        mongoTemplateAdapter.save(meeting)
    }

    fun findByHashedId(hashedId: String): Meeting? {
        val query = Query(Criteria.where(Meeting::hashedId.name).`is`(hashedId))
        return mongoTemplateAdapter.find(query, entityClass).firstOrNull()
    }

    fun existsByHashedId(hashedId: String): Boolean {
        val query = Query(Criteria.where(Meeting::hashedId.name).`is`(hashedId))
        return mongoTemplateAdapter.exists(query, entityClass)
    }
}
