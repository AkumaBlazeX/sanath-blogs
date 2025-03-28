
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const FooterSubscribeForm: React.FC = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(false);

  useEffect(() => {
    // Check local storage for subscription
    const subscribedEmail = localStorage.getItem('subscribedEmail');
    if (subscribedEmail) {
      setHasSubscribed(true);
    }
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Store the subscription in Supabase
      const { error } = await supabase
        .from('subscriptions')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to our newsletter.",
          });
          // Still consider this a success since the email is subscribed
          setHasSubscribed(true);
          localStorage.setItem('subscribedEmail', email);
        } else {
          throw error;
        }
      } else {
        localStorage.setItem('subscribedEmail', email);
        setHasSubscribed(true);
        toast({
          title: "Successfully subscribed!",
          description: "Thank you for subscribing to our newsletter.",
        });
        setEmail('');
      }
    } catch (error: any) {
      toast({
        title: "Error subscribing",
        description: `Error: ${error?.message || 'Unknown error. Please try again later.'}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (hasSubscribed) {
    return (
      <div className="text-primary">
        You're subscribed to our newsletter!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubscribe} className="flex gap-2 flex-col sm:flex-row">
      <div className="flex-1">
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="glass-card bg-transparent"
        />
      </div>
      <Button 
        type="submit" 
        size="sm" 
        disabled={isSubmitting}
        className="glass-button"
      >
        {isSubmitting ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Subscribing...
          </span>
        ) : (
          "Subscribe"
        )}
      </Button>
    </form>
  );
};

export default FooterSubscribeForm;
