import { motion } from 'framer-motion';
import { Clock, Users, Star, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Recipe } from '@/utils/recipes';
import { useLazyImage } from '@/hooks/useMedia';

interface RecipeCardProps {
  recipe: Recipe;
  onViewRecipe?: (recipe: Recipe) => void;
  className?: string;
}

export const RecipeCard = ({ recipe, onViewRecipe, className }: RecipeCardProps) => {
  const [setImageRef, imageSrc] = useLazyImage(recipe.image);

  const handleViewRecipe = () => {
    if (onViewRecipe) {
      onViewRecipe(recipe);
    } else if (recipe.sourceUrl) {
      window.open(recipe.sourceUrl, '_blank');
    }
  };

  const stripHtmlTags = (html: string) => {
    return html.replace(/<[^>]*>/g, '').slice(0, 120) + '...';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={className}
    >
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
        <div className="relative aspect-video overflow-hidden">
          <img
            ref={setImageRef}
            src={imageSrc || '/placeholder-recipe.jpg'}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          
          {recipe.spoonacularScore && (
            <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground rounded-full px-2 py-1 text-xs font-medium flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              {Math.round(recipe.spoonacularScore)}
            </div>
          )}

          <div className="absolute bottom-2 left-2 flex gap-1">
            {recipe.readyInMinutes > 0 && (
              <Badge variant="secondary" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {recipe.readyInMinutes}m
              </Badge>
            )}
            {recipe.servings > 0 && (
              <Badge variant="secondary" className="text-xs">
                <Users className="w-3 h-3 mr-1" />
                {recipe.servings}
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="p-4 flex-1">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {recipe.title}
          </h3>
          
          {recipe.summary && (
            <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
              {stripHtmlTags(recipe.summary)}
            </p>
          )}

          {recipe.nutrition && (
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
              <div className="flex justify-between">
                <span>Calories:</span>
                <span className="font-medium">{Math.round(recipe.nutrition.calories)}</span>
              </div>
              <div className="flex justify-between">
                <span>Protein:</span>
                <span className="font-medium">{Math.round(recipe.nutrition.protein)}g</span>
              </div>
            </div>
          )}

          {recipe.ingredients && recipe.ingredients.length > 0 && (
            <div className="mb-3">
              <p className="text-xs text-muted-foreground mb-1">
                {recipe.ingredients.length} ingredients
              </p>
              <div className="flex flex-wrap gap-1">
                {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {ingredient.name}
                  </Badge>
                ))}
                {recipe.ingredients.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{recipe.ingredients.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button 
            onClick={handleViewRecipe}
            className="w-full group/button"
            variant="default"
          >
            <span>View Recipe</span>
            <ExternalLink className="w-4 h-4 ml-2 group-hover/button:translate-x-0.5 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};