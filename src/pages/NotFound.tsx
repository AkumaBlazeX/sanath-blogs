
import React from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const NotFound: React.FC = () => {
  return (
    <PageTransition>
      <div className="container-custom py-32 flex flex-col items-center justify-center text-center">
        <span className="inline-block px-3 py-1 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
          404 Error
        </span>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Page Not Found</h1>
        
        <p className="text-xl text-muted-foreground mb-10 max-w-lg">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex gap-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90 active:scale-95"
          >
            Back to Home
          </Link>
          
          <Link
            to="/blog"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-medium transition-all hover:bg-secondary/70 active:scale-95"
          >
            Browse Blog
          </Link>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFound;
