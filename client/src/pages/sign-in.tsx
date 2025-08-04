import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { usePageTitle } from "@/hooks/usePageTitle";
import { apiRequest } from "@/lib/queryClient";
import { ArrowLeft, LogIn } from "lucide-react";
import logoPath from "@assets/IMG_20250628_212758_407_1754151926865.webp";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function SignIn() {
  usePageTitle("Sign In");
  
  const { toast } = useToast();
  const { user, isLoading, isAuthenticated } = useAuth();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      window.location.href = "/dashboard";
    }
  }, [isAuthenticated, isLoading]);

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginForm) => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        // Check if this is an application status error
        if (response.status === 403 && result.redirectTo) {
          throw new Error(JSON.stringify({
            message: result.message,
            redirectTo: result.redirectTo,
            applicationStatus: result.applicationStatus
          }));
        }
        throw new Error(result.message || "Login failed");
      }

      return result;
    },
    onSuccess: () => {
      toast({
        title: "Welcome back!",
        description: "You have been successfully signed in.",
      });
      window.location.href = "/dashboard";
    },
    onError: (error: Error) => {
      try {
        const errorData = JSON.parse(error.message);
        if (errorData.redirectTo) {
          // Show appropriate message based on application status
          const statusMessage = errorData.applicationStatus === 'pending' 
            ? "Your application is still under review. Redirecting to status page..."
            : "Your application was not approved. Redirecting to status page...";
          
          toast({
            title: errorData.applicationStatus === 'pending' ? "Application Under Review" : "Application Not Approved",
            description: statusMessage,
            variant: errorData.applicationStatus === 'pending' ? "default" : "destructive",
          });
          
          // Redirect after showing toast with email for status lookup
          setTimeout(() => {
            const email = loginForm.getValues("email");
            window.location.href = `${errorData.redirectTo}?from=signin&email=${encodeURIComponent(email)}&status=${errorData.applicationStatus}`;
          }, 2000);
          return;
        }
      } catch {
        // Not a JSON error, handle normally
      }

      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmitLogin = (data: LoginForm) => {
    loginMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
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
          </div>
          
          <div className="liquid-glass-buttons">
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

          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm" style={{borderRadius: '15px'}}>
          <CardHeader>
            <CardTitle className="text-2xl font-black text-center" style={{color: '#1D2915'}}>
              <LogIn className="inline mr-2 h-6 w-6" style={{color: '#9A7B60'}} />
              Welcome Back
            </CardTitle>
            <p className="text-lg font-medium text-center" style={{color: '#686346'}}>
              Sign in to access your dashboard and manage your Shticky account.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={loginForm.handleSubmit(onSubmitLogin)} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-base font-bold" style={{color: '#1D2915'}}>Email Address *</Label>
                  <Input
                    id="login-email"
                    type="email"
                    {...loginForm.register("email")}
                    placeholder="Enter your email address"
                    className="liquid-glass-input text-gray-900 font-medium"
                  />
                  {loginForm.formState.errors.email && (
                    <p className="text-sm font-medium" style={{color: '#D2691E'}}>{loginForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-base font-bold" style={{color: '#1D2915'}}>Password *</Label>
                  <Input
                    id="login-password"
                    type="password"
                    {...loginForm.register("password")}
                    placeholder="Enter your password"
                    className="liquid-glass-input text-gray-900 font-medium"
                  />
                  {loginForm.formState.errors.password && (
                    <p className="text-sm font-medium" style={{color: '#D2691E'}}>{loginForm.formState.errors.password.message}</p>
                  )}
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={loginMutation.isPending}
                className="w-full font-black text-lg px-8 py-4 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 hover:opacity-90 text-white"
                style={{background: 'linear-gradient(135deg, #9A7B60, #A89182, #686346)'}}
              >
                {loginMutation.isPending ? 'SIGNING IN...' : 'SIGN IN'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm font-medium" style={{color: '#686346'}}>
                Don't have an account?{" "}
                <a href="/application" className="font-bold underline hover:no-underline" style={{color: '#9A7B60'}}>
                  Apply here
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}