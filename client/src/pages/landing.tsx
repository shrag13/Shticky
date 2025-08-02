import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, DollarSign, Star, Camera, ArrowRight, CheckCircle2 } from "lucide-react";
import logoPath from "@assets/IMG_20250701_021649_086_1754152193224.webp";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100">
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
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
              <span className="text-orange-500 drop-shadow-lg transform -rotate-2 inline-block">TURN</span>{" "}
              <span className="text-amber-500 drop-shadow-lg transform rotate-1 inline-block">QR</span>{" "}
              <span className="text-yellow-500 drop-shadow-lg transform -rotate-1 inline-block">CODES</span>
              <br />
              <span className="text-red-500 drop-shadow-lg transform rotate-2 inline-block">INTO</span>{" "}
              <span className="text-orange-600 drop-shadow-lg transform -rotate-2 inline-block text-6xl md:text-8xl">💰CASH💰</span>
            </h1>
            <p className="text-2xl font-bold text-gray-800 mb-8 max-w-4xl mx-auto leading-relaxed">
              🚀 Place <span className="bg-orange-200 px-2 py-1 rounded-lg text-orange-800">STICKERS</span> everywhere! 
              💸 Get <span className="bg-yellow-200 px-2 py-1 rounded-lg text-yellow-800">$0.01</span> per scan! 
              🎯 Start with <span className="bg-amber-200 px-2 py-1 rounded-lg text-amber-800">1 STICKER</span> and level up! 
              💳 Monthly <span className="bg-red-200 px-2 py-1 rounded-lg text-red-800">AUTO-PAYOUTS</span> at $5!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => window.location.href = '/application'}
                className="bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 hover:from-orange-600 hover:via-amber-600 hover:to-red-600 text-white font-black text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse"
              >
                🚀 START EARNING NOW! 💰
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-4 border-orange-400 text-orange-600 hover:bg-orange-50 font-bold text-xl px-12 py-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                🤔 HOW IT WORKS
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
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
              <span className="text-orange-500 drop-shadow-lg">HOW</span>{" "}
              <span className="text-amber-500 drop-shadow-lg">SHTICKY</span>{" "}
              <span className="text-yellow-500 drop-shadow-lg">WORKS!</span> 🎯
            </h2>
            <p className="text-2xl font-bold text-gray-800 max-w-4xl mx-auto">
              🔥 Three EASY steps to start making 💰 passive income! 🔥
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-red-400 rounded-full mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-black text-orange-600 mb-4">📝 APPLY & GET APPROVED!</h3>
              <p className="text-gray-800 leading-relaxed font-bold">
                🎯 Tell us your <span className="bg-orange-200 px-2 py-1 rounded">STICKER STRATEGY</span>! 
                We make sure everyone wins - you get 💰 and people get awesome content!
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-red-400 rounded-full mb-6">
                <QrCode className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-black text-amber-600 mb-4">🎯 CLAIM & PLACE STICKERS!</h3>
              <p className="text-gray-800 leading-relaxed font-bold">
                🚀 Get your <span className="bg-amber-200 px-2 py-1 rounded">UNIQUE QR CODES</span> and stick them EVERYWHERE! 
                Start with 1 and <span className="bg-yellow-200 px-2 py-1 rounded">LEVEL UP</span> as you crush it!
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-red-400 rounded-full mb-6">
                <DollarSign className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-black text-red-600 mb-4">💰 EARN & GET PAID!</h3>
              <p className="text-gray-800 leading-relaxed font-bold">
                💸 <span className="bg-yellow-200 px-2 py-1 rounded">$0.01 PER SCAN</span> = EASY MONEY! 
                💳 <span className="bg-red-200 px-2 py-1 rounded">AUTO-PAYOUTS</span> every month when you hit $5! 🎉
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tier System */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
              <span className="text-orange-500 drop-shadow-lg">LEVEL</span>{" "}
              <span className="text-amber-500 drop-shadow-lg">UP</span>{" "}
              <span className="text-red-500 drop-shadow-lg">SYSTEM!</span> 🚀
            </h2>
            <p className="text-2xl font-bold text-gray-800 max-w-4xl mx-auto">
              🎮 Prove you're AWESOME and unlock MORE stickers = MORE 💰!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-orange-200 hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
                  <Star className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-orange-600 font-black text-2xl">🌟 STARTER</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-black text-gray-900 mb-2">1️⃣ STICKER</div>
                <p className="text-gray-800 mb-4 font-bold">🎯 Perfect for your FIRST placement!</p>
                <ul className="text-base text-gray-700 space-y-2 font-bold">
                  <li>💰 $0.01 per scan</li>
                  <li>💳 Monthly auto-payouts</li>
                  <li>📊 Dashboard analytics</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-blue-200 hover:shadow-lg transition-all duration-300 transform scale-105">
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-600 font-black text-2xl">🚀 PRO</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-black text-gray-900 mb-2">2️⃣ STICKERS</div>
                <p className="text-gray-800 mb-4 font-bold">🔥 You're CRUSHING IT!</p>
                <ul className="text-base text-gray-700 space-y-2 font-bold">
                  <li>💰 $0.01 per scan</li>
                  <li>🔥 2x earning potential</li>
                  <li>📈 Advanced analytics</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-purple-200 hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-purple-600 font-black text-2xl">👑 ELITE</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-black text-gray-900 mb-2">3️⃣ STICKERS</div>
                <p className="text-gray-800 mb-4 font-bold">👑 ABSOLUTE LEGEND!</p>
                <ul className="text-base text-gray-700 space-y-2 font-bold">
                  <li>💰 $0.01 per scan</li>
                  <li>🚀 3x earning potential</li>
                  <li>⭐ Priority support</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
            <span className="text-orange-500 drop-shadow-lg">READY</span>{" "}
            <span className="text-amber-500 drop-shadow-lg">TO</span>{" "}
            <span className="text-yellow-500 drop-shadow-lg">START</span>{" "}
            <span className="text-red-500 drop-shadow-lg">EARNING?</span> 💰
          </h2>
          <p className="text-2xl font-bold text-gray-800 mb-8">
            🚀 Join the SHTICKY SQUAD and turn QR codes into 💰 CASH MONEY! 🚀
          </p>
          <Button 
            size="lg"
            onClick={() => window.location.href = '/application'}
            className="bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 hover:from-orange-600 hover:via-amber-600 hover:to-red-600 text-white font-black text-2xl px-16 py-8 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300"
          >
            🚀 JOIN THE SQUAD NOW! 💰
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