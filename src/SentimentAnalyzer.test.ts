import { SentimentAnalyzer } from './SentimentAnalyzer';
import { SentimentAnalysis } from './types';

// NOTE: In a project with a properly configured test environment (like Jest),
// the test runner automatically provides global functions like `describe`, `it`, and `expect`.
// The previous 'declare' statements were a workaround and have been removed.

describe('SentimentAnalyzer', () => {

    it('should correctly analyze a piece of text and return the structured mock result', async () => {
        const analyzer = new SentimentAnalyzer();
        const textToAnalyze = "This is a test text.";

        const analysis: SentimentAnalysis = await analyzer.analyzeSentiment(textToAnalyze);

        // Assert that the result has the expected structure and values from the mock
        expect(analysis).toBeDefined();
        expect(analysis.overallTone).toBe('negative');
        expect(analysis.emotionalIntensity).toBe(85);
        expect(analysis.dominantEmotions.length).toBe(2);
        expect(analysis.dominantEmotions[0].emotion).toBe('anger');
        expect(analysis.dominantEmotions[0].textEvidence).toEqual(["رائع، لقد أضعت مفاتيحي مرة أخرى"]);
        expect(analysis.psychologicalDepth).toBe(60);
    });

    it('should throw an error if the API response is not valid JSON', async () => {
        const analyzer = new SentimentAnalyzer();
        const textToAnalyze = "another test";

        // Mock the internal API call to return malformed JSON
        (analyzer as any).callGeminiAPI = async (prompt: string): Promise<string> => {
            return "this is not valid json";
        };

        // In a real test suite, one would use `expect(..).rejects.toThrow()`.
        // This try/catch block serves to prove the principle.
        let errorThrown = false;
        try {
            await analyzer.analyzeSentiment(textToAnalyze);
        } catch (error) {
            errorThrown = true;
            expect((error as Error).message).toBe("The model could not analyze the sentiment correctly.");
        }

        expect(errorThrown).toBeTruthy();
    });
});
