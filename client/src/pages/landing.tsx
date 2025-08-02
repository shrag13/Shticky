import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, DollarSign, Star, Camera, ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import logoPath from "@assets/IMG_20250628_212758_407_1754151926865.webp";
import brickWallPath from "@assets/istockphoto-184099696-612x612_1754167496614.jpg";
import stickerTexturePath from "@assets/white-glued-paper-texture-wet-wrinkled-paper-sheets-set_134821-72_1754168001331.jpg";

// Animation hook for scroll-triggered fade-ins
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// Removed liquid glass magnification effect

export default function Landing() {
  const heroAnimation = useScrollAnimation();
  const howItWorksAnimation = useScrollAnimation();
  const statsAnimation = useScrollAnimation();
  const tiersAnimation = useScrollAnimation();
  const ctaAnimation = useScrollAnimation();

  // Liquid glass distortion removed to fix navbar glow artifacts

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #EFEFEE 0%, #A89182 50%, #9A7B60 100%)'}}>
      {/* Apple-Style Floating Liquid Glass Header */}
      <header className="liquid-glass-morphing fixed top-0 left-0 right-0 z-50">
        
        <div className="liquid-glass-content flex items-center justify-between px-6 py-2">
          <div className="liquid-glass-brand flex items-center space-x-2.5">
            <div className="liquid-glass-logo-morph">
              <img src={logoPath} alt="Shticky" className="w-8 h-8 rounded-[10px] object-cover" />
            </div>
            <span className="liquid-glass-text-morph text-lg font-semibold text-gray-800">
              Shticky
            </span>
          </div>
          
          <div className="liquid-glass-buttons flex items-center space-x-2.5">
            <Button 
              variant="ghost" 
              size="sm" 
              className="liquid-glass-btn-morph liquid-glass-btn-outline px-4 py-1.5 h-auto text-sm"
              style={{
                backdropFilter: 'blur(8px) saturate(180%) brightness(120%)',
                WebkitBackdropFilter: 'blur(8px) saturate(180%) brightness(120%)',
                background: 'rgba(255, 255, 255, 0.3)'
              }}
              onClick={() => window.location.href = '/login'}
            >
              Sign In
            </Button>
            <Button 
              size="sm" 
              className="liquid-glass-btn-morph bg-[#9A7B60] hover:bg-[#A89182] text-white px-4 py-1.5 h-auto text-sm"
              onClick={() => window.location.href = '/application'}
            >
              Apply
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={heroAnimation.ref}
            className={`text-center transition-all duration-1000 ${
              heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Badge className="mb-6 text-white border-none" style={{backgroundColor: '#686346'}}>
              Earn $0.01 per scan
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight" style={{color: '#1D2915'}}>
              <span className="drop-shadow-lg transform -rotate-2 inline-block" style={{color: '#9A7B60'}}>TURN</span>{" "}
              <span className="drop-shadow-lg transform rotate-1 inline-block" style={{color: '#A89182'}}>QR</span>{" "}
              <span className="drop-shadow-lg transform -rotate-1 inline-block" style={{color: '#686346'}}>CODES</span>
              <br />
              <span className="drop-shadow-lg transform rotate-2 inline-block" style={{color: '#9A7B60'}}>INTO</span>{" "}
              <span className="drop-shadow-lg transform -rotate-2 inline-block text-6xl md:text-8xl" style={{color: '#686346'}}>CASH</span>
            </h1>
            <p className="text-2xl font-bold mb-8 max-w-4xl mx-auto leading-relaxed" style={{color: '#1D2915'}}>
              Place <span className="px-2 py-1 rounded-lg text-white" style={{backgroundColor: '#9A7B60'}}>STICKERS</span> in strategic locations. 
              Earn <span className="px-2 py-1 rounded-lg text-white" style={{backgroundColor: '#A89182'}}>$0.01</span> per scan. 
              Start with <span className="px-2 py-1 rounded-lg text-white" style={{backgroundColor: '#686346'}}>1 STICKER</span> and scale up. 
              Monthly <span className="px-2 py-1 rounded-lg text-white" style={{backgroundColor: '#9A7B60'}}>AUTO-PAYOUTS</span> at $5.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => window.location.href = '/application'}
                className="text-white font-black text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 hover:opacity-90"
                style={{background: 'linear-gradient(135deg, #9A7B60, #A89182, #686346)'}}
              >
                START EARNING NOW
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-4 font-bold text-xl px-12 py-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 hover:bg-white/10"
                style={{borderColor: '#686346', color: '#686346'}}
              >
                HOW IT WORKS
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 backdrop-blur-sm" style={{backgroundColor: 'rgba(239, 239, 238, 0.6)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={statsAnimation.ref}
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ${
              statsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{backgroundColor: '#EFEFEE'}}>
                <DollarSign className="h-8 w-8" style={{color: '#9A7B60'}} />
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{color: '#1D2915'}}>$0.01 per scan</h3>
              <p style={{color: '#1D2915'}}>Simple, transparent earning rate</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{backgroundColor: '#EFEFEE'}}>
                <Star className="h-8 w-8" style={{color: '#A89182'}} />
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{color: '#1D2915'}}>Tier System</h3>
              <p style={{color: '#1D2915'}}>Unlock more stickers as you succeed</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{backgroundColor: '#EFEFEE'}}>
                <CheckCircle2 className="h-8 w-8" style={{color: '#686346'}} />
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{color: '#1D2915'}}>Monthly Payouts</h3>
              <p style={{color: '#1D2915'}}>Automatic payments when you reach $5</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={howItWorksAnimation.ref}
            className={`text-center mb-16 transition-all duration-1000 ${
              howItWorksAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6" style={{color: '#1D2915'}}>
              <span className="drop-shadow-lg" style={{color: '#9A7B60'}}>HOW</span>{" "}
              <span className="drop-shadow-lg" style={{color: '#A89182'}}>SHTICKY</span>{" "}
              <span className="drop-shadow-lg" style={{color: '#686346'}}>WORKS</span>
            </h2>
            <p className="text-2xl font-bold max-w-4xl mx-auto" style={{color: '#1D2915'}}>
              Three simple steps to start earning passive income
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6" style={{background: 'linear-gradient(135deg, #9A7B60, #A89182)'}}>
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-black mb-4" style={{color: '#9A7B60'}}>APPLY & GET APPROVED</h3>
              <p className="leading-relaxed font-bold" style={{color: '#1D2915'}}>
                Tell us your <span className="px-2 py-1 rounded text-white" style={{backgroundColor: '#9A7B60'}}>PLACEMENT STRATEGY</span>. 
                We ensure quality placements that provide value to scanners while generating income for you.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6" style={{background: 'linear-gradient(135deg, #A89182, #686346)'}}>
                <QrCode className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-4" style={{color: '#A89182'}}>CLAIM & PLACE STICKERS</h3>
              <p className="leading-relaxed font-bold" style={{color: '#1D2915'}}>
                Get your <span className="px-2 py-1 rounded text-white" style={{backgroundColor: '#A89182'}}>UNIQUE QR CODES</span> and place them in strategic locations. 
                Start with 1 sticker and <span className="px-2 py-1 rounded text-white" style={{backgroundColor: '#686346'}}>UNLOCK MORE</span> as you prove success.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6" style={{background: 'linear-gradient(135deg, #686346, #9A7B60)'}}>
                <DollarSign className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-4" style={{color: '#686346'}}>EARN & GET PAID</h3>
              <p className="leading-relaxed font-bold" style={{color: '#1D2915'}}>
                Earn <span className="px-2 py-1 rounded text-white" style={{backgroundColor: '#A89182'}}>$0.01 PER SCAN</span> consistently. 
                Receive <span className="px-2 py-1 rounded text-white" style={{backgroundColor: '#9A7B60'}}>AUTO-PAYOUTS</span> monthly when you reach $5.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tier System */}
      <section 
        className="py-20 relative min-h-screen"
        style={{
          backgroundImage: `url(${brickWallPath})`,
          backgroundSize: '120%',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div 
            ref={tiersAnimation.ref}
            className={`text-center mb-16 transition-all duration-1000 ${
              tiersAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-white drop-shadow-2xl">
              <span className="drop-shadow-lg">TIER</span>{" "}
              <span className="drop-shadow-lg">PROGRESSION</span>{" "}
              <span className="drop-shadow-lg">SYSTEM</span>
            </h2>
            <p className="text-2xl font-bold max-w-4xl mx-auto text-white drop-shadow-xl">
              Prove your strategy works and unlock more earning potential
            </p>
          </div>
          
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 max-w-5xl mx-auto overflow-x-auto pb-6 scrollbar-hide">
              <div className="flex flex-row gap-6 sm:gap-8 lg:gap-12 min-w-max px-4">
              {/* Starter Tier Sticker */}
              <div className="transform hover:scale-105 transition-all duration-300 cursor-pointer flex-shrink-0" style={{transform: 'rotate(-2deg)'}}>
                <svg width="240" height="220" viewBox="0 0 240 220" className="drop-shadow-2xl w-[180px] sm:w-[200px] lg:w-[240px] h-auto">
                {/* Sticker shadow */}
                <ellipse cx="120" cy="210" rx="110" ry="8" fill="rgba(0,0,0,0.4)" />
                
                {/* Realistic paper texture background */}
                <defs>
                  <pattern id="starterTexture" patternUnits="userSpaceOnUse" width="240" height="200">
                    <image href={stickerTexturePath} x="0" y="0" width="240" height="200" opacity="0.8"/>
                  </pattern>
                </defs>
                
                {/* Main sticker body with wrinkled edges */}
                <path d="M18 30 Q15 18 30 15 L210 18 Q225 21 222 35 L218 185 Q221 200 210 202 L30 200 Q15 197 18 182 Z" 
                      fill="url(#starterTexture)" stroke="#D1D1D1" strokeWidth="2"/>
                
                {/* Overlay for better text contrast */}
                <path d="M18 30 Q15 18 30 15 L210 18 Q225 21 222 35 L218 185 Q221 200 210 202 L30 200 Q15 197 18 182 Z" 
                      fill="rgba(255,255,255,0.85)"/>
                
                {/* Star icon background */}
                <circle cx="120" cy="55" r="20" fill="#9A7B60" fillOpacity="0.2"/>
                
                {/* Star icon */}
                <path d="M120 38 L123 48 L133 48 L125 55 L128 65 L120 60 L112 65 L115 55 L107 48 L117 48 Z" 
                      fill="#9A7B60" stroke="#9A7B60" strokeWidth="1"/>
                
                {/* Title */}
                <text x="120" y="92" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1D2915">STARTER</text>
                
                {/* Sticker count */}
                <text x="120" y="115" textAnchor="middle" fontSize="24" fontWeight="900" fill="#1D2915">1 STICKER</text>
                
                {/* Description */}
                <text x="120" y="138" textAnchor="middle" fontSize="12" fontWeight="600" fill="#686346">Perfect for testing your</text>
                <text x="120" y="152" textAnchor="middle" fontSize="12" fontWeight="600" fill="#686346">placement strategy</text>
                
                {/* Features */}
                <circle cx="75" cy="172" r="3" fill="#9A7B60"/>
                <text x="85" y="177" fontSize="11" fontWeight="600" fill="#1D2915">$0.01 per scan</text>
                
                <circle cx="75" cy="190" r="3" fill="#9A7B60"/>
                <text x="85" y="195" fontSize="11" fontWeight="600" fill="#1D2915">Monthly payouts</text>
                </svg>
              </div>
              
              {/* Pro Tier Sticker */}
              <div className="transform hover:scale-105 transition-all duration-300 cursor-pointer relative flex-shrink-0" style={{transform: 'rotate(1deg)'}}>
                <svg width="240" height="220" viewBox="0 0 240 220" className="drop-shadow-2xl w-[180px] sm:w-[200px] lg:w-[240px] h-auto">
                {/* Sticker shadow */}
                <ellipse cx="120" cy="210" rx="110" ry="8" fill="rgba(0,0,0,0.5)" />
                
                {/* Realistic paper texture background */}
                <defs>
                  <pattern id="proTexture" patternUnits="userSpaceOnUse" width="240" height="200">
                    <image href={stickerTexturePath} x="-60" y="0" width="240" height="200" opacity="0.8"/>
                  </pattern>
                </defs>
                
                {/* Main sticker body with wrinkled edges */}
                <path d="M15 32 Q12 15 32 12 L208 15 Q228 18 225 35 L220 182 Q223 200 208 202 L32 200 Q12 197 15 180 Z" 
                      fill="url(#proTexture)" stroke="#A89182" strokeWidth="3"/>
                
                {/* Overlay for better text contrast */}
                <path d="M15 32 Q12 15 32 12 L208 15 Q228 18 225 35 L220 182 Q223 200 208 202 L32 200 Q12 197 15 180 Z" 
                      fill="rgba(255,255,255,0.85)"/>
                
                {/* Double star icon background */}
                <circle cx="105" cy="55" r="18" fill="#A89182" fillOpacity="0.2"/>
                <circle cx="135" cy="55" r="18" fill="#A89182" fillOpacity="0.2"/>
                
                {/* Double star icons */}
                <path d="M105 40 L107 47 L115 47 L109 52 L111 59 L105 56 L99 59 L101 52 L95 47 L103 47 Z" 
                      fill="#A89182" stroke="#A89182" strokeWidth="1"/>
                <path d="M135 40 L137 47 L145 47 L139 52 L141 59 L135 56 L129 59 L131 52 L125 47 L133 47 Z" 
                      fill="#A89182" stroke="#A89182" strokeWidth="1"/>
                
                {/* Title */}
                <text x="120" y="92" textAnchor="middle" fontSize="24" fontWeight="900" fill="#1D2915">PRO</text>
                
                {/* Sticker count */}
                <text x="120" y="115" textAnchor="middle" fontSize="24" fontWeight="900" fill="#1D2915">2 STICKERS</text>
                
                {/* Description */}
                <text x="120" y="138" textAnchor="middle" fontSize="12" fontWeight="600" fill="#686346">Scale your earnings with</text>
                <text x="120" y="152" textAnchor="middle" fontSize="12" fontWeight="600" fill="#686346">strategic placement</text>
                
                {/* Features */}
                <circle cx="70" cy="172" r="3" fill="#A89182"/>
                <text x="80" y="177" fontSize="11" fontWeight="600" fill="#1D2915">$0.01 per scan</text>
                
                <circle cx="70" cy="190" r="3" fill="#A89182"/>
                <text x="80" y="195" fontSize="11" fontWeight="600" fill="#1D2915">2x earning potential</text>
                </svg>
              </div>
              
              {/* Elite Tier Sticker */}
              <div className="transform hover:scale-105 transition-all duration-300 cursor-pointer flex-shrink-0" style={{transform: 'rotate(-1.5deg)'}}>
                <svg width="240" height="220" viewBox="0 0 240 220" className="drop-shadow-2xl w-[180px] sm:w-[200px] lg:w-[240px] h-auto">
                {/* Sticker shadow */}
                <ellipse cx="120" cy="210" rx="110" ry="8" fill="rgba(0,0,0,0.4)" />
                
                {/* Realistic paper texture background */}
                <defs>
                  <pattern id="eliteTexture" patternUnits="userSpaceOnUse" width="240" height="200">
                    <image href={stickerTexturePath} x="-120" y="0" width="240" height="200" opacity="0.8"/>
                  </pattern>
                </defs>
                
                {/* Main sticker body with weathered edges */}
                <path d="M18 35 Q16 18 35 15 L205 18 Q225 21 222 38 L218 180 Q221 197 205 200 L35 197 Q16 194 18 177 Z" 
                      fill="url(#eliteTexture)" stroke="#686346" strokeWidth="2"/>
                
                {/* Overlay for better text contrast */}
                <path d="M18 35 Q16 18 35 15 L205 18 Q225 21 222 38 L218 180 Q221 197 205 200 L35 197 Q16 194 18 177 Z" 
                      fill="rgba(255,255,255,0.85)"/>
                
                {/* Triple star icon backgrounds */}
                <circle cx="95" cy="55" r="15" fill="#686346" fillOpacity="0.2"/>
                <circle cx="120" cy="55" r="15" fill="#686346" fillOpacity="0.2"/>
                <circle cx="145" cy="55" r="15" fill="#686346" fillOpacity="0.2"/>
                
                {/* Triple star icons */}
                <path d="M95 43 L97 49 L103 49 L98 53 L100 59 L95 56 L90 59 L92 53 L87 49 L93 49 Z" 
                      fill="#686346" stroke="#686346" strokeWidth="1"/>
                <path d="M120 43 L122 49 L128 49 L123 53 L125 59 L120 56 L115 59 L117 53 L112 49 L118 49 Z" 
                      fill="#686346" stroke="#686346" strokeWidth="1"/>
                <path d="M145 43 L147 49 L153 49 L148 53 L150 59 L145 56 L140 59 L142 53 L137 49 L143 49 Z" 
                      fill="#686346" stroke="#686346" strokeWidth="1"/>
                
                {/* Title */}
                <text x="120" y="92" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1D2915">ELITE</text>
                
                {/* Sticker count */}
                <text x="120" y="115" textAnchor="middle" fontSize="24" fontWeight="900" fill="#1D2915">3 STICKERS</text>
                
                {/* Description */}
                <text x="120" y="138" textAnchor="middle" fontSize="12" fontWeight="600" fill="#686346">Maximum tier for</text>
                <text x="120" y="152" textAnchor="middle" fontSize="12" fontWeight="600" fill="#686346">top performers</text>
                
                {/* Features */}
                <circle cx="70" cy="172" r="3" fill="#686346"/>
                <text x="80" y="177" fontSize="11" fontWeight="600" fill="#1D2915">$0.01 per scan</text>
                
                <circle cx="70" cy="190" r="3" fill="#686346"/>
                <text x="80" y="195" fontSize="11" fontWeight="600" fill="#1D2915">3x earning potential</text>
                </svg>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 backdrop-blur-sm" style={{backgroundColor: 'rgba(29, 41, 21, 0.95)'}}>
        <div 
          ref={ctaAnimation.ref}
          className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
            ctaAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-white">
            <span className="drop-shadow-lg" style={{color: '#A89182'}}>READY</span>{" "}
            <span className="drop-shadow-lg" style={{color: '#9A7B60'}}>TO</span>{" "}
            <span className="drop-shadow-lg" style={{color: '#A89182'}}>START</span>{" "}
            <span className="drop-shadow-lg" style={{color: '#9A7B60'}}>EARNING?</span>
          </h2>
          <p className="text-2xl font-bold mb-8 text-white">
            Join Shticky and turn strategic QR placements into consistent income
          </p>
          <Button 
            size="lg"
            onClick={() => window.location.href = '/application'}
            className="text-white font-black text-2xl px-16 py-8 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 hover:opacity-90"
            style={{background: 'linear-gradient(135deg, #9A7B60, #A89182, #686346)'}}
          >
            APPLY NOW
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white py-12" style={{backgroundColor: '#040D07'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <img src={logoPath} alt="Shticky" className="h-8 w-8 rounded object-cover" />
              <span className="text-xl font-bold">Shticky</span>
            </div>
            <p style={{color: '#A89182'}}>
              Turn QR codes into cash. Simple, transparent, and rewarding.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 pt-8 border-t border-gray-700">
            <button 
              className="text-sm hover:underline transition-colors"
              style={{color: '#A89182'}}
              onClick={() => {/* TODO: Link to Terms */}}
            >
              Terms & Conditions
            </button>
            <button 
              className="text-sm hover:underline transition-colors"
              style={{color: '#A89182'}}
              onClick={() => {/* TODO: Link to Privacy */}}
            >
              Privacy Policy
            </button>
            <p className="text-sm" style={{color: '#686346'}}>
              © 2025 Shticky. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}