package meetnow.api.constant

import io.github.oshai.kotlinlogging.KLogger

inline val logger: KLogger get() = KotlinLoggerCache.getLogger {}

object Constants {
    const val SWAGGER_URL_PATH: String = "/swagger-ui/**"
    const val SWAGGER_API_DOCS_PATH: String = "/v3/api-docs/**"
}
