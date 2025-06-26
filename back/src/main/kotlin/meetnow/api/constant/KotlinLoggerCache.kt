package meetnow.api.constant

import io.github.oshai.kotlinlogging.KLogger
import io.github.oshai.kotlinlogging.KotlinLogging
import java.util.concurrent.ConcurrentHashMap

object KotlinLoggerCache {
    private val loggers = ConcurrentHashMap<String, KLogger>()

    fun getLogger(func: () -> Unit): KLogger = loggers.getOrPut(getName(func)) { KotlinLogging.logger(func) }

    private fun getName(func: () -> Unit): String = func.javaClass.name
}
