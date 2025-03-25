
import { useState, useEffect } from 'react';
import { Mail, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import emailjs from 'emailjs-com';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Subscribe = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailJSError, setEmailJSError] = useState<string | null>(null);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
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
          setEmailJSError(null);
        } else {
          console.error('EmailJS service or template ID is missing');
          setEmailJSError('Contact form configuration incomplete. Please check service and template IDs.');
        }
      } else {
        console.error('EmailJS public key is missing');
        setEmailJSError('Contact form configuration incomplete. Please check public key.');
      }
    } catch (error) {
      console.error('Error initializing EmailJS:', error);
      setEmailJSError('Failed to initialize contact form service.');
    }
  }, []);

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
    
    const templateParams = {
      email: email,
      subject: 'New Blog Subscription',
      message: `New subscription request from ${email}`
    };

    try {
      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
      );

      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');

      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      });

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error: any) {
      console.error('EmailJS error:', error);
      setIsSubmitting(false);

      toast({
        title: "Error subscribing",
        description: `Error: ${error?.text || error?.message || 'Unknown error. Please try again later.'}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full py-12 md:py-16 bg-card border-y border-border/30">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Stay updated with the latest articles and insights on Data Science, AI automation, and machine learning.
          </p>
          
          {emailJSError && (
            <Alert variant="destructive" className="mb-6 max-w-xl mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Configuration Error</AlertTitle>
              <AlertDescription>
                {emailJSError}<br/>
                Please make sure the following environment variables are set:
                <ul className="list-disc pl-5 mt-2">
                  <li>VITE_EMAILJS_PUBLIC_KEY</li>
                  <li>VITE_EMAILJS_SERVICE_ID</li>
                  <li>VITE_EMAILJS_TEMPLATE_ID</li>
                </ul>
              </AlertDescription>
            </Alert>
          )}
          
          {isSubmitted ? (
            <div className="flex items-center justify-center space-x-2 text-primary mb-8">
              <CheckCircle className="h-5 w-5" />
              <span>Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Your email address"
                  className="pl-10 h-12"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="h-12 px-6" 
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
          )}
          
          <p className="text-xs text-muted-foreground mt-4">
            By subscribing, you agree to our Privacy Policy and to receive updates from our blog.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
