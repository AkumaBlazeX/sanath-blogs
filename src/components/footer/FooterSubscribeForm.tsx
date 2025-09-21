import { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { API_CONFIG } from '@/config/api';

const FooterSubscribeForm = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

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
      const response = await fetch(`${API_CONFIG.BASE_URL}`, {
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

      setEmail('');
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
      <div className="text-sm text-muted">
        You're already subscribed with {localStorage.getItem('subscribedEmail')}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <div className="flex-1 relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted h-4 w-4" />
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="pl-9 h-10"
          required
          disabled={isSubmitting}
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,}"
          title="Please enter a valid email address"
        />
      </div>
      <Button 
        type="submit" 
        variant="secondary"
        className="h-10" 
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
      </Button>
    </form>
  );
};

export default FooterSubscribeForm;