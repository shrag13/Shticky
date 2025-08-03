import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertApplicationSchema, type InsertApplication } from "@shared/schema";
import { CheckCircle, ArrowLeft } from "lucide-react";
import logoPath from "@assets/IMG_20250628_212758_407_1754151926865.webp";

export default function Application() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<InsertApplication>({
    resolver: zodResolver(insertApplicationSchema),
    defaultValues: {
      email: "",
      passwordHash: "",
      fullName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      placementDescription: "",
    },
  });

  const submitApplicationMutation = useMutation({
    mutationFn: async (data: InsertApplication) => {
      await apiRequest("POST", "/api/applications", data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Application Submitted",
        description: "Your application has been submitted for review.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit application",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertApplication) => {
    submitApplicationMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        {/* Liquid Glass Header */}
        <header className="liquid-glass-morphing fixed top-0 left-0 right-0 z-50">
          <div className="liquid-glass-content flex items-center justify-between px-6 py-2">
            <div className="liquid-glass-brand flex items-center space-x-2.5">
              <div className="liquid-glass-logo-morph">
                <img src={logoPath} alt="Shticky" className="w-8 h-8 rounded-[10px] object-cover" />
              </div>
              <span className="liquid-glass-text-morph text-lg font-semibold text-gray-800">
                Shticky
              </span>
            </div>
            
            <div className="liquid-glass-buttons flex items-center space-x-2.5">
              <Button 
                variant="ghost" 
                size="sm" 
                className="liquid-glass-btn-morph liquid-glass-btn-outline px-4 py-1.5 h-auto text-sm"
                style={{
                  backdropFilter: 'blur(8px) saturate(180%) brightness(120%)',
                  WebkitBackdropFilter: 'blur(8px) saturate(180%) brightness(120%)',
                  background: 'rgba(255, 255, 255, 0.3)'
                }}
                onClick={() => window.location.href = '/'}
              >
                <ArrowLeft className="mr-1 h-3 w-3" />
                Back to Home
              </Button>
            </div>
          </div>
        </header>

        <Card className="w-full max-w-md mx-4 mt-20 shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="h-16 w-16 text-secondary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Application Submitted!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for your application. You'll receive an email once it's reviewed and approved.
            </p>
            <Button 
              onClick={() => window.location.href = '/'} 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Liquid Glass Header */}
      <header className="liquid-glass-morphing fixed top-0 left-0 right-0 z-50">
        <div className="liquid-glass-content flex items-center justify-between px-6 py-2">
          <div className="liquid-glass-brand flex items-center space-x-2.5">
            <div className="liquid-glass-logo-morph">
              <img src={logoPath} alt="Shticky" className="w-8 h-8 rounded-[10px] object-cover" />
            </div>
            <span className="liquid-glass-text-morph text-lg font-semibold text-gray-800">
              Shticky
            </span>
            <span className="ml-2 text-sm text-gray-600">Application</span>
          </div>
          
          <div className="liquid-glass-buttons flex items-center space-x-2.5">
            <Button 
              variant="ghost" 
              size="sm" 
              className="liquid-glass-btn-morph liquid-glass-btn-outline px-4 py-1.5 h-auto text-sm"
              style={{
                backdropFilter: 'blur(8px) saturate(180%) brightness(120%)',
                WebkitBackdropFilter: 'blur(8px) saturate(180%) brightness(120%)',
                background: 'rgba(255, 255, 255, 0.3)'
              }}
              onClick={() => window.location.href = '/'}
            >
              <ArrowLeft className="mr-1 h-3 w-3" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
        <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Join Shticky</CardTitle>
            <p className="text-muted-foreground">
              Fill out this application to start earning money from QR code scans. 
              We'll review your application and get back to you soon.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Account Information */}
              <div className="space-y-4 p-4 bg-primary/5 rounded-lg border border-primary/10">
                <h3 className="text-lg font-semibold text-foreground">Account Information</h3>
                
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    placeholder="Enter your email address"
                    className="bg-background/50 border-border text-foreground"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    {...form.register("passwordHash")}
                    placeholder="Create a password"
                    className="bg-background/50 border-border text-foreground"
                  />
                  {form.formState.errors.passwordHash && (
                    <p className="text-sm text-destructive">{form.formState.errors.passwordHash.message}</p>
                  )}
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-4 p-4 bg-secondary/5 rounded-lg border border-secondary/10">
                <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
                
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-foreground">Full Name *</Label>
                  <Input
                    id="fullName"
                    {...form.register("fullName")}
                    placeholder="Enter your full name"
                    className="bg-background/50 border-border text-foreground"
                  />
                  {form.formState.errors.fullName && (
                    <p className="text-sm text-destructive">{form.formState.errors.fullName.message}</p>
                  )}
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-foreground">Street Address *</Label>
                  <Input
                    id="address"
                    {...form.register("address")}
                    placeholder="Enter your street address"
                    className="bg-background/50 border-border text-foreground"
                  />
                  {form.formState.errors.address && (
                    <p className="text-sm text-destructive">{form.formState.errors.address.message}</p>
                  )}
                </div>

                {/* City, State, Zip */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-foreground">City *</Label>
                    <Input
                      id="city"
                      {...form.register("city")}
                      placeholder="City"
                      className="bg-background/50 border-border text-foreground"
                    />
                    {form.formState.errors.city && (
                      <p className="text-sm text-destructive">{form.formState.errors.city.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-foreground">State *</Label>
                    <Input
                      id="state"
                      {...form.register("state")}
                      placeholder="State"
                      className="bg-background/50 border-border text-foreground"
                    />
                    {form.formState.errors.state && (
                      <p className="text-sm text-destructive">{form.formState.errors.state.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode" className="text-foreground">Zip Code *</Label>
                    <Input
                      id="zipCode"
                      {...form.register("zipCode")}
                      placeholder="Zip Code"
                      className="bg-background/50 border-border text-foreground"
                    />
                    {form.formState.errors.zipCode && (
                      <p className="text-sm text-destructive">{form.formState.errors.zipCode.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Placement Description */}
              <div className="space-y-4 p-4 bg-accent/5 rounded-lg border border-accent/10">
                <h3 className="text-lg font-semibold text-foreground">Placement Strategy</h3>
                <div className="space-y-2">
                  <Label htmlFor="placementDescription" className="text-foreground">
                    Where do you plan to place your Shticky stickers? *
                  </Label>
                  <Textarea
                    id="placementDescription"
                    {...form.register("placementDescription")}
                    placeholder="Describe where you plan to place your QR code stickers (e.g., coffee shops, community boards, public spaces, etc.)"
                    rows={4}
                    className="bg-background/50 border-border text-foreground"
                  />
                  <p className="text-sm text-muted-foreground">
                    Please provide specific details about your placement strategy. This helps us approve applications faster.
                  </p>
                  {form.formState.errors.placementDescription && (
                    <p className="text-sm text-destructive">{form.formState.errors.placementDescription.message}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" 
                disabled={submitApplicationMutation.isPending}
              >
                {submitApplicationMutation.isPending ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Info Section */}
        <Card className="mt-8 shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-foreground mb-3">What happens next?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>We'll review your application within 2-3 business days</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>You'll receive an email notification once approved</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>Approved users can start claiming QR codes and earning money immediately</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>Monthly automatic payouts for earnings of $5 or more</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
