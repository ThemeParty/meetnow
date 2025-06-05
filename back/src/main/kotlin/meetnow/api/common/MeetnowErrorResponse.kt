package meetnow.api.common

data class MeetnowErrorResponse(
    val errorCode: String,
    var errorMessage: String? = null,
)