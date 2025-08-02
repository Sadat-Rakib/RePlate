// Recipe API utilities (Spoonacular & Edamam)
export interface Recipe {
  id: string;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  instructions?: string;
  ingredients: Ingredient[];
  nutrition?: NutritionData;
  sourceUrl?: string;
  spoonacularScore?: number;
}

export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  original: string;
  image?: string;
}

export interface NutritionData {
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
  fiber?: number;
  sugar?: number;
}

export interface RecipeSearchParams {
  query?: string;
  ingredients?: string[];
  diet?: string;
  intolerances?: string[];
  maxReadyTime?: number;
  minProtein?: number;
  maxCalories?: number;
  number?: number;
}

export class SpoonacularService {
  private apiKey: string;
  private baseUrl = 'https://api.spoonacular.com/recipes';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async searchRecipes(params: RecipeSearchParams): Promise<Recipe[]> {
    const searchParams = new URLSearchParams({
      apiKey: this.apiKey,
      number: (params.number || 12).toString(),
      addRecipeInformation: 'true',
      fillIngredients: 'true',
    });

    if (params.query) searchParams.append('query', params.query);
    if (params.ingredients?.length) {
      searchParams.append('includeIngredients', params.ingredients.join(','));
    }
    if (params.diet) searchParams.append('diet', params.diet);
    if (params.intolerances?.length) {
      searchParams.append('intolerances', params.intolerances.join(','));
    }
    if (params.maxReadyTime) {
      searchParams.append('maxReadyTime', params.maxReadyTime.toString());
    }
    if (params.minProtein) {
      searchParams.append('minProtein', params.minProtein.toString());
    }
    if (params.maxCalories) {
      searchParams.append('maxCalories', params.maxCalories.toString());
    }

    try {
      const response = await fetch(`${this.baseUrl}/complexSearch?${searchParams}`);
      const data = await response.json();
      
      return data.results?.map(this.formatRecipe) || [];
    } catch (error) {
      console.error('Error searching recipes:', error);
      throw new Error('Failed to search recipes');
    }
  }

  async getRecipesByIngredients(ingredients: string[]): Promise<Recipe[]> {
    const searchParams = new URLSearchParams({
      apiKey: this.apiKey,
      ingredients: ingredients.join(','),
      number: '12',
      ranking: '1', // Minimize missing ingredients
      ignorePantry: 'true',
    });

    try {
      const response = await fetch(
        `${this.baseUrl}/findByIngredients?${searchParams}`
      );
      const data = await response.json();
      
      // Get detailed information for each recipe
      const detailedRecipes = await Promise.all(
        data.slice(0, 6).map((recipe: any) => this.getRecipeDetails(recipe.id))
      );
      
      return detailedRecipes.filter(Boolean);
    } catch (error) {
      console.error('Error finding recipes by ingredients:', error);
      throw new Error('Failed to find recipes by ingredients');
    }
  }

  async getRecipeDetails(id: string): Promise<Recipe | null> {
    const searchParams = new URLSearchParams({
      apiKey: this.apiKey,
      includeNutrition: 'true',
    });

    try {
      const response = await fetch(
        `${this.baseUrl}/${id}/information?${searchParams}`
      );
      const data = await response.json();
      
      return this.formatRecipe(data);
    } catch (error) {
      console.error('Error getting recipe details:', error);
      return null;
    }
  }

  async getRandomRecipes(tags?: string[]): Promise<Recipe[]> {
    const searchParams = new URLSearchParams({
      apiKey: this.apiKey,
      number: '6',
    });

    if (tags?.length) {
      searchParams.append('tags', tags.join(','));
    }

    try {
      const response = await fetch(`${this.baseUrl}/random?${searchParams}`);
      const data = await response.json();
      
      return data.recipes?.map(this.formatRecipe) || [];
    } catch (error) {
      console.error('Error getting random recipes:', error);
      throw new Error('Failed to get random recipes');
    }
  }

  private formatRecipe(data: any): Recipe {
    return {
      id: data.id?.toString(),
      title: data.title,
      image: data.image,
      readyInMinutes: data.readyInMinutes || 0,
      servings: data.servings || 1,
      summary: data.summary || '',
      instructions: data.instructions || data.analyzedInstructions?.[0]?.steps
        ?.map((step: any) => step.step)
        ?.join(' '),
      ingredients: data.extendedIngredients?.map((ing: any) => ({
        id: ing.id,
        name: ing.name,
        amount: ing.amount,
        unit: ing.unit,
        original: ing.original,
        image: ing.image,
      })) || [],
      nutrition: data.nutrition ? {
        calories: data.nutrition.nutrients?.find((n: any) => n.name === 'Calories')?.amount || 0,
        protein: data.nutrition.nutrients?.find((n: any) => n.name === 'Protein')?.amount || 0,
        fat: data.nutrition.nutrients?.find((n: any) => n.name === 'Fat')?.amount || 0,
        carbohydrates: data.nutrition.nutrients?.find((n: any) => n.name === 'Carbohydrates')?.amount || 0,
      } : undefined,
      sourceUrl: data.sourceUrl,
      spoonacularScore: data.spoonacularScore,
    };
  }
}

export class EdamamService {
  private appId: string;
  private appKey: string;
  private baseUrl = 'https://api.edamam.com/api/recipes/v2';

  constructor(appId: string, appKey: string) {
    this.appId = appId;
    this.appKey = appKey;
  }

  async searchRecipes(params: RecipeSearchParams): Promise<Recipe[]> {
    const searchParams = new URLSearchParams({
      type: 'public',
      app_id: this.appId,
      app_key: this.appKey,
      from: '0',
      to: (params.number || 12).toString(),
    });

    if (params.query) searchParams.append('q', params.query);
    if (params.diet) searchParams.append('diet', params.diet);
    if (params.maxCalories) {
      searchParams.append('calories', `0-${params.maxCalories}`);
    }
    if (params.maxReadyTime) {
      searchParams.append('time', `0-${params.maxReadyTime}`);
    }

    try {
      const response = await fetch(`${this.baseUrl}?${searchParams}`);
      const data = await response.json();
      
      return data.hits?.map((hit: any) => this.formatEdamamRecipe(hit.recipe)) || [];
    } catch (error) {
      console.error('Error searching Edamam recipes:', error);
      throw new Error('Failed to search Edamam recipes');
    }
  }

  private formatEdamamRecipe(data: any): Recipe {
    return {
      id: data.uri?.split('#recipe_')[1] || '',
      title: data.label,
      image: data.image,
      readyInMinutes: data.totalTime || 0,
      servings: data.yield || 1,
      summary: data.summary || '',
      ingredients: data.ingredients?.map((ing: any, index: number) => ({
        id: index,
        name: ing.food,
        amount: ing.quantity || 0,
        unit: ing.measure || '',
        original: ing.text,
        image: ing.image,
      })) || [],
      nutrition: {
        calories: Math.round(data.calories / data.yield),
        protein: Math.round(data.totalNutrients?.PROCNT?.quantity / data.yield || 0),
        fat: Math.round(data.totalNutrients?.FAT?.quantity / data.yield || 0),
        carbohydrates: Math.round(data.totalNutrients?.CHOCDF?.quantity / data.yield || 0),
      },
      sourceUrl: data.url,
    };
  }
}