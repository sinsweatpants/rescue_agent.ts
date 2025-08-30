import { TreasureElement } from "./types";

/**
 * A service dedicated to extracting structured elements (treasures) from raw text.
 * This separation of concerns makes the main agent's code cleaner.
 */
class ExtractorService {
    /**
     * Extracts character-related text segments.
     * This is a placeholder implementation. A real implementation would use more sophisticated NLP techniques.
     * @param text The source text.
     * @returns An array of TreasureElement objects representing characters.
     */
    extractCharacters(text: string): TreasureElement[] {
        console.log("Extracting characters...");
        // Simple regex to find names (e.g., "John said", "Mary replied")
        // This is a naive implementation for demonstration purposes.
        const characterRegex = /([A-Z][a-z]+)\s+(said|replied|asked|shouted|whispered)/g;
        const treasures: TreasureElement[] = [];
        let match;
        while ((match = characterRegex.exec(text)) !== null) {
            treasures.push({
                // TODO: Replace with a more robust unique ID generator like UUID.
                id: `char-${Date.now()}-${Math.random()}`,
                text: match[0], // The full matched text e.g., "John said"
            });
        }
        return treasures;
    }

    /**
     * Extracts plot-related text segments.
     * This is a placeholder implementation. A real implementation would look for action verbs, events, etc.
     * @param text The source text.
     * @returns An array of TreasureElement objects representing plot points.
     */
    extractPlotElements(text: string): TreasureElement[] {
        console.log("Extracting plot elements...");
        // Simple logic to find sentences that seem like plot points.
        const sentences = text.split(/(?<=[.?!])\s+/);
        const plotKeywords = ["Suddenly,", "Then,", "Later,", "Meanwhile,"];
        const treasures: TreasureElement[] = [];

        for (const sentence of sentences) {
            if (plotKeywords.some(keyword => sentence.startsWith(keyword))) {
                treasures.push({
                    // TODO: Replace with a more robust unique ID generator like UUID.
                    id: `plot-${Date.now()}-${Math.random()}`,
                    text: sentence,
                });
            }
        }
        return treasures;
    }

    /**
     * A master function to extract all types of treasures.
     * @param text The source text.
     * @returns A combined array of all extracted TreasureElements.
     */
    extractAll(text: string): TreasureElement[] {
        const characters = this.extractCharacters(text);
        const plotElements = this.extractPlotElements(text);
        return [...characters, ...plotElements];
    }
}

export { ExtractorService };
