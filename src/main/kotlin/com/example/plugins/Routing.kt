package com.example.plugins

import com.example.plugins.ClientController
import io.ktor.server.routing.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*

fun Application.configureRouting() {
    routing {
        get("/") {
            call.respondText("Hello World!")
        }

        post("/send-message") {
            val clientController = ClientController()
            val message = call.receiveText()
            clientController.sendMessage(message)
            call.respondText("Message sent to Discord")
        }
    }
}
