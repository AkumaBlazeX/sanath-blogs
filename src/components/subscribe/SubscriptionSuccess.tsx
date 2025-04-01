
import { CheckCircle } from 'lucide-react';

const SubscriptionSuccess = () => {
  return (
    <div className="w-full py-12 md:py-16 glass">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Thanks for subscribing!
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            You're all set to receive our latest articles and insights on Data Science, AI automation, and machine learning.
          </p>
          <div className="flex items-center justify-center space-x-2 text-primary mt-4">
            <CheckCircle className="h-5 w-5" />
            <span>Successfully subscribed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;
