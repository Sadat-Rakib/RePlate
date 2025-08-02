import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, ChefHat, Heart, Search, Filter, Star, BookOpen } from 'lucide-react';

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Recipes', count: 45 },
    { id: 'quick', label: 'Quick & Easy', count: 12 },
    { id: 'vegetarian', label: 'Vegetarian', count: 18 },
    { id: 'leftover', label: 'Leftover Magic', count: 8 },
    { id: 'healthy', label: 'Healthy', count: 15 }
  ];

  const featuredRecipes = [
    {
      id: 1,
      title: "Rustic Vegetable Stir-Fry",
      image: "/lovable-uploads/eb3b2717-bc63-49e1-bfc1-58c36f71045e.png",
      cookTime: "20 mins",
      servings: 4,
      difficulty: "Easy",
      rating: 4.8,
      description: "Transform leftover vegetables into a delicious, nutritious meal with this simple stir-fry recipe.",
      ingredients: ["Bell peppers", "Onions", "Carrots", "Garlic", "Ginger", "Soy sauce"],
      tags: ["vegetarian", "quick", "healthy"],
      savedMeals: 156,
      co2Saved: "2.3 kg"
    },
    {
      id: 2,
      title: "Community Feast Bowl",
      image: "/lovable-uploads/837f3dfb-5fb0-4ac1-b704-220c20ba2bf7.png",
      cookTime: "35 mins",
      servings: 8,
      difficulty: "Medium",
      rating: 4.9,
      description: "A hearty, shareable meal perfect for community gatherings and using up various ingredients.",
      ingredients: ["Mixed grains", "Seasonal vegetables", "Herbs", "Olive oil", "Lemon"],
      tags: ["vegetarian", "healthy", "leftover"],
      savedMeals: 203,
      co2Saved: "4.1 kg"
    }
  ];

  const quickRecipes = [
    {
      id: 3,
      title: "Rescue Salad Supreme",
      cookTime: "10 mins",
      servings: 2,
      difficulty: "Easy",
      rating: 4.6,
      ingredients: ["Mixed greens", "Cherry tomatoes", "Cucumber", "Feta cheese"],
      tags: ["quick", "healthy", "vegetarian"]
    },
    {
      id: 4,
      title: "Leftover Grain Bowl",
      cookTime: "15 mins",
      servings: 3,
      difficulty: "Easy", 
      rating: 4.7,
      ingredients: ["Cooked rice", "Roasted vegetables", "Tahini", "Lemon"],
      tags: ["quick", "leftover", "healthy"]
    },
    {
      id: 5,
      title: "Herb-Crusted Fish",
      cookTime: "25 mins",
      servings: 4,
      difficulty: "Medium",
      rating: 4.5,
      ingredients: ["White fish", "Fresh herbs", "Breadcrumbs", "Lemon"],
      tags: ["healthy", "protein"]
    },
    {
      id: 6,
      title: "Veggie Frittata",
      cookTime: "30 mins",
      servings: 6,
      difficulty: "Medium",
      rating: 4.8,
      ingredients: ["Eggs", "Mixed vegetables", "Cheese", "Herbs"],
      tags: ["vegetarian", "leftover", "protein"]
    }
  ];

  const filterRecipes = (recipes: any[]) => {
    return recipes.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           recipe.ingredients.some((ing: string) => ing.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || recipe.tags.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/lovable-uploads/eb3b2717-bc63-49e1-bfc1-58c36f71045e.png"
            alt="Fresh ingredients"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-dm-serif text-5xl md:text-7xl text-primary-foreground mb-6">
              Smart 
              <span className="bg-gradient-to-r from-rusted-saffron to-lichen-green bg-clip-text text-transparent"> Recipes</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              Transform your leftover ingredients into delicious meals with AI-powered recipe suggestions 
              tailored to what you have at home.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search recipes or ingredients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center"
                >
                  {category.label}
                  <Badge variant="secondary" className="ml-2">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-dm-serif text-4xl text-foreground mb-6">
              Featured Rescue Recipes
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These popular recipes have helped thousands save food and create amazing meals
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {filterRecipes(featuredRecipes).map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                  <div className="relative">
                    <img 
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 rounded-full px-3 py-1 flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{recipe.rating}</span>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      {recipe.savedMeals} meals saved
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {recipe.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <h3 className="font-dm-serif text-2xl text-foreground mb-3">
                      {recipe.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {recipe.description}
                    </p>

                    <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {recipe.cookTime}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {recipe.servings} servings
                      </div>
                      <div className="flex items-center">
                        <ChefHat className="w-4 h-4 mr-1" />
                        {recipe.difficulty}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-foreground mb-2">Key Ingredients:</p>
                      <div className="flex flex-wrap gap-1">
                        {recipe.ingredients.slice(0, 4).map((ingredient, idx) => (
                          <span key={idx} className="text-xs bg-muted px-2 py-1 rounded">
                            {ingredient}
                          </span>
                        ))}
                        {recipe.ingredients.length > 4 && (
                          <span className="text-xs text-muted-foreground">
                            +{recipe.ingredients.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-green-600">
                        <span className="font-medium">{recipe.co2Saved}</span> CO₂ saved per serving
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button size="sm" className="btn-nature">
                          <BookOpen className="w-4 h-4 mr-2" />
                          View Recipe
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Recipes Grid */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-dm-serif text-4xl text-foreground mb-6">
              Quick Rescue Recipes
            </h2>
            <p className="text-xl text-muted-foreground">
              Fast solutions for when you need to use ingredients quickly
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filterRecipes(quickRecipes).map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {recipe.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="font-dm-serif text-lg text-foreground mb-3">
                    {recipe.title}
                  </h3>

                  <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {recipe.cookTime}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      {recipe.rating}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {recipe.ingredients.slice(0, 3).map((ingredient, idx) => (
                        <span key={idx} className="text-xs bg-muted px-2 py-1 rounded">
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button size="sm" className="flex-1 btn-nature">
                      View
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recipe of the Week */}
      <section className="py-20 bg-gradient-nature">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-accent-foreground text-accent">
                Recipe of the Week
              </Badge>
              <h2 className="font-dm-serif text-4xl text-accent-foreground mb-6">
                Community Favorite: Zero-Waste Soup
              </h2>
              <p className="text-xl text-accent-foreground/80 mb-8 leading-relaxed">
                This week's featured recipe has saved over 500 meals and helped reduce 
                2.1 tons of CO₂ emissions. Perfect for using up vegetable scraps and leftovers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-hero">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Get the Recipe
                </Button>
                <Button variant="outline" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent">
                  Submit Your Recipe
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Recipes;