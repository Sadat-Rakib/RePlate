import { motion } from 'framer-motion';
import { Eye, Tag, FileText, Target, Calendar, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { VisionAnalysisResult } from '@/utils/vision';

interface VisionResultsProps {
  results: VisionAnalysisResult[];
  className?: string;
}

export const VisionResults = ({ results, className }: VisionResultsProps) => {
  if (!results || results.length === 0) {
    return null;
  }

  const formatConfidence = (score: number) => Math.round(score * 100);

  const getConfidenceColor = (score: number) => {
    const percentage = score * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSuggestions = (nutritionInfo: any) => {
    const suggestions = [];
    
    if (nutritionInfo?.ingredients?.length > 0) {
      suggestions.push('Perfect for fresh recipes');
      suggestions.push('Store in refrigerator for freshness');
    }
    
    if (nutritionInfo?.expiryDate) {
      suggestions.push(`Use by ${nutritionInfo.expiryDate}`);
    }
    
    if (nutritionInfo?.allergens?.length > 0) {
      suggestions.push(`Contains allergens: ${nutritionInfo.allergens.join(', ')}`);
    }
    
    return suggestions.length > 0 ? suggestions : ['Great for cooking and meal prep'];
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              AI Vision Analysis Results
            </CardTitle>
          </CardHeader>
        </Card>
      </motion.div>

      <div className="grid gap-6">
        {results.map((result, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Image {index + 1} Analysis
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Labels Section */}
                {result.labels && result.labels.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="w-4 h-4 text-primary" />
                      <h4 className="font-semibold">Detected Items</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {result.labels.slice(0, 6).map((label, labelIndex) => (
                        <div key={labelIndex} className="p-3 border rounded-lg bg-muted/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm capitalize">
                              {label.description}
                            </span>
                            <Badge 
                              variant="secondary" 
                              className={getConfidenceColor(label.score)}
                            >
                              {formatConfidence(label.score)}%
                            </Badge>
                          </div>
                          <Progress 
                            value={formatConfidence(label.score)} 
                            className="h-2"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Text Detection */}
                {result.textDetections && result.textDetections.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="w-4 h-4 text-primary" />
                        <h4 className="font-semibold">Text Detected</h4>
                      </div>
                      
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-sm leading-relaxed">
                          {result.textDetections[0]?.description || 'No readable text found'}
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {/* Objects */}
                {result.objectLocalizations && result.objectLocalizations.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="w-4 h-4 text-primary" />
                        <h4 className="font-semibold">Object Locations</h4>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {result.objectLocalizations.map((obj, objIndex) => (
                          <Badge key={objIndex} variant="outline" className="capitalize">
                            {obj.name} ({formatConfidence(obj.score)}%)
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Nutrition Info */}
                {result.nutritionInfo && (
                  <>
                    <Separator />
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar className="w-4 h-4 text-primary" />
                          <h4 className="font-semibold">Nutrition Information</h4>
                        </div>
                        
                        <div className="space-y-3">
                          {result.nutritionInfo.ingredients && result.nutritionInfo.ingredients.length > 0 && (
                            <div>
                              <p className="text-sm font-medium mb-2">Ingredients:</p>
                              <div className="flex flex-wrap gap-1">
                                {result.nutritionInfo.ingredients.map((ingredient, ingIndex) => (
                                  <Badge key={ingIndex} variant="secondary" className="text-xs">
                                    {ingredient}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {result.nutritionInfo.estimatedCalories && (
                            <div className="flex justify-between">
                              <span className="text-sm">Estimated Calories:</span>
                              <span className="text-sm font-medium">
                                {result.nutritionInfo.estimatedCalories} kcal
                              </span>
                            </div>
                          )}
                          
                          {result.nutritionInfo.expiryDate && (
                            <div className="flex justify-between">
                              <span className="text-sm">Expiry Date:</span>
                              <span className="text-sm font-medium">
                                {result.nutritionInfo.expiryDate}
                              </span>
                            </div>
                          )}

                          {result.nutritionInfo.allergens && result.nutritionInfo.allergens.length > 0 && (
                            <div>
                              <p className="text-sm font-medium mb-2">Allergens:</p>
                              <div className="flex flex-wrap gap-1">
                                {result.nutritionInfo.allergens.map((allergen, allergenIndex) => (
                                  <Badge 
                                    key={allergenIndex} 
                                    variant="destructive" 
                                    className="text-xs"
                                  >
                                    {allergen}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Lightbulb className="w-4 h-4 text-primary" />
                          <h4 className="font-semibold">Suggestions</h4>
                        </div>
                        
                        <div className="space-y-2">
                          {getSuggestions(result.nutritionInfo).map((suggestion, suggestionIndex) => (
                            <div key={suggestionIndex} className="flex items-start gap-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="text-muted-foreground">{suggestion}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};