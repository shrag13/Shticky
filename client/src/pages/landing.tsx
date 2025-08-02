import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, DollarSign, Star, Smartphone } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

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
            <Button onClick={handleLogin} className="bg-primary hover:bg-primary/90">
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Earn Money When Your QR Code Gets Scanned
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join Shticky and start earning $0.01 for every scan of your QR code stickers. 
            Place them strategically and watch your earnings grow with monthly automatic payouts.
          </p>
          <Button 
            onClick={handleLogin} 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-lg px-8 py-4"
          >
            Get Started Today
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card>
            <CardHeader className="text-center">
              <QrCode className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Claim QR Codes</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Scan and claim unique QR code stickers to start earning from every scan
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <DollarSign className="h-12 w-12 text-secondary mx-auto mb-4" />
              <CardTitle>Earn Per Scan</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Earn $0.01 for every person who scans your QR code stickers
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Star className="h-12 w-12 text-accent mx-auto mb-4" />
              <CardTitle>Tier System</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Unlock more sticker slots as you reach higher scan tiers
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Smartphone className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Monthly Payouts</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Automatic withdrawals every month when you reach $5 minimum
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Apply to Join</h4>
              <p className="text-gray-600">Submit your application with placement details and get approved</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-secondary">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Claim Stickers</h4>
              <p className="text-gray-600">Scan QR codes to claim your Shticky stickers and place them strategically</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Earn Money</h4>
              <p className="text-gray-600">Get paid automatically every month when people scan your stickers</p>
            </div>
          </div>
        </div>
      </main>

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
