package meetnow.api.common

// TODO - ResponseAdvice 에서 Controller에서 반환하는 객체를 ResponseEntity<MeetnowResponse> 로 감싸 사용자에게 리턴하는 방식 구현
data class MeetnowResponse(
    val result: Any? = null,
)
