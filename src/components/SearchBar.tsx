import { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange?: (filters: SearchFilters) => void;
  placeholder?: string;
  className?: string;
  showFilters?: boolean;
}

export interface SearchFilters {
  dietaryRestrictions: string[];
  maxCookingTime: number | null;
  difficulty: string[];
  mealType: string[];
}

const defaultFilters: SearchFilters = {
  dietaryRestrictions: [],
  maxCookingTime: null,
  difficulty: [],
  mealType: []
};

export const SearchBar = ({ 
  onSearch, 
  onFilterChange,
  placeholder = "Search recipes...",
  className = "",
  showFilters = true
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  const toggleArrayFilter = (category: keyof Pick<SearchFilters, 'dietaryRestrictions' | 'difficulty' | 'mealType'>, value: string) => {
    const currentArray = filters[category];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    updateFilters({ [category]: newArray });
  };

  const clearAllFilters = () => {
    setFilters(defaultFilters);
    onFilterChange?.(defaultFilters);
  };

  const activeFilterCount = 
    filters.dietaryRestrictions.length + 
    filters.difficulty.length + 
    filters.mealType.length + 
    (filters.maxCookingTime ? 1 : 0);

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 
    'Keto', 'Paleo', 'Low-Carb', 'High-Protein'
  ];

  const difficultyOptions = ['Easy', 'Medium', 'Hard'];
  const mealTypeOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'];
  const cookingTimeOptions = [15, 30, 45, 60, 90];

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-20"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {query && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="h-6 w-6 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
          {showFilters && (
            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 px-2 relative">
                  <Filter className="w-4 h-4" />
                  {activeFilterCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                    >
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Filters</h4>
                    {activeFilterCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="text-xs"
                      >
                        Clear all
                      </Button>
                    )}
                  </div>

                  {/* Dietary Restrictions */}
                  <div>
                    <h5 className="text-sm font-medium mb-2">Dietary Restrictions</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {dietaryOptions.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={`diet-${option}`}
                            checked={filters.dietaryRestrictions.includes(option)}
                            onCheckedChange={() => 
                              toggleArrayFilter('dietaryRestrictions', option)
                            }
                          />
                          <label
                            htmlFor={`diet-${option}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cooking Time */}
                  <div>
                    <h5 className="text-sm font-medium mb-2">Max Cooking Time</h5>
                    <div className="flex flex-wrap gap-2">
                      {cookingTimeOptions.map((time) => (
                        <Button
                          key={time}
                          variant={filters.maxCookingTime === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateFilters({ 
                            maxCookingTime: filters.maxCookingTime === time ? null : time 
                          })}
                          className="text-xs"
                        >
                          {time}min
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Difficulty */}
                  <div>
                    <h5 className="text-sm font-medium mb-2">Difficulty</h5>
                    <div className="flex gap-2">
                      {difficultyOptions.map((level) => (
                        <Button
                          key={level}
                          variant={filters.difficulty.includes(level) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleArrayFilter('difficulty', level)}
                          className="text-xs"
                        >
                          {level}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Meal Type */}
                  <div>
                    <h5 className="text-sm font-medium mb-2">Meal Type</h5>
                    <div className="flex flex-wrap gap-2">
                      {mealTypeOptions.map((meal) => (
                        <Button
                          key={meal}
                          variant={filters.mealType.includes(meal) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleArrayFilter('mealType', meal)}
                          className="text-xs"
                        >
                          {meal}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.dietaryRestrictions.map((restriction) => (
            <Badge
              key={restriction}
              variant="secondary"
              className="text-xs cursor-pointer"
              onClick={() => toggleArrayFilter('dietaryRestrictions', restriction)}
            >
              {restriction}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
          {filters.difficulty.map((level) => (
            <Badge
              key={level}
              variant="secondary"
              className="text-xs cursor-pointer"
              onClick={() => toggleArrayFilter('difficulty', level)}
            >
              {level}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
          {filters.mealType.map((meal) => (
            <Badge
              key={meal}
              variant="secondary"
              className="text-xs cursor-pointer"
              onClick={() => toggleArrayFilter('mealType', meal)}
            >
              {meal}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
          {filters.maxCookingTime && (
            <Badge
              variant="secondary"
              className="text-xs cursor-pointer"
              onClick={() => updateFilters({ maxCookingTime: null })}
            >
              ≤{filters.maxCookingTime}min
              <X className="w-3 h-3 ml-1" />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};