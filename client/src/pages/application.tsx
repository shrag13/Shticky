import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
      termsAccepted: false,
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
      <div className="min-h-screen flex items-center justify-center p-4" style={{background: 'linear-gradient(135deg, #EFEFEE 0%, #A89182 50%, #9A7B60 100%)'}}>
        {/* Liquid Glass Header */}
        <header className="liquid-glass-morphing fixed top-0 left-0 right-0 z-50">
          <div className="liquid-glass-content flex items-center justify-between px-6 py-2">
            <div className="liquid-glass-brand flex items-center space-x-2.5">
              <div className="liquid-glass-logo-morph">
                <img src={logoPath} alt="Shticky" className="w-8 h-8 rounded-[10px] object-cover" />
              </div>
              <span className="liquid-glass-text-morph text-lg font-semibold" style={{color: '#1D2915'}}>
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

        <Card className="w-full max-w-md mx-4 mt-20 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="h-16 w-16 mx-auto mb-4" style={{color: '#9A7B60'}} />
            <h2 className="text-2xl font-black mb-2" style={{color: '#1D2915'}}>Application Submitted!</h2>
            <p className="text-base font-medium mb-6" style={{color: '#686346'}}>
              Thank you for your application. You'll receive an email once it's reviewed and approved.
            </p>
            <Button 
              onClick={() => window.location.href = '/'} 
              className="w-full font-black text-lg px-8 py-4 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 hover:opacity-90 text-white"
              style={{background: 'linear-gradient(135deg, #9A7B60, #A89182, #686346)'}}
            >
              RETURN TO HOME
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #EFEFEE 0%, #A89182 50%, #9A7B60 100%)'}}>
      {/* Liquid Glass Header */}
      <header className="liquid-glass-morphing fixed top-0 left-0 right-0 z-50">
        <div className="liquid-glass-content flex items-center justify-between px-6 py-2">
          <div className="liquid-glass-brand flex items-center space-x-2.5">
            <div className="liquid-glass-logo-morph">
              <img src={logoPath} alt="Shticky" className="w-8 h-8 rounded-[10px] object-cover" />
            </div>
            <span className="liquid-glass-text-morph text-lg font-semibold" style={{color: '#1D2915'}}>
              Shticky
            </span>
            <span className="ml-2 text-sm" style={{color: '#686346'}}>Application</span>
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
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm" style={{borderRadius: '15px'}}>
          <CardHeader>
            <CardTitle className="text-2xl font-black" style={{color: '#1D2915'}}>Join Shticky</CardTitle>
            <p className="text-lg font-medium" style={{color: '#686346'}}>
              Fill out this application to start earning money from QR code scans. 
              We'll review your application and get back to you soon.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Account Information */}
              <div className="space-y-4 p-6 border-2" style={{backgroundColor: '#F5F3F1', borderColor: '#9A7B60', borderRadius: '15px'}}>
                <h3 className="text-xl font-black" style={{color: '#1D2915'}}>Account Information</h3>
                
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-bold" style={{color: '#1D2915'}}>Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    placeholder="Enter your email address"
                    className="liquid-glass-input text-gray-900 font-medium"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm font-medium" style={{color: '#D2691E'}}>{form.formState.errors.email.message}</p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-base font-bold" style={{color: '#1D2915'}}>Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    {...form.register("passwordHash")}
                    placeholder="Create a password"
                    className="liquid-glass-input text-gray-900 font-medium"
                  />
                  {form.formState.errors.passwordHash && (
                    <p className="text-sm font-medium" style={{color: '#D2691E'}}>{form.formState.errors.passwordHash.message}</p>
                  )}
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-4 p-6 border-2" style={{backgroundColor: '#F5F3F1', borderColor: '#A89182', borderRadius: '15px'}}>
                <h3 className="text-xl font-black" style={{color: '#1D2915'}}>Personal Information</h3>
                
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-base font-bold" style={{color: '#1D2915'}}>Full Name *</Label>
                  <Input
                    id="fullName"
                    {...form.register("fullName")}
                    placeholder="Enter your full name"
                    className="liquid-glass-input text-gray-900 font-medium"
                  />
                  {form.formState.errors.fullName && (
                    <p className="text-sm font-medium" style={{color: '#D2691E'}}>{form.formState.errors.fullName.message}</p>
                  )}
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-base font-bold" style={{color: '#1D2915'}}>Street Address *</Label>
                  <Input
                    id="address"
                    {...form.register("address")}
                    placeholder="Enter your street address"
                    className="liquid-glass-input text-gray-900 font-medium"
                  />
                  {form.formState.errors.address && (
                    <p className="text-sm font-medium" style={{color: '#D2691E'}}>{form.formState.errors.address.message}</p>
                  )}
                </div>

                {/* City, State, Zip */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-base font-bold" style={{color: '#1D2915'}}>City *</Label>
                    <Input
                      id="city"
                      {...form.register("city")}
                      placeholder="City"
                      className="liquid-glass-input text-gray-900 font-medium"
                    />
                    {form.formState.errors.city && (
                      <p className="text-sm font-medium" style={{color: '#D2691E'}}>{form.formState.errors.city.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-base font-bold" style={{color: '#1D2915'}}>State *</Label>
                    <Input
                      id="state"
                      {...form.register("state")}
                      placeholder="State"
                      className="liquid-glass-input text-gray-900 font-medium"
                    />
                    {form.formState.errors.state && (
                      <p className="text-sm font-medium" style={{color: '#D2691E'}}>{form.formState.errors.state.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode" className="text-base font-bold" style={{color: '#1D2915'}}>Zip Code *</Label>
                    <Input
                      id="zipCode"
                      {...form.register("zipCode")}
                      placeholder="Zip Code"
                      className="liquid-glass-input text-gray-900 font-medium"
                    />
                    {form.formState.errors.zipCode && (
                      <p className="text-sm font-medium" style={{color: '#D2691E'}}>{form.formState.errors.zipCode.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Placement Description */}
              <div className="space-y-4 p-6 border-2" style={{backgroundColor: '#F5F3F1', borderColor: '#686346', borderRadius: '15px'}}>
                <h3 className="text-xl font-black" style={{color: '#1D2915'}}>Placement Strategy</h3>
                <div className="space-y-2">
                  <Label htmlFor="placementDescription" className="text-base font-bold" style={{color: '#1D2915'}}>
                    Where do you plan to place your Shticky stickers? *
                  </Label>
                  <Textarea
                    id="placementDescription"
                    {...form.register("placementDescription")}
                    placeholder="Describe where you plan to place your QR code stickers (e.g., coffee shops, community boards, public spaces, etc.)"
                    rows={4}
                    className="liquid-glass-textarea text-gray-900 font-medium"
                  />
                  <p className="text-sm font-medium" style={{color: '#686346'}}>
                    Please provide specific details about your placement strategy. This helps us approve applications faster.
                  </p>
                  {form.formState.errors.placementDescription && (
                    <p className="text-sm font-medium" style={{color: '#D2691E'}}>{form.formState.errors.placementDescription.message}</p>
                  )}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-4 p-6 border-2" style={{backgroundColor: '#F5F3F1', borderColor: '#1D2915', borderRadius: '15px'}}>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="termsAccepted"
                    {...form.register("termsAccepted")}
                    className="mt-1 data-[state=checked]:bg-[#9A7B60] data-[state=checked]:border-[#9A7B60]"
                  />
                  <div className="flex-1">
                    <Label htmlFor="termsAccepted" className="text-base font-bold cursor-pointer" style={{color: '#1D2915'}}>
                      I agree to the Terms and Conditions *
                    </Label>
                    <p className="text-sm font-medium mt-1" style={{color: '#686346'}}>
                      By checking this box, you agree to our{" "}
                      <a href="/terms" target="_blank" className="underline hover:no-underline" style={{color: '#9A7B60'}}>
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" target="_blank" className="underline hover:no-underline" style={{color: '#9A7B60'}}>
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </div>
                </div>
                {form.formState.errors.termsAccepted && (
                  <p className="text-sm font-medium" style={{color: '#D2691E'}}>{form.formState.errors.termsAccepted.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full font-black text-xl px-12 py-6 shadow-2xl transform hover:scale-105 transition-all duration-300 hover:opacity-90 text-white"
                style={{background: 'linear-gradient(135deg, #9A7B60, #A89182, #686346)', borderRadius: '15px'}}
                disabled={submitApplicationMutation.isPending}
              >
                {submitApplicationMutation.isPending ? "SUBMITTING..." : "SUBMIT APPLICATION"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Info Section */}
        <Card className="mt-8 shadow-lg border-0 bg-white/90 backdrop-blur-sm" style={{borderRadius: '15px'}}>
          <CardContent className="pt-6">
            <h3 className="font-black text-xl mb-3" style={{color: '#1D2915'}}>What happens next?</h3>
            <ul className="space-y-2 text-base font-medium" style={{color: '#686346'}}>
              <li className="flex items-start">
                <span className="mr-2 font-black" style={{color: '#9A7B60'}}>•</span>
                <span>We'll review your application within 2-3 business days</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 font-black" style={{color: '#A89182'}}>•</span>
                <span>You'll receive an email notification once approved</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 font-black" style={{color: '#686346'}}>•</span>
                <span>Approved users can start claiming QR codes and earning money immediately</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 font-black" style={{color: '#9A7B60'}}>•</span>
                <span>Monthly automatic payouts for earnings of $5 or more</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
