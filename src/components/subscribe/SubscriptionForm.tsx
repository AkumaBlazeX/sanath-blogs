import { useState, useEffect } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { API_CONFIG } from '@/config/api';

interface SubscriptionFormProps {
  onSubscriptionSuccess?: (email: string) => void;
}

const SubscriptionForm = ({ onSubscriptionSuccess }: SubscriptionFormProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Check subscription status on mount
  useEffect(() => {
    const subscribed = localStorage.getItem('isSubscribed') === 'true';
    const savedEmail = localStorage.getItem('subscribedEmail');
    if (subscribed && savedEmail) {
      setIsSubscribed(true);
      setEmail(savedEmail);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_CONFIG.API_KEY
        },
        body: JSON.stringify({
          template: 'WelcomeEmail',
          singleEmail: email,
          data: {
            blogName: "Sanath's Blog"
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Subscription failed');
      }

      // Store subscription status
      localStorage.setItem('isSubscribed', 'true');
      localStorage.setItem('subscribedEmail', email);
      setIsSubscribed(true);

      // Clear form and show success
      setEmail('');
      onSubscriptionSuccess?.(email);
      
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      });
    } catch (error: any) {
      console.error('Subscription error:', error);
      toast({
        title: "Error subscribing",
        description: error?.message || 'Unknown error. Please try again later.',
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="text-center p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground">
          You're already subscribed with {localStorage.getItem('subscribedEmail')}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
      <div className="flex-1 relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="pl-10 h-12 glass-card bg-transparent"
          required
          disabled={isSubmitting}
          pattern="[^\\s@]+@[^\\s@]+\\.[^\\s@]+"
          title="Please enter a valid email address"
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