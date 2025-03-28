
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import emailjs from 'emailjs-com';
import { supabase } from '@/integrations/supabase/client';

const FooterSubscribeForm: React.FC = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(false);

  useEffect(() => {
    // Check local storage for subscription
    const subscribedEmail = localStorage.getItem('subscribedEmail');
    if (subscribedEmail) {
      setHasSubscribed(true);
      return;
    }

    // Initialize EmailJS
    try {
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      
      if (publicKey) {
        emailjs.init(publicKey);
        // Check if service and template IDs are available
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        
        if (serviceId && templateId) {
          setIsConfigured(true);
        } else {
          console.error('EmailJS service or template ID is missing');
        }
      } else {
        console.error('EmailJS public key is missing');
      }
    } catch (error) {
      console.error('Error initializing EmailJS:', error);
    }
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
    
    try {
      // First try to add to the Supabase database
      const { error } = await supabase
        .from('subscriptions')
        .insert([{ email: email }]);
      
      if (error && error.code !== '23505') { // 23505 is the error code for unique violation (already subscribed)
        console.error('Supabase error:', error);
        throw new Error(error.message || 'Failed to save subscription');
      }

      // Send email notification via EmailJS
      if (serviceId && templateId) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            email: email,
            subject: 'New Blog Subscription',
            message: `New subscription request from ${email}`
          }
        );
      }
      
      // Save to local storage
      localStorage.setItem('subscribedEmail', email);
      setHasSubscribed(true);
      
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      
      setEmail('');
    } catch (error: any) {
      toast({
        title: "Error subscribing",
        description: `Error: ${error?.text || error?.message || 'Unknown error. Please try again later.'}`,
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
        disabled={isSubmitting || !isConfigured}
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
