package meetnow.api

import io.swagger.v3.oas.annotations.OpenAPIDefinition
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType
import io.swagger.v3.oas.annotations.info.Info
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import io.swagger.v3.oas.annotations.security.SecurityScheme
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@OpenAPIDefinition(
    info =
        Info(
            title = "Meetnow API",
            version = "v1.0.0",
            description = "Meetnow REST API 문서",
        ),
    security = [SecurityRequirement(name = "ApiKeyAuth")],
)
@SecurityScheme(
    name = "ApiKeyAuth",
    type = SecuritySchemeType.APIKEY,
    `in` = SecuritySchemeIn.HEADER,
    paramName = "X-API-KEY",
)
@SpringBootApplication
class MeetnowApplication

fun main(args: Array<String>) {
    runApplication<MeetnowApplication>(*args)
}
