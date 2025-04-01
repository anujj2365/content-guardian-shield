
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, FileText, Image, Database, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

const ContentRegistrationSection = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Title Required",
        description: "Please provide a title for your content.",
        variant: "destructive"
      });
      return;
    }
    
    if (!text.trim()) {
      toast({
        title: "Text Required",
        description: "Please enter some text content to register.",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate blockchain registration
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Content Registered Successfully",
        description: "Your text content has been registered on the blockchain.",
      });
    }, 2000);
  };

  const handleFileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Title Required",
        description: "Please provide a title for your content.",
        variant: "destructive"
      });
      return;
    }
    
    if (!file) {
      toast({
        title: "File Required",
        description: "Please select a file to upload.",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate blockchain registration
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Content Registered Successfully",
        description: `Your file "${file.name}" has been registered on the blockchain.`,
      });
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Register Your Content
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Protect your intellectual property by registering it on the blockchain for immutable proof of ownership.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Content Registration</CardTitle>
              <CardDescription>
                Upload your content to receive blockchain-verified proof of ownership
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="text">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="text" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Text</span>
                  </TabsTrigger>
                  <TabsTrigger value="file" className="flex items-center gap-2">
                    <Image className="h-4 w-4" />
                    <span>File/Image</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="text" className="mt-6">
                  <form onSubmit={handleTextSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Content Title</Label>
                      <Input 
                        id="title" 
                        placeholder="Enter a title for your content" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="text-content">Text Content</Label>
                      <Textarea 
                        id="text-content" 
                        placeholder="Enter your text content here" 
                        className="min-h-32"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-guardian-primary hover:bg-guardian-accent" 
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Registering...
                        </>
                      ) : (
                        <>
                          <Database className="mr-2 h-4 w-4" />
                          Register on Blockchain
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="file" className="mt-6">
                  <form onSubmit={handleFileSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="file-title">Content Title</Label>
                      <Input 
                        id="file-title" 
                        placeholder="Enter a title for your content" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8">
                      <div className="flex flex-col items-center justify-center gap-4">
                        <Upload className="h-10 w-10 text-gray-400" />
                        <div className="text-center">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {file ? file.name : "Drag & drop your file here or click to browse"}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            Supports images, documents, and other files up to 50MB
                          </p>
                        </div>
                        
                        <Input 
                          id="file-upload" 
                          type="file" 
                          className="hidden" 
                          onChange={handleFileChange}
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => document.getElementById('file-upload')?.click()}
                        >
                          Browse Files
                        </Button>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-guardian-primary hover:bg-guardian-accent" 
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Registering...
                        </>
                      ) : (
                        <>
                          <Database className="mr-2 h-4 w-4" />
                          Register on Blockchain
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContentRegistrationSection;
