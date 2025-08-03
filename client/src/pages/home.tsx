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
import logoPath from "@assets/IMG_20250628_212758_407_1754151926865.webp";

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

  const { data: application } = useQuery<{
    status: string;
  }>({
    queryKey: ["/api/applications/me"],
    retry: false,
  });

  const { data: userStats } = useQuery<{
    totalEarnings: number;
    totalScans: number;
    currentTier: number;
    activeStickers: number;
  }>({
    queryKey: ["/api/users/me/stats"],
    enabled: application?.status === 'approved',
    retry: false,
  });

  const { data: userQrCodes } = useQuery<Array<{
    id: string;
    claimCode: string;
    placementDescription: string;
    scansCount: number;
    earnings: number;
    claimedAt: Date;
  }>>({
    queryKey: ["/api/qr-codes/me"],
    enabled: application?.status === 'approved',
    retry: false,
  });

  const { data: paymentMethod } = useQuery<{
    type: string;
    accountName: string;
    routingNumber?: string;
    accountNumber?: string;
    cashtag?: string;
    paypalEmail?: string;
  }>({
    queryKey: ["/api/payment-methods/me"],
    enabled: application?.status === 'approved',
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

  // Redirect to application status page if no application exists
  if (!application) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to application status page if not approved
  if (application.status !== 'approved') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Main dashboard for approved users
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
            <span className="ml-2 text-sm" style={{color: '#686346'}}>Dashboard</span>
          </div>
          
          <div className="liquid-glass-buttons flex items-center space-x-2.5">
            <div className="flex items-center space-x-2">
              {user?.profileImageUrl && (
                <img 
                  src={user.profileImageUrl} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              <span className="text-sm font-medium" style={{color: '#1D2915'}}>
                {user?.firstName} {user?.lastName}
              </span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="liquid-glass-btn-morph liquid-glass-btn-outline px-4 py-1.5 h-auto text-sm"
              style={{
                backdropFilter: 'blur(8px) saturate(180%) brightness(120%)',
                WebkitBackdropFilter: 'blur(8px) saturate(180%) brightness(120%)',
                background: 'rgba(255, 255, 255, 0.3)'
              }}
              onClick={handleLogout}
            >
              <LogOut className="mr-1 h-3 w-3" />
              Log Out
            </Button>
          </div>
        </div>
      </header>

      {/* Notification Bar */}
      <NotificationBar 
        user={user || { id: '', firstName: '', lastName: '', email: '', profileImageUrl: '' }} 
        hasActiveStickers={userStats?.activeStickers ? userStats.activeStickers > 0 : false} 
        hasPaymentMethod={!!paymentMethod} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
        {/* Welcome Section */}
        <div className="bg-white/90 backdrop-blur-sm shadow-lg p-6 mb-8" style={{borderRadius: '15px'}}>
          <h2 className="text-2xl font-black mb-2" style={{color: '#1D2915'}}>
            Welcome back, {user?.firstName}!
          </h2>
          <p className="text-lg font-medium" style={{color: '#686346'}}>Here's your Shticky performance overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0" style={{borderRadius: '15px', borderLeft: '4px solid #A89182'}}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold" style={{color: '#686346'}}>Total Earnings</p>
                  <p className="text-3xl font-black" style={{color: '#A89182'}}>
                    ${userStats?.totalEarnings?.toFixed(2) || '0.00'}
                  </p>
                  <p className="text-xs font-medium mt-1" style={{color: '#686346'}}>
                    Monthly auto-payout if ≥ $5.00
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{backgroundColor: 'rgba(168, 145, 130, 0.1)', borderRadius: '15px'}}>
                  <DollarSign className="text-xl" style={{color: '#A89182'}} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0" style={{borderRadius: '15px', borderLeft: '4px solid #1D2915'}}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold" style={{color: '#686346'}}>Total Scans</p>
                  <p className="text-3xl font-black" style={{color: '#1D2915'}}>
                    {userStats?.totalScans?.toLocaleString() || '0'}
                  </p>
                  <p className="text-xs font-medium mt-1" style={{color: '#686346'}}>
                    Tier {userStats?.currentTier || 1}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{backgroundColor: 'rgba(29, 41, 21, 0.1)', borderRadius: '15px'}}>
                  <QrCode className="text-xl" style={{color: '#1D2915'}} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0" style={{borderRadius: '15px', borderLeft: '4px solid #9A7B60'}}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold" style={{color: '#686346'}}>Active Shtickys</p>
                  <p className="text-3xl font-black" style={{color: '#9A7B60'}}>
                    {userStats?.activeStickers || 0}
                  </p>
                  <p className="text-xs font-medium mt-1" style={{color: '#686346'}}>
                    Tier {userStats?.currentTier || 1} unlocked
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{backgroundColor: 'rgba(154, 123, 96, 0.1)', borderRadius: '15px'}}>
                  <Star className="text-xl" style={{color: '#9A7B60'}} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0" style={{borderRadius: '15px'}}>
            <CardContent className="p-6">
              <h3 className="text-lg font-black mb-4" style={{color: '#1D2915'}}>Add New Shticky</h3>
              <p className="text-sm font-medium mb-4" style={{color: '#686346'}}>Scan or enter a QR code to claim a new Shticky</p>
              <Button 
                className="w-full font-bold hover:scale-105 transition-all" 
                style={{
                  backgroundColor: '#1D2915',
                  color: 'white',
                  borderRadius: '15px'
                }}
                onClick={() => setShowQrScanner(true)}
              >
                <Camera className="mr-2 h-4 w-4" />
                📸 Scan New Shticky
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0" style={{borderRadius: '15px'}}>
            <CardContent className="p-6">
              <h3 className="text-lg font-black mb-4" style={{color: '#1D2915'}}>Monthly Auto-Payout</h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium" style={{color: '#686346'}}>Auto-payout minimum:</span>
                <span className="font-black" style={{color: '#A89182'}}>$5.00</span>
              </div>
              <div className="rounded-full h-2 mb-4" style={{backgroundColor: 'rgba(168, 145, 130, 0.2)', borderRadius: '15px'}}>
                <div 
                  className="h-2 rounded-full transition-all duration-300" 
                  style={{ 
                    width: `${getWithdrawalProgress()}%`,
                    backgroundColor: '#A89182',
                    borderRadius: '15px'
                  }}
                ></div>
              </div>
              <p className="text-xs font-medium mb-4" style={{color: '#686346'}}>
                Automatic payouts on the last day of each month if balance ≥ $5.00
              </p>
              <Button 
                className="w-full font-bold hover:scale-105 transition-all" 
                style={{
                  backgroundColor: '#A89182',
                  color: 'white',
                  borderRadius: '15px'
                }}
                onClick={() => setShowWithdrawal(true)}
              >
                <Wallet className="mr-2 h-4 w-4" />
                Set Payment Method
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* My Shtickys Table */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0" style={{borderRadius: '15px'}}>
          <CardHeader>
            <CardTitle className="text-xl font-black" style={{color: '#1D2915'}}>My Shtickys</CardTitle>
            <p className="text-sm font-medium" style={{color: '#686346'}}>Track performance of your claimed Shtickys</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead style={{backgroundColor: 'rgba(168, 145, 130, 0.1)', borderRadius: '15px 15px 0 0'}}>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{color: '#1D2915'}}>
                      Shticky ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{color: '#1D2915'}}>
                      Scans
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{color: '#1D2915'}}>
                      Earnings
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{color: '#1D2915'}}>
                      Tier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{color: '#1D2915'}}>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white/50">
                  {userQrCodes?.map((qr) => {
                    const tierInfo = getTierBadge(qr.scansCount || 0);
                    return (
                      <tr key={qr.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded flex items-center justify-center mr-3" style={{backgroundColor: 'rgba(29, 41, 21, 0.1)', borderRadius: '15px'}}>
                              <QrCode className="text-sm" style={{color: '#1D2915'}} />
                            </div>
                            <span className="text-sm font-bold" style={{color: '#1D2915'}}>{qr.claimCode}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" style={{color: '#1D2915'}}>
                          {qr.scansCount?.toLocaleString() || '0'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-black" style={{color: '#A89182'}}>
                          ${qr.earnings?.toFixed(2) || '0.00'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={tierInfo.color}>
                            {tierInfo.label}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className="font-bold" style={{backgroundColor: 'rgba(154, 123, 96, 0.1)', color: '#9A7B60'}}>
                            Active
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                  {(!userQrCodes || userQrCodes.length === 0) && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-sm font-medium" style={{color: '#686346'}}>
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
      <footer className="bg-white/90 backdrop-blur-sm mt-16" style={{borderTop: '1px solid rgba(168, 145, 130, 0.3)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <h3 className="text-lg font-black" style={{color: '#1D2915'}}>Shticky</h3>
              <span className="ml-2 text-sm font-medium" style={{color: '#686346'}}>© 2024 All rights reserved</span>
            </div>
            <div className="flex space-x-6 text-sm font-medium" style={{color: '#686346'}}>
              <a href="#" className="transition-colors" style={{color: '#686346'}} onMouseEnter={(e) => e.target.style.color = '#1D2915'} onMouseLeave={(e) => e.target.style.color = '#686346'}>Support</a>
              <a href="#" className="transition-colors" style={{color: '#686346'}} onMouseEnter={(e) => e.target.style.color = '#1D2915'} onMouseLeave={(e) => e.target.style.color = '#686346'}>Terms</a>
              <a href="#" className="transition-colors" style={{color: '#686346'}} onMouseEnter={(e) => e.target.style.color = '#1D2915'} onMouseLeave={(e) => e.target.style.color = '#686346'}>Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
