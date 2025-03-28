
import React from 'react';
import { Link } from 'react-router-dom';

const FooterBrand: React.FC = () => {
  return (
    <div className="space-y-4">
      <Link to="/" className="text-xl font-semibold">
        SanathBlog
      </Link>
      <p className="text-muted-foreground">
        This blog tells you about Data and AI automation, featuring insights on machine learning, data science, and automated workflows.
      </p>
    </div>
  );
};

export default FooterBrand;
