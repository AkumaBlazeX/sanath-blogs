
import React, { useState } from 'react';
import PageTransition from '../components/PageTransition';
import ImageUploader from '../components/ImageUploader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const ImageUploadPage: React.FC = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  
  const handleCopyToClipboard = () => {
    if (!uploadedImageUrl) return;
    
    navigator.clipboard.writeText(uploadedImageUrl);
    toast.success('Image URL copied to clipboard!');
  };

  return (
    <PageTransition>
      <div className="container-custom py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Image Upload</h1>
          
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Upload a new image</h2>
            <p className="text-muted-foreground mb-6">
              Upload images to use in your blog posts. Once uploaded, you'll get a URL that you can use in your markdown content.
            </p>
            
            <ImageUploader onUploadComplete={(url) => setUploadedImageUrl(url)} />
            
            {uploadedImageUrl && (
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="text-lg font-medium mb-3">Your image URL:</h3>
                <div className="flex gap-2">
                  <Input 
                    value={uploadedImageUrl} 
                    readOnly 
                    className="font-mono text-sm"
                  />
                  <Button onClick={handleCopyToClipboard} type="button">Copy</Button>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Use this URL in your markdown or JSON content to display the image.
                </p>
              </div>
            )}
          </div>
          
          <div className="mt-8 bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Using Google Drive Images</h2>
            <p className="text-muted-foreground mb-4">
              If your images are stored in Google Drive, make sure to convert their URLs to the correct format:
            </p>
            
            <div className="bg-muted p-4 rounded-md mb-4">
              <p className="text-sm font-mono mb-2">From: https://drive.google.com/file/d/YOUR_FILE_ID/view</p>
              <p className="text-sm font-mono">To: https://drive.google.com/uc?id=YOUR_FILE_ID</p>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Note: Your blog automatically converts Google Drive URLs to the correct format for display.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ImageUploadPage;
