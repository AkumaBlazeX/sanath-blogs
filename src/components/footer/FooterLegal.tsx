
import React from 'react';
import { Link } from 'react-router-dom';

interface FooterLegalProps {
  currentYear: number;
}

const FooterLegal: React.FC<FooterLegalProps> = ({ currentYear }) => {
  return (
    <div className="text-right flex flex-col space-y-4 md:items-end">
      <p className="text-muted-foreground text-sm">
        &copy; {currentYear} SanathBlog. All rights reserved.
      </p>
      <div className="space-x-6">
        <Link 
          to="/privacy-policy" 
          className="text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          Privacy Policy
        </Link>
        <Link 
          to="/terms-of-service" 
          className="text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          Terms of Service
        </Link>
      </div>
    </div>
  );
};

export default FooterLegal;
