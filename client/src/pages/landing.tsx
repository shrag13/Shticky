import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, DollarSign, Star, Camera, ArrowRight, CheckCircle2 } from "lucide-react";
import logoPath from "@assets/IMG_20250701_021649_086_1754152193224.webp";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img src={logoPath} alt="Shticky" className="h-10 w-10 rounded-lg object-cover" />
              <h1 className="text-2xl font-bold text-primary">Shticky</h1>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/login'}
                className="border-orange-300 text-orange-700 hover:bg-orange-50"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => window.location.href = '/application'}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                Apply to Join
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-orange-100 text-orange-800 border-orange-300">
              Earn $0.01 per scan
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Turn QR Codes Into
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                {" "}Cash
              </span>
            </h1>
            <p className="text-xl text-gray-800 mb-8 max-w-3xl mx-auto leading-relaxed">
              Place QR code stickers in strategic locations and earn money every time someone scans them. 
              Start with 1 sticker and unlock more as you grow. Monthly automatic payouts when you reach $5.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => window.location.href = '/application'}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg px-8 py-4"
              >
                Start Earning Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-orange-300 text-orange-700 hover:bg-orange-50 text-lg px-8 py-4"
              >
                Learn How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">$0.01 per scan</h3>
              <p className="text-gray-800">Simple, transparent earning rate</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Tier System</h3>
              <p className="text-gray-800">Unlock more stickers as you succeed</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <CheckCircle2 className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Monthly Payouts</h3>
              <p className="text-gray-800">Automatic payments when you reach $5</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Shticky Works
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              A simple three-step process to start earning passive income
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-red-400 rounded-full mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Apply & Get Approved</h3>
              <p className="text-gray-800 leading-relaxed">
                Submit your application with placement strategy. We review applications to ensure quality placements 
                that benefit both you and the people scanning your codes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-red-400 rounded-full mb-6">
                <QrCode className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Claim & Place Stickers</h3>
              <p className="text-gray-800 leading-relaxed">
                Get your unique QR code stickers and place them in high-traffic locations. 
                Start with 1 sticker and unlock more as you prove success.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-red-400 rounded-full mb-6">
                <DollarSign className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Earn & Get Paid</h3>
              <p className="text-gray-800 leading-relaxed">
                Earn $0.01 every time someone scans your QR code. 
                Receive automatic monthly payouts when your balance reaches $5.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tier System */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tier System
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              Unlock more earning potential as you prove your placement strategy works
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-orange-200 hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
                  <Star className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-orange-600">Starter</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">1 Sticker</div>
                <p className="text-gray-800 mb-4">Perfect for testing your first strategic placement</p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• $0.01 per scan</li>
                  <li>• Monthly auto-payouts</li>
                  <li>• Dashboard analytics</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-blue-200 hover:shadow-lg transition-all duration-300 transform scale-105">
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-600">Pro</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">2 Stickers</div>
                <p className="text-gray-800 mb-4">Expand after proving your placement works</p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• $0.01 per scan</li>
                  <li>• 2x earning potential</li>
                  <li>• Advanced analytics</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-purple-200 hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-purple-600">Elite</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">3 Stickers</div>
                <p className="text-gray-800 mb-4">Maximum tier for top performers</p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• $0.01 per scan</li>
                  <li>• 3x earning potential</li>
                  <li>• Priority support</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Earning?
          </h2>
          <p className="text-xl text-gray-800 mb-8">
            Join Shticky today and turn strategic QR code placement into passive income
          </p>
          <Button 
            size="lg"
            onClick={() => window.location.href = '/application'}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg px-12 py-4"
          >
            Apply Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img src={logoPath} alt="Shticky" className="h-8 w-8 rounded object-cover" />
            <span className="text-xl font-bold">Shticky</span>
          </div>
          <p className="text-gray-400">
            Turn QR codes into cash. Simple, transparent, and rewarding.
          </p>
        </div>
      </footer>
    </div>
  );
}