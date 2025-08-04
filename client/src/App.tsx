import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import Application from "@/pages/application";
import ApplicationStatus from "@/pages/application-status";
import SignIn from "@/pages/sign-in";
import Admin from "@/pages/admin";
import AdminPanel from "@/pages/admin-panel";
import SecureVault from "@/pages/secure-vault";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/home" component={Home} />
      <Route path="/dashboard" component={Home} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/application" component={Application} />
      <Route path="/application-status" component={ApplicationStatus} />
      <Route path="/admin" component={Admin} />
      <Route path="/admin-panel" component={AdminPanel} />
      <Route path="/admin-vault" component={SecureVault} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="shticky-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
