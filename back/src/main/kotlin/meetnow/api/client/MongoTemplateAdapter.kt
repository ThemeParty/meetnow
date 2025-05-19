package meetnow.api.client

import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Query
import org.springframework.stereotype.Component

@Component
class MongoTemplateAdapter (
    private val mongoTemplate: MongoTemplate
){
    fun <T: Any> save(entity: T) {
        mongoTemplate.save(entity)
    }

    fun <T: Any> find(
        query: Query,
        entityClass: Class<T>
    ): List<T> {
        return mongoTemplate.find(query, entityClass)
    }
}