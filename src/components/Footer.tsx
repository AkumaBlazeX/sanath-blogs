
import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Github, Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from 'react';
import emailjs from 'emailjs-com';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
    
    try {
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
        
        toast({
          title: "Successfully subscribed!",
          description: "Thank you for subscribing to our newsletter.",
        });
        
        setEmail('');
      } else {
        toast({
          title: "Configuration Error",
          description: "Newsletter is not properly configured. Please try again later.",
          variant: "destructive",
        });
      }
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

  return (
    <footer className="mt-24 py-12 border-t border-border/30">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link to="/" className="text-xl font-semibold">
              ModernBlog
            </Link>
            <p className="text-muted-foreground">
              This blog tells you about Data and AI automation, featuring insights on machine learning, data science, and automated workflows.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Subscribe</h3>
            <p className="text-muted-foreground">
              Stay up to date with our latest articles and updates
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2 flex-col sm:flex-row">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" size="sm" disabled={isSubmitting}>
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider">Contact</h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="mailto:sanathkumar.data@gmail.com" 
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    sanathkumar.data@gmail.com
                  </a>
                </li>
                <li>
                  <div className="flex space-x-4">
                    <a 
                      href="https://linkedin.com/in/yourusername" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5 mr-2" />
                      <span>LinkedIn</span>
                    </a>
                    <a 
                      href="https://github.com/yourusername" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
                      aria-label="GitHub"
                    >
                      <Github className="h-5 w-5 mr-2" />
                      <span>GitHub</span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="text-right flex flex-col space-y-4 md:items-end">
              <p className="text-muted-foreground text-sm">
                &copy; {currentYear} ModernBlog. All rights reserved.
              </p>
              <div className="space-x-6">
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Privacy Policy
                </a>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
