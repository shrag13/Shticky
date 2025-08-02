import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/mode-toggle";
import { QrCode, DollarSign, Globe, Users, Smartphone, MapPin, Calendar, Shield, Zap } from "lucide-react";
import logoPath from "@assets/IMG_20250701_021649_086_1754152193224.webp";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background dark:bg-background">
      {/* Header */}
      <header className="border-b border-border dark:border-border bg-card dark:bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logoPath} alt="Shticky" className="h-10 w-10 rounded object-cover" />
              <h1 className="text-2xl font-bold text-foreground dark:text-foreground">Shticky</h1>
            </div>
            <div className="flex items-center gap-4">
              <ModeToggle />
              <Button asChild className="bg-primary dark:bg-primary text-primary-foreground dark:text-primary-foreground hover:bg-primary/90 dark:hover:bg-primary/90">
                <a href="/api/login">Get Started</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-background dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4 bg-accent dark:bg-accent text-accent-foreground dark:text-accent-foreground">
            Earn Money With Every Scan
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground dark:text-foreground">
            Turn QR Codes Into
            <span className="text-primary dark:text-primary"> Passive Income</span>
          </h1>
          
          <p className="text-xl text-muted-foreground dark:text-muted-foreground mb-8 max-w-3xl mx-auto">
            Place QR code stickers around your city and earn $0.01 every time someone scans them. 
            Join thousands of people earning passive income with Shticky.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild className="text-lg px-8 py-4 bg-primary dark:bg-primary text-primary-foreground dark:text-primary-foreground hover:bg-primary/90 dark:hover:bg-primary/90">
              <a href="/api/login">Start Earning Today</a>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-4 border-border dark:border-border text-foreground dark:text-foreground hover:bg-muted dark:hover:bg-muted">
              <Link href="#how-it-works">Learn How It Works</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-full mb-4">
                <QrCode className="h-8 w-8 text-primary dark:text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground dark:text-foreground">Get QR Stickers</h3>
              <p className="text-muted-foreground dark:text-muted-foreground text-center">Apply to receive free QR code stickers delivered to your door</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-accent/20 dark:bg-accent/30 p-4 rounded-full mb-4">
                <MapPin className="h-8 w-8 text-accent-foreground dark:text-accent-foreground" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground dark:text-foreground">Place Strategically</h3>
              <p className="text-muted-foreground dark:text-muted-foreground text-center">Stick them in high-traffic areas like coffee shops, bus stops, and parks</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-secondary/20 dark:bg-secondary/30 p-4 rounded-full mb-4">
                <DollarSign className="h-8 w-8 text-secondary dark:text-secondary" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground dark:text-foreground">Earn Per Scan</h3>
              <p className="text-muted-foreground dark:text-muted-foreground text-center">Get paid $0.01 for every scan with automatic monthly payouts</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-muted/50 dark:bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground dark:text-foreground">How Shticky Works</h2>
            <p className="text-xl text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto">
              Simple steps to start earning passive income with QR codes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center bg-card dark:bg-card border-border dark:border-border">
              <CardHeader>
                <div className="mx-auto bg-primary/10 dark:bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary dark:text-primary" />
                </div>
                <CardTitle className="text-foreground dark:text-foreground">1. Apply</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground dark:text-muted-foreground">
                  Submit your application with shipping details. We review all applications to ensure quality placement.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-card dark:bg-card border-border dark:border-border">
              <CardHeader>
                <div className="mx-auto bg-accent/20 dark:bg-accent/30 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Smartphone className="h-8 w-8 text-accent-foreground dark:text-accent-foreground" />
                </div>
                <CardTitle className="text-foreground dark:text-foreground">2. Receive Stickers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground dark:text-muted-foreground">
                  Get your personalized QR stickers delivered free. Each tier unlocks more stickers and earning potential.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-card dark:bg-card border-border dark:border-border">
              <CardHeader>
                <div className="mx-auto bg-secondary/20 dark:bg-secondary/30 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Globe className="h-8 w-8 text-secondary dark:text-secondary" />
                </div>
                <CardTitle className="text-foreground dark:text-foreground">3. Place & Track</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground dark:text-muted-foreground">
                  Place stickers in high-traffic locations and track your earnings in real-time through the dashboard.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-card dark:bg-card border-border dark:border-border">
              <CardHeader>
                <div className="mx-auto bg-primary/10 dark:bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-primary dark:text-primary" />
                </div>
                <CardTitle className="text-foreground dark:text-foreground">4. Get Paid</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground dark:text-muted-foreground">
                  Receive automatic monthly payouts for balances over $5. Choose from bank transfer, Cash App, or PayPal.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground dark:text-foreground">Why Choose Shticky?</h2>
            <p className="text-xl text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto">
              The smartest way to earn passive income in your city
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg">
                  <Zap className="h-6 w-6 text-primary dark:text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-foreground dark:text-foreground">Completely Passive</h3>
                <p className="text-muted-foreground dark:text-muted-foreground">Once placed, your stickers work 24/7 without any additional effort from you.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-accent/20 dark:bg-accent/30 p-3 rounded-lg">
                  <Shield className="h-6 w-6 text-accent-foreground dark:text-accent-foreground" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-foreground dark:text-foreground">Reliable Payments</h3>
                <p className="text-muted-foreground dark:text-muted-foreground">Automatic monthly payouts with transparent tracking and multiple payment options.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-secondary/20 dark:bg-secondary/30 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-secondary dark:text-secondary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-foreground dark:text-foreground">Community Driven</h3>
                <p className="text-muted-foreground dark:text-muted-foreground">Join a community of earners sharing tips and discovering the best placement spots.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5 dark:bg-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 text-foreground dark:text-foreground">Ready to Start Earning?</h2>
          <p className="text-xl text-muted-foreground dark:text-muted-foreground mb-8">
            Join thousands of people already earning passive income with Shticky. Application takes less than 2 minutes.
          </p>
          <Button size="lg" asChild className="text-lg px-8 py-4 bg-primary dark:bg-primary text-primary-foreground dark:text-primary-foreground hover:bg-primary/90 dark:hover:bg-primary/90">
            <a href="/api/login">Apply Now - It's Free</a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border dark:border-border bg-muted/50 dark:bg-muted/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <img src={logoPath} alt="Shticky" className="h-8 w-8 rounded object-cover" />
              <span className="font-semibold text-foreground dark:text-foreground">Shticky</span>
            </div>
            <p className="text-muted-foreground dark:text-muted-foreground">
              © 2025 Shticky. Turn QR codes into passive income.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}