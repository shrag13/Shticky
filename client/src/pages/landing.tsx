import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, DollarSign, Star, Camera, ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import logoPath from "@assets/IMG_20250628_212758_407_1754151926865.webp";
import brickWallPath from "@assets/istockphoto-184099696-612x612_1754167496614.jpg";

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
          
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Starter Tier Sticker */}
            <div className="transform hover:scale-105 transition-all duration-300 cursor-pointer" style={{transform: 'rotate(-2deg)'}}>
              <svg width="280" height="320" viewBox="0 0 280 320" className="drop-shadow-2xl">
                {/* Sticker shadow */}
                <ellipse cx="145" cy="315" rx="120" ry="8" fill="rgba(0,0,0,0.4)" />
                
                {/* Main sticker body with slight curve */}
                <path d="M20 45 Q20 20 45 20 L235 20 Q260 20 260 45 L260 275 Q260 300 235 300 L45 300 Q20 300 20 275 Z" 
                      fill="#EFEFEE" stroke="#D1D1D1" strokeWidth="2"/>
                
                {/* Crease line across sticker */}
                <path d="M30 150 Q140 145 250 155" stroke="rgba(0,0,0,0.1)" strokeWidth="1" fill="none"/>
                
                {/* Peeling corner with curled edge */}
                <path d="M235 45 L260 20 L260 45 Z" fill="#F8F8F8" stroke="#D1D1D1" strokeWidth="1"/>
                <path d="M235 45 L250 35 L260 45 Z" fill="#E8E8E8"/>
                <path d="M235 45 Q240 40 245 42" stroke="rgba(0,0,0,0.2)" strokeWidth="1" fill="none"/>
                
                {/* Star icon background */}
                <circle cx="140" cy="80" r="25" fill="#9A7B60" fillOpacity="0.1"/>
                
                {/* Star icon */}
                <path d="M140 60 L143 70 L153 70 L145 77 L148 87 L140 82 L132 87 L135 77 L127 70 L137 70 Z" 
                      fill="#9A7B60" stroke="#9A7B60" strokeWidth="1"/>
                
                {/* Title */}
                <text x="140" y="135" textAnchor="middle" fontSize="24" fontWeight="900" fill="#1D2915">STARTER</text>
                
                {/* Sticker count */}
                <text x="140" y="170" textAnchor="middle" fontSize="32" fontWeight="900" fill="#1D2915">1 STICKER</text>
                
                {/* Description */}
                <text x="140" y="200" textAnchor="middle" fontSize="12" fontWeight="600" fill="#686346">Perfect for testing your</text>
                <text x="140" y="215" textAnchor="middle" fontSize="12" fontWeight="600" fill="#686346">placement strategy</text>
                
                {/* Features */}
                <circle cx="80" cy="240" r="3" fill="#9A7B60"/>
                <text x="95" y="245" fontSize="11" fontWeight="600" fill="#1D2915">$0.01 per scan</text>
                
                <circle cx="80" cy="260" r="3" fill="#9A7B60"/>
                <text x="95" y="265" fontSize="11" fontWeight="600" fill="#1D2915">Monthly auto-payouts</text>
                
                <circle cx="80" cy="280" r="3" fill="#9A7B60"/>
                <text x="95" y="285" fontSize="11" fontWeight="600" fill="#1D2915">Dashboard analytics</text>
              </svg>
            </div>
            
            {/* Pro Tier Sticker - Most Popular */}
            <div className="transform hover:scale-105 transition-all duration-300 cursor-pointer relative" style={{transform: 'rotate(1deg)'}}>
              {/* Popular badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                <div className="bg-[#A89182] text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  MOST POPULAR
                </div>
              </div>
              
              <svg width="300" height="340" viewBox="0 0 300 340" className="drop-shadow-2xl">
                {/* Sticker shadow */}
                <ellipse cx="155" cy="335" rx="130" ry="8" fill="rgba(0,0,0,0.5)" />
                
                {/* Main sticker body with realistic curve */}
                <path d="M20 50 Q20 20 50 20 L250 20 Q280 20 280 50 L280 270 Q280 300 250 300 L50 300 Q20 300 20 270 Z" 
                      fill="#EFEFEE" stroke="#A89182" strokeWidth="3"/>
                
                {/* Premium border accent */}
                <path d="M25 50 Q25 25 50 25 L245 25 Q275 25 275 50 L275 265 Q275 295 245 295 L50 295 Q25 295 25 265 Z" 
                      fill="none" stroke="#A89182" strokeWidth="1" strokeOpacity="0.3"/>
                
                {/* Multiple crease lines for worn look */}
                <path d="M30 120 Q150 115 270 125" stroke="rgba(0,0,0,0.08)" strokeWidth="1" fill="none"/>
                <path d="M35 200 Q150 195 265 205" stroke="rgba(0,0,0,0.06)" strokeWidth="1" fill="none"/>
                
                {/* Peeling corner with realistic curl */}
                <path d="M250 50 L280 20 L280 50 Z" fill="#F8F8F8" stroke="#A89182" strokeWidth="1"/>
                <path d="M250 50 L265 35 L280 50 Z" fill="#E8E8E8"/>
                <path d="M250 50 Q260 45 270 47" stroke="rgba(0,0,0,0.2)" strokeWidth="1" fill="none"/>
                
                {/* Double star icon background */}
                <circle cx="125" cy="85" r="20" fill="#A89182" fillOpacity="0.1"/>
                <circle cx="175" cy="85" r="20" fill="#A89182" fillOpacity="0.1"/>
                
                {/* Double star icons */}
                <path d="M125 70 L127 77 L135 77 L129 82 L131 89 L125 86 L119 89 L121 82 L115 77 L123 77 Z" 
                      fill="#A89182" stroke="#A89182" strokeWidth="1"/>
                <path d="M175 70 L177 77 L185 77 L179 82 L181 89 L175 86 L169 89 L171 82 L165 77 L173 77 Z" 
                      fill="#A89182" stroke="#A89182" strokeWidth="1"/>
                
                {/* Title */}
                <text x="150" y="140" textAnchor="middle" fontSize="28" fontWeight="900" fill="#1D2915">PRO</text>
                
                {/* Sticker count */}
                <text x="150" y="180" textAnchor="middle" fontSize="36" fontWeight="900" fill="#1D2915">2 STICKERS</text>
                
                {/* Description */}
                <text x="150" y="210" textAnchor="middle" fontSize="13" fontWeight="600" fill="#686346">Scale your earnings with</text>
                <text x="150" y="225" textAnchor="middle" fontSize="13" fontWeight="600" fill="#686346">strategic placement</text>
                
                {/* Features */}
                <circle cx="85" cy="250" r="3" fill="#A89182"/>
                <text x="100" y="255" fontSize="12" fontWeight="600" fill="#1D2915">$0.01 per scan</text>
                
                <circle cx="85" cy="270" r="3" fill="#A89182"/>
                <text x="100" y="275" fontSize="12" fontWeight="600" fill="#1D2915">2x earning potential</text>
                
                <circle cx="85" cy="290" r="3" fill="#A89182"/>
                <text x="100" y="295" fontSize="12" fontWeight="600" fill="#1D2915">Advanced analytics</text>
              </svg>
            </div>
            
            {/* Elite Tier Sticker */}
            <div className="transform hover:scale-105 transition-all duration-300 cursor-pointer" style={{transform: 'rotate(-1.5deg)'}}>
              <svg width="280" height="320" viewBox="0 0 280 320" className="drop-shadow-2xl">
                {/* Sticker shadow */}
                <ellipse cx="145" cy="315" rx="120" ry="8" fill="rgba(0,0,0,0.4)" />
                
                {/* Main sticker body with weathered edges */}
                <path d="M20 45 Q20 20 45 20 L235 20 Q260 20 260 45 L260 275 Q260 300 235 300 L45 300 Q20 300 20 275 Z" 
                      fill="#EFEFEE" stroke="#686346" strokeWidth="2"/>
                
                {/* Elite premium accent with slight wear */}
                <path d="M23 45 Q23 23 45 23 L232 23 Q257 23 257 45 L257 272 Q257 297 232 297 L45 297 Q23 297 23 272 Z" 
                      fill="none" stroke="#686346" strokeWidth="1" strokeOpacity="0.2"/>
                
                {/* Diagonal crease for aged look */}
                <path d="M25 180 Q140 175 255 185" stroke="rgba(0,0,0,0.08)" strokeWidth="1" fill="none"/>
                <path d="M30 100 Q140 98 250 105" stroke="rgba(0,0,0,0.05)" strokeWidth="1" fill="none"/>
                
                {/* Peeling corner with deep curl */}
                <path d="M235 45 L260 20 L260 45 Z" fill="#F8F8F8" stroke="#686346" strokeWidth="1"/>
                <path d="M235 45 L250 35 L260 45 Z" fill="#E8E8E8"/>
                <path d="M235 45 Q245 40 255 43" stroke="rgba(0,0,0,0.25)" strokeWidth="1" fill="none"/>
                
                {/* Triple star icon backgrounds */}
                <circle cx="110" cy="80" r="18" fill="#686346" fillOpacity="0.1"/>
                <circle cx="140" cy="80" r="18" fill="#686346" fillOpacity="0.1"/>
                <circle cx="170" cy="80" r="18" fill="#686346" fillOpacity="0.1"/>
                
                {/* Triple star icons */}
                <path d="M110 68 L112 75 L119 75 L114 79 L116 86 L110 83 L104 86 L106 79 L101 75 L108 75 Z" 
                      fill="#686346" stroke="#686346" strokeWidth="1"/>
                <path d="M140 68 L142 75 L149 75 L144 79 L146 86 L140 83 L134 86 L136 79 L131 75 L138 75 Z" 
                      fill="#686346" stroke="#686346" strokeWidth="1"/>
                <path d="M170 68 L172 75 L179 75 L174 79 L176 86 L170 83 L164 86 L166 79 L161 75 L168 75 Z" 
                      fill="#686346" stroke="#686346" strokeWidth="1"/>
                
                {/* Title */}
                <text x="140" y="130" textAnchor="middle" fontSize="24" fontWeight="900" fill="#1D2915">ELITE</text>
                
                {/* Sticker count */}
                <text x="140" y="165" textAnchor="middle" fontSize="32" fontWeight="900" fill="#1D2915">5+ STICKERS</text>
                
                {/* Description */}
                <text x="140" y="195" textAnchor="middle" fontSize="12" fontWeight="600" fill="#686346">Maximum tier for</text>
                <text x="140" y="210" textAnchor="middle" fontSize="12" fontWeight="600" fill="#686346">top performers</text>
                
                {/* Features */}
                <circle cx="80" cy="235" r="3" fill="#686346"/>
                <text x="95" y="240" fontSize="11" fontWeight="600" fill="#1D2915">$0.01 per scan</text>
                
                <circle cx="80" cy="255" r="3" fill="#686346"/>
                <text x="95" y="260" fontSize="11" fontWeight="600" fill="#1D2915">5x+ earning potential</text>
                
                <circle cx="80" cy="275" r="3" fill="#686346"/>
                <text x="95" y="280" fontSize="11" fontWeight="600" fill="#1D2915">Priority support</text>
              </svg>
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