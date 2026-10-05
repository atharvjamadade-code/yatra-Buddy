package com.yatrabuddy.app.domain

data class BuddyAnswer(
    val answer: String,
    val sourceLabel: String? = null,
    val sourceUrl: String? = null,
    val hasVettedAnswer: Boolean = true,
    val confidence: Float = 0f
)

interface BuddyEngine {
    suspend fun answer(question: String): BuddyAnswer
}
