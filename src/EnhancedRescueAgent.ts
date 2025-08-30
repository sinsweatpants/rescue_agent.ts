import { ExtractorService } from "./ExtractorService";
import { SentimentAnalyzer } from "./SentimentAnalyzer";
import { TreasureElement, SentimentAnalysis } from "./types";

/**
 * The main agent responsible for orchestrating the text rescue and analysis process.
 */
class EnhancedRescueAgent {
    private extractor: ExtractorService;
    private sentimentAnalyzer: SentimentAnalyzer;

    constructor() {
        this.extractor = new ExtractorService();
        this.sentimentAnalyzer = new SentimentAnalyzer();
        // In a real app, a CacheManager and other services would be initialized here.
    }

    /**
     * Analyzes a single treasure element for its sentiment.
     * A real implementation might also include caching logic here.
     * @param treasure The TreasureElement to analyze.
     * @returns The same TreasureElement, now enriched with sentiment analysis.
     */
    private async analyze(treasure: TreasureElement): Promise<TreasureElement> {
        console.log(`Analyzing treasure: ${treasure.id}`);
        const sentiment: SentimentAnalysis = await this.sentimentAnalyzer.analyzeSentiment(treasure.text);

        // In a real app, you might also have style and quality analysis here.
        treasure.analysis = {
            sentiment: sentiment
        };

        // This could be a future step where another AI call refines the original text.
        treasure.finalText = `[Analyzed] ${treasure.text}`;

        return treasure;
    }

    /**
     * Extracts all treasures from a text and analyzes them in parallel.
     * @param text The source text.
     * @returns A promise that resolves to an array of analyzed TreasureElement objects.
     */
    async extractAndAnalyzeTreasures(text: string): Promise<TreasureElement[]> {
        const derivatives = this.extractor.extractAll(text);

        console.log(`Found ${derivatives.length} derivative treasures to analyze.`);

        // --- Parallel Processing Improvement ---
        // Use Promise.all to run the analysis on all derivatives concurrently.
        // This is much faster than awaiting them one-by-one in a for...of loop.
        const analysisPromises = derivatives.map(derivative => this.analyze(derivative));

        const analyzedTreasures = await Promise.all(analysisPromises);

        return analyzedTreasures;
    }

    /**
     * The main orchestration method that runs the entire process.
     * @param baseText The original text to be "rescued".
     * @returns An object containing the final results of the rescue operation.
     */
    async rescue(baseText: string) {
        console.log("--- Starting Rescue Operation ---");
        const treasures = await this.extractAndAnalyzeTreasures(baseText);
        console.log("--- Rescue Operation Complete ---");
        return {
            rescuedTreasures: treasures,
            summary: `Successfully analyzed ${treasures.length} elements from the text.`
        };
    }
}

export { EnhancedRescueAgent };
