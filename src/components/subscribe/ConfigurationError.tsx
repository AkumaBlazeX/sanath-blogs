
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface ConfigurationErrorProps {
  error: string;
}

const ConfigurationError = ({ error }: ConfigurationErrorProps) => {
  return (
    <Alert variant="destructive" className="mb-6 max-w-xl mx-auto">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Configuration Error</AlertTitle>
      <AlertDescription>
        {error}<br/>
        Please make sure the following environment variables are set:
        <ul className="list-disc pl-5 mt-2">
          <li>VITE_EMAILJS_PUBLIC_KEY</li>
          <li>VITE_EMAILJS_SERVICE_ID</li>
          <li>VITE_EMAILJS_TEMPLATE_ID</li>
        </ul>
      </AlertDescription>
    </Alert>
  );
};

export default ConfigurationError;
