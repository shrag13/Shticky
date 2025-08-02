import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-primary">
            Welcome to Shticky
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Earn money by placing QR code stickers and getting scans. Start earning $0.01 per scan!
          </p>
          <div className="space-y-3">
            <Button 
              onClick={() => window.location.href = '/login'}
              className="w-full"
            >
              Sign In
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/application'}
              className="w-full"
            >
              Apply to Join
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}