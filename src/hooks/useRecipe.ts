import { useState, useEffect } from 'react';
import { Recipe, RecipeSearchParams, SpoonacularService, EdamamService } from '@/utils/recipes';

const SPOONACULAR_API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY || '';
const EDAMAM_APP_ID = process.env.REACT_APP_EDAMAM_APP_ID || '';
const EDAMAM_APP_KEY = process.env.REACT_APP_EDAMAM_APP_KEY || '';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const spoonacularService = new SpoonacularService(SPOONACULAR_API_KEY);
  const edamamService = new EdamamService(EDAMAM_APP_ID, EDAMAM_APP_KEY);

  const searchRecipes = async (params: RecipeSearchParams, provider: 'spoonacular' | 'edamam' = 'spoonacular') => {
    setLoading(true);
    setError(null);
    
    try {
      let results: Recipe[];
      
      if (provider === 'spoonacular') {
        results = await spoonacularService.searchRecipes(params);
      } else {
        results = await edamamService.searchRecipes(params);
      }
      
      setRecipes(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch recipes');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const getRecipesByIngredients = async (ingredients: string[]) => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await spoonacularService.getRecipesByIngredients(ingredients);
      setRecipes(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch recipes by ingredients');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const getRandomRecipes = async (tags?: string[]) => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await spoonacularService.getRandomRecipes(tags);
      setRecipes(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch random recipes');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    recipes,
    loading,
    error,
    searchRecipes,
    getRecipesByIngredients,
    getRandomRecipes,
  };
};

export const useRecipeDetails = (recipeId: string) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const spoonacularService = new SpoonacularService(SPOONACULAR_API_KEY);

  useEffect(() => {
    if (!recipeId) return;

    const fetchRecipeDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await spoonacularService.getRecipeDetails(recipeId);
        setRecipe(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch recipe details');
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  return {
    recipe,
    loading,
    error,
  };
};