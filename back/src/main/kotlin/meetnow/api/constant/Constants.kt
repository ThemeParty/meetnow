package meetnow.api.constant

import org.slf4j.Logger
import org.slf4j.LoggerFactory

inline val <reified T : Any> T.logger: Logger
    get() = LoggerFactory.getLogger(T::class.java)

object Constants