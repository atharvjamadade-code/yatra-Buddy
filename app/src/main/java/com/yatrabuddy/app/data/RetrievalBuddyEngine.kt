package com.yatrabuddy.app.data

import com.yatrabuddy.app.domain.BuddyAnswer
import com.yatrabuddy.app.domain.BuddyEngine
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlin.math.ln

@Serializable
data class KnowledgeEntry(
    val id: String,
    val category: String,
    val title: String,
    val keywords: List<String>,
    val answer: String,
    val sourceLabel: String,
    val sourceUrl: String
)

class RetrievalBuddyEngine(
    private val entries: List<KnowledgeEntry>,
    private val threshold: Float = 4.5f
) : BuddyEngine {

    private val idfMap = mutableMapOf<String, Float>()
    private val stopWords = setOf(
        "a", "an", "the", "in", "on", "at", "to", "for", "of", "and", "or", "is", "are", "was",
        "were", "i", "my", "me", "you", "your", "we", "they", "it", "its", "can", "do", "does",
        "how", "what", "when", "where", "which", "who", "why", "should", "would", "could"
    )

    init {
        calculateIdf()
    }

    private fun normalize(word: String): String {
        var w = word.lowercase().trim()
        if (w.endsWith("ies") && w.length > 4) {
            w = w.dropLast(3) + "y"
        } else if (w.endsWith("es") && w.length > 4 && !w.endsWith("ches") && !w.endsWith("shes")) {
            w = w.dropLast(2)
        } else if (w.endsWith("s") && w.length > 3 && !w.endsWith("ss")) {
            w = w.dropLast(1)
        }
        return w
    }

    private fun calculateIdf() {
        val totalDocs = entries.size.toFloat()
        val docCount = mutableMapOf<String, Int>()

        for (entry in entries) {
            val wordsInDoc = mutableSetOf<String>()
            val combined = "${entry.title} ${entry.keywords.joinToString(" ")} ${entry.answer}".lowercase()
            val tokens = combined.split(Regex("[\\s,?.!-]+")).filter { it.length > 2 }

            for (token in tokens) {
                wordsInDoc.add(normalize(token))
            }

            for (w in wordsInDoc) {
                docCount[w] = (docCount[w] ?: 0) + 1
            }
        }

        for ((word, count) in docCount) {
            // Weight rarer words higher: log(1 + totalDocs / (count + 0.5))
            idfMap[word] = ln(1f + (totalDocs / (count.toFloat() + 0.5f)))
        }
    }

    override suspend fun answer(question: String): BuddyAnswer {
        val cleanQ = question.trim().lowercase()
        if (cleanQ.isEmpty()) {
            return BuddyAnswer(
                answer = "Please ask a question about travelling in India.",
                hasVettedAnswer = false
            )
        }

        val queryWords = cleanQ.split(Regex("[\\s,?.!-]+"))
            .filter { it.length > 2 && !stopWords.contains(it) }
            .map { normalize(it) }

        if (queryWords.isEmpty()) {
            return BuddyAnswer(
                answer = "I did not catch specific keywords. Please ask about visas, FRRO, hotel scams, auto meters, or water safety.",
                hasVettedAnswer = false
            )
        }

        var bestScore = 0f
        var bestEntry: KnowledgeEntry? = null

        for (entry in entries) {
            var score = 0f
            val entryKeywords = entry.keywords.map { normalize(it) }
            val titleWords = entry.title.lowercase().split(Regex("\\s+")).map { normalize(it) }

            for (qWord in queryWords) {
                val idfWeight = idfMap[qWord] ?: 1.0f

                // Rare keywords match
                if (entryKeywords.contains(qWord)) {
                    score += 6.0f * idfWeight
                }
                // Title match
                if (titleWords.contains(qWord)) {
                    score += 4.5f * idfWeight
                }
                // Body match
                if (entry.answer.lowercase().contains(qWord)) {
                    score += 1.5f * idfWeight
                }
            }

            if (score > bestScore) {
                bestScore = score
                bestEntry = entry
            }
        }

        if (bestEntry == null || bestScore < threshold) {
            return BuddyAnswer(
                answer = "I do not have a vetted answer for this in my offline knowledge base. To stay safe, please check official government portals such as indianvisaonline.gov.in or ask your hotel reception. I will never invent travel advice.",
                sourceLabel = "Official Portals",
                sourceUrl = "https://indianvisaonline.gov.in",
                hasVettedAnswer = false,
                confidence = bestScore
            )
        }

        return BuddyAnswer(
            answer = bestEntry.answer,
            sourceLabel = bestEntry.sourceLabel,
            sourceUrl = bestEntry.sourceUrl,
            hasVettedAnswer = true,
            confidence = bestScore
        )
    }

    companion object {
        fun fromJsonString(jsonString: String): RetrievalBuddyEngine {
            val json = Json { ignoreUnknownKeys = true }
            val list = json.decodeFromString<List<KnowledgeEntry>>(jsonString)
            return RetrievalBuddyEngine(list)
        }
    }
}
