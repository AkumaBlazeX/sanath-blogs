import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  id: number;
  title: string;
  summary: string;
  date: string;
  imageUrl: string;
  slug: string;
  tags?: string[];
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ 
  id, 
  title, 
  summary, 
  date, 
  imageUrl, 
  slug,
  tags,
  featured = false 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link 
      to={`/blog/${slug}`} 
      className={`group block overflow-hidden rounded-xl border border-border/40 bg-card shadow-subtle transition-all duration-300 hover:shadow-hover ${
        featured ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      <div className="aspect-video relative overflow-hidden">
        <div 
          className={`absolute inset-0 bg-muted/20 ${imageLoaded ? 'hidden' : 'flex items-center justify-center'}`}
        >
          <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin"></div>
        </div>
        <img
          src={imageUrl}
          alt={title}
          className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? 'image-fade-in' : 'image-loading'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      
      <div className="p-6">
        {tags && tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {tags.slice(0, featured ? 3 : 2).map((tag) => (
              <span 
                key={tag} 
                className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
            {tags.length > (featured ? 3 : 2) && (
              <span className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-secondary/10 text-secondary">
                +{tags.length - (featured ? 3 : 2)}
              </span>
            )}
          </div>
        )}
        
        <h3 className={`${featured ? 'text-2xl' : 'text-lg'} font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors`}>
          {title}
        </h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">{summary}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{date}</span>
          <span className="text-sm font-medium text-primary opacity-0 translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
            Read more →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
