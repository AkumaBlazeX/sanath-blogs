import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}

const SEO: React.FC<SEOProps> = ({
  title = "Sanath's Blog - Data Science & AI Automation Insights",
  description = "Expert insights on Data Science, AI automation, and machine learning by Sanath. Discover practical guides and tutorials on automation workflows.",
  image = "https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images//WhatsApp%20Image%202025-03-29%20at%209.14.21%20AM.jpeg",
  article = false,
  publishedTime,
  modifiedTime,
  tags
}) => {
  const location = useLocation();
  const url = `https://www.sanathblogs.site${location.pathname}`;

  useEffect(() => {
    // Update meta tags
    document.title = title;
    
    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('author', 'Sanath Kumar P V');
    
    // Open Graph tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', image);
    updateMetaTag('og:url', url);
    updateMetaTag('og:type', article ? 'article' : 'website');
    
    // Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:url', url);
    
    // Article specific tags
    if (article) {
      if (publishedTime) {
        updateMetaTag('article:published_time', publishedTime);
      }
      if (modifiedTime) {
        updateMetaTag('article:modified_time', modifiedTime);
      }
      if (tags && tags.length > 0) {
        // Remove existing article tags
        removeMetaTags('article:tag');
        // Add new article tags
        tags.forEach(tag => {
          createMetaTag('article:tag', tag);
        });
      }
    }

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

  }, [title, description, image, url, article, publishedTime, modifiedTime, tags]);

  return null;
};

// Helper functions
const updateMetaTag = (name: string, content: string) => {
  let meta = document.querySelector(`meta[property="${name}"], meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    if (name.startsWith('og:') || name.startsWith('article:')) {
      meta.setAttribute('property', name);
    } else {
      meta.setAttribute('name', name);
    }
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
};

const removeMetaTags = (name: string) => {
  const metas = document.querySelectorAll(`meta[property="${name}"]`);
  metas.forEach(meta => meta.remove());
};

const createMetaTag = (name: string, content: string) => {
  const meta = document.createElement('meta');
  meta.setAttribute('property', name);
  meta.setAttribute('content', content);
  document.head.appendChild(meta);
};

export default SEO; 