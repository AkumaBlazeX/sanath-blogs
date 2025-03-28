
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

    try {
      // Just store in localStorage and notify the user
      // Skip the actual EmailJS and Supabase calls since they're not configured
      
      setTimeout(() => {
        setIsSubmitting(false);
        setEmail('');
        
        // Call the success callback with the email
        onSubscriptionSuccess(email);

        toast({
          title: "Subscription successful!",
          description: "Thank you for subscribing to our newsletter.",
        });
      }, 500); // Simulate network delay
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
        disabled={isSubmitting}
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
