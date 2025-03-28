
import React from 'react';
import { Link } from 'react-router-dom';

const FooterNav: React.FC = () => {
  return (
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
        <li>
          <Link to="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link to="/terms-of-service" className="text-muted-foreground hover:text-foreground transition-colors">
            Terms of Service
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default FooterNav;
