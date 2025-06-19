package meetnow.api.error

enum class MeetnowErrorCode(
    val code: String,
    val message: String,
    val httpStatusCode: Int,
) {
    BAD_REQUEST("BAD_REQUEST", "잘못된 요청입니다.", 400),
    NOT_FOUND("NOT_FOUND", "리소스를 찾을 수 없습니다.", 404),
    INTERNAL_SERVER_ERROR("INTERNAL_SERVER_ERROR", "서버 내부 에러입니다.", 500),

    // Business Logic Errors
    EXCEED_MAX_HASH_ID_GENERATION_ATTEMPTS(
        "EXCEED_MAX_HASH_ID_GENERATION_ATTEMPTS",
        "Meeting의 해시 아이디를 생성하는 최대 횟수를 초과했습니다.",
        500,
    ),
}
