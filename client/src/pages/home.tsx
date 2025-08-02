import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { QrCode, DollarSign, Star, Camera, Wallet, LogOut } from "lucide-react";
import QrScannerModal from "@/components/qr-scanner-modal";
import WithdrawalModal from "@/components/withdrawal-modal";
import NotificationBar from "@/components/notification-bar";

export default function Home() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [showQrScanner, setShowQrScanner] = useState(false);
  const [showWithdrawal, setShowWithdrawal] = useState(false);

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

  const { data: application } = useQuery({
    queryKey: ["/api/applications/me"],
    retry: false,
  });

  const { data: userStats } = useQuery({
    queryKey: ["/api/users/me/stats"],
    enabled: application?.status === 'approved',
    retry: false,
  });

  const { data: userQrCodes } = useQuery({
    queryKey: ["/api/qr-codes/me"],
    enabled: application?.status === 'approved',
    retry: false,
  });

  const { data: paymentMethod } = useQuery({
    queryKey: ["/api/payment-methods/me"],
    enabled: application?.status === 'approved',
    retry: false,
  });

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      window.location.href = '/api/logout';
    }
  };

  const getTierBadge = (scans: number) => {
    if (scans >= 1000) return { tier: 3, label: "Tier 3", color: "bg-purple-100 text-purple-800" };
    if (scans >= 500) return { tier: 2, label: "Tier 2", color: "bg-accent bg-opacity-10 text-accent" };
    return { tier: 1, label: "Tier 1", color: "bg-blue-100 text-blue-800" };
  };

  const getWithdrawalProgress = () => {
    if (!userStats) return 0;
    return Math.min((userStats.totalEarnings / 5) * 100, 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show application form if no application exists
  if (!application) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <CardTitle className="text-center">Welcome to Shticky!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              You need to submit an application to start earning with Shticky.
            </p>
            <Button 
              onClick={() => window.location.href = '/application'}
              className="w-full"
            >
              Submit Application
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show application status if pending or rejected
  if (application.status !== 'approved') {
    const statusConfig = {
      pending: {
        title: "Application Under Review",
        description: "Your application is being reviewed. You'll receive an email once it's approved.",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50 border-yellow-200"
      },
      rejected: {
        title: "Application Not Approved",
        description: "Unfortunately, your application was not approved at this time.",
        color: "text-red-600",
        bgColor: "bg-red-50 border-red-200"
      }
    };

    const config = statusConfig[application.status as keyof typeof statusConfig];

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-primary">Shticky</h1>
                <span className="ml-2 text-sm text-gray-500">Earn from QR scans</span>
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
          <Card className={`border ${config.bgColor}`}>
            <CardContent className="pt-6">
              <div className="text-center">
                <h2 className={`text-xl font-semibold ${config.color} mb-2`}>
                  {config.title}
                </h2>
                <p className="text-gray-600">{config.description}</p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  // Main dashboard for approved users
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">Shticky</h1>
              <span className="ml-2 text-sm text-gray-500">Earn from QR scans</span>
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

      {/* Notification Bar */}
      {!paymentMethod && <NotificationBar />}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName}!
          </h2>
          <p className="text-gray-600">Here's your Shticky performance overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-l-4 border-secondary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                  <p className="text-3xl font-bold text-secondary">
                    ${userStats?.totalEarnings?.toFixed(2) || '0.00'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Next payout: ${userStats?.totalEarnings?.toFixed(2) || '0.00'}
                  </p>
                </div>
                <div className="w-12 h-12 bg-secondary bg-opacity-10 rounded-lg flex items-center justify-center">
                  <DollarSign className="text-secondary text-xl" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-primary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Scans</p>
                  <p className="text-3xl font-bold text-primary">
                    {userStats?.totalScans?.toLocaleString() || '0'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Tier {userStats?.currentTier || 1}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                  <QrCode className="text-primary text-xl" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-accent">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Shtickys</p>
                  <p className="text-3xl font-bold text-accent">
                    {userStats?.activeStickers || 0}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Tier {userStats?.currentTier || 1} unlocked
                  </p>
                </div>
                <div className="w-12 h-12 bg-accent bg-opacity-10 rounded-lg flex items-center justify-center">
                  <Star className="text-accent text-xl" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Shticky</h3>
              <p className="text-gray-600 mb-4">Scan or enter a QR code to claim a new Shticky</p>
              <Button 
                className="w-full bg-primary hover:bg-primary/90" 
                onClick={() => setShowQrScanner(true)}
              >
                <Camera className="mr-2 h-4 w-4" />
                📸 Scan New Shticky
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Withdrawal</h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Minimum threshold:</span>
                <span className="font-medium text-secondary">$5.00</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-secondary h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${getWithdrawalProgress()}%` }}
                ></div>
              </div>
              <Button 
                className="w-full bg-secondary hover:bg-secondary/90" 
                onClick={() => setShowWithdrawal(true)}
              >
                <Wallet className="mr-2 h-4 w-4" />
                💰 Manage Withdrawal
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* My Shtickys Table */}
        <Card>
          <CardHeader>
            <CardTitle>My Shtickys</CardTitle>
            <p className="text-sm text-gray-600">Track performance of your claimed Shtickys</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Shticky ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Scans
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Earnings
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userQrCodes?.map((qr) => {
                    const tierInfo = getTierBadge(qr.totalScans);
                    return (
                      <tr key={qr.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-primary bg-opacity-10 rounded flex items-center justify-center mr-3">
                              <QrCode className="text-primary text-sm" />
                            </div>
                            <span className="text-sm font-medium text-gray-900">{qr.id}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {qr.totalScans.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary">
                          ${parseFloat(qr.totalEarnings).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={tierInfo.color}>
                            {tierInfo.label}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className="bg-secondary bg-opacity-10 text-secondary">
                            Active
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                  {(!userQrCodes || userQrCodes.length === 0) && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                        No Shtickys claimed yet. Scan your first QR code to get started!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Modals */}
      <QrScannerModal 
        isOpen={showQrScanner} 
        onClose={() => setShowQrScanner(false)} 
      />
      <WithdrawalModal 
        isOpen={showWithdrawal} 
        onClose={() => setShowWithdrawal(false)} 
      />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <h3 className="text-lg font-bold text-primary">Shticky</h3>
              <span className="ml-2 text-sm text-gray-500">© 2024 All rights reserved</span>
            </div>
            <div className="flex space-x-6 text-sm text-gray-600">
              <a href="#" className="hover:text-primary">Support</a>
              <a href="#" className="hover:text-primary">Terms</a>
              <a href="#" className="hover:text-primary">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
