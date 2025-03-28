
import { useState, useEffect } from 'react';
import { useEmailJS } from '@/hooks/use-email-js';
import SubscriptionForm from './subscribe/SubscriptionForm';
import SubscriptionSuccess from './subscribe/SubscriptionSuccess';

const Subscribe = () => {
  const { isConfigured } = useEmailJS(); // We're ignoring the error now
  const [hasSubscribed, setHasSubscribed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Check local storage for subscription
    const subscribedEmail = localStorage.getItem('subscribedEmail');
    if (subscribedEmail) {
      setHasSubscribed(true);
    }
  }, []);

  const handleSubscriptionSuccess = (email: string) => {
    setIsSubmitted(true);
    setHasSubscribed(true);
    
    // Save to local storage
    localStorage.setItem('subscribedEmail', email);

    setTimeout(() => setIsSubmitted(false), 5000);
  };

  if (hasSubscribed) {
    return <SubscriptionSuccess />;
  }

  return (
    <div className="w-full py-12 md:py-16 glass">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Stay updated with the latest articles and insights on Data Science, AI automation, and machine learning.
          </p>
          
          {isSubmitted ? (
            <div className="flex items-center justify-center space-x-2 text-primary mb-8">
              <span>Thank you for subscribing!</span>
            </div>
          ) : (
            <SubscriptionForm 
              isConfigured={isConfigured} 
              onSubscriptionSuccess={handleSubscriptionSuccess} 
            />
          )}
          
          <p className="text-xs text-muted-foreground mt-4">
            By subscribing, you agree to our <a href="/privacy-policy" className="underline hover:text-primary">Privacy Policy</a> and <a href="/terms-of-service" className="underline hover:text-primary">Terms of Service</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
