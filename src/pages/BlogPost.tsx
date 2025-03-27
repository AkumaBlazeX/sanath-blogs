
import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import LazyImage from '../components/LazyImage';
import blogPosts from '../data/blogPosts.json';
import BlogCard from '../components/BlogCard';
import { Clock, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface RouteParams {
  slug: string;
  [key: string]: string | undefined;
}

const BlogPost: React.FC = () => {
  const { slug } = useParams<RouteParams>();
  const [post, setPost] = useState<typeof blogPosts[0] | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<typeof blogPosts>([]);
  const [markdownContent, setMarkdownContent] = useState<string | null>(null);
  
  useEffect(() => {
    // Find the post that matches the slug
    const foundPost = blogPosts.find(p => p.slug === slug);
    
    if (foundPost) {
      // Find related posts that share at least one tag
      const related = blogPosts
        .filter(p => 
          p.id !== foundPost.id && 
          p.tags && 
          foundPost.tags && 
          p.tags.some(tag => foundPost.tags.includes(tag))
        )
        .slice(0, 3); // Limit to 3 related posts
      
      setRelatedPosts(related);
      
      // Load markdown content
      fetch(`/src/data/markdown/${slug}.md`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Markdown file not found');
          }
          return response.text();
        })
        .then(markdown => {
          setMarkdownContent(markdown);
        })
        .catch(error => {
          console.error('Error loading markdown:', error);
          // Fallback to HTML content if markdown doesn't exist
          setMarkdownContent(null);
        })
        .finally(() => {
          setPost(foundPost);
          setLoading(false);
        });
    } else {
      setPost(null);
      setLoading(false);
    }
  }, [slug]);
  
  // Calculate estimated reading time
  const getReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };
  
  // Share functionality
  const handleShare = () => {
    if (navigator.share && post) {
      navigator.share({
        title: post.title,
        text: post.summary,
        url: window.location.href,
      })
      .catch(() => {
        // Fallback if share API fails or is cancelled
        copyToClipboard();
      });
    } else {
      copyToClipboard();
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };
  
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
          <>
            {/* Article content */}
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
                    <Link 
                      key={tag} 
                      to={`/blog?tag=${tag}`}
                      className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
                
                <div className="flex flex-wrap items-center justify-between text-muted-foreground mb-2">
                  <span>{post.date}</span>
                  
                  <div className="flex items-center gap-4 mt-2 sm:mt-0">
                    {/* Reading time */}
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">
                        {markdownContent 
                          ? getReadingTime(markdownContent) 
                          : getReadingTime(post.content)} min read
                      </span>
                    </div>
                    
                    {/* Share button */}
                    <button 
                      onClick={handleShare}
                      className="flex items-center text-sm hover:text-primary transition-colors"
                      aria-label="Share this post"
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      <span>Share</span>
                    </button>
                  </div>
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
              <div className="blog-content prose prose-lg max-w-none">
                {markdownContent ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {markdownContent}
                  </ReactMarkdown>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                )}
              </div>
              
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
            
            {/* Related posts section */}
            {relatedPosts.length > 0 && (
              <section className="max-w-6xl mx-auto mb-16 py-12 border-t border-border">
                <h2 className="text-2xl font-bold mb-8 text-center">Related Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map(relatedPost => (
                    <BlogCard
                      key={relatedPost.id}
                      id={relatedPost.id}
                      title={relatedPost.title}
                      summary={relatedPost.summary}
                      date={relatedPost.date}
                      imageUrl={relatedPost.imageUrl}
                      slug={relatedPost.slug}
                      tags={relatedPost.tags}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        ) : null}
      </div>
    </PageTransition>
  );
};

export default BlogPost;
