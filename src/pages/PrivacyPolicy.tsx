
import React from 'react';
import PageTransition from '../components/PageTransition';

const PrivacyPolicy = () => {
  return (
    <PageTransition>
      <div className="container-custom py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>
              Welcome to SanathBlog. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you about how we look after your personal data when you visit our 
              website and tell you about your privacy rights and how the law protects you.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. The Data We Collect</h2>
            <p>
              We may collect, use, store and transfer different kinds of personal data about you which we have 
              grouped together as follows:
            </p>
            <ul className="list-disc pl-5 space-y-2 my-4">
              <li><strong>Identity Data</strong> includes your name, username or similar identifier.</li>
              <li><strong>Contact Data</strong> includes your email address.</li>
              <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, 
              time zone setting and location, browser plug-in types and versions, operating system and platform, 
              and other technology on the devices you use to access this website.</li>
              <li><strong>Usage Data</strong> includes information about how you use our website.</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. How We Use Your Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your 
              personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-2 my-4">
              <li>To provide you with the newsletter you have subscribed to.</li>
              <li>To administer and protect our website (including troubleshooting, data analysis, testing, 
              system maintenance, support, reporting and hosting of data).</li>
              <li>To use data analytics to improve our website, products/services, marketing, customer 
              relationships and experiences.</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Data Sharing and Third Parties</h2>
            <p>
              We may share your personal data with third parties set out below for the purposes described in this privacy policy:
            </p>
            <ul className="list-disc pl-5 space-y-2 my-4">
              <li>Service providers who provide IT and system administration services.</li>
              <li>Analytics providers who help us to understand how you use our website.</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being 
              accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, 
              we limit access to your personal data to those employees, agents, contractors and other third 
              parties who have a business need to know.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Your Legal Rights</h2>
            <p>
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including:
            </p>
            <ul className="list-disc pl-5 space-y-2 my-4">
              <li>The right to request access to your personal data.</li>
              <li>The right to request correction of your personal data.</li>
              <li>The right to request erasure of your personal data.</li>
              <li>The right to object to processing of your personal data.</li>
              <li>The right to request restriction of processing your personal data.</li>
              <li>The right to request transfer of your personal data.</li>
              <li>The right to withdraw consent.</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Cookies</h2>
            <p>
              You can set your browser to refuse all or some browser cookies, or to alert you when websites 
              set or access cookies. If you disable or refuse cookies, please note that some parts of this 
              website may become inaccessible or not function properly.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
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

export default PrivacyPolicy;
