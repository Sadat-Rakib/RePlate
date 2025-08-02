// Google Vision API utilities
export interface VisionAnalysisResult {
  labels: LabelAnnotation[];
  textDetections: TextAnnotation[];
  objectLocalizations: ObjectLocalization[];
  nutritionInfo?: NutritionInfo;
}

export interface LabelAnnotation {
  description: string;
  score: number;
  confidence: number;
}

export interface TextAnnotation {
  description: string;
  boundingPoly: BoundingPoly;
}

export interface ObjectLocalization {
  name: string;
  score: number;
  boundingPoly: BoundingPoly;
}

export interface BoundingPoly {
  vertices: Array<{ x: number; y: number }>;
}

export interface NutritionInfo {
  ingredients: string[];
  estimatedCalories?: number;
  allergens?: string[];
  expiryDate?: string;
}

export class GoogleVisionService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async analyzeImage(imageFile: File): Promise<VisionAnalysisResult> {
    try {
      const base64Image = await this.fileToBase64(imageFile);
      
      const requestBody = {
        requests: [
          {
            image: {
              content: base64Image.split(',')[1], // Remove data:image/jpeg;base64, prefix
            },
            features: [
              { type: 'LABEL_DETECTION', maxResults: 10 },
              { type: 'TEXT_DETECTION', maxResults: 10 },
              { type: 'OBJECT_LOCALIZATION', maxResults: 10 },
            ],
          },
        ],
      };

      const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();
      
      if (data.responses && data.responses[0]) {
        const result = data.responses[0];
        return {
          labels: result.labelAnnotations || [],
          textDetections: result.textAnnotations || [],
          objectLocalizations: result.localizedObjectAnnotations || [],
          nutritionInfo: this.extractNutritionInfo(result),
        };
      }

      throw new Error('No analysis results received');
    } catch (error) {
      console.error('Error analyzing image:', error);
      throw new Error('Failed to analyze image');
    }
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  private extractNutritionInfo(visionResult: any): NutritionInfo {
    const ingredients: string[] = [];
    const allergens: string[] = [];
    
    // Extract food-related labels
    if (visionResult.labelAnnotations) {
      visionResult.labelAnnotations.forEach((label: LabelAnnotation) => {
        if (this.isFoodRelated(label.description)) {
          ingredients.push(label.description);
        }
        if (this.isAllergen(label.description)) {
          allergens.push(label.description);
        }
      });
    }

    // Extract text that might contain expiry dates
    let expiryDate: string | undefined;
    if (visionResult.textAnnotations) {
      const fullText = visionResult.textAnnotations[0]?.description || '';
      expiryDate = this.extractExpiryDate(fullText);
    }

    return {
      ingredients: ingredients.slice(0, 5), // Limit to top 5
      allergens,
      expiryDate,
      estimatedCalories: this.estimateCalories(ingredients),
    };
  }

  private isFoodRelated(description: string): boolean {
    const foodKeywords = [
      'fruit', 'vegetable', 'meat', 'dairy', 'grain', 'bread', 'cheese',
      'apple', 'banana', 'carrot', 'tomato', 'lettuce', 'chicken', 'beef',
      'milk', 'yogurt', 'rice', 'pasta', 'cereal'
    ];
    return foodKeywords.some(keyword => 
      description.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  private isAllergen(description: string): boolean {
    const allergens = ['nuts', 'dairy', 'gluten', 'soy', 'eggs', 'shellfish'];
    return allergens.some(allergen => 
      description.toLowerCase().includes(allergen.toLowerCase())
    );
  }

  private extractExpiryDate(text: string): string | undefined {
    // Simple regex patterns for common date formats
    const datePatterns = [
      /\b(\d{1,2}\/\d{1,2}\/\d{2,4})\b/g,
      /\b(\d{1,2}-\d{1,2}-\d{2,4})\b/g,
      /\b(exp|expires?|best by|use by):?\s*(\d{1,2}\/\d{1,2}\/\d{2,4})\b/gi,
    ];

    for (const pattern of datePatterns) {
      const match = text.match(pattern);
      if (match) {
        return match[0];
      }
    }

    return undefined;
  }

  private estimateCalories(ingredients: string[]): number {
    // Simple calorie estimation based on ingredient types
    const calorieMap: Record<string, number> = {
      'fruit': 50,
      'vegetable': 25,
      'meat': 200,
      'dairy': 100,
      'grain': 150,
      'bread': 80,
    };

    let totalCalories = 0;
    ingredients.forEach(ingredient => {
      const key = Object.keys(calorieMap).find(k => 
        ingredient.toLowerCase().includes(k)
      );
      if (key) {
        totalCalories += calorieMap[key];
      }
    });

    return totalCalories || 100; // Default estimate
  }
}