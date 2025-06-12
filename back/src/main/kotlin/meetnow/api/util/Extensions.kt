package meetnow.api.util

import java.time.Instant
import java.time.LocalDateTime
import java.time.ZoneId

fun Instant.toKSTLocalDateTime(): LocalDateTime = atZone(ZoneId.of("Asia/Seoul")).toLocalDateTime()

fun LocalDateTime.toUTCInstant(): Instant = atZone(ZoneId.of("Asia/Seoul")).toInstant()
