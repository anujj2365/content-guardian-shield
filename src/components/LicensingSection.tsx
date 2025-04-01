
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Link, Loader2, Copy, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/components/ui/use-toast';

const LicensingSection = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [contentId, setContentId] = useState('');
  const [licenseType, setLicenseType] = useState('');
  const [allowCommercial, setAllowCommercial] = useState(false);
  const [allowModification, setAllowModification] = useState(false);
  const [duration, setDuration] = useState(12); // months
  const [royaltyPercentage, setRoyaltyPercentage] = useState(5);
  const [licenseCreated, setLicenseCreated] = useState(false);
  const [licenseLink, setLicenseLink] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCreateLicense = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contentId.trim()) {
      toast({
        title: "Content ID Required",
        description: "Please enter the ID of the content you want to license.",
        variant: "destructive"
      });
      return;
    }
    
    if (!licenseType) {
      toast({
        title: "License Type Required",
        description: "Please select a license type.",
        variant: "destructive"
      });
      return;
    }
    
    setIsCreating(true);
    
    // Simulate license creation
    setTimeout(() => {
      setIsCreating(false);
      setLicenseCreated(true);
      
      // Generate a fake license link
      const fakeLicenseId = Math.random().toString(36).substring(2, 10);
      setLicenseLink(`https://contentguardian.io/license/${fakeLicenseId}`);
      
      toast({
        title: "License Created Successfully",
        description: "Your content license has been created and deployed to the blockchain.",
      });
    }, 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(licenseLink);
    setCopySuccess(true);
    
    toast({
      title: "License Link Copied",
      description: "License link has been copied to your clipboard.",
    });
    
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            License Your Content
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Create blockchain-enforced licenses for your content to manage usage rights and monetization.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Create Content License</CardTitle>
              <CardDescription>
                Define terms and conditions for how others can use your registered content
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!licenseCreated ? (
                <form onSubmit={handleCreateLicense} className="space-y-6">
                  <div>
                    <Label htmlFor="content-id">Content ID</Label>
                    <Input 
                      id="content-id" 
                      placeholder="Enter the ID of your registered content" 
                      value={contentId}
                      onChange={(e) => setContentId(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      You can find this ID in your registered content dashboard
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="license-type">License Type</Label>
                    <Select onValueChange={(value) => setLicenseType(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select license type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard License</SelectItem>
                        <SelectItem value="exclusive">Exclusive License</SelectItem>
                        <SelectItem value="creative-commons">Creative Commons</SelectItem>
                        <SelectItem value="custom">Custom License</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label>Usage Rights</Label>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Allow Commercial Use</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Permit use in commercial projects
                          </p>
                        </div>
                        <Switch 
                          checked={allowCommercial} 
                          onCheckedChange={setAllowCommercial} 
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Allow Modifications</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Permit changes to the original work
                          </p>
                        </div>
                        <Switch 
                          checked={allowModification} 
                          onCheckedChange={setAllowModification} 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label>License Duration (months)</Label>
                        <div className="flex items-center space-x-2 mt-2">
                          <Slider 
                            defaultValue={[12]} 
                            max={36} 
                            step={1} 
                            onValueChange={(value) => setDuration(value[0])}
                          />
                          <span className="w-12 text-center font-medium">{duration}</span>
                        </div>
                      </div>
                      
                      <div>
                        <Label>Royalty Percentage</Label>
                        <div className="flex items-center space-x-2 mt-2">
                          <Slider 
                            defaultValue={[5]} 
                            max={25} 
                            step={1} 
                            onValueChange={(value) => setRoyaltyPercentage(value[0])}
                          />
                          <span className="w-12 text-center font-medium">{royaltyPercentage}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-guardian-primary hover:bg-guardian-accent" 
                    disabled={isCreating}
                  >
                    {isCreating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating License...
                      </>
                    ) : (
                      <>
                        <Link className="mr-2 h-4 w-4" />
                        Create Blockchain License
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-800">
                    <div className="flex items-center">
                      <div className="bg-green-100 dark:bg-green-800 p-1.5 rounded-full">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800 dark:text-green-300">
                          License Created Successfully
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          Your license has been deployed to the blockchain
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label>License Details</Label>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-600 dark:text-gray-400">Content ID:</div>
                      <div className="font-medium text-gray-800 dark:text-gray-200">{contentId}</div>
                      
                      <div className="text-gray-600 dark:text-gray-400">License Type:</div>
                      <div className="font-medium text-gray-800 dark:text-gray-200">
                        {licenseType === 'standard' && 'Standard License'}
                        {licenseType === 'exclusive' && 'Exclusive License'}
                        {licenseType === 'creative-commons' && 'Creative Commons'}
                        {licenseType === 'custom' && 'Custom License'}
                      </div>
                      
                      <div className="text-gray-600 dark:text-gray-400">Commercial Use:</div>
                      <div className="font-medium text-gray-800 dark:text-gray-200">
                        {allowCommercial ? 'Allowed' : 'Not Allowed'}
                      </div>
                      
                      <div className="text-gray-600 dark:text-gray-400">Modifications:</div>
                      <div className="font-medium text-gray-800 dark:text-gray-200">
                        {allowModification ? 'Allowed' : 'Not Allowed'}
                      </div>
                      
                      <div className="text-gray-600 dark:text-gray-400">Duration:</div>
                      <div className="font-medium text-gray-800 dark:text-gray-200">{duration} months</div>
                      
                      <div className="text-gray-600 dark:text-gray-400">Royalty:</div>
                      <div className="font-medium text-gray-800 dark:text-gray-200">{royaltyPercentage}%</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="license-link">License Link</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="license-link" 
                        value={licenseLink}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={handleCopyLink}
                        className="shrink-0"
                      >
                        {copySuccess ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Share this link with others who want to license your content
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setLicenseCreated(false);
                        setContentId('');
                        setLicenseType('');
                        setAllowCommercial(false);
                        setAllowModification(false);
                        setDuration(12);
                        setRoyaltyPercentage(5);
                      }}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Create Another License
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LicensingSection;
