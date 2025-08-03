import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { QrCode, DollarSign, Star, Camera, Wallet, LogOut, Keyboard, User } from "lucide-react";
import QrScannerModal from "@/components/qr-scanner-modal";
import WithdrawalModal from "@/components/withdrawal-modal";
import ManualEntryModal from "@/components/manual-entry-modal";
import NotificationBar from "@/components/notification-bar";
import logoPath from "@assets/20250701_023412_0000_1754186769563.png";

export default function Home() {
  usePageTitle("Dashboard");
  
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [showQrScanner, setShowQrScanner] = useState(false);
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/sign-in";
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
      <div className="min-h-screen flex items-center justify-center" style={{background: 'linear-gradient(135deg, #EFEFEE 0%, #A89182 50%, #9A7B60 100%)'}}>
        <div className="flex flex-col items-center space-y-4">
          <img src={logoPath} alt="Shticky" className="w-16 h-16 rounded-xl object-cover" />
          <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{borderColor: '#1D2915'}}></div>
        </div>
      </div>
    );
  }

  // Redirect to application status page if no application exists
  if (!application) {
    window.location.href = "/application-status";
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: 'linear-gradient(135deg, #EFEFEE 0%, #A89182 50%, #9A7B60 100%)'}}>
        <div className="flex flex-col items-center space-y-4">
          <img src={logoPath} alt="Shticky" className="w-16 h-16 rounded-xl object-cover" />
          <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{borderColor: '#1D2915'}}></div>
        </div>
      </div>
    );
  }

  // Redirect to application status page if not approved
  if (application.status !== 'approved') {
    window.location.href = "/application-status";
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: 'linear-gradient(135deg, #EFEFEE 0%, #A89182 50%, #9A7B60 100%)'}}>
        <div className="flex flex-col items-center space-y-4">
          <img src={logoPath} alt="Shticky" className="w-16 h-16 rounded-xl object-cover" />
          <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{borderColor: '#1D2915'}}></div>
        </div>
      </div>
    );
  }

  // Main dashboard for approved users
  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #EFEFEE 0%, #A89182 50%, #9A7B60 100%)'}}>
      {/* Liquid Glass Header */}
      <header className="liquid-glass-morphing fixed top-0 left-0 right-0 z-50">
        <div className="liquid-glass-content flex items-center justify-between px-6 py-2">
          <div className="liquid-glass-brand flex items-center">
            <div className="liquid-glass-logo-morph">
              <img src={logoPath} alt="Logo" className="w-8 h-8 rounded-[10px] object-cover" />
            </div>
          </div>
          
          <div className="liquid-glass-buttons flex items-center space-x-2.5">
            <Button 
              variant="ghost" 
              size="sm" 
              className="liquid-glass-btn-morph liquid-glass-btn-outline w-8 h-8 p-0 transition-transform duration-300 hover:transform hover:-translate-y-1 flex items-center justify-center rounded-none"
              style={{
                backdropFilter: 'blur(8px) saturate(180%) brightness(120%)',
                WebkitBackdropFilter: 'blur(8px) saturate(180%) brightness(120%)',
                background: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '0 !important'
              }}
              onClick={() => {
                // Could add profile menu functionality here later
                console.log("Profile clicked");
              }}
            >
              <User className="h-3 w-3" style={{color: '#1D2915'}} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="liquid-glass-btn-morph liquid-glass-btn-outline w-8 h-8 p-0 transition-transform duration-300 hover:transform hover:-translate-y-1 flex items-center justify-center rounded-none"
              style={{
                backdropFilter: 'blur(8px) saturate(180%) brightness(120%)',
                WebkitBackdropFilter: 'blur(8px) saturate(180%) brightness(120%)',
                background: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '0 !important'
              }}
              onClick={handleLogout}
            >
              <LogOut className="h-3 w-3" style={{color: '#1D2915'}} />
            </Button>
          </div>
        </div>
      </header>

      {/* Notification Bar */}
      <NotificationBar 
        user={user} 
        hasActiveStickers={userStats?.activeStickers ? userStats.activeStickers > 0 : false} 
        hasPaymentMethod={!!paymentMethod} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
        {/* Welcome Section */}
        <div className="bg-white/90 backdrop-blur-sm shadow-lg p-6 mb-8" style={{borderRadius: '15px'}}>
          <h2 className="text-2xl font-black mb-2" style={{color: '#1D2915'}}>
            Welcome back, {user?.firstName || 'User'}!
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 md:items-stretch">
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0 flex flex-col h-full" style={{borderRadius: '15px'}}>
            <CardContent className="p-6 flex flex-col flex-grow">
              <h3 className="text-lg font-black mb-2" style={{color: '#1D2915'}}>Add New Shticky</h3>
              <p className="text-sm font-medium mb-3" style={{color: '#686346'}}>Scan or enter a QR code to claim a new Shticky</p>
              <div className="space-y-3 flex-grow flex flex-col justify-end">
                <Button 
                  className="w-full font-bold hover:scale-105 transition-all h-12" 
                  style={{
                    backgroundColor: '#1D2915',
                    color: 'white',
                    borderRadius: '15px'
                  }}
                  onClick={() => setShowQrScanner(true)}
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Scan New Shticky
                </Button>
                
                <Button 
                  className="w-full font-bold hover:scale-105 transition-all border-2 h-12" 
                  variant="outline"
                  style={{
                    borderColor: '#686346',
                    color: '#686346',
                    borderRadius: '15px'
                  }}
                  onClick={() => setShowManualEntry(true)}
                >
                  <Keyboard className="mr-2 h-4 w-4" />
                  Enter New Shticky
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0 flex flex-col h-full" style={{borderRadius: '15px'}}>
            <CardContent className="p-6 flex flex-col flex-grow">
              <h3 className="text-lg font-black mb-2" style={{color: '#1D2915'}}>Monthly Auto-Payout</h3>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium" style={{color: '#686346'}}>Current earnings:</span>
                <span className="text-xl font-black" style={{color: '#A89182'}}>
                  ${(userStats?.totalEarnings || 0).toFixed(2)}
                </span>
              </div>
              <div className="rounded-full h-8 mb-3 flex items-center flex-grow" style={{backgroundColor: 'rgba(168, 145, 130, 0.2)', borderRadius: '15px', maxHeight: '32px'}}>
                <div 
                  className="h-8 rounded-full transition-all duration-300 flex items-center justify-center" 
                  style={{ 
                    width: `${getWithdrawalProgress()}%`,
                    backgroundColor: '#A89182',
                    borderRadius: '15px',
                    minWidth: getWithdrawalProgress() > 0 ? '40px' : '0px'
                  }}
                >
                  {getWithdrawalProgress() > 15 && (
                    <span className="text-white text-xs font-bold">
                      {getWithdrawalProgress()}%
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-auto">
                <Button 
                  className="w-full font-bold hover:scale-105 transition-all h-12" 
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
              </div>
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
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
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

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {userQrCodes?.map((qr) => {
                const tierInfo = getTierBadge(qr.scansCount || 0);
                return (
                  <div key={qr.id} className="bg-white/70 rounded-lg p-4 space-y-3" style={{borderRadius: '15px', border: '1px solid rgba(168, 145, 130, 0.2)'}}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded flex items-center justify-center mr-3" style={{backgroundColor: 'rgba(29, 41, 21, 0.1)', borderRadius: '15px'}}>
                          <QrCode className="text-sm" style={{color: '#1D2915'}} />
                        </div>
                        <span className="text-sm font-bold" style={{color: '#1D2915'}}>{qr.claimCode}</span>
                      </div>
                      <Badge className="font-bold" style={{backgroundColor: 'rgba(154, 123, 96, 0.1)', color: '#9A7B60'}}>
                        Active
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{color: '#686346'}}>Scans</p>
                        <p className="text-sm font-medium" style={{color: '#1D2915'}}>{qr.scansCount?.toLocaleString() || '0'}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{color: '#686346'}}>Earnings</p>
                        <p className="text-sm font-black" style={{color: '#A89182'}}>${qr.earnings?.toFixed(2) || '0.00'}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{color: '#686346'}}>Tier</p>
                        <Badge className={tierInfo.color + " text-xs"}>
                          {tierInfo.label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })}
              {(!userQrCodes || userQrCodes.length === 0) && (
                <div className="text-center py-8">
                  <p className="text-sm font-medium" style={{color: '#686346'}}>
                    No Shtickys claimed yet. Scan your first QR code to get started!
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Modals */}
      <QrScannerModal 
        open={showQrScanner} 
        onClose={() => setShowQrScanner(false)} 
      />
      <WithdrawalModal 
        isOpen={showWithdrawal} 
        onClose={() => setShowWithdrawal(false)} 
      />
      <ManualEntryModal 
        isOpen={showManualEntry} 
        onClose={() => setShowManualEntry(false)} 
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
              <a href="#" className="transition-colors" style={{color: '#686346'}} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#1D2915'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#686346'}>Support</a>
              <a href="#" className="transition-colors" style={{color: '#686346'}} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#1D2915'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#686346'}>Terms</a>
              <a href="#" className="transition-colors" style={{color: '#686346'}} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#1D2915'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#686346'}>Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
