
import { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';

export const useEmailJS = () => {
  const [isConfigured, setIsConfigured] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
          setError(null);
        } else {
          console.error('EmailJS service or template ID is missing');
          setError('Contact form configuration incomplete. Please check service and template IDs.');
        }
      } else {
        console.error('EmailJS public key is missing');
        setError('Contact form configuration incomplete. Please check public key.');
      }
    } catch (error) {
      console.error('Error initializing EmailJS:', error);
      setError('Failed to initialize contact form service.');
    }
  }, []);

  return { isConfigured, error };
};
