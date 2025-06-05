package meetnow.api.exception

import meetnow.api.error.MeetnowErrorCode

class MeetnowException private constructor(
    val errorCode: MeetnowErrorCode,
    val exposeMessageToClient: Boolean = false,
    override val message: String? = null,
    override val cause: Throwable? = null,
) : RuntimeException(message, cause) {
    constructor(
        errorCode: MeetnowErrorCode,
        message: String? = null,
        exposeMessageToClient: Boolean = false,
    ) : this(errorCode, exposeMessageToClient, message ?: errorCode.message, null)
}
