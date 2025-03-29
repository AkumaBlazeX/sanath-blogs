
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ImageUploaderProps {
  onUploadComplete?: (url: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUploadComplete }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreview(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);

    // Upload
    await handleUpload(file);
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    
    try {
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload the file to Supabase storage
      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      toast.success('Image uploaded successfully!');
      
      // Call the callback with the URL if provided
      if (onUploadComplete) {
        onUploadComplete(publicUrl);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-4">
        <label className="w-full cursor-pointer">
          <div className="border-2 border-dashed border-primary/50 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-primary/5 transition-colors">
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-muted-foreground mb-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="text-sm font-medium">Click to select an image</span>
            <span className="text-xs text-muted-foreground mt-1">
              Supports JPG, PNG, GIF up to 5MB
            </span>
            <input 
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </div>
        </label>

        {preview && (
          <div className="mt-4 w-full">
            <div className="text-sm font-medium mb-2">Preview:</div>
            <div className="relative rounded-lg overflow-hidden aspect-video bg-muted/20">
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>

      {uploading && (
        <div className="flex justify-center">
          <div className="w-6 h-6 rounded-full border-2 border-primary/30 border-t-primary animate-spin"></div>
        </div>
      )}

      <div className="mt-2 text-xs text-muted-foreground">
        <p>Note: After uploading, the image URL will be provided for you to use in your blog posts.</p>
      </div>
    </div>
  );
};

export default ImageUploader;
