
interface ImageSize {
  width: number;
  height: number;
}

interface ImageOptions {
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
  sizes?: ImageSize[];
}

export const getOptimizedImageUrl = (
  originalUrl: string,
  options: ImageOptions = {}
): string => {
  const { quality = 80, format = 'webp', sizes } = options;
  
  // If using a CDN like Cloudinary, you can construct the URL with optimization parameters
  // This is a placeholder implementation - replace with your actual image optimization service
  const baseUrl = originalUrl.startsWith('http') 
    ? originalUrl 
    : `https://www.sanathblogs.site${originalUrl}`;

  // Example Cloudinary-style URL parameters
  const params = [
    `q_${quality}`,
    `f_${format}`,
  ];

  if (sizes) {
    params.push(`w_${sizes[0].width}`);
    params.push(`h_${sizes[0].height}`);
  }

  return `${baseUrl}?${params.join(',')}`;
};

export const generateSrcSet = (
  originalUrl: string,
  sizes: ImageSize[],
  options: Omit<ImageOptions, 'sizes'> = {}
): string => {
  return sizes
    .map(size => {
      const url = getOptimizedImageUrl(originalUrl, { ...options, sizes: [size] });
      return `${url} ${size.width}w`;
    })
    .join(', ');
};

export const generateImageSizes = (
  breakpoints: { [key: string]: number }
): string => {
  return Object.entries(breakpoints)
    .map(([breakpoint, size]) => `(min-width: ${breakpoint}px) ${size}px`)
    .join(', ');
};

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  sizes,
  loading = 'lazy'
}) => {
  const defaultSizes = [
    { width: 320, height: 240 },
    { width: 640, height: 480 },
    { width: 1024, height: 768 },
    { width: 1920, height: 1440 }
  ];

  const srcSet = generateSrcSet(src, defaultSizes);
  const defaultSizesAttr = sizes || '100vw';

  return (
    <img
      src={getOptimizedImageUrl(src)}
      srcSet={srcSet}
      sizes={defaultSizesAttr}
      alt={alt}
      className={className}
      loading={loading}
    />
  );
};

export const preloadImage = (src: string): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = getOptimizedImageUrl(src);
  document.head.appendChild(link);
}; 
