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
          
          <div className="flex flex-row items-center justify-center gap-8 lg:gap-16 max-w-7xl mx-auto flex-wrap lg:flex-nowrap">
            {/* Starter Tier Sticker */}
            <div className="transform hover:scale-105 transition-all duration-300 cursor-pointer" style={{transform: 'rotate(-2deg)'}}>
              <svg width="300" height="280" viewBox="0 0 300 280" className="drop-shadow-2xl">
                {/* Sticker shadow */}
                <ellipse cx="155" cy="275" rx="140" ry="8" fill="rgba(0,0,0,0.4)" />
                
                {/* Realistic paper texture background */}
                <defs>
                  <pattern id="starterTexture" patternUnits="userSpaceOnUse" width="300" height="260">
                    <image href={stickerTexturePath} x="0" y="0" width="300" height="260" opacity="0.6"/>
                  </pattern>
                </defs>
                
                {/* Main sticker body with wrinkled edges */}
                <path d="M20 35 Q18 20 35 18 L265 22 Q282 25 280 42 L275 238 Q278 255 265 258 L35 255 Q18 252 20 235 Z" 
                      fill="url(#starterTexture)" stroke="#D1D1D1" strokeWidth="2"/>
                
                {/* Overlay for better text contrast */}
                <path d="M20 35 Q18 20 35 18 L265 22 Q282 25 280 42 L275 238 Q278 255 265 258 L35 255 Q18 252 20 235 Z" 
                      fill="rgba(255,255,255,0.7)"/>
                
                {/* Star icon background */}
                <circle cx="150" cy="70" r="25" fill="#9A7B60" fillOpacity="0.15"/>
                
                {/* Star icon */}
                <path d="M150 50 L153 60 L163 60 L155 67 L158 77 L150 72 L142 77 L145 67 L137 60 L147 60 Z" 
                      fill="#9A7B60" stroke="#9A7B60" strokeWidth="1"/>
                
                {/* Title */}
                <text x="150" y="115" textAnchor="middle" fontSize="26" fontWeight="900" fill="#1D2915">STARTER</text>
                
                {/* Sticker count */}
                <text x="150" y="145" textAnchor="middle" fontSize="28" fontWeight="900" fill="#1D2915">1 STICKER</text>
                
                {/* Description */}
                <text x="150" y="170" textAnchor="middle" fontSize="12" fontWeight="600" fill="#686346">Perfect for testing your placement strategy</text>
                
                {/* Features */}
                <circle cx="90" cy="195" r="3" fill="#9A7B60"/>
                <text x="105" y="200" fontSize="11" fontWeight="600" fill="#1D2915">$0.01 per scan</text>
                
                <circle cx="90" cy="215" r="3" fill="#9A7B60"/>
                <text x="105" y="220" fontSize="11" fontWeight="600" fill="#1D2915">Monthly auto-payouts</text>
                
                <circle cx="90" cy="235" r="3" fill="#9A7B60"/>
                <text x="105" y="240" fontSize="11" fontWeight="600" fill="#1D2915">Dashboard analytics</text>
              </svg>
            </div>
            
            {/* Pro Tier Sticker */}
            <div className="transform hover:scale-105 transition-all duration-300 cursor-pointer relative" style={{transform: 'rotate(1deg)'}}>
              <svg width="300" height="280" viewBox="0 0 300 280" className="drop-shadow-2xl">
                {/* Sticker shadow */}
                <ellipse cx="155" cy="275" rx="140" ry="8" fill="rgba(0,0,0,0.5)" />
                
                {/* Realistic paper texture background */}
                <defs>
                  <pattern id="proTexture" patternUnits="userSpaceOnUse" width="300" height="260">
                    <image href={stickerTexturePath} x="-100" y="0" width="300" height="260" opacity="0.6"/>
                  </pattern>
                </defs>
                
                {/* Main sticker body with wrinkled edges */}
                <path d="M18 38 Q15 18 38 15 L268 20 Q285 22 282 45 L278 235 Q280 258 268 260 L38 258 Q15 255 18 232 Z" 
                      fill="url(#proTexture)" stroke="#A89182" strokeWidth="3"/>
                
                {/* Overlay for better text contrast */}
                <path d="M18 38 Q15 18 38 15 L268 20 Q285 22 282 45 L278 235 Q280 258 268 260 L38 258 Q15 255 18 232 Z" 
                      fill="rgba(255,255,255,0.7)"/>
                
                {/* Double star icon background */}
                <circle cx="125" cy="70" r="20" fill="#A89182" fillOpacity="0.15"/>
                <circle cx="175" cy="70" r="20" fill="#A89182" fillOpacity="0.15"/>
                
                {/* Double star icons */}
                <path d="M125 55 L127 62 L135 62 L129 67 L131 74 L125 71 L119 74 L121 67 L115 62 L123 62 Z" 
                      fill="#A89182" stroke="#A89182" strokeWidth="1"/>
                <path d="M175 55 L177 62 L185 62 L179 67 L181 74 L175 71 L169 74 L171 67 L165 62 L173 62 Z" 
                      fill="#A89182" stroke="#A89182" strokeWidth="1"/>
                
                {/* Title */}
                <text x="150" y="115" textAnchor="middle" fontSize="28" fontWeight="900" fill="#1D2915">PRO</text>
                
                {/* Sticker count */}
                <text x="150" y="145" textAnchor="middle" fontSize="28" fontWeight="900" fill="#1D2915">2 STICKERS</text>
                
                {/* Description */}
                <text x="150" y="170" textAnchor="middle" fontSize="12" fontWeight="600" fill="#686346">Scale your earnings with strategic placement</text>
                
                {/* Features */}
                <circle cx="85" cy="195" r="3" fill="#A89182"/>
                <text x="100" y="200" fontSize="11" fontWeight="600" fill="#1D2915">$0.01 per scan</text>
                
                <circle cx="85" cy="215" r="3" fill="#A89182"/>
                <text x="100" y="220" fontSize="11" fontWeight="600" fill="#1D2915">2x earning potential</text>
                
                <circle cx="85" cy="235" r="3" fill="#A89182"/>
                <text x="100" y="240" fontSize="11" fontWeight="600" fill="#1D2915">Advanced analytics</text>
              </svg>
            </div>
            
            {/* Elite Tier Sticker */}
            <div className="transform hover:scale-105 transition-all duration-300 cursor-pointer" style={{transform: 'rotate(-1.5deg)'}}>
              <svg width="300" height="280" viewBox="0 0 300 280" className="drop-shadow-2xl">
                {/* Sticker shadow */}
                <ellipse cx="155" cy="275" rx="140" ry="8" fill="rgba(0,0,0,0.4)" />
                
                {/* Realistic paper texture background */}
                <defs>
                  <pattern id="eliteTexture" patternUnits="userSpaceOnUse" width="300" height="260">
                    <image href={stickerTexturePath} x="-200" y="0" width="300" height="260" opacity="0.6"/>
                  </pattern>
                </defs>
                
                {/* Main sticker body with weathered edges */}
                <path d="M22 40 Q20 22 40 20 L260 18 Q280 20 278 40 L282 240 Q280 260 260 258 L40 260 Q20 258 22 238 Z" 
                      fill="url(#eliteTexture)" stroke="#686346" strokeWidth="2"/>
                
                {/* Overlay for better text contrast */}
                <path d="M22 40 Q20 22 40 20 L260 18 Q280 20 278 40 L282 240 Q280 260 260 258 L40 260 Q20 258 22 238 Z" 
                      fill="rgba(255,255,255,0.7)"/>
                
                {/* Triple star icon backgrounds */}
                <circle cx="110" cy="70" r="18" fill="#686346" fillOpacity="0.15"/>
                <circle cx="150" cy="70" r="18" fill="#686346" fillOpacity="0.15"/>
                <circle cx="190" cy="70" r="18" fill="#686346" fillOpacity="0.15"/>
                
                {/* Triple star icons */}
                <path d="M110 58 L112 65 L119 65 L114 69 L116 76 L110 73 L104 76 L106 69 L101 65 L108 65 Z" 
                      fill="#686346" stroke="#686346" strokeWidth="1"/>
                <path d="M150 58 L152 65 L159 65 L154 69 L156 76 L150 73 L144 76 L146 69 L141 65 L148 65 Z" 
                      fill="#686346" stroke="#686346" strokeWidth="1"/>
                <path d="M190 58 L192 65 L199 65 L194 69 L196 76 L190 73 L184 76 L186 69 L181 65 L188 65 Z" 
                      fill="#686346" stroke="#686346" strokeWidth="1"/>
                
                {/* Title */}
                <text x="150" y="115" textAnchor="middle" fontSize="26" fontWeight="900" fill="#1D2915">ELITE</text>
                
                {/* Sticker count */}
                <text x="150" y="145" textAnchor="middle" fontSize="28" fontWeight="900" fill="#1D2915">3 STICKERS</text>
                
                {/* Description */}
                <text x="150" y="170" textAnchor="middle" fontSize="12" fontWeight="600" fill="#686346">Maximum tier for top performers</text>
                
                {/* Features */}
                <circle cx="85" cy="195" r="3" fill="#686346"/>
                <text x="100" y="200" fontSize="11" fontWeight="600" fill="#1D2915">$0.01 per scan</text>
                
                <circle cx="85" cy="215" r="3" fill="#686346"/>
                <text x="100" y="220" fontSize="11" fontWeight="600" fill="#1D2915">3x earning potential</text>
                
                <circle cx="85" cy="235" r="3" fill="#686346"/>
                <text x="100" y="240" fontSize="11" fontWeight="600" fill="#1D2915">Priority support</text>
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