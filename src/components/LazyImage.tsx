
import React, { useState, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className = '' }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
    img.onerror = () => setError(true);
  }, [src]);

  return (
    <div className="relative overflow-hidden">
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
          <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin"></div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 text-muted-foreground">
          Failed to load image
        </div>
      )}
      
      <img
        src={src}
        alt={alt}
        className={`${className} ${loaded ? 'image-fade-in' : 'image-loading'} ${error ? 'opacity-0' : ''}`}
      />
    </div>
  );
};

export default LazyImage;
