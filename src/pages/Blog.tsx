
import React, { useState } from 'react';
import BlogCard from '../components/BlogCard';
import PageTransition from '../components/PageTransition';
import blogPosts from '../data/blogPosts.json';

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Extract all unique tags from blog posts
  const allTags = Array.from(
    new Set(
      blogPosts.flatMap(post => post.tags || [])
    )
  );
  
  // Filter posts based on search term and selected tag
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.summary.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = selectedTag === null || 
      (post.tags && post.tags.includes(selectedTag));
    
    return matchesSearch && matchesTag;
  });

  return (
    <PageTransition>
      <div className="container-custom">
        {/* Header Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Blog Posts</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Explore our collection of articles on web development, automation, and more.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto mb-10">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 rounded-full border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedTag === null
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'
                } transition-colors`}
              >
                All
              </button>
              
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedTag === tag
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'
                  } transition-colors`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Blog Posts Grid */}
        <section className="py-8">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <div key={post.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <BlogCard
                    id={post.id}
                    title={post.title}
                    summary={post.summary}
                    date={post.date}
                    imageUrl={post.imageUrl}
                    slug={post.slug}
                    tags={post.tags}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <h3 className="text-xl font-medium mb-2">No posts found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </section>
      </div>
    </PageTransition>
  );
};

export default Blog;
