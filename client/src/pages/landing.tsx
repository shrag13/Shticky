import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, DollarSign, Star, Camera, ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import logoPath from "@assets/IMG_20250628_212758_407_1754151926865.webp";
import brickWallPath from "@assets/istockphoto-184099696-612x612_1754167496614.jpg";
import starterStickerPath from "@assets/Untitled (1920 x 1080 px) (1080 x 1920 px) (1080 x 1500 px)_20250802_182314_0000_1754175563478.png";
import proStickerPath from "@assets/Untitled (1920 x 1080 px) (1080 x 1920 px) (1080 x 1500 px)_20250802_182327_0000_1754175563508.png";
import eliteStickerPath from "@assets/Untitled (1920 x 1080 px) (1080 x 1920 px) (1080 x 1500 px)_20250802_182337_0000_1754175563526.png";

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

      {/* Tier Progression System - Brick Wall Background */}
      <section 
        className="relative overflow-hidden"
        style={{
          backgroundImage: `url(${brickWallPath})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          width: '100vw',
          height: '60vh',
          minHeight: '500px',
          maxHeight: '700px',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          position: 'relative'
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="relative z-10 h-full px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col justify-center py-8 max-w-none w-full">
          {/* Header */}
          <div 
            ref={tiersAnimation.ref}
            className={`text-center mb-4 transition-all duration-1000 ${
              tiersAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-lg sm:text-xl lg:text-2xl font-black mb-2 text-white drop-shadow-2xl tracking-wide">
              <span className="drop-shadow-lg" style={{color: '#A89182'}}>TIER</span>{" "}
              <span className="drop-shadow-lg" style={{color: '#9A7B60'}}>PROGRESSION</span>{" "}
              <span className="drop-shadow-lg" style={{color: '#A89182'}}>SYSTEM</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg font-bold max-w-xl mx-auto text-white drop-shadow-lg">
              Prove your strategy works and unlock more earning potential
            </p>
          </div>
          
          {/* Horizontal Stickers on Brick Wall */}
          <div className="flex justify-center items-center flex-1">
            <div className="flex flex-row justify-center items-center gap-4 sm:gap-6 lg:gap-8 xl:gap-12 w-full max-w-7xl px-4">
              
              {/* Starter Tier */}
              <div className="flex-1 min-w-0 max-w-sm">
                <div 
                  className="w-28 h-36 sm:w-32 h-44 lg:w-36 h-48 xl:w-40 h-52 rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer relative mx-auto border-4 border-white"
                  style={{
                    transform: 'rotate(-2deg)',
                    backgroundImage: `url(${starterStickerPath})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'drop-shadow(0 15px 25px rgba(0, 0, 0, 0.5))',
                    boxShadow: '0 15px 25px rgba(0, 0, 0, 0.5), inset 0 0 0 4px rgba(255, 255, 255, 0.9)'
                  }}
                >
                  {/* Content overlay */}
                  <div className="relative z-10 p-2 sm:p-3 lg:p-4 h-full flex flex-col justify-between text-center bg-white/90 backdrop-blur-sm rounded-lg border-2 border-white shadow-xl">
                    <div>
                      {/* Star Badge */}
                      <div className="flex justify-center mb-2">
                        <div 
                          className="w-5 h-5 lg:w-6 h-6 rounded-full flex items-center justify-center text-sm shadow-lg"
                          style={{backgroundColor: '#9A7B60'}}
                        >
                          ⭐
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-sm sm:text-base font-black mb-1" style={{color: '#1D2915'}}>
                        STARTER
                      </h3>
                      
                      {/* Sticker Count */}
                      <p className="text-xs sm:text-sm font-bold mb-2" style={{color: '#1D2915'}}>
                        1 STICKER
                      </p>
                    </div>
                    
                    {/* Features */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-center text-sm font-bold">
                        <span style={{color: '#1D2915'}}>$0.01/scan</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Tier Description */}
                <div className="mt-2 text-center">
                  <p className="text-white font-bold text-xs drop-shadow-lg">
                    Start & prove strategy
                  </p>
                </div>
              </div>

              {/* Pro Tier */}
              <div className="flex-1 min-w-0 max-w-sm">
                <div 
                  className="w-28 h-36 sm:w-32 h-44 lg:w-36 h-48 xl:w-40 h-52 rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer relative mx-auto border-4 border-white"
                  style={{
                    transform: 'rotate(1deg)',
                    backgroundImage: `url(${proStickerPath})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'drop-shadow(0 15px 25px rgba(0, 0, 0, 0.5))',
                    boxShadow: '0 15px 25px rgba(0, 0, 0, 0.5), inset 0 0 0 4px rgba(255, 255, 255, 0.9)'
                  }}
                >
                  {/* Content overlay */}
                  <div className="relative z-10 p-2 sm:p-3 lg:p-4 h-full flex flex-col justify-between text-center bg-white/90 backdrop-blur-sm rounded-lg border-2 border-white shadow-xl">
                    <div>
                      {/* Double Stars */}
                      <div className="flex justify-center gap-1 mb-2">
                        <div 
                          className="w-4 h-4 lg:w-5 h-5 rounded-full flex items-center justify-center text-sm shadow-lg"
                          style={{backgroundColor: '#A89182'}}
                        >
                          ⭐
                        </div>
                        <div 
                          className="w-4 h-4 lg:w-5 h-5 rounded-full flex items-center justify-center text-sm shadow-lg"
                          style={{backgroundColor: '#A89182'}}
                        >
                          ⭐
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-sm sm:text-base font-black mb-1" style={{color: '#1D2915'}}>
                        PRO
                      </h3>
                      
                      {/* Sticker Count */}
                      <p className="text-xs sm:text-sm font-bold mb-2" style={{color: '#1D2915'}}>
                        2 STICKERS
                      </p>
                    </div>
                    
                    {/* Features */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-center text-sm font-bold">
                        <span style={{color: '#1D2915'}}>$0.01/scan</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Tier Description */}
                <div className="mt-2 text-center">
                  <p className="text-white font-bold text-xs drop-shadow-lg">
                    Scale earnings strategically
                  </p>
                </div>
              </div>

              {/* Elite Tier */}
              <div className="flex-1 min-w-0 max-w-sm">
                <div 
                  className="w-28 h-36 sm:w-32 h-44 lg:w-36 h-48 xl:w-40 h-52 rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer relative mx-auto border-4 border-white"
                  style={{
                    transform: 'rotate(-1deg)',
                    backgroundImage: `url(${eliteStickerPath})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'drop-shadow(0 15px 25px rgba(0, 0, 0, 0.5))',
                    boxShadow: '0 15px 25px rgba(0, 0, 0, 0.5), inset 0 0 0 4px rgba(255, 255, 255, 0.9)'
                  }}
                >
                  {/* Content overlay */}
                  <div className="relative z-10 p-2 sm:p-3 lg:p-4 h-full flex flex-col justify-between text-center bg-white/90 backdrop-blur-sm rounded-lg border-2 border-white shadow-xl">
                    <div>
                      {/* Triple Stars */}
                      <div className="flex justify-center gap-1 mb-2">
                        <div 
                          className="w-3 h-3 lg:w-4 h-4 rounded-full flex items-center justify-center text-sm shadow-lg"
                          style={{backgroundColor: '#686346'}}
                        >
                          ⭐
                        </div>
                        <div 
                          className="w-3 h-3 lg:w-4 h-4 rounded-full flex items-center justify-center text-sm shadow-lg"
                          style={{backgroundColor: '#686346'}}
                        >
                          ⭐
                        </div>
                        <div 
                          className="w-3 h-3 lg:w-4 h-4 rounded-full flex items-center justify-center text-sm shadow-lg"
                          style={{backgroundColor: '#686346'}}
                        >
                          ⭐
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-sm sm:text-base font-black mb-1" style={{color: '#1D2915'}}>
                        ELITE
                      </h3>
                      
                      {/* Sticker Count */}
                      <p className="text-xs sm:text-sm font-bold mb-2" style={{color: '#1D2915'}}>
                        3 STICKERS
                      </p>
                    </div>
                    
                    {/* Features */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-center text-sm font-bold">
                        <span style={{color: '#1D2915'}}>$0.01/scan</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Tier Description */}
                <div className="mt-2 text-center">
                  <p className="text-white font-bold text-xs drop-shadow-lg">
                    Maximum tier performer
                  </p>
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
              onClick={() => window.open('/terms', '_blank')}
            >
              Terms & Conditions
            </button>
            <button 
              className="text-sm hover:underline transition-colors"
              style={{color: '#A89182'}}
              onClick={() => window.open('/privacy', '_blank')}
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