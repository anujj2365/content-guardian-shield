
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, FileText, Image, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

const VerificationSection = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<null | {
    verified: boolean;
    owner?: string;
    timestamp?: string;
    similarity?: number;
  }>(null);
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleTextVerify = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast({
        title: "Text Required",
        description: "Please enter some text content to verify.",
        variant: "destructive"
      });
      return;
    }
    
    setIsVerifying(true);
    setVerificationResult(null);
    
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      
      // This is a simulation - in a real app this would be based on actual blockchain verification
      const randomVerified = Math.random() > 0.5;
      
      setVerificationResult({
        verified: randomVerified,
        owner: randomVerified ? "0x71C7656EC7ab88b098defB751B7401B5f6d8976F" : undefined,
        timestamp: randomVerified ? new Date().toISOString() : undefined,
        similarity: randomVerified ? 98 : 45
      });
      
      toast({
        title: randomVerified ? "Content Verified" : "Content Not Verified",
        description: randomVerified 
          ? "This content has been registered on the blockchain." 
          : "No exact match found on the blockchain.",
        variant: randomVerified ? "default" : "destructive"
      });
    }, 2000);
  };

  const handleFileVerify = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "File Required",
        description: "Please select a file to verify.",
        variant: "destructive"
      });
      return;
    }
    
    setIsVerifying(true);
    setVerificationResult(null);
    
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      
      // This is a simulation - in a real app this would be based on actual blockchain verification
      const randomVerified = Math.random() > 0.5;
      
      setVerificationResult({
        verified: randomVerified,
        owner: randomVerified ? "0x71C7656EC7ab88b098defB751B7401B5f6d8976F" : undefined,
        timestamp: randomVerified ? new Date().toISOString() : undefined,
        similarity: randomVerified ? 95 : 32
      });
      
      toast({
        title: randomVerified ? "Content Verified" : "Content Not Verified",
        description: randomVerified 
          ? `This file "${file.name}" has been registered on the blockchain.` 
          : "No matching file found on the blockchain.",
        variant: randomVerified ? "default" : "destructive"
      });
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setVerificationResult(null);
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Verify Content Ownership
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Check if content has been registered and get ownership details from the blockchain.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Content Verification</CardTitle>
              <CardDescription>
                Upload or paste content to verify its ownership on the blockchain
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
                  <form onSubmit={handleTextVerify} className="space-y-4">
                    <div>
                      <Label htmlFor="verify-text-content">Text Content to Verify</Label>
                      <Textarea 
                        id="verify-text-content" 
                        placeholder="Paste text content to verify ownership" 
                        className="min-h-32"
                        value={text}
                        onChange={(e) => {
                          setText(e.target.value);
                          setVerificationResult(null);
                        }}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-guardian-primary hover:bg-guardian-accent" 
                      disabled={isVerifying}
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Verify Ownership
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="file" className="mt-6">
                  <form onSubmit={handleFileVerify} className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8">
                      <div className="flex flex-col items-center justify-center gap-4">
                        <Image className="h-10 w-10 text-gray-400" />
                        <div className="text-center">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {file ? file.name : "Drag & drop your file here or click to browse"}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            Upload the file you want to verify ownership for
                          </p>
                        </div>
                        
                        <Input 
                          id="verify-file-upload" 
                          type="file" 
                          className="hidden" 
                          onChange={handleFileChange}
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => document.getElementById('verify-file-upload')?.click()}
                        >
                          Browse Files
                        </Button>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-guardian-primary hover:bg-guardian-accent" 
                      disabled={isVerifying}
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Verify Ownership
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
              
              {verificationResult && (
                <div className={`mt-6 p-4 rounded-lg border ${
                  verificationResult.verified 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                    : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                }`}>
                  <div className="flex items-start mb-4">
                    <div className={`p-1.5 rounded-full ${
                      verificationResult.verified 
                        ? 'bg-green-100 dark:bg-green-800' 
                        : 'bg-red-100 dark:bg-red-800'
                    }`}>
                      {verificationResult.verified ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                    <div className="ml-3">
                      <h3 className={`text-sm font-medium ${
                        verificationResult.verified 
                          ? 'text-green-800 dark:text-green-300' 
                          : 'text-red-800 dark:text-red-300'
                      }`}>
                        {verificationResult.verified 
                          ? 'Content Ownership Verified' 
                          : 'Content Not Found'
                        }
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {verificationResult.verified 
                          ? 'This content has been registered on the blockchain with verified ownership.'
                          : 'No exact match was found on the blockchain.'
                        }
                      </p>
                    </div>
                  </div>
                  
                  {verificationResult.verified && (
                    <div className="mt-3 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Owner Address:</span>
                        <span className="font-mono text-gray-800 dark:text-gray-300">{verificationResult.owner}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Registration Time:</span>
                        <span className="text-gray-800 dark:text-gray-300">
                          {new Date(verificationResult.timestamp as string).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Similarity Score:</span>
                        <span className="text-gray-800 dark:text-gray-300">{verificationResult.similarity}%</span>
                      </div>
                    </div>
                  )}
                  
                  {!verificationResult.verified && (
                    <div className="mt-3 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Similarity Score:</span>
                        <span className="text-gray-800 dark:text-gray-300">{verificationResult.similarity}%</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Consider registering this content to protect your ownership rights.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default VerificationSection;
