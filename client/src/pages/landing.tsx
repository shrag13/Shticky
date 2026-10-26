import { Button } from "@/components/ui/button";
import { ArrowDown, CheckCircle2, DollarSign, Star } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useAuth } from "@/hooks/useAuth";
import logoPath from "@assets/20250701_023412_0000_1754186769563.png";
import starterStickerPath from "@assets/Untitled (1920 x 1080 px) (1080 x 1920 px) (1080 x 1500 px)_20250802_182314_0000_1754177382824.png";
import proStickerPath from "@assets/Untitled (1920 x 1080 px) (1080 x 1920 px) (1080 x 1500 px)_20250802_182327_0000_1754177382852.png";
import eliteStickerPath from "@assets/Untitled (1920 x 1080 px) (1080 x 1920 px) (1080 x 1500 px)_20250802_182337_0000_1754177382872.png";
import "./landing.css";

const tiers = [
  { name: "Starter", count: "1 sticker", description: "Start small and prove your placement strategy.", image: starterStickerPath },
  { name: "Pro", count: "2 stickers", description: "Build on what works and grow your reach.", image: proStickerPath },
  { name: "Elite", count: "3 stickers", description: "Make the most of a proven strategy.", image: eliteStickerPath },
];

export default function Landing() {
  usePageTitle("Home");
  const { user, isAuthenticated } = useAuth();

  const dashboardPath = user && typeof user === "object" && "isAdmin" in user && user.isAdmin
    ? "/admin-panel"
    : "/home";
  const handleSignInClick = () => {
    window.location.href = isAuthenticated ? dashboardPath : "/sign-in";
  };
  const handleStartEarningClick = () => {
    window.location.href = isAuthenticated ? dashboardPath : "/application";
  };
  const scrollToHowItWorks = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("how-it-works")?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <main className="shticky-landing min-h-screen">
      <header className="landing-nav fixed inset-x-0 top-0 z-50">
        <nav className="landing-nav-inner mx-auto flex items-center justify-between" aria-label="Main navigation">
          <div className="landing-brand">
            <img src={logoPath} alt="Shticky" />
            <span>Shticky</span>
          </div>
          <div className="flex items-center gap-2">
            <Button data-testid="button-sign-in" variant="ghost" size="sm" className="landing-secondary rounded-xl px-4" onClick={handleSignInClick}>
              {isAuthenticated ? "Dashboard" : "Sign in"}
            </Button>
            <Button data-testid="button-apply-header" size="sm" className="landing-primary rounded-xl px-5" onClick={() => { window.location.href = "/application"; }}>
              Apply
            </Button>
          </div>
        </nav>
      </header>

      <section className="landing-hero text-center">
        <div className="landing-hero-inner">
          <span className="landing-kicker">A simple way to earn from your locations</span>
          <h1 className="landing-headline">
            Turn QR codes<br />
            into <span className="landing-headline-accent">cash.</span>
          </h1>
          <p className="landing-lede">
            Place Shticky QR stickers in thoughtful spots. Earn <strong>$0.01 per scan</strong>, then grow from one sticker as your strategy proves itself. Monthly auto-payouts begin at <strong>$5</strong>.
          </p>
          <div className="landing-actions">
            <Button data-testid="button-start-earning" size="lg" onClick={handleStartEarningClick} className="landing-primary h-14 rounded-full px-8 text-base font-semibold">
              {isAuthenticated ? "Go to your dashboard" : "Start earning"}
            </Button>
            <Button data-testid="button-how-it-works" size="lg" variant="outline" onClick={scrollToHowItWorks} className="landing-secondary h-14 rounded-full px-8 text-base font-semibold">
              How it works <ArrowDown aria-hidden="true" className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <p className="landing-fineprint">Transparent rates. Clear tiers. No guesswork.</p>
        </div>
      </section>

      <section className="landing-section landing-stats" aria-label="Earning details">
        <div className="landing-container landing-stat-grid">
          <article className="landing-stat">
            <span className="landing-stat-icon"><DollarSign aria-hidden="true" size={22} /></span>
            <h2>$0.01 per scan</h2>
            <p>A straightforward earning rate for every scan.</p>
          </article>
          <article className="landing-stat">
            <span className="landing-stat-icon"><Star aria-hidden="true" size={21} /></span>
            <h2>Grow by tier</h2>
            <p>Begin with one sticker and unlock more as you succeed.</p>
          </article>
          <article className="landing-stat">
            <span className="landing-stat-icon"><CheckCircle2 aria-hidden="true" size={22} /></span>
            <h2>Monthly payouts</h2>
            <p>Automatic payments once your balance reaches $5.</p>
          </article>
        </div>
      </section>

      <section id="how-it-works" className="landing-section scroll-mt-24">
        <div className="landing-container">
          <div className="landing-section-heading">
            <p className="landing-overline mb-3">A clear path from day one</p>
            <h2>How Shticky works</h2>
            <p>Three simple steps take you from a good placement idea to reliable monthly earnings.</p>
          </div>
          <div className="landing-process">
            <article className="landing-step">
              <span className="landing-step-number">01</span>
              <h3>Apply and get approved</h3>
              <p>Share your placement strategy. We review locations that can be useful to scanners and work well for you.</p>
            </article>
            <article className="landing-step">
              <span className="landing-step-number">02</span>
              <h3>Claim and place stickers</h3>
              <p>Get your unique QR stickers and put them where people will find real value in scanning them. Start with one.</p>
            </article>
            <article className="landing-step">
              <span className="landing-step-number">03</span>
              <h3>Earn and get paid</h3>
              <p>Earn $0.01 per scan. Your earnings are paid automatically each month when your balance reaches $5.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="landing-section landing-tier-section">
        <div className="landing-container">
          <div className="landing-section-heading">
            <p className="landing-overline mb-3">Progress at your pace</p>
            <h2>One proven spot at a time</h2>
            <p>Start with a single placement. As your strategy succeeds, you can unlock the next tier.</p>
          </div>
          <div className="landing-tier-grid">
            {tiers.map((tier, index) => (
              <article className="landing-tier-card" key={tier.name}>
                <div className="landing-tier-art">
                  <img src={tier.image} alt="" />
                </div>
                <div className="landing-tier-copy">
                  <span className="landing-tier-label">Tier 0{index + 1}</span>
                  <h3>{tier.name}</h3>
                  <p className="landing-tier-count">{tier.count}</p>
                  <p className="landing-tier-description">{tier.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-cta">
        <div className="landing-cta-inner">
          <p className="landing-overline mb-4" style={{ color: "#d3c0aa" }}>Your first step is a good one</p>
          <h2>Ready to put your strategy to work?</h2>
          <p>Apply to join Shticky and turn thoughtful QR placements into consistent income.</p>
          <Button data-testid="button-apply-footer" size="lg" onClick={() => { window.location.href = "/application"; }} className="landing-primary h-14 rounded-full px-9 text-base font-semibold">
            Apply now
          </Button>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="landing-footer-top">
            <div>
              <div className="landing-footer-brand">
                <img src={logoPath} alt="" />
                <span>Shticky</span>
              </div>
              <p className="landing-footer-tagline">A clearer way to earn from the places you know.</p>
            </div>
            <div className="landing-footer-links">
              <button data-testid="button-terms" type="button" onClick={() => window.open("/terms", "_blank", "noopener,noreferrer")}>Terms &amp; Conditions</button>
              <button data-testid="button-privacy" type="button" onClick={() => window.open("/privacy", "_blank", "noopener,noreferrer")}>Privacy Policy</button>
            </div>
          </div>
          <div className="landing-footer-bottom">
            <span>© 2025 Shticky. All rights reserved.</span>
            <span>$0.01 per scan · Monthly payouts from $5</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
