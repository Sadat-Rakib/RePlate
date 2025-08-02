import { useState, useEffect, useCallback } from 'react';
import { UnsplashImage, OptimizedImage, MediaService } from '@/utils/media';

const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY || '';

export const useMedia = () => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mediaService = new MediaService(UNSPLASH_ACCESS_KEY);

  const fetchImages = useCallback(async (
    query: string,
    count: number = 6,
    orientation: 'landscape' | 'portrait' | 'squarish' = 'landscape'
  ) => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await mediaService.fetchUniqueImages(query, count, orientation);
      setImages(results);
      return results;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch images';
      setError(errorMessage);
      setImages([]);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [mediaService]);

  const optimizeImage = useCallback((
    image: UnsplashImage,
    maxWidth?: number,
    maxHeight?: number
  ): OptimizedImage => {
    return mediaService.optimizeImageForDisplay(image, maxWidth, maxHeight);
  }, [mediaService]);

  const clearUsedImages = useCallback(() => {
    mediaService.clearUsedImages();
  }, [mediaService]);

  return {
    images,
    loading,
    error,
    fetchImages,
    optimizeImage,
    clearUsedImages,
  };
};

export const useImageOptimization = () => {
  const [optimizedImages, setOptimizedImages] = useState<Map<string, OptimizedImage>>(new Map());
  const mediaService = new MediaService(UNSPLASH_ACCESS_KEY);

  const optimizeImages = useCallback((images: UnsplashImage[], maxWidth?: number, maxHeight?: number) => {
    const optimized = new Map<string, OptimizedImage>();
    
    images.forEach(image => {
      const optimizedImage = mediaService.optimizeImageForDisplay(image, maxWidth, maxHeight);
      optimized.set(image.id, optimizedImage);
    });
    
    setOptimizedImages(optimized);
    return optimized;
  }, [mediaService]);

  const getOptimizedImage = useCallback((imageId: string): OptimizedImage | undefined => {
    return optimizedImages.get(imageId);
  }, [optimizedImages]);

  return {
    optimizedImages,
    optimizeImages,
    getOptimizedImage,
  };
};

// Hook for lazy loading images with intersection observer
export const useLazyImage = (src: string) => {
  const [imageSrc, setImageSrc] = useState<string>();
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    
    if (imageRef && imageSrc !== src) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setImageSrc(src);
              observer.unobserve(imageRef);
            }
          });
        },
        { threshold: 0.1 }
      );
      
      observer.observe(imageRef);
    }
    
    return () => {
      if (observer && imageRef) {
        observer.unobserve(imageRef);
      }
    };
  }, [imageRef, src, imageSrc]);

  return [setImageRef, imageSrc] as const;
};