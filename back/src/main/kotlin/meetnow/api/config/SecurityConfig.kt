package meetnow.api.config

import meetnow.api.auth.ApiKeyAuthenticationFilter
import meetnow.api.auth.MeetnowAuthenticationEntryPoint
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

@Configuration
@EnableWebSecurity
class SecurityConfig(
    private val apiKeyAuthenticationFilter: ApiKeyAuthenticationFilter, // ApiKeyAuthenticationFilter 주입
    private val meetnowAuthenticationEntryPoint: MeetnowAuthenticationEntryPoint, // CustomAuthenticationEntryPoint 주입
) {
    // HTTP 요청에 대한 보안 규칙을 정의합니다.
    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .csrf { it.disable() } // CSRF(Cross-Site Request Forgery) 보호 기능을 비활성화합니다. (개발 시 편리, 실제 서비스에서는 고려 필요)
            .exceptionHandling { handlers ->
                // 예외 처리 설정
                handlers.authenticationEntryPoint(meetnowAuthenticationEntryPoint)
            }.sessionManagement { session ->
                // 세션 관리 설정
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션 사용 안 함
            }.authorizeHttpRequests { authorize ->
                // 요청에 대한 권한 부여를 시작합니다.
                authorize
                    .anyRequest()
                    .permitAll()
            }.addFilterBefore(
                apiKeyAuthenticationFilter, // 커스텀 API 키 필터 추가
                UsernamePasswordAuthenticationFilter::class.java, // UsernamePasswordAuthenticationFilter 이전에 실행
            )

        return http.build() // HttpSecurity 설정을 빌드하여 SecurityFilterChain을 반환합니다.
    }
}
