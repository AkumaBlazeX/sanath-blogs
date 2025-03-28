
import React from 'react';
import PageTransition from '../components/PageTransition';

const TermsOfService = () => {
  return (
    <PageTransition>
      <div className="container-custom py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms of Service</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>
              These terms and conditions govern your use of SanathBlog, accessible at 
              our website. By accessing or using our website, you agree to be bound by 
              these terms and conditions. If you disagree with any part of these terms, 
              you may not access the website.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Intellectual Property Rights</h2>
            <p>
              Other than the content you own, under these terms, SanathBlog and/or its 
              licensors own all the intellectual property rights and materials contained in this website.
              You are granted a limited license only for purposes of viewing the material contained on this website.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Content Usage and Redistribution</h2>
            <p>
              All blog content published on SanathBlog, including articles, posts, images,
              and other multimedia content, may be used for general content marketing, educational,
              and informational purposes under the following conditions:
            </p>
            <ul className="list-disc pl-5 space-y-2 my-4">
              <li>Attribution: You must provide appropriate credit to SanathBlog as the source of the content.</li>
              <li>Non-commercial: You may not use the content for commercial purposes without explicit permission.</li>
              <li>No derivative works: If you remix, transform, or build upon the material, you may not distribute the modified material without permission.</li>
            </ul>
            <p>
              By agreeing to these terms, you acknowledge that content from this blog may be shared, quoted, 
              and referenced by third parties in accordance with these conditions.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Restrictions</h2>
            <p>
              You are specifically restricted from all of the following:
            </p>
            <ul className="list-disc pl-5 space-y-2 my-4">
              <li>Publishing any website material in any other media without attribution;</li>
              <li>Selling, sublicensing and/or otherwise commercializing any website material;</li>
              <li>Publicly performing and/or showing any website material without attribution;</li>
              <li>Using this website in any way that is or may be damaging to this website;</li>
              <li>Using this website in any way that impacts user access to this website;</li>
              <li>Using this website contrary to applicable laws and regulations, or in any way may cause harm to the website, or to any person or business entity;</li>
              <li>Engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this website;</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Subscription Service</h2>
            <p>
              By subscribing to our newsletter, you agree to receive periodic emails containing blog 
              updates, news, and relevant information. You can unsubscribe at any time by following 
              the instructions contained in each email.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Your Privacy</h2>
            <p>
              Please read our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. No Warranties</h2>
            <p>
              This website is provided "as is," with all faults, and SanathBlog expresses no representations 
              or warranties, of any kind related to this website or the materials contained on this website.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Limitation of Liability</h2>
            <p>
              In no event shall SanathBlog, nor any of its officers, directors and employees, be held liable for 
              anything arising out of or in any way connected with your use of this website.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">9. Governing Law & Jurisdiction</h2>
            <p>
              These terms will be governed by and interpreted in accordance with the laws of the country/state 
              of the website operator, and you submit to the non-exclusive jurisdiction of the courts located 
              in said country/state for the resolution of any disputes.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">10. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
              <br />
              <a href="mailto:sanathkumar.data@gmail.com" className="text-primary hover:underline">
                sanathkumar.data@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default TermsOfService;
