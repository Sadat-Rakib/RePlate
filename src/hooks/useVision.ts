import { useState } from 'react';
import { VisionAnalysisResult, GoogleVisionService } from '@/utils/vision';

const GOOGLE_VISION_API_KEY = process.env.REACT_APP_GOOGLE_VISION_API_KEY || '';

export const useVision = () => {
  const [analysis, setAnalysis] = useState<VisionAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const visionService = new GoogleVisionService(GOOGLE_VISION_API_KEY);

  const analyzeImage = async (imageFile: File) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);
    
    try {
      const result = await visionService.analyzeImage(imageFile);
      setAnalysis(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze image';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysis(null);
    setError(null);
  };

  return {
    analysis,
    loading,
    error,
    analyzeImage,
    resetAnalysis,
  };
};

export const useBatchVision = () => {
  const [analyses, setAnalyses] = useState<VisionAnalysisResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const visionService = new GoogleVisionService(GOOGLE_VISION_API_KEY);

  const analyzeImages = async (imageFiles: File[]) => {
    setLoading(true);
    setError(null);
    setAnalyses([]);
    setProgress(0);
    
    try {
      const results: VisionAnalysisResult[] = [];
      
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const result = await visionService.analyzeImage(file);
        results.push(result);
        setProgress(((i + 1) / imageFiles.length) * 100);
        
        // Update state progressively
        setAnalyses([...results]);
      }
      
      return results;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze images';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetAnalyses = () => {
    setAnalyses([]);
    setError(null);
    setProgress(0);
  };

  return {
    analyses,
    loading,
    error,
    progress,
    analyzeImages,
    resetAnalyses,
  };
};