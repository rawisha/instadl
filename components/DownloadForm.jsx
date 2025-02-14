"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Download, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DownloadForm() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter an Instagram URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/instagram/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link:url }),
      });

      const data = await response.json();

      

      if (!response.ok) {
        throw new Error(data.error || 'Download failed');
      }

      toast({
        title: "Success",
        description: `Your content is ready for download`,
      });

      localStorage.setItem('userData', JSON.stringify(data));

      router.push(`/result/${data.username}`);
      
      
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to download content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      toast({
        title: "URL Pasted",
        description: "Instagram URL has been pasted from clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to paste from clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex   md:max-w-2xl mx-auto">
      <Input
        type="text"
        placeholder="Paste URL Instagram"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="bg-white rounded-r-none"
      />
      <Button 
        type="button" 
        variant="secondary" 
        onClick={handlePaste}
        disabled={loading}
        className="rounded-none"
      >
        Paste
      </Button>
      <Button 
        type="submit" 
        className="bg-green-500 hover:bg-green-600 rounded-l-none min-w-[120px]" 
        disabled={loading}
        
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing
          </>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            Download
          </>
        )}
      </Button>
    </form>
  );
}