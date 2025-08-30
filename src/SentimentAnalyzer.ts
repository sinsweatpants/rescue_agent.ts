import { SentimentAnalysis } from "./types";

// Note: In a real-world scenario, you would use a library like 'node-fetch' or the official Google AI SDK.
// This placeholder simulates the API call for demonstration purposes.
const MOCK_API_RESPONSE: SentimentAnalysis = {
  overallTone: "negative",
  emotionalIntensity: 85,
  dominantEmotions: [
    {
      emotion: "anger",
      intensity: 80,
      textEvidence: ["رائع، لقد أضعت مفاتيحي مرة أخرى"],
    },
    {
      emotion: "sadness",
      intensity: 70,
      textEvidence: ["هذا أفضل يوم في حياتي"],
    },
  ],
  moodProgression: [{ position: 50, mood: "غضب ساخر", intensity: 85 }],
  psychologicalDepth: 60,
};

class SentimentAnalyzer {
    /**
     * Simulates calling the Gemini API.
     * In a real implementation, this would involve a fetch request to the Gemini API endpoint.
     * @param prompt The complete prompt to send to the model.
     * @returns A promise that resolves to the raw string response from the API.
     */
    private async callGeminiAPI(prompt: string): Promise<string> {
        console.log("--- Sending Prompt to Gemini API ---");
        // A real implementation would not log the full prompt unless for debugging.
        // console.log(prompt);
        console.log("------------------------------------");

        // Simulate network latency
        await new Promise(resolve => setTimeout(resolve, 500));

        // In a real application, you would make a network request here.
        // For now, we return a stringified version of our mock response,
        // wrapped in markdown code fences as the API might do.
        return "```json\n" + JSON.stringify(MOCK_API_RESPONSE, null, 2) + "\n```";
    }

    /**
     * Analyzes the sentiment of a given text using a powerful, structured prompt.
     * @param text The text to analyze.
     * @returns A promise that resolves to a structured SentimentAnalysis object.
     */
    async analyzeSentiment(text: string): Promise<SentimentAnalysis> {
        const promptTemplate = `
أنت محلل أدبي وخبير في علم النفس السردي. مهمتك هي تحليل المشاعر والطباع النفسية في النص التالي وتقديم تقرير مفصل بصيغة JSON بناءً على الهيكل المحدد.

## مثال توضيحي (Example):
لتوضيح المطلوب، إذا كان النص هو: "رائع، لقد أضعت مفاتيحي مرة أخرى. هذا أفضل يوم في حياتي."، فإن المخرج المثالي سيكون:
\`\`\`json
{
  "overallTone": "negative",
  "emotionalIntensity": 85,
  "dominantEmotions": [
    {
      "emotion": "anger",
      "intensity": 80,
      "textEvidence": ["رائع، لقد أضعت مفاتيحي مرة أخرى"]
    },
    {
      "emotion": "sadness",
      "intensity": 70,
      "textEvidence": ["هذا أفضل يوم في حياتي"]
    }
  ],
  "moodProgression": [
    { "position": 50, "mood": "غضب ساخر", "intensity": 85 }
  ],
  "psychologicalDepth": 60
}
\`\`\`

## النص المطلوب تحليله:
"""
${text}
"""

## هيكل المخرجات المطلوب (JSON Schema):
يجب أن تلتزم بهذا الهيكل تمامًا:
\`\`\`json
{
  "overallTone": "'positive' | 'negative' | 'neutral' | 'mixed'",
  "emotionalIntensity": "رقم من 0 إلى 100 يمثل شدة المشاعر الإجمالية",
  "dominantEmotions": [
    {
      "emotion": "'joy' | 'sadness' | 'anger' | 'fear' | 'surprise' | 'disgust' | 'anticipation' | 'trust'",
      "intensity": "رقم من 0 إلى 100",
      "textEvidence": ["اقتباس مباشر من النص يدعم هذا الشعور"]
    }
  ],
  "moodProgression": [
    {
      "position": "رقم من 0 إلى 100 يمثل موضع النقطة في النص",
      "mood": "وصف للمزاج في هذه النقطة",
      "intensity": "رقم من 0 إلى 100"
    }
  ],
  "psychologicalDepth": "رقم من 0 إلى 100 يقيم العمق النفسي للنص"
}
\`\`\`

## تعليمات هامة:
1.  **العمق:** حلل المعنى الكامن خلف الكلمات. ابحث عن السخرية، المشاعر المختلطة، أو التلميحات غير المباشرة.
2.  **الأدلة:** يجب أن تكون الأدلة النصية (\`textEvidence\`) اقتباسات دقيقة وموجزة من النص الأصلي.
3.  **الالتزام بالهيكل:** يجب أن يكون ردك كائن JSON صالحًا بنسبة 100% بدون أي تعديلات على أسماء الحقول أو أنواعها.
4.  **الإجابة المباشرة:** لا تضف أي مقدمات، تحيات، أو شروحات. ابدأ مباشرة بكائن الـ JSON.
        `;

        try {
            const rawResponse = await this.callGeminiAPI(promptTemplate);
            const jsonText = this.extractJson(rawResponse);
            const analysisResult: SentimentAnalysis = JSON.parse(jsonText);
            return analysisResult;
        } catch (error) {
            console.error("Failed to analyze sentiment:", error);
            throw new Error("The model could not analyze the sentiment correctly.");
        }
    }

    /**
     * Extracts a JSON object from a string, which might be wrapped in markdown code fences.
     * @param text The text containing the JSON.
     * @returns The extracted JSON string.
     */
    private extractJson(text: string): string {
        const match = text.match(/```json\s*([\s\S]*?)\s*```/);
        if (match && match[1]) {
            return match[1];
        }
        // Fallback for cases where the response is just the JSON object itself
        return text;
    }
}

export { SentimentAnalyzer };
