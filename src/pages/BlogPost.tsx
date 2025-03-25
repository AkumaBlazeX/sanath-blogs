
import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import LazyImage from '../components/LazyImage';
import blogPosts from '../data/blogPosts.json';

interface RouteParams {
  slug: string;
  [key: string]: string | undefined;
}

const BlogPost: React.FC = () => {
  const { slug } = useParams<RouteParams>();
  const [post, setPost] = useState<typeof blogPosts[0] | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Find the post that matches the slug
    const foundPost = blogPosts.find(p => p.slug === slug);
    
    // Simulate loading delay for smooth transitions
    const timer = setTimeout(() => {
      setPost(foundPost || null);
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [slug]);
  
  // If post not found after loading, redirect to 404
  if (!loading && !post) {
    return <Navigate to="/404" />;
  }
  
  // Previous and next posts for navigation
  const currentIndex = post ? blogPosts.findIndex(p => p.slug === post.slug) : -1;
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <PageTransition>
      <div className="container-custom">
        {loading ? (
          // Loading state
          <div className="py-32 flex justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin"></div>
          </div>
        ) : post ? (
          // Post content
          <article className="max-w-3xl mx-auto py-16">
            {/* Back to blog link */}
            <Link 
              to="/blog" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all posts
            </Link>
            
            {/* Post header */}
            <header className="mb-10">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags && post.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
              
              <div className="flex items-center text-muted-foreground">
                <span>{post.date}</span>
              </div>
            </header>
            
            {/* Featured image */}
            <div className="mb-12 rounded-xl overflow-hidden">
              <LazyImage 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-auto aspect-video object-cover" 
              />
            </div>
            
            {/* Post content */}
            <div 
              className="blog-content prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Post navigation */}
            <div className="mt-16 pt-8 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-6">
              {prevPost && (
                <Link 
                  to={`/blog/${prevPost.slug}`}
                  className="group flex flex-col"
                >
                  <span className="text-sm text-muted-foreground mb-2">Previous Post</span>
                  <span className="font-medium group-hover:text-primary transition-colors">
                    {prevPost.title}
                  </span>
                </Link>
              )}
              
              {nextPost && (
                <Link 
                  to={`/blog/${nextPost.slug}`}
                  className="group flex flex-col md:items-end"
                >
                  <span className="text-sm text-muted-foreground mb-2">Next Post</span>
                  <span className="font-medium group-hover:text-primary transition-colors">
                    {nextPost.title}
                  </span>
                </Link>
              )}
            </div>
          </article>
        ) : null}
      </div>
    </PageTransition>
  );
};

export default BlogPost;
