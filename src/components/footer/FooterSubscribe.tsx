
import React from 'react';
import FooterSubscribeForm from './FooterSubscribeForm';

const FooterSubscribe: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wider">Subscribe</h3>
      <p className="text-muted-foreground">
        Stay up to date with our latest articles and updates
      </p>
      <FooterSubscribeForm />
    </div>
  );
};

export default FooterSubscribe;
