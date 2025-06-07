package meetnow.api.auth

import jakarta.servlet.FilterChain
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import java.io.IOException
import kotlin.jvm.Throws

@Component
class ApiKeyAuthenticationFilter(
    @Value("\${api.access-key}")
    private val validApiKey: String,
) : OncePerRequestFilter() {
    @Throws(ServletException::class, IOException::class)
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain,
    ) {
        val apiKey = request.getHeader("X-API-KEY")

        // API 키가 없거나 유효하지 않은 경우 예외를 발생시킵니다.
        if (apiKey == null || apiKey != validApiKey) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid or missing API key")
            return
        }

        filterChain.doFilter(request, response)
    }
}
