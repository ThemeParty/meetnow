package meetnow.api.util

import java.security.SecureRandom

object MeetingHashedIdGenerator {
    private val ALPHABET_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".toCharArray()
    private const val ID_LENGTH = 12
    private val random = SecureRandom()

    fun generate(): String {
        val timestampPart = System.currentTimeMillis().toString(36).takeLast(ID_LENGTH / 2)
        val randomPart =
            (1..ID_LENGTH / 2)
                .map { ALPHABET_CHARS[random.nextInt(ALPHABET_CHARS.size)] }
                .joinToString("")
        return timestampPart + randomPart
    }
}
