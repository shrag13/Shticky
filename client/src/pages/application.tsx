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
import { CheckCircle } from "lucide-react";

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="h-16 w-16 text-secondary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your application. You'll receive an email once it's reviewed and approved.
            </p>
            <Button onClick={() => window.location.href = '/'} className="w-full">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">Shticky</h1>
              <span className="ml-2 text-sm text-gray-500">Application</span>
            </div>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Join Shticky</CardTitle>
            <p className="text-gray-600">
              Fill out this application to start earning money from QR code scans. 
              We'll review your application and get back to you soon.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Account Information */}
              <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
                
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    placeholder="Enter your email address"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    {...form.register("passwordHash")}
                    placeholder="Create a password"
                  />
                  {form.formState.errors.passwordHash && (
                    <p className="text-sm text-red-600">{form.formState.errors.passwordHash.message}</p>
                  )}
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    {...form.register("fullName")}
                    placeholder="Enter your full name"
                  />
                  {form.formState.errors.fullName && (
                    <p className="text-sm text-red-600">{form.formState.errors.fullName.message}</p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  {...form.register("address")}
                  placeholder="Enter your street address"
                />
                {form.formState.errors.address && (
                  <p className="text-sm text-red-600">{form.formState.errors.address.message}</p>
                )}
              </div>

              {/* City, State, Zip */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    {...form.register("city")}
                    placeholder="City"
                  />
                  {form.formState.errors.city && (
                    <p className="text-sm text-red-600">{form.formState.errors.city.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    {...form.register("state")}
                    placeholder="State"
                  />
                  {form.formState.errors.state && (
                    <p className="text-sm text-red-600">{form.formState.errors.state.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code *</Label>
                  <Input
                    id="zipCode"
                    {...form.register("zipCode")}
                    placeholder="Zip Code"
                  />
                  {form.formState.errors.zipCode && (
                    <p className="text-sm text-red-600">{form.formState.errors.zipCode.message}</p>
                  )}
                </div>
              </div>

              {/* Placement Description */}
              <div className="space-y-2">
                <Label htmlFor="placementDescription">
                  Where do you plan to place your Shticky stickers? *
                </Label>
                <Textarea
                  id="placementDescription"
                  {...form.register("placementDescription")}
                  placeholder="Describe where you plan to place your QR code stickers (e.g., coffee shops, community boards, public spaces, etc.)"
                  rows={4}
                />
                <p className="text-sm text-gray-500">
                  Please provide specific details about your placement strategy. This helps us approve applications faster.
                </p>
                {form.formState.errors.placementDescription && (
                  <p className="text-sm text-red-600">{form.formState.errors.placementDescription.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                disabled={submitApplicationMutation.isPending}
              >
                {submitApplicationMutation.isPending ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Info Section */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-gray-900 mb-3">What happens next?</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>We'll review your application within 2-3 business days</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>You'll receive an email notification once approved</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Approved users can start claiming QR codes and earning money immediately</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Monthly automatic payouts for earnings of $5 or more</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
