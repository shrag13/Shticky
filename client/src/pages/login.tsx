import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { ArrowLeft } from "lucide-react";
import { z } from "zod";
import logoPath from "@assets/IMG_20250628_212758_407_1754151926865.webp";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const { toast } = useToast();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginForm) => {
      await apiRequest("POST", "/api/auth/login", data);
    },
    onSuccess: () => {
      window.location.href = '/';
    },
    onError: (error) => {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid email or password",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginForm) => {
    loginMutation.mutate(data);
  };

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
            <span className="ml-2 text-sm" style={{color: '#686346'}}>Sign In</span>
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

      <main className="min-h-screen flex items-center justify-center px-4 pt-28">
        <Card className="w-full max-w-md shadow-lg border-0 bg-white/90 backdrop-blur-sm" style={{borderRadius: '15px'}}>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-black" style={{color: '#1D2915'}}>
              Sign In to Shticky
            </CardTitle>
            <p className="text-center text-lg font-medium" style={{color: '#686346'}}>
              Access your dashboard and start earning
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-bold" style={{color: '#1D2915'}}>Email Address</Label>
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
                <Label htmlFor="password" className="text-base font-bold" style={{color: '#1D2915'}}>Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...form.register("password")}
                  placeholder="Enter your password"
                  className="liquid-glass-input text-gray-900 font-medium"
                />
                {form.formState.errors.password && (
                  <p className="text-sm font-medium" style={{color: '#D2691E'}}>{form.formState.errors.password.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full font-black text-xl px-12 py-6 shadow-2xl transform hover:scale-105 transition-all duration-300 hover:opacity-90 text-white"
                style={{background: 'linear-gradient(135deg, #9A7B60, #A89182, #686346)', borderRadius: '15px'}}
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "SIGNING IN..." : "SIGN IN"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-base font-medium" style={{color: '#686346'}}>
                Don't have an account?{" "}
                <Button 
                  variant="link" 
                  className="p-0 h-auto font-black text-lg underline hover:no-underline"
                  style={{color: '#9A7B60'}}
                  onClick={() => window.location.href = '/application'}
                >
                  Apply to join Shticky
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}