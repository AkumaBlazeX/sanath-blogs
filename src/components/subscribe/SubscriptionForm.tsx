
import { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import emailjs from 'emailjs-com';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface SubscriptionFormProps {
  isConfigured: boolean;
  onSubscriptionSuccess: (email: string) => void;
}

const SubscriptionForm = ({ isConfigured, onSubscriptionSuccess }: SubscriptionFormProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!isConfigured) {
      toast({
        title: "Configuration Error",
        description: "Subscription form is not properly configured. Please check your environment variables.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

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

      // Send email notification
      const templateParams = {
        email: email,
        subject: 'New Blog Subscription',
        message: `New subscription request from ${email}`
      };

      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
      );

      setIsSubmitting(false);
      setEmail('');
      
      // Call the success callback with the email
      onSubscriptionSuccess(email);

      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      });
    } catch (error: any) {
      console.error('Subscription error:', error);
      setIsSubmitting(false);

      toast({
        title: "Error subscribing",
        description: `Error: ${error?.text || error?.message || 'Unknown error. Please try again later.'}`,
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
      <div className="flex-1 relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="Your email address"
          className="pl-10 h-12 glass-card bg-transparent"
          required
        />
      </div>
      <Button 
        type="submit" 
        className="h-12 px-6 glass-button" 
        disabled={isSubmitting || !isConfigured}
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
          <span className="flex items-center">
            Subscribe
            <ArrowRight className="ml-2 h-4 w-4" />
          </span>
        )}
      </Button>
    </form>
  );
};

export default SubscriptionForm;
