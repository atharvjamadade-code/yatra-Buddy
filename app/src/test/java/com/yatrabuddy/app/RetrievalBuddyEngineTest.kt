package com.yatrabuddy.app

import com.yatrabuddy.app.data.KnowledgeEntry
import com.yatrabuddy.app.data.RetrievalBuddyEngine
import kotlinx.coroutines.test.runTest
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

class RetrievalBuddyEngineTest {

    private lateinit var engine: RetrievalBuddyEngine

    @Before
    fun setUp() {
        val sampleEntries = listOf(
            KnowledgeEntry(
                id = "closed-hotel-scam",
                category = "scams",
                title = "Taxi Driver Claims Hotel is Closed or Burned",
                keywords = listOf("hotel", "closed", "burned", "driver", "taxi", "scam"),
                answer = "Never believe a taxi driver claiming your hotel is closed. Insist on going to the address.",
                sourceLabel = "Delhi Police Advisory",
                sourceUrl = "https://tourism.gov.in"
            ),
            KnowledgeEntry(
                id = "auto-rickshaw-meter",
                category = "transport",
                title = "Auto-Rickshaw Fare & Meter Refusal",
                keywords = listOf("auto", "rickshaw", "meter", "fare", "overcharging"),
                answer = "In Delhi and Mumbai, auto drivers are required to use the meter. Say Meter se chaliye.",
                sourceLabel = "Transport Department",
                sourceUrl = "https://transport.delhi.gov.in"
            ),
            KnowledgeEntry(
                id = "evisa-rules-arrival",
                category = "visa",
                title = "Indian e-Visa Arrival Checklist",
                keywords = listOf("visa", "evisa", "immigration", "passport", "eta"),
                answer = "Carry a printed ETA and ensure passport has 6 months validity.",
                sourceLabel = "Bureau of Immigration",
                sourceUrl = "https://indianvisaonline.gov.in"
            )
        )
        engine = RetrievalBuddyEngine(sampleEntries, threshold = 4.0f)
    }

    @Test
    fun picksMostSpecificEntry() = runTest {
        val result = engine.answer("What if the taxi driver says the hotel is closed?")
        assertTrue(result.hasVettedAnswer)
        assertTrue(result.answer.contains("hotel is closed"))
    }

    @Test
    fun handlesPlurals() = runTest {
        // Query uses plurals: "hotels" and "drivers"
        val result = engine.answer("Do taxi drivers scam on hotels?")
        assertTrue(result.hasVettedAnswer)
        assertTrue(result.answer.contains("Never believe a taxi driver"))
    }

    @Test
    fun refusesUnknownQuestions() = runTest {
        val result = engine.answer("Where can I go scuba diving in the Sahara desert?")
        assertFalse(result.hasVettedAnswer)
        assertTrue(result.answer.contains("I do not have a vetted answer"))
    }

    @Test
    fun returnsTappableSourceLinkWhenAvailable() = runTest {
        val result = engine.answer("How do I use the auto meter?")
        assertTrue(result.hasVettedAnswer)
        assertTrue(result.sourceUrl != null)
        assertTrue(result.sourceLabel?.contains("Transport") == true)
    }
}
