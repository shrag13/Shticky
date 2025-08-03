import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { usePageTitle } from "@/hooks/usePageTitle";
import { apiRequest } from "@/lib/queryClient";
import { 
  Users, 
  FileText, 
  BarChart3, 
  DollarSign, 
  Activity,
  CheckCircle,
  XCircle,
  Eye,
  Crown,
  Shield
} from "lucide-react";
import logoPath from "@assets/IMG_20250628_212758_407_1754151926865.webp";
import { z } from "zod";

const adminLoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type AdminLoginForm = z.infer<typeof adminLoginSchema>;

interface AdminStats {
  totalPaidOut: number;
  totalToPayOutThisMonth: number;
  totalActiveStickers: number;
  totalScans: number;
}

interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  totalEarnings: number;
  totalScans: number;
  activeStickers: number;
  createdAt: string;
}

interface Application {
  id: string;
  email: string;
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  placementDescription: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
}

export default function AdminPanel() {
  usePageTitle("Admin Panel");
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  // Check if already authenticated as admin
  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        // First check if authenticated through main system as admin
        const userResponse = await apiRequest("GET", "/api/auth/user");
        if (userResponse && (userResponse as any).isAdmin) {
          setIsLoggedIn(true);
          return;
        }
      } catch (error) {
        // Not authenticated through main system, try admin endpoint
        try {
          const response = await apiRequest("GET", "/api/admin/stats");
          if (response) {
            setIsLoggedIn(true);
          }
        } catch (adminError) {
          // Not authenticated, stay on login form
          setIsLoggedIn(false);
        }
      }
    };
    checkAdminAuth();
  }, []);

  const loginForm = useForm<AdminLoginForm>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: AdminLoginForm) => {
      const response = await apiRequest("POST", "/api/admin/login", data);
      return response;
    },
    onSuccess: () => {
      setIsLoggedIn(true);
      toast({
        title: "Admin access granted",
        description: "Welcome to the admin panel.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const { data: adminStats } = useQuery<AdminStats>({
    queryKey: ['/api/admin/stats'],
    enabled: isLoggedIn,
  });

  const { data: users } = useQuery<AdminUser[]>({
    queryKey: ['/api/admin/users'],
    enabled: isLoggedIn,
  });

  const { data: applications } = useQuery<Application[]>({
    queryKey: ['/api/admin/applications'],
    enabled: isLoggedIn,
  });

  const reviewApplicationMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'approved' | 'rejected' }) => {
      return await apiRequest("PATCH", `/api/admin/applications/${id}/review`, { status });
    },
    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/applications'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/stats'] });
      toast({
        title: `Application ${status}`,
        description: `The application has been ${status}.`,
      });
      setSelectedApplication(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Review failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmitLogin = (data: AdminLoginForm) => {
    loginMutation.mutate(data);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #EFEFEE 0%, #A89182 50%, #9A7B60 100%)'}}>
        {/* Header */}
        <header className="liquid-glass-morphing fixed top-0 left-0 right-0 z-50">
          <div className="liquid-glass-content flex items-center justify-between px-6 py-2">
            <div className="liquid-glass-brand flex items-center space-x-2.5">
              <div className="liquid-glass-logo-morph">
                <img src={logoPath} alt="Shticky" className="w-8 h-8 rounded-[10px] object-cover" />
              </div>
              <span className="liquid-glass-text-morph text-lg font-semibold" style={{color: '#1D2915'}}>
                Shticky Admin
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" style={{color: '#9A7B60'}} />
              <span className="text-sm font-medium" style={{color: '#686346'}}>
                Admin Access
              </span>
            </div>
          </div>
        </header>

        <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm" style={{borderRadius: '15px'}}>
            <CardHeader>
              <CardTitle className="text-2xl font-black text-center" style={{color: '#1D2915'}}>
                <Crown className="inline mr-2 h-6 w-6" style={{color: '#9A7B60'}} />
                Admin Login
              </CardTitle>
              <p className="text-lg font-medium text-center" style={{color: '#686346'}}>
                Secure access to administrative controls
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={loginForm.handleSubmit(onSubmitLogin)} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-base font-semibold" style={{color: '#1D2915'}}>
                      Username
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter admin username"
                      className="h-12 text-base border-2"
                      style={{
                        borderColor: '#A89182',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      }}
                      {...loginForm.register("username")}
                    />
                    {loginForm.formState.errors.username && (
                      <p className="text-sm text-red-600">{loginForm.formState.errors.username.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-base font-semibold" style={{color: '#1D2915'}}>
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter admin password"
                      className="h-12 text-base border-2"
                      style={{
                        borderColor: '#A89182',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      }}
                      {...loginForm.register("password")}
                    />
                    {loginForm.formState.errors.password && (
                      <p className="text-sm text-red-600">{loginForm.formState.errors.password.message}</p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-bold rounded-lg transition-all duration-200"
                  style={{
                    backgroundColor: '#1D2915',
                    color: '#EFEFEE',
                  }}
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Authenticating...</span>
                    </div>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Access Admin Panel
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: '#EFEFEE'}}>
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b" style={{borderColor: '#A89182'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <img src={logoPath} alt="Shticky" className="w-8 h-8 rounded-lg object-cover" />
              <h1 className="text-2xl font-black" style={{color: '#1D2915'}}>
                Shticky Admin Panel
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="px-3 py-1" style={{backgroundColor: '#9A7B60', color: '#EFEFEE'}}>
                <Crown className="mr-1 h-3 w-3" />
                Administrator
              </Badge>
              <Button
                variant="outline"
                onClick={() => {
                  setIsLoggedIn(false);
                  queryClient.clear();
                }}
                style={{borderColor: '#A89182', color: '#686346'}}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3" style={{backgroundColor: '#A89182'}}>
            <TabsTrigger 
              value="dashboard" 
              className="data-[state=active]:bg-white data-[state=active]:text-gray-900"
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="users"
              className="data-[state=active]:bg-white data-[state=active]:text-gray-900"
            >
              <Users className="mr-2 h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger 
              value="applications"
              className="data-[state=active]:bg-white data-[state=active]:text-gray-900"
            >
              <FileText className="mr-2 h-4 w-4" />
              Applications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Paid Out</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${(adminStats?.totalPaidOut || 0).toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                    Completed payouts
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">To Pay This Month</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${(adminStats?.totalToPayOutThisMonth || 0).toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                    Users above $5 threshold
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Shtickies</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminStats?.totalActiveStickers || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    QR codes in circulation
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminStats?.totalScans || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    All-time QR scans
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <p className="text-muted-foreground">
                  View and manage all registered users
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users && users.map((user: AdminUser) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedUser(user)}
                      style={{borderColor: '#A89182'}}
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div>
                            <h3 className="font-semibold">{user.firstName} {user.lastName}</h3>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div>${user.totalEarnings.toFixed(2)}</div>
                        <div>{user.totalScans} scans</div>
                        <div>{user.activeStickers} stickers</div>
                        <Eye className="h-4 w-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* User Detail Modal */}
            {selectedUser && (
              <Card className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">User Details</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedUser(null)}
                    >
                      ×
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="font-semibold">Name:</label>
                      <p>{selectedUser.firstName} {selectedUser.lastName}</p>
                    </div>
                    <div>
                      <label className="font-semibold">Email:</label>
                      <p>{selectedUser.email}</p>
                    </div>
                    <div>
                      <label className="font-semibold">Total Earnings:</label>
                      <p>${selectedUser.totalEarnings.toFixed(2)}</p>
                    </div>
                    <div>
                      <label className="font-semibold">Total Scans:</label>
                      <p>{selectedUser.totalScans}</p>
                    </div>
                    <div>
                      <label className="font-semibold">Active Stickers:</label>
                      <p>{selectedUser.activeStickers}</p>
                    </div>
                    <div>
                      <label className="font-semibold">Member Since:</label>
                      <p>{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Management</CardTitle>
                <p className="text-muted-foreground">
                  Review and process user applications
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications && applications.map((app: Application) => (
                    <div
                      key={app.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                      style={{borderColor: '#A89182'}}
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div>
                            <h3 className="font-semibold">{app.fullName}</h3>
                            <p className="text-sm text-muted-foreground">{app.email}</p>
                            <p className="text-xs text-muted-foreground">
                              {app.city}, {app.state}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge 
                          variant={
                            app.status === 'approved' ? 'default' : 
                            app.status === 'rejected' ? 'destructive' : 
                            'secondary'
                          }
                        >
                          {app.status}
                        </Badge>
                        {app.status === 'pending' && (
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => reviewApplicationMutation.mutate({ id: app.id, status: 'approved' })}
                              disabled={reviewApplicationMutation.isPending}
                              style={{borderColor: '#1D2915', color: '#1D2915'}}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => reviewApplicationMutation.mutate({ id: app.id, status: 'rejected' })}
                              disabled={reviewApplicationMutation.isPending}
                              style={{borderColor: '#dc2626', color: '#dc2626'}}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedApplication(app)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Application Detail Modal */}
            {selectedApplication && (
              <Card className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Application Details</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedApplication(null)}
                    >
                      ×
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="font-semibold">Name:</label>
                      <p>{selectedApplication.fullName}</p>
                    </div>
                    <div>
                      <label className="font-semibold">Email:</label>
                      <p>{selectedApplication.email}</p>
                    </div>
                    <div>
                      <label className="font-semibold">Address:</label>
                      <p>{selectedApplication.address}</p>
                      <p>{selectedApplication.city}, {selectedApplication.state} {selectedApplication.zipCode}</p>
                    </div>
                    <div>
                      <label className="font-semibold">Placement Description:</label>
                      <p className="text-sm">{selectedApplication.placementDescription}</p>
                    </div>
                    <div>
                      <label className="font-semibold">Status:</label>
                      <Badge 
                        variant={
                          selectedApplication.status === 'approved' ? 'default' : 
                          selectedApplication.status === 'rejected' ? 'destructive' : 
                          'secondary'
                        }
                      >
                        {selectedApplication.status}
                      </Badge>
                    </div>
                    <div>
                      <label className="font-semibold">Submitted:</label>
                      <p>{new Date(selectedApplication.submittedAt).toLocaleString()}</p>
                    </div>
                    {selectedApplication.reviewedAt && (
                      <div>
                        <label className="font-semibold">Reviewed:</label>
                        <p>{new Date(selectedApplication.reviewedAt).toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                  {selectedApplication.status === 'pending' && (
                    <div className="flex space-x-3 mt-6">
                      <Button
                        className="flex-1"
                        onClick={() => reviewApplicationMutation.mutate({ id: selectedApplication.id, status: 'approved' })}
                        disabled={reviewApplicationMutation.isPending}
                        style={{backgroundColor: '#1D2915', color: '#EFEFEE'}}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve Application
                      </Button>
                      <Button
                        variant="destructive"
                        className="flex-1"
                        onClick={() => reviewApplicationMutation.mutate({ id: selectedApplication.id, status: 'rejected' })}
                        disabled={reviewApplicationMutation.isPending}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject Application
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}