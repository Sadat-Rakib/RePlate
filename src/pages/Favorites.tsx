import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { RecipeCard } from '@/components/RecipeCard';
import { Recipe } from '@/utils/recipes';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadFavorites = () => {
      try {
        const savedFavorites = localStorage.getItem('favoriteRecipes');
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const removeFavorite = (recipeId: string) => {
    const updatedFavorites = favorites.filter(recipe => recipe.id !== recipeId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('favoriteRecipes');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                onClick={() => navigate(-1)}
                className="mr-4 text-primary-foreground hover:bg-white/10"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="font-dm-serif text-4xl md:text-5xl text-primary-foreground">
                  Favorite Recipes
                </h1>
                <p className="text-lg text-primary-foreground/80 mt-2">
                  Your saved recipes collection
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right text-primary-foreground">
                <div className="flex items-center">
                  <Heart className="w-5 h-5 mr-2 fill-current" />
                  <span className="text-lg font-medium">{favorites.length}</span>
                </div>
                <p className="text-sm opacity-80">saved recipes</p>
              </div>
              
              {favorites.length > 0 && (
                <Button 
                  variant="outline" 
                  onClick={clearAllFavorites}
                  className="border-primary-foreground text-primary-foreground hover:bg-white/10"
                >
                  Clear All
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {favorites.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-md mx-auto"
            >
              <Card className="p-8">
                <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-dm-serif text-2xl text-foreground mb-4">
                  No Favorites Yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Start exploring recipes and save your favorites by clicking the heart icon.
                </p>
                <Button onClick={() => navigate('/recipes')} className="w-full">
                  Browse Recipes
                </Button>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favorites.map((recipe, index) => (
                  <motion.div
                    key={recipe.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <RecipeCard 
                      recipe={recipe}
                      onViewRecipe={(recipe) => {
                        // Navigate to recipe details or open in new tab
                        if (recipe.sourceUrl) {
                          window.open(recipe.sourceUrl, '_blank');
                        }
                      }}
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFavorite(recipe.id)}
                      className="w-full mt-2"
                    >
                      Remove from Favorites
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Favorites;