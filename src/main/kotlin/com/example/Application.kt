package com.example

import com.example.plugins.configureRouting
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.application.*

fun main() {
    embeddedServer(Netty, port = 8081, host = "0.0.0.0") {
        configure()
    }.start(wait = true)
}

fun Application.configure() {
    configureRouting()
}
