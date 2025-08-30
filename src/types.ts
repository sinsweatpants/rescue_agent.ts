// src/types.ts

/**
 * Defines the possible emotional tones.
 */
export type Tone = 'positive' | 'negative' | 'neutral' | 'mixed';

/**
 * Defines the possible specific emotions that can be detected.
 */
export type Emotion = 'joy' | 'sadness' | 'anger' | 'fear' | 'surprise' | 'disgust' | 'anticipation' | 'trust';

/**
 * Represents a dominant emotion found in the text.
 */
export interface DominantEmotion {
  emotion: Emotion;
  intensity: number; // A score from 0 to 100
  textEvidence: string[]; // Direct quotes from the text
}

/**
 * Represents a point in the mood's progression throughout the text.
 */
export interface MoodProgression {
  position: number; // Position in the text (0-100)
  mood: string; // A description of the mood at this point
  intensity: number; // A score from 0 to 100
}

/**
 * The structured result of a sentiment analysis.
 */
export interface SentimentAnalysis {
  overallTone: Tone;
  emotionalIntensity: number; // Overall intensity (0-100)
  dominantEmotions: DominantEmotion[];
  moodProgression: MoodProgression[];
  psychologicalDepth: number; // An assessment of the text's psychological depth (0-100)
}

/**
 * Represents a generic "treasure" element extracted from text for analysis.
 * This is a flexible structure for things like character analysis, plot points, etc.
 */
export interface TreasureElement {
    id: string;
    text: string;
    analysis?: {
        sentiment?: SentimentAnalysis;
        // Other analysis types can be added here, e.g., style, quality
    };
    finalText?: string;
}
