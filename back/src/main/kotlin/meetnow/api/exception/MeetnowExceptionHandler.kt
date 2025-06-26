package meetnow.api.exception

import meetnow.api.common.MeetnowErrorResponse
import meetnow.api.constant.logger
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class MeetnowExceptionHandler {
    @ExceptionHandler(MeetnowException::class)
    fun handleMeetnowException(exception: MeetnowException): ResponseEntity<MeetnowErrorResponse>? {
        logger.error(exception) { "MeetnowException이 발생했습니다." }
        return exception.toErrorResponse()
    }
}

private fun MeetnowException.toErrorResponse(): ResponseEntity<MeetnowErrorResponse> {
    val errorMessage = if (exposeMessageToClient) message else null
    val errorResponse = MeetnowErrorResponse(errorCode.code, errorMessage)
    return ResponseEntity.status(errorCode.httpStatusCode).body(errorResponse)
}
