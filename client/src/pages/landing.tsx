import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, DollarSign, Star, Camera, ArrowRight, CheckCircle2 } from "lucide-react";
import logoPath from "@assets/IMG_20250701_021649_086_1754152193224.webp";

export default function Landing() {
  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #EFEFEE 0%, #A89182 50%, #9A7B60 100%)'}}>
      {/* Header */}
      <header className="backdrop-blur-sm border-b sticky top-0 z-50" style={{backgroundColor: 'rgba(239, 239, 238, 0.9)', borderColor: '#A89182'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img src={logoPath} alt="Shticky" className="h-10 w-10 rounded-lg object-cover" />
              <h1 className="text-2xl font-bold" style={{color: '#1D2915'}}>Shticky</h1>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/login'}
                className="border-2 hover:bg-white/10"
                style={{borderColor: '#686346', color: '#686346'}}
              >
                Sign In
              </Button>
              <Button 
                onClick={() => window.location.href = '/application'}
                className="text-white hover:opacity-90"
                style={{background: 'linear-gradient(135deg, #9A7B60, #A89182, #686346)'}}
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
            <Badge className="mb-6 text-white border-none" style={{backgroundColor: '#686346'}}>
              Earn $0.01 per scan
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight" style={{color: '#1D2915'}}>
              <span className="drop-shadow-lg transform -rotate-2 inline-block" style={{color: '#9A7B60'}}>TURN</span>{" "}
              <span className="drop-shadow-lg transform rotate-1 inline-block" style={{color: '#A89182'}}>QR</span>{" "}
              <span className="drop-shadow-lg transform -rotate-1 inline-block" style={{color: '#686346'}}>CODES</span>
              <br />
              <span className="drop-shadow-lg transform rotate-2 inline-block" style={{color: '#9A7B60'}}>INTO</span>{" "}
              <span className="drop-shadow-lg transform -rotate-2 inline-block text-6xl md:text-8xl" style={{color: '#686346'}}>💰CASH💰</span>
            </h1>
            <p className="text-2xl font-bold mb-8 max-w-4xl mx-auto leading-relaxed" style={{color: '#1D2915'}}>
              🚀 Place <span className="px-2 py-1 rounded-lg text-white" style={{backgroundColor: '#9A7B60'}}>STICKERS</span> everywhere! 
              💸 Get <span className="px-2 py-1 rounded-lg text-white" style={{backgroundColor: '#A89182'}}>$0.01</span> per scan! 
              🎯 Start with <span className="px-2 py-1 rounded-lg text-white" style={{backgroundColor: '#686346'}}>1 STICKER</span> and level up! 
              💳 Monthly <span className="px-2 py-1 rounded-lg text-white" style={{backgroundColor: '#9A7B60'}}>AUTO-PAYOUTS</span> at $5!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => window.location.href = '/application'}
                className="text-white font-black text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse hover:opacity-90"
                style={{background: 'linear-gradient(135deg, #9A7B60, #A89182, #686346)'}}
              >
                🚀 START EARNING NOW! 💰
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-4 font-bold text-xl px-12 py-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 hover:bg-white/10"
                style={{borderColor: '#686346', color: '#686346'}}
              >
                🤔 HOW IT WORKS
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 backdrop-blur-sm" style={{backgroundColor: 'rgba(239, 239, 238, 0.6)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{color: '#1D2915'}}>$0.01 per scan</h3>
              <p style={{color: '#686346'}}>Simple, transparent earning rate</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{color: '#1D2915'}}>Tier System</h3>
              <p style={{color: '#686346'}}>Unlock more stickers as you succeed</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <CheckCircle2 className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{color: '#1D2915'}}>Monthly Payouts</h3>
              <p style={{color: '#686346'}}>Automatic payments when you reach $5</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-6" style={{color: '#1D2915'}}>
              <span className="drop-shadow-lg" style={{color: '#9A7B60'}}>HOW</span>{" "}
              <span className="drop-shadow-lg" style={{color: '#A89182'}}>SHTICKY</span>{" "}
              <span className="drop-shadow-lg" style={{color: '#686346'}}>WORKS!</span> 🎯
            </h2>
            <p className="text-2xl font-bold max-w-4xl mx-auto" style={{color: '#1D2915'}}>
              🔥 Three EASY steps to start making 💰 passive income! 🔥
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6" style={{background: 'linear-gradient(135deg, #9A7B60, #A89182)'}}>
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-black mb-4" style={{color: '#9A7B60'}}>📝 APPLY & GET APPROVED!</h3>
              <p className="leading-relaxed font-bold" style={{color: '#1D2915'}}>
                🎯 Tell us your <span className="px-2 py-1 rounded text-white" style={{backgroundColor: '#9A7B60'}}>STICKER STRATEGY</span>! 
                We make sure everyone wins - you get 💰 and people get awesome content!
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6" style={{background: 'linear-gradient(135deg, #A89182, #686346)'}}>
                <QrCode className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-4" style={{color: '#A89182'}}>🎯 CLAIM & PLACE STICKERS!</h3>
              <p className="leading-relaxed font-bold" style={{color: '#1D2915'}}>
                🚀 Get your <span className="px-2 py-1 rounded text-white" style={{backgroundColor: '#A89182'}}>UNIQUE QR CODES</span> and stick them EVERYWHERE! 
                Start with 1 and <span className="px-2 py-1 rounded text-white" style={{backgroundColor: '#686346'}}>LEVEL UP</span> as you crush it!
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6" style={{background: 'linear-gradient(135deg, #686346, #9A7B60)'}}>
                <DollarSign className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-4" style={{color: '#686346'}}>💰 EARN & GET PAID!</h3>
              <p className="leading-relaxed font-bold" style={{color: '#1D2915'}}>
                💸 <span className="px-2 py-1 rounded text-white" style={{backgroundColor: '#A89182'}}>$0.01 PER SCAN</span> = EASY MONEY! 
                💳 <span className="px-2 py-1 rounded text-white" style={{backgroundColor: '#9A7B60'}}>AUTO-PAYOUTS</span> every month when you hit $5! 🎉
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tier System */}
      <section className="py-20 backdrop-blur-sm" style={{backgroundColor: 'rgba(239, 239, 238, 0.6)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-6" style={{color: '#1D2915'}}>
              <span className="drop-shadow-lg" style={{color: '#9A7B60'}}>LEVEL</span>{" "}
              <span className="drop-shadow-lg" style={{color: '#A89182'}}>UP</span>{" "}
              <span className="drop-shadow-lg" style={{color: '#686346'}}>SYSTEM!</span> 🚀
            </h2>
            <p className="text-2xl font-bold max-w-4xl mx-auto" style={{color: '#1D2915'}}>
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
          <h2 className="text-4xl md:text-6xl font-black mb-6" style={{color: '#1D2915'}}>
            <span className="drop-shadow-lg" style={{color: '#9A7B60'}}>READY</span>{" "}
            <span className="drop-shadow-lg" style={{color: '#A89182'}}>TO</span>{" "}
            <span className="drop-shadow-lg" style={{color: '#686346'}}>START</span>{" "}
            <span className="drop-shadow-lg" style={{color: '#9A7B60'}}>EARNING?</span> 💰
          </h2>
          <p className="text-2xl font-bold mb-8" style={{color: '#1D2915'}}>
            🚀 Join the SHTICKY SQUAD and turn QR codes into 💰 CASH MONEY! 🚀
          </p>
          <Button 
            size="lg"
            onClick={() => window.location.href = '/application'}
            className="text-white font-black text-2xl px-16 py-8 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 hover:opacity-90"
            style={{background: 'linear-gradient(135deg, #9A7B60, #A89182, #686346)'}}
          >
            🚀 JOIN THE SQUAD NOW! 💰
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white py-12" style={{backgroundColor: '#040D07'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img src={logoPath} alt="Shticky" className="h-8 w-8 rounded object-cover" />
            <span className="text-xl font-bold">Shticky</span>
          </div>
          <p style={{color: '#A89182'}}>
            Turn QR codes into cash. Simple, transparent, and rewarding.
          </p>
        </div>
      </footer>
    </div>
  );
}