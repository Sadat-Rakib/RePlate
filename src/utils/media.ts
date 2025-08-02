// Media management utilities
export interface UnsplashImage {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description?: string;
  description?: string;
  user: {
    name: string;
    username: string;
  };
  width: number;
  height: number;
}

export interface OptimizedImage {
  src: string;
  srcSet: string;
  sizes: string;
  alt: string;
  width: number;
  height: number;
  blurDataUrl?: string;
}

export class MediaService {
  private unsplashAccessKey: string;
  private cache = new Map<string, UnsplashImage[]>();
  private usedImages = new Set<string>();

  constructor(unsplashAccessKey: string) {
    this.unsplashAccessKey = unsplashAccessKey;
  }

  async fetchUniqueImages(
    query: string,
    count: number = 6,
    orientation: 'landscape' | 'portrait' | 'squarish' = 'landscape'
  ): Promise<UnsplashImage[]> {
    const cacheKey = `${query}-${orientation}`;
    
    try {
      // Check cache first
      if (this.cache.has(cacheKey)) {
        const cached = this.cache.get(cacheKey)!;
        const available = cached.filter(img => !this.usedImages.has(img.id));
        if (available.length >= count) {
          const selected = available.slice(0, count);
          selected.forEach(img => this.usedImages.add(img.id));
          return selected;
        }
      }

      // Fetch new images
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count * 2}&orientation=${orientation}&order_by=relevant`,
        {
          headers: {
            'Authorization': `Client-ID ${this.unsplashAccessKey}`,
          },
        }
      );

      const data = await response.json();
      const images: UnsplashImage[] = data.results || [];
      
      // Filter out already used images
      const uniqueImages = images.filter(img => !this.usedImages.has(img.id));
      const selected = uniqueImages.slice(0, count);
      
      // Mark as used
      selected.forEach(img => this.usedImages.add(img.id));
      
      // Update cache
      this.cache.set(cacheKey, images);
      
      return selected;
    } catch (error) {
      console.error('Error fetching Unsplash images:', error);
      return this.getFallbackImages(count);
    }
  }

  optimizeImageForDisplay(
    image: UnsplashImage,
    maxWidth: number = 1200,
    maxHeight: number = 800
  ): OptimizedImage {
    const { urls, alt_description, description, width, height } = image;
    
    // Calculate responsive sizes
    const aspectRatio = width / height;
    let displayWidth = Math.min(maxWidth, width);
    let displayHeight = Math.min(maxHeight, height);
    
    if (displayWidth / displayHeight !== aspectRatio) {
      if (displayWidth / aspectRatio <= maxHeight) {
        displayHeight = displayWidth / aspectRatio;
      } else {
        displayWidth = displayHeight * aspectRatio;
      }
    }

    // Generate srcSet for responsive images
    const srcSet = [
      `${urls.small} 400w`,
      `${urls.regular} 800w`,
      `${urls.full} 1200w`,
    ].join(', ');

    // Generate sizes attribute
    const sizes = [
      '(max-width: 640px) 100vw',
      '(max-width: 1024px) 50vw',
      '33vw',
    ].join(', ');

    return {
      src: urls.regular,
      srcSet,
      sizes,
      alt: alt_description || description || 'Food image',
      width: Math.round(displayWidth),
      height: Math.round(displayHeight),
      blurDataUrl: this.generateBlurDataUrl(urls.thumb),
    };
  }

  async convertToWebP(imageUrl: string): Promise<string> {
    try {
      // For Unsplash images, we can add format parameter
      if (imageUrl.includes('unsplash.com')) {
        const url = new URL(imageUrl);
        url.searchParams.set('fm', 'webp');
        url.searchParams.set('q', '80');
        return url.toString();
      }
      
      // For other images, would need a conversion service or backend
      return imageUrl;
    } catch (error) {
      console.error('Error converting to WebP:', error);
      return imageUrl;
    }
  }

  private generateBlurDataUrl(thumbUrl: string): string {
    // Simple base64 blur placeholder
    // In a real app, you'd generate this from the actual thumbnail
    return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';
  }

  private getFallbackImages(count: number): UnsplashImage[] {
    // Return placeholder images if API fails
    return Array.from({ length: count }, (_, i) => ({
      id: `fallback-${i}`,
      urls: {
        raw: `/placeholder-${i % 3 + 1}.jpg`,
        full: `/placeholder-${i % 3 + 1}.jpg`,
        regular: `/placeholder-${i % 3 + 1}.jpg`,
        small: `/placeholder-${i % 3 + 1}.jpg`,
        thumb: `/placeholder-${i % 3 + 1}.jpg`,
      },
      alt_description: 'Food placeholder image',
      user: {
        name: 'Placeholder',
        username: 'placeholder',
      },
      width: 800,
      height: 600,
    }));
  }

  clearUsedImages(): void {
    this.usedImages.clear();
  }

  getUsedImageCount(): number {
    return this.usedImages.size;
  }
}

// Utility functions for image optimization
export const createImageLoader = (src: string, quality: number = 75) => {
  return `${src}?w=${quality}&q=${quality}`;
};

export const generateSrcSet = (src: string, widths: number[] = [400, 800, 1200]) => {
  return widths
    .map(width => `${src}?w=${width} ${width}w`)
    .join(', ');
};

export const calculateAspectRatio = (width: number, height: number) => {
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const divisor = gcd(width, height);
  return `${width / divisor}/${height / divisor}`;
};