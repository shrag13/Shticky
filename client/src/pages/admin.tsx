import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { CheckCircle, XCircle, Clock, LogOut } from "lucide-react";

export default function Admin() {
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
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: applications } = useQuery({
    queryKey: ["/api/admin/applications"],
    retry: false,
  });

  const reviewMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      await apiRequest(`/api/admin/applications/${id}/review`, {
        method: "PATCH",
        body: { status },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/applications"] });
      toast({
        title: "Application Reviewed",
        description: "Application status updated successfully",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive",
      });
    },
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">Shticky Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {user?.profileImageUrl && (
                  <img 
                    src={user.profileImageUrl} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <span className="text-sm font-medium">
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Pending Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applications?.map((app: any) => (
                <div key={app.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">{app.fullName}</h3>
                      <p className="text-sm text-gray-600">{app.address}</p>
                      <p className="text-sm text-gray-600">{app.city}, {app.state} {app.zipCode}</p>
                    </div>
                    <Badge>
                      <Clock className="w-3 h-3 mr-1" />
                      {app.status}
                    </Badge>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Placement Description:</h4>
                    <p className="text-sm text-gray-600">{app.placementDescription}</p>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => reviewMutation.mutate({ id: app.id, status: "approved" })}
                      disabled={reviewMutation.isPending}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => reviewMutation.mutate({ id: app.id, status: "rejected" })}
                      disabled={reviewMutation.isPending}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
              
              {(!applications || applications.length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  No pending applications
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}