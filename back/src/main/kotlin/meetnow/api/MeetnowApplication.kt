package meetnow.api

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class MeetnowApplication

fun main(args: Array<String>) {
    runApplication<MeetnowApplication>(*args)
}
