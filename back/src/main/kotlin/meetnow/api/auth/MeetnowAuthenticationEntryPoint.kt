package meetnow.api.auth

import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import meetnow.api.constant.logger
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.AuthenticationEntryPoint
import org.springframework.stereotype.Component

@Component
class MeetnowAuthenticationEntryPoint : AuthenticationEntryPoint {
    override fun commence(
        request: HttpServletRequest,
        response: HttpServletResponse,
        authException: AuthenticationException,
    ) {
        // 인증되지 않은 요청에 대한 로그를 기록합니다.
        logger.error(authException) { "Unauthorized request: ${request.requestURI}, Exception: ${authException.message}" }
        // 인증되지 않은 요청에 대해 401 Unauthorized 응답을 반환합니다.
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized")
    }
}
