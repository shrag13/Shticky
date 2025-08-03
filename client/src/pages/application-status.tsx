import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Clock, XCircle, CheckCircle, ArrowLeft, LogOut } from "lucide-react";
import logoPath from "@assets/20250701_023412_0000_1754186769563.png";

export default function ApplicationStatus() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/application";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: application } = useQuery<{
    status: string;
    submittedAt: string;
    fullName: string;
    placementDescription: string;
  }>({
    queryKey: ["/api/applications/me"],
    retry: false,
  });

  const handleLogout = async () => {
    if (confirm('Are you sure you want to log out?')) {
      try {
        await fetch('/api/auth/logout', { method: 'POST' });
        window.location.href = '/';
      } catch (error) {
        console.error('Logout error:', error);
        // Fallback - redirect anyway
        window.location.href = '/';
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: 'linear-gradient(135deg, #EFEFEE 0%, #A89182 50%, #9A7B60 100%)'}}>
        <div className="flex flex-col items-center space-y-4">
          <img src={logoPath} alt="Shticky" className="w-16 h-16 rounded-xl object-cover" />
          <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{borderColor: '#1D2915'}}></div>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #EFEFEE 0%, #A89182 50%, #9A7B60 100%)'}}>
        <main className="min-h-screen flex items-center justify-center px-4">
          <Card className="w-full max-w-md shadow-lg border-0 bg-white/90 backdrop-blur-sm" style={{borderRadius: '15px'}}>
            <CardHeader>
              <CardTitle className="text-center text-2xl font-black" style={{color: '#1D2915'}}>
                No Application Found
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-base font-medium mb-6" style={{color: '#686346'}}>
                You need to submit an application to start earning with Shticky.
              </p>
              <Button 
                onClick={() => window.location.href = '/application'}
                className="w-full font-black text-xl px-12 py-6 shadow-2xl transform hover:scale-105 transition-all duration-300 hover:opacity-90 text-white"
                style={{background: 'linear-gradient(135deg, #9A7B60, #A89182, #686346)', borderRadius: '15px'}}
              >
                SUBMIT APPLICATION
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const getStatusConfig = () => {
    switch (application.status) {
      case 'pending':
        return {
          title: "Application Under Review",
          description: "Your application is being reviewed by our team. We'll send you an email once it's been processed. This usually takes 1-3 business days.",
          icon: <Clock className="h-12 w-12" style={{color: '#A89182'}} />,
          badgeText: "Pending Review",
          badgeColor: "bg-yellow-100 text-yellow-800",
          actionText: "Your application is in the queue and will be reviewed soon."
        };
      case 'rejected':
        return {
          title: "Application Not Approved",
          description: "Unfortunately, your application was not approved at this time. You may submit a new application after reviewing our requirements.",
          icon: <XCircle className="h-12 w-12" style={{color: '#D2691E'}} />,
          badgeText: "Not Approved",
          badgeColor: "bg-red-100 text-red-800",
          actionText: "Please review our guidelines and consider reapplying."
        };
      default:
        return {
          title: "Application Approved",
          description: "Congratulations! Your application has been approved. You can now start earning with Shticky.",
          icon: <CheckCircle className="h-12 w-12" style={{color: '#1D2915'}} />,
          badgeText: "Approved",
          badgeColor: "bg-green-100 text-green-800",
          actionText: "Welcome to Shticky! You can now access your dashboard."
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #EFEFEE 0%, #A89182 50%, #9A7B60 100%)'}}>
      {/* Liquid Glass Header */}
      <header className="liquid-glass-morphing fixed top-0 left-0 right-0 z-50">
        <div className="liquid-glass-content flex items-center justify-between px-6 py-2">
          <div className="liquid-glass-brand flex items-center space-x-2.5">
            <div className="liquid-glass-logo-morph">
              <img src={logoPath} alt="Logo" className="w-8 h-8 rounded-[10px] object-cover" />
            </div>
            <span className="ml-2 text-sm" style={{color: '#686346'}}>Application Status</span>
          </div>
          
          <div className="liquid-glass-buttons flex items-center space-x-2.5">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium" style={{color: '#1D2915'}}>
                {user?.firstName || ''} {user?.lastName || ''}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="min-h-screen flex items-center justify-center px-4 pt-28">
        <Card className="w-full max-w-2xl shadow-lg border-0 bg-white/90 backdrop-blur-sm" style={{borderRadius: '15px'}}>
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              {statusConfig.icon}
            </div>
            <CardTitle className="text-3xl font-black mb-2" style={{color: '#1D2915'}}>
              {statusConfig.title}
            </CardTitle>
            <Badge className={`mx-auto text-sm font-bold px-4 py-1 ${statusConfig.badgeColor}`} style={{borderRadius: '15px'}}>
              {statusConfig.badgeText}
            </Badge>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <p className="text-lg font-medium text-center leading-relaxed" style={{color: '#686346'}}>
              {statusConfig.description}
            </p>
            
            {application.submittedAt && (
              <div className="bg-gray-50 rounded-lg p-4" style={{borderRadius: '15px'}}>
                <h4 className="font-bold text-base mb-3" style={{color: '#1D2915'}}>Application Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium" style={{color: '#686346'}}>Submitted:</span>
                    <span className="font-bold" style={{color: '#1D2915'}}>
                      {new Date(application.submittedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium" style={{color: '#686346'}}>Applicant:</span>
                    <span className="font-bold" style={{color: '#1D2915'}}>
                      {application.fullName}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="text-center">
              <p className="text-base font-medium mb-6" style={{color: '#686346'}}>
                {statusConfig.actionText}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {application.status === 'approved' && (
                  <Button 
                    onClick={() => window.location.href = '/'}
                    className="font-black text-lg px-8 py-4 shadow-2xl transform hover:scale-105 transition-all duration-300 hover:opacity-90 text-white"
                    style={{background: 'linear-gradient(135deg, #9A7B60, #A89182, #686346)', borderRadius: '15px'}}
                  >
                    GO TO DASHBOARD
                  </Button>
                )}
                
                {application.status === 'rejected' && (
                  <Button 
                    onClick={() => window.location.href = '/application'}
                    className="font-black text-lg px-8 py-4 shadow-2xl transform hover:scale-105 transition-all duration-300 hover:opacity-90 text-white"
                    style={{background: 'linear-gradient(135deg, #9A7B60, #A89182, #686346)', borderRadius: '15px'}}
                  >
                    SUBMIT NEW APPLICATION
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = '/'}
                  className="font-bold text-base px-6 py-4 border-2 hover:bg-gray-50"
                  style={{borderColor: '#A89182', color: '#1D2915', borderRadius: '15px'}}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}