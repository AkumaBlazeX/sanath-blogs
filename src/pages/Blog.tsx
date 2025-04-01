import React, { useState } from 'react';
import BlogCard from '../components/BlogCard';
import PageTransition from '../components/PageTransition';
import blogPosts from '../data/blogPosts.json';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import SEO from '../components/SEO';

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  
  // Extract all unique tags from blog posts, excluding content headers
  const allTags = Array.from(
    new Set(
      blogPosts.flatMap(post => post.tags || [])
    )
  ).filter(tag => tag); // Remove any undefined or empty tags
  
  // Filter posts based on search term and selected tag
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.tags?.some(tag => 
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    
    const matchesTag = selectedTag === null || 
      (post.tags && post.tags.includes(selectedTag));
    
    return matchesSearch && matchesTag;
  });

  // Calculate pagination values
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  
  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page links
  const renderPageLinks = () => {
    const pageLinks = [];
    
    // First page
    pageLinks.push(
      <PaginationItem key="first">
        <PaginationLink 
          isActive={currentPage === 1}
          onClick={() => handlePageChange(1)}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Ellipsis if needed
    if (currentPage > 3) {
      pageLinks.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Pages before current
    if (currentPage > 2) {
      pageLinks.push(
        <PaginationItem key={currentPage - 1}>
          <PaginationLink onClick={() => handlePageChange(currentPage - 1)}>
            {currentPage - 1}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Current page (if not 1)
    if (currentPage !== 1 && currentPage !== totalPages) {
      pageLinks.push(
        <PaginationItem key={currentPage}>
          <PaginationLink isActive onClick={() => handlePageChange(currentPage)}>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Pages after current
    if (currentPage < totalPages - 1) {
      pageLinks.push(
        <PaginationItem key={currentPage + 1}>
          <PaginationLink onClick={() => handlePageChange(currentPage + 1)}>
            {currentPage + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Ellipsis if needed
    if (currentPage < totalPages - 2) {
      pageLinks.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Last page (if not already shown)
    if (totalPages > 1) {
      pageLinks.push(
        <PaginationItem key="last">
          <PaginationLink 
            isActive={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return pageLinks;
  };

  return (
    <PageTransition>
      <SEO
        title="Blog - Data Science & AI Automation Insights | Sanath's Blog"
        description="Explore expert articles on Data Science, AI automation, machine learning, and more. Find practical guides and tutorials for modern development workflows."
      />
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
                placeholder="Search articles by title, content, or tags..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to page 1 on search
                }}
                className="w-full px-4 py-3 pl-10 rounded-full border border-border bg-background/50 backdrop-blur focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-200"
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
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setCurrentPage(1);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </section>
        
        {/* Blog Posts Grid */}
        <section className="py-8">
          {currentPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPosts.map((post, index) => (
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
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12">
                  <Pagination>
                    <PaginationContent>
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                        </PaginationItem>
                      )}
                      
                      {renderPageLinks()}
                      
                      {currentPage < totalPages && (
                        <PaginationItem>
                          <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
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
