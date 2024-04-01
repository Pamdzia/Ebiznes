package com.example.plugins

import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put

class ClientController {
    private val client = HttpClient(CIO) {
        install(ContentNegotiation) {
            json()
        }
    }

    fun sendMessage(message: String) = runBlocking {
        val response = client.post("https://discord.com/api/webhooks/1221258065794306048/FYhjnxlywxS7Ms2oU5wI5Ze_8b-lupeJqCDDEpP9Q2zCd80wqEKnnT0kNHMdjoC03D4d") {
            contentType(ContentType.Application.Json)
            setBody(buildJsonObject {
                put("content", message)
            })
        }

       //println(response.bodyAsText())
    }
}
