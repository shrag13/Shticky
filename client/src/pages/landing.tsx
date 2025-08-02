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

      {/* Tier Progression System - Brick Wall Background */}
      <section 
        className="relative"
        style={{
          backgroundImage: `url(${brickWallPath})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh'
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          {/* Header */}
          <div 
            ref={tiersAnimation.ref}
            className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
              tiersAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black mb-4 sm:mb-6 text-white drop-shadow-2xl">
              <span className="drop-shadow-lg">TIER</span>{" "}
              <span className="drop-shadow-lg">PROGRESSION</span>{" "}
              <span className="drop-shadow-lg">SYSTEM</span>
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl font-bold max-w-4xl mx-auto text-white drop-shadow-xl">
              Prove your strategy works and unlock more earning potential
            </p>
          </div>
          
          {/* Horizontal Stickers Container */}
          <div className="flex justify-center items-center w-full">
            <div className="flex flex-row gap-4 sm:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide pb-6 px-4 max-w-full">
              
              {/* Starter Tier - Simple Card with Sticker Effect */}
              <div className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px]">
                <div 
                  className="bg-white rounded-lg p-6 shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer relative"
                  style={{
                    transform: 'rotate(-1deg)',
                    backgroundImage: `url(${stickerTexturePath})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundBlendMode: 'overlay'
                  }}
                >
                  {/* Content overlay */}
                  <div className="relative z-10 bg-white bg-opacity-90 rounded-lg p-4">
                    {/* Star */}
                    <div className="flex justify-center mb-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{backgroundColor: '#9A7B60'}}
                      >
                        ⭐
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-black text-center mb-2" style={{color: '#1D2915'}}>
                      STARTER
                    </h3>
                    
                    {/* Sticker Count */}
                    <p className="text-lg sm:text-xl font-black text-center mb-3" style={{color: '#1D2915'}}>
                      1 STICKER
                    </p>
                    
                    {/* Description */}
                    <p className="text-sm text-center mb-4" style={{color: '#686346'}}>
                      Perfect for testing your placement strategy
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <div 
                          className="w-2 h-2 rounded-full mr-3"
                          style={{backgroundColor: '#9A7B60'}}
                        ></div>
                        <span style={{color: '#1D2915'}}>$0.01 per scan</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div 
                          className="w-2 h-2 rounded-full mr-3"
                          style={{backgroundColor: '#9A7B60'}}
                        ></div>
                        <span style={{color: '#1D2915'}}>Monthly payouts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pro Tier - Simple Card with Sticker Effect */}
              <div className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px]">
                <div 
                  className="bg-white rounded-lg p-6 shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer relative"
                  style={{
                    transform: 'rotate(0.5deg)',
                    backgroundImage: `url(${stickerTexturePath})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundBlendMode: 'overlay'
                  }}
                >
                  {/* Content overlay */}
                  <div className="relative z-10 bg-white bg-opacity-90 rounded-lg p-4">
                    {/* Double Stars */}
                    <div className="flex justify-center gap-2 mb-4">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{backgroundColor: '#A89182'}}
                      >
                        ⭐
                      </div>
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{backgroundColor: '#A89182'}}
                      >
                        ⭐
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-black text-center mb-2" style={{color: '#1D2915'}}>
                      PRO
                    </h3>
                    
                    {/* Sticker Count */}
                    <p className="text-lg sm:text-xl font-black text-center mb-3" style={{color: '#1D2915'}}>
                      2 STICKERS
                    </p>
                    
                    {/* Description */}
                    <p className="text-sm text-center mb-4" style={{color: '#686346'}}>
                      Scale your earnings with strategic placement
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <div 
                          className="w-2 h-2 rounded-full mr-3"
                          style={{backgroundColor: '#A89182'}}
                        ></div>
                        <span style={{color: '#1D2915'}}>$0.01 per scan</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div 
                          className="w-2 h-2 rounded-full mr-3"
                          style={{backgroundColor: '#A89182'}}
                        ></div>
                        <span style={{color: '#1D2915'}}>2x earning potential</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Elite Tier - Simple Card with Sticker Effect */}
              <div className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px]">
                <div 
                  className="bg-white rounded-lg p-6 shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer relative"
                  style={{
                    transform: 'rotate(-0.8deg)',
                    backgroundImage: `url(${stickerTexturePath})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundBlendMode: 'overlay'
                  }}
                >
                  {/* Content overlay */}
                  <div className="relative z-10 bg-white bg-opacity-90 rounded-lg p-4">
                    {/* Triple Stars */}
                    <div className="flex justify-center gap-1 mb-4">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{backgroundColor: '#686346'}}
                      >
                        ⭐
                      </div>
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{backgroundColor: '#686346'}}
                      >
                        ⭐
                      </div>
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{backgroundColor: '#686346'}}
                      >
                        ⭐
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-black text-center mb-2" style={{color: '#1D2915'}}>
                      ELITE
                    </h3>
                    
                    {/* Sticker Count */}
                    <p className="text-lg sm:text-xl font-black text-center mb-3" style={{color: '#1D2915'}}>
                      3 STICKERS
                    </p>
                    
                    {/* Description */}
                    <p className="text-sm text-center mb-4" style={{color: '#686346'}}>
                      Maximum tier for top performers
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <div 
                          className="w-2 h-2 rounded-full mr-3"
                          style={{backgroundColor: '#686346'}}
                        ></div>
                        <span style={{color: '#1D2915'}}>$0.01 per scan</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div 
                          className="w-2 h-2 rounded-full mr-3"
                          style={{backgroundColor: '#686346'}}
                        ></div>
                        <span style={{color: '#1D2915'}}>3x earning potential</span>
                      </div>
                    </div>
                  </div>
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