
import React from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-slate-100 dark:from-background dark:to-slate-900">
        <div className="text-center max-w-3xl px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">Welcome to SanathBlog</h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
            Your resource for Data Science & AI Insights, featuring thoughts on machine learning, 
            data science, and automated workflows.
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in" style={{ animationDelay: '300ms' }}>
            <Link
              to="/home"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90 active:scale-95"
            >
              View Home Page
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-medium transition-all hover:bg-secondary/70 active:scale-95"
            >
              Explore Articles
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Index;
