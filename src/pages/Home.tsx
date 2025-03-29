
import React from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import PageTransition from '../components/PageTransition';
import blogPosts from '../data/blogPosts.json';

const Home: React.FC = () => {
  const featuredPost = blogPosts[0];
  const recentPosts = blogPosts.slice(1, 4);

  return (
    <PageTransition>
      <div className="container-custom">
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-3 py-1 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary animate-fade-in">
              Data Science & AI Insights
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
              Thoughts, stories and ideas
            </h1>
            <p className="text-xl text-muted-foreground mb-10 animate-fade-in" style={{ animationDelay: '200ms' }}>
              This blog tells you about Data and AI automation, featuring insights on machine learning, data science, and automated workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '300ms' }}>
              <Link
                to="/blog"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90 active:scale-95"
              >
                Explore Articles
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Post Section */}
        <section className="py-12">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Post</h2>
            <Link to="/blog" className="text-primary hover:text-primary/80 transition-colors">
              View all posts →
            </Link>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <BlogCard
              id={featuredPost.id}
              title={featuredPost.title}
              summary={featuredPost.summary}
              date={featuredPost.date}
              imageUrl={featuredPost.imageUrl}
              slug={featuredPost.slug}
              tags={featuredPost.tags}
              featured={true}
            />
          </div>
        </section>

        {/* Recent Posts Section */}
        <section className="py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Recent Posts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts.map((post, index) => (
              <div key={post.id} className="animate-fade-in" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
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
          
          <div className="mt-12 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-border bg-card hover:bg-muted transition-colors"
            >
              View all posts
            </Link>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Home;
