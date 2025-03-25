
import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 py-12 border-t border-border/30">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link to="/" className="text-xl font-semibold">
              ModernBlog
            </Link>
            <p className="text-muted-foreground">
              This blog tells you about Data and AI automation, featuring insights on machine learning, data science, and automated workflows.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:sanathkumar.data@gmail.com" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  sanathkumar.data@gmail.com
                </a>
              </li>
              <li>
                <div className="flex space-x-4">
                  <a 
                    href="https://linkedin.com/in/yourusername" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5 mr-2" />
                    <span>LinkedIn</span>
                  </a>
                  <a 
                    href="https://github.com/yourusername" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5 mr-2" />
                    <span>GitHub</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} ModernBlog. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 space-x-6">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
