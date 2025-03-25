
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4 bg-background/80 backdrop-blur-lg shadow-subtle' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-semibold tracking-tight transition-opacity hover:opacity-80"
        >
          ModernBlog
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/blog" className={`nav-item ${isActive('/blog') || location.pathname.startsWith('/blog/') ? 'active' : ''}`}>
            Blog
          </Link>
        </nav>

        <div className="flex items-center">
          <a
            href="https://yourportfolio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium transition-all hover:bg-primary/90 active:scale-95"
          >
            Portfolio
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
