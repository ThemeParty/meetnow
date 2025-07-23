plugins {
    id("org.springframework.boot") version "3.4.4"
    id("io.spring.dependency-management") version "1.1.4"
    kotlin("jvm") version "2.1.20"
    kotlin("plugin.spring") version "2.1.20"
    id("org.jlleitschuh.gradle.ktlint") version "12.3.0"
    id("org.asciidoctor.jvm.convert") version "4.0.2"
}

group = "meetnow"
version = "1.0.0"
java.sourceCompatibility = JavaVersion.VERSION_21

val snippetsDir by extra { file("build/generated-snippets") }

repositories {
    mavenCentral()
}

dependencies {
    // kotlin
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")

    // Spring
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.springframework.boot:spring-boot-starter-security")

    // DB
    implementation("org.springframework.boot:spring-boot-starter-data-mongodb")

    // Test
    testImplementation("io.kotest:kotest-runner-junit5-jvm:5.9.1")
    testImplementation("io.kotest:kotest-assertions-core:5.9.1")
    testImplementation("io.kotest:kotest-property:5.9.1")
    testImplementation("io.kotest.extensions:kotest-extensions-spring:1.3.0")
    testImplementation("com.ninja-squad:springmockk:4.0.2")
    testImplementation("io.mockk:mockk:1.14.5")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework.restdocs:spring-restdocs-mockmvc")

    // Etc
    implementation("io.github.oshai:kotlin-logging-jvm:7.0.3")
}

tasks.test {
    useJUnitPlatform()
    outputs.dir(snippetsDir)
}

tasks.asciidoctor {
    doFirst {
        delete("src/main/resources/static/docs")
    }

    inputs.dir(snippetsDir)
    dependsOn(tasks.test)
    setSourceDir("src/docs/asciidoc")
    outputOptions {
        backends("html")
    }
    attributes(
        mapOf(
            "snippets" to snippetsDir,
        ),
    )
}

tasks.bootJar {
    dependsOn(tasks.asciidoctor)
    from("${tasks.asciidoctor.get().outputDir}/html5") {
        into("static/docs")
    }
    archiveFileName.set("app.jar")
    launchScript()
    doLast {
        copy {
            from("build/libs/app.jar")
        }
    }
}

tasks.register<Copy>("copyDocs") {
    dependsOn("asciidoctor")
    from("build/docs/asciidoc")
    into("src/main/resources/static/docs")
}

tasks.build {
    dependsOn("copyDocs")
}

kotlin {
    jvmToolchain(21)
}

ktlint {
    version.set("1.6.0")
}
