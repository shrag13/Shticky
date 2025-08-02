import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, DollarSign, Star, Camera, ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import logoPath from "@assets/IMG_20250701_021649_086_1754152193224.webp";

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

// Simplified liquid glass scroll effect
function useLiquidGlassDistortion() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollPercent = Math.min(scrollY / 200, 0.3); // Much more subtle
      
      // Very minimal dynamic path morphing
      const liquidBlob = document.querySelector('.liquid-glass-blob');
      if (liquidBlob) {
        const morphIntensity = scrollPercent * 5; // Reduced from 20 to 5
        const path = `M0,${50 - morphIntensity} Q200,${20 + morphIntensity} 400,${50 - morphIntensity} T800,${50 - morphIntensity} L800,100 L0,100 Z`;
        liquidBlob.setAttribute('d', path);
      }

      // Minimal backdrop blur adjustment
      const distortionLayer = document.querySelector('.liquid-glass-distortion-layer');
      if (distortionLayer) {
        const htmlElement = distortionLayer as HTMLElement;
        htmlElement.style.backdropFilter = `blur(${10 + scrollPercent * 3}px) saturate(140%) contrast(102%)`;
        (htmlElement.style as any).webkitBackdropFilter = `blur(${10 + scrollPercent * 3}px) saturate(140%) contrast(102%)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}

export default function Landing() {
  const heroAnimation = useScrollAnimation();
  const howItWorksAnimation = useScrollAnimation();
  const statsAnimation = useScrollAnimation();
  const tiersAnimation = useScrollAnimation();
  const ctaAnimation = useScrollAnimation();

  // Enable liquid glass distortion
  useLiquidGlassDistortion();

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #EFEFEE 0%, #A89182 50%, #9A7B60 100%)'}}>
      {/* Apple-Style Floating Liquid Glass Header */}
      <header className="liquid-glass-morphing fixed top-0 left-0 right-0 z-50">
        
        <div className="liquid-glass-content flex items-center justify-between px-5 py-2">
          <div className="liquid-glass-brand flex items-center space-x-3">
            <div className="liquid-glass-logo-morph">
              <img src={logoPath} alt="Shticky" className="w-9 h-9 rounded-lg object-cover" />
            </div>
            <span className="liquid-glass-text-morph text-lg font-semibold text-gray-800">
              Shticky
            </span>
          </div>
          
          <div className="liquid-glass-buttons flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="liquid-glass-btn-morph liquid-glass-btn-outline px-5 py-1.5 h-8"
              onClick={() => window.location.href = '/login'}
            >
              Sign In
            </Button>
            <Button 
              size="sm" 
              className="liquid-glass-btn-morph bg-[#9A7B60] hover:bg-[#A89182] text-white px-5 py-1.5 h-8"
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
      <section className="py-20 backdrop-blur-sm" style={{backgroundColor: 'rgba(239, 239, 238, 0.6)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={tiersAnimation.ref}
            className={`text-center mb-16 transition-all duration-1000 ${
              tiersAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6" style={{color: '#1D2915'}}>
              <span className="drop-shadow-lg" style={{color: '#9A7B60'}}>TIER</span>{" "}
              <span className="drop-shadow-lg" style={{color: '#A89182'}}>PROGRESSION</span>{" "}
              <span className="drop-shadow-lg" style={{color: '#686346'}}>SYSTEM</span>
            </h2>
            <p className="text-2xl font-bold max-w-4xl mx-auto" style={{color: '#1D2915'}}>
              Prove your strategy works and unlock more earning potential
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="hover:shadow-xl transition-all duration-300 bg-white border-2 rounded-2xl overflow-hidden" style={{borderColor: '#A89182'}}>
              <CardHeader className="text-center py-8 px-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{backgroundColor: '#EFEFEE'}}>
                  <Star className="h-8 w-8" style={{color: '#9A7B60'}} />
                </div>
                <CardTitle className="font-black text-2xl mb-2" style={{color: '#1D2915'}}>STARTER</CardTitle>
                <div className="text-5xl font-black mb-4" style={{color: '#1D2915'}}>1</div>
                <div className="text-xl font-bold" style={{color: '#1D2915'}}>STICKER</div>
              </CardHeader>
              <CardContent className="text-center px-6 pb-8">
                <p className="mb-6 font-semibold text-lg leading-relaxed" style={{color: '#1D2915'}}>Perfect for testing your placement strategy</p>
                <ul className="text-base space-y-3 font-semibold" style={{color: '#1D2915'}}>
                  <li className="flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 mr-2" style={{color: '#9A7B60'}} />
                    $0.01 per scan
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 mr-2" style={{color: '#9A7B60'}} />
                    Monthly auto-payouts
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 mr-2" style={{color: '#9A7B60'}} />
                    Dashboard analytics
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-xl transition-all duration-300 transform lg:scale-105 bg-white border-4 rounded-2xl overflow-hidden relative" style={{borderColor: '#A89182'}}>
              <div className="absolute top-0 left-0 right-0 text-center py-2 text-white font-bold text-sm" style={{backgroundColor: '#A89182'}}>
                MOST POPULAR
              </div>
              <CardHeader className="text-center py-8 px-6 pt-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{backgroundColor: '#EFEFEE'}}>
                  <Star className="h-8 w-8" style={{color: '#A89182'}} />
                </div>
                <CardTitle className="font-black text-2xl mb-2" style={{color: '#1D2915'}}>PRO</CardTitle>
                <div className="text-5xl font-black mb-4" style={{color: '#1D2915'}}>2</div>
                <div className="text-xl font-bold" style={{color: '#1D2915'}}>STICKERS</div>
              </CardHeader>
              <CardContent className="text-center px-6 pb-8">
                <p className="mb-6 font-semibold text-lg leading-relaxed" style={{color: '#1D2915'}}>Expand after proving success</p>
                <ul className="text-base space-y-3 font-semibold" style={{color: '#1D2915'}}>
                  <li className="flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 mr-2" style={{color: '#A89182'}} />
                    $0.01 per scan
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 mr-2" style={{color: '#A89182'}} />
                    2x earning potential
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 mr-2" style={{color: '#A89182'}} />
                    Advanced analytics
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-xl transition-all duration-300 bg-white border-2 rounded-2xl overflow-hidden" style={{borderColor: '#A89182'}}>
              <CardHeader className="text-center py-8 px-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{backgroundColor: '#EFEFEE'}}>
                  <Star className="h-8 w-8" style={{color: '#686346'}} />
                </div>
                <CardTitle className="font-black text-2xl mb-2" style={{color: '#1D2915'}}>ELITE</CardTitle>
                <div className="text-5xl font-black mb-4" style={{color: '#1D2915'}}>3</div>
                <div className="text-xl font-bold" style={{color: '#1D2915'}}>STICKERS</div>
              </CardHeader>
              <CardContent className="text-center px-6 pb-8">
                <p className="mb-6 font-semibold text-lg leading-relaxed" style={{color: '#1D2915'}}>Maximum tier for top performers</p>
                <ul className="text-base space-y-3 font-semibold" style={{color: '#1D2915'}}>
                  <li className="flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 mr-2" style={{color: '#686346'}} />
                    $0.01 per scan
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 mr-2" style={{color: '#686346'}} />
                    3x earning potential
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 mr-2" style={{color: '#686346'}} />
                    Priority support
                  </li>
                </ul>
              </CardContent>
            </Card>
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