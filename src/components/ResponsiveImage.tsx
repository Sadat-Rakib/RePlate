import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLazyImage } from '@/hooks/useMedia';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  aspectRatio?: string;
  sizes?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const ResponsiveImage = ({
  src,
  alt,
  width,
  height,
  className,
  aspectRatio = '16/9',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  onError,
}: ResponsiveImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [setImageRef, imageSrc] = useLazyImage(src);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority && imgRef.current) {
      setImageRef(imgRef.current);
    }
  }, [priority, setImageRef]);

  const handleLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setImageError(true);
    onError?.();
  };

  const generateSrcSet = (baseSrc: string) => {
    if (baseSrc.includes('unsplash.com')) {
      return [
        `${baseSrc}&w=400 400w`,
        `${baseSrc}&w=800 800w`,
        `${baseSrc}&w=1200 1200w`,
        `${baseSrc}&w=1600 1600w`,
      ].join(', ');
    }
    return undefined;
  };

  const containerStyle: React.CSSProperties = {
    aspectRatio,
    width: width ? `${width}px` : undefined,
    height: height ? `${height}px` : undefined,
  };

  return (
    <div 
      className={cn(
        'relative overflow-hidden bg-muted',
        !width && !height && 'w-full',
        className
      )}
      style={containerStyle}
    >
      {/* Placeholder */}
      {placeholder === 'blur' && !imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center">
          {blurDataURL ? (
            <img 
              src={blurDataURL} 
              alt="" 
              className="w-full h-full object-cover filter blur-sm scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 animate-pulse" />
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        </div>
      )}

      {/* Main Image */}
      {!imageError && (
        <motion.img
          ref={(el) => {
            imgRef.current = el;
            if (!priority) setImageRef(el);
          }}
          src={priority ? src : imageSrc}
          srcSet={generateSrcSet(priority ? src : imageSrc || '')}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-300',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={handleLoad}
          onError={handleError}
          initial={priority ? { opacity: 0 } : undefined}
          animate={priority ? { opacity: imageLoaded ? 1 : 0 } : undefined}
          transition={priority ? { duration: 0.3 } : undefined}
        />
      )}

      {/* Error State */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="text-center text-muted-foreground">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-muted-foreground/20 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-xs">Image failed to load</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Gallery component for multiple responsive images
interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  aspectRatio?: string;
  className?: string;
}

export const ImageGallery = ({
  images,
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  aspectRatio = '1/1',
  className,
}: ImageGalleryProps) => {
  const gridColumns = [
    columns.sm && `grid-cols-${columns.sm}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`,
    columns.xl && `xl:grid-cols-${columns.xl}`,
  ].filter(Boolean).join(' ');

  return (
    <div className={cn('grid gap-4', gridColumns, className)}>
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="group"
        >
          <ResponsiveImage
            src={image.src}
            alt={image.alt}
            aspectRatio={aspectRatio}
            className="rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300"
          />
          {image.caption && (
            <p className="mt-2 text-sm text-muted-foreground text-center">
              {image.caption}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
};