
import React from 'react';
import { Separator } from "@/components/ui/separator";
import FooterBrand from './footer/FooterBrand';
import FooterNav from './footer/FooterNav';
import FooterSubscribe from './footer/FooterSubscribe';
import FooterContact from './footer/FooterContact';
import FooterLegal from './footer/FooterLegal';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 py-12 border-t border-border/30">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FooterBrand />
          <FooterNav />
          <FooterSubscribe />
        </div>

        <div className="mt-12 pt-8 border-t border-border/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FooterContact />
            <FooterLegal currentYear={currentYear} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
