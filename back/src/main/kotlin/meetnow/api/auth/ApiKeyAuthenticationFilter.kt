package meetnow.api.auth

import jakarta.servlet.FilterChain
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.authentication.InsufficientAuthenticationException
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import java.io.IOException
import kotlin.jvm.Throws

fun HttpServletRequest.requireHeader(name: String): String =
    this.getHeader(name)
        ?: throw IllegalArgumentException("헤더 ${name}가 필요합니다.")

@Component
class ApiKeyAuthenticationFilter(
    @Value("\${api.access-key}")
    private val validApiKey: String,
) : OncePerRequestFilter() {
    init {
        require(validApiKey.isNotBlank()) { "API access key must not be null or blank" }
    }

    @Throws(ServletException::class, IOException::class)
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain,
    ) {
        val apiKey =
            try {
                request.requireHeader("X-API-KEY")
            } catch (e: IllegalArgumentException) {
                // 헤더가 없거나 잘못된 경우 예외를 발생시킵니다.
                throw InsufficientAuthenticationException(e.message)
            }

        // API 키가 없거나 유효하지 않은 경우 예외를 발생시킵니다.
        if (apiKey != validApiKey) {
            throw InsufficientAuthenticationException("Invalid or missing API key")
        }

        filterChain.doFilter(request, response)
    }
}
