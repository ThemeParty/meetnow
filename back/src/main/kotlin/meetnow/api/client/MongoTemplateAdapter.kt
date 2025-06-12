package meetnow.api.client

import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Query
import org.springframework.stereotype.Component

@Component
class MongoTemplateAdapter(
    private val mongoTemplate: MongoTemplate,
) {
    fun <T : Any> save(entity: T) {
        mongoTemplate.save(entity)
    }

    fun <T : Any> find(
        query: Query,
        entityClass: Class<T>,
    ): List<T> = mongoTemplate.find(query, entityClass)

    fun <T : Any> exists(
        query: Query,
        entityClass: Class<T>,
    ): Boolean = mongoTemplate.exists(query, entityClass)
}
