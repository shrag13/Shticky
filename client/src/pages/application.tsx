import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
import { usePageTitle } from "@/hooks/usePageTitle";
import { insertApplicationSchema, type InsertApplication } from "@shared/schema";
import { CheckCircle, ArrowLeft, UserPlus } from "lucide-react";
import logoPath from "@assets/20250701_023412_0000_1754186769563.png";

export default function Application() {
  usePageTitle("Apply");
  
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const applicationForm = useForm<InsertApplication>({
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
        title: "Application submitted!",
        description: "Thank you for your application. We'll review it within 2-3 business days.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Submission failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmitApplication = (data: InsertApplication) => {
    submitApplicationMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{background: 'linear-gradient(135deg, #EFEFEE 0%, #A89182 50%, #9A7B60 100%)'}}>
        <Card className="max-w-md w-full shadow-xl border-0 bg-white/90 backdrop-blur-sm" style={{borderRadius: '15px'}}>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: 'rgba(154, 123, 96, 0.1)'}}>
              <CheckCircle className="w-8 h-8" style={{color: '#9A7B60'}} />
            </div>
            <h2 className="text-2xl font-black mb-4" style={{color: '#1D2915'}}>Application Submitted!</h2>
            <p className="text-lg font-medium mb-6" style={{color: '#686346'}}>
              Thank you for applying to Shticky. We'll review your application within 2-3 business days and notify you via email.
            </p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="font-black text-lg px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 text-white"
              style={{background: 'linear-gradient(135deg, #9A7B60, #A89182, #686346)'}}
            >
              BACK TO HOME
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
              <img src={logoPath} alt="Logo" className="w-8 h-8 rounded-[10px] object-cover" />
            </div>
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
              Back
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="liquid-glass-btn-morph liquid-glass-btn-outline px-4 py-1.5 h-auto text-sm"
              style={{
                backdropFilter: 'blur(8px) saturate(180%) brightness(120%)',
                WebkitBackdropFilter: 'blur(8px) saturate(180%) brightness(120%)',
                background: 'rgba(255, 255, 255, 0.3)'
              }}
              onClick={() => window.location.href = '/sign-in'}
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm" style={{borderRadius: '15px'}}>
          <CardHeader>
            <CardTitle className="text-2xl font-black" style={{color: '#1D2915'}}>
              <UserPlus className="inline mr-2 h-6 w-6" style={{color: '#9A7B60'}} />
              Join Shticky
            </CardTitle>
            <p className="text-lg font-medium" style={{color: '#686346'}}>
              Fill out this application to start earning money from QR code scans. We will review your application and get back to you soon.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={applicationForm.handleSubmit(onSubmitApplication)} className="space-y-6">
              {/* Account Information */}
              <div className="space-y-4 p-6 border-2" style={{backgroundColor: '#F5F3F1', borderColor: '#9A7B60', borderRadius: '15px'}}>
                <h3 className="text-xl font-black" style={{color: '#1D2915'}}>Account Information</h3>
                
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-bold" style={{color: '#1D2915'}}>Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...applicationForm.register("email")}
                    placeholder="Enter your email address"
                    className="liquid-glass-input text-gray-900 font-medium"
                  />
                  {applicationForm.formState.errors.email && (
                    <p className="text-sm font-medium" style={{color: '#D2691E'}}>{applicationForm.formState.errors.email.message}</p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-base font-bold" style={{color: '#1D2915'}}>Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    {...applicationForm.register("passwordHash")}
                    placeholder="Create a password"
                    className="liquid-glass-input text-gray-900 font-medium"
                  />
                  {applicationForm.formState.errors.passwordHash && (
                    <p className="text-sm font-medium" style={{color: '#D2691E'}}>{applicationForm.formState.errors.passwordHash.message}</p>
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
                    {...applicationForm.register("fullName")}
                    placeholder="Enter your full name"
                    className="liquid-glass-input text-gray-900 font-medium"
                  />
                  {applicationForm.formState.errors.fullName && (
                    <p className="text-sm font-medium" style={{color: '#D2691E'}}>{applicationForm.formState.errors.fullName.message}</p>
                  )}
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-base font-bold" style={{color: '#1D2915'}}>Street Address *</Label>
                  <Input
                    id="address"
                    {...applicationForm.register("address")}
                    placeholder="Enter your street address"
                    className="liquid-glass-input text-gray-900 font-medium"
                  />
                  {applicationForm.formState.errors.address && (
                    <p className="text-sm font-medium" style={{color: '#D2691E'}}>{applicationForm.formState.errors.address.message}</p>
                  )}
                </div>

                {/* City, State, Zip */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-base font-bold" style={{color: '#1D2915'}}>City *</Label>
                    <Input
                      id="city"
                      {...applicationForm.register("city")}
                      placeholder="City"
                      className="liquid-glass-input text-gray-900 font-medium"
                    />
                    {applicationForm.formState.errors.city && (
                      <p className="text-sm font-medium" style={{color: '#D2691E'}}>{applicationForm.formState.errors.city.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-base font-bold" style={{color: '#1D2915'}}>State *</Label>
                    <Input
                      id="state"
                      {...applicationForm.register("state")}
                      placeholder="State"
                      className="liquid-glass-input text-gray-900 font-medium"
                    />
                    {applicationForm.formState.errors.state && (
                      <p className="text-sm font-medium" style={{color: '#D2691E'}}>{applicationForm.formState.errors.state.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode" className="text-base font-bold" style={{color: '#1D2915'}}>Zip Code *</Label>
                    <Input
                      id="zipCode"
                      {...applicationForm.register("zipCode")}
                      placeholder="Zip"
                      className="liquid-glass-input text-gray-900 font-medium"
                    />
                    {applicationForm.formState.errors.zipCode && (
                      <p className="text-sm font-medium" style={{color: '#D2691E'}}>{applicationForm.formState.errors.zipCode.message}</p>
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
                    {...applicationForm.register("placementDescription")}
                    placeholder="Describe where you plan to place your QR code stickers (e.g., coffee shops, community boards, public spaces, etc.)"
                    rows={4}
                    className="liquid-glass-textarea text-gray-900 font-medium"
                  />
                  <p className="text-sm font-medium" style={{color: '#686346'}}>
                    Please provide specific details about your placement strategy. This helps us approve applications faster.
                  </p>
                  {applicationForm.formState.errors.placementDescription && (
                    <p className="text-sm font-medium" style={{color: '#D2691E'}}>{applicationForm.formState.errors.placementDescription.message}</p>
                  )}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-4 p-6 border-2" style={{backgroundColor: '#F5F3F1', borderColor: '#1D2915', borderRadius: '15px'}}>
                <div className="flex items-start space-x-3">
                  <Controller
                    name="termsAccepted"
                    control={applicationForm.control}
                    render={({ field }) => (
                      <Checkbox
                        id="termsAccepted"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-1 data-[state=checked]:bg-[#9A7B60] data-[state=checked]:border-[#9A7B60]"
                      />
                    )}
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
                {applicationForm.formState.errors.termsAccepted && (
                  <p className="text-sm font-medium" style={{color: '#D2691E'}}>{applicationForm.formState.errors.termsAccepted.message}</p>
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