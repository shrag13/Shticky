import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Camera, CheckCircle, AlertCircle } from "lucide-react";

interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QrScannerModal({ isOpen, onClose }: QrScannerModalProps) {
  const [qrInput, setQrInput] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();

  const claimQrCodeMutation = useMutation({
    mutationFn: async (qrCodeId: string) => {
      await apiRequest("POST", "/api/qr-codes/claim", { qrCodeId });
    },
    onSuccess: () => {
      setShowSuccess(true);
      queryClient.invalidateQueries({ queryKey: ["/api/qr-codes/me"] });
      queryClient.invalidateQueries({ queryKey: ["/api/users/me/stats"] });
      
      setTimeout(() => {
        setShowSuccess(false);
        setQrInput("");
        onClose();
      }, 2000);
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      
      setErrorMessage(error.message || "Failed to claim QR code");
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    },
  });

  const handleClaim = () => {
    if (!qrInput.trim()) {
      setErrorMessage("Please enter a QR code");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    claimQrCodeMutation.mutate(qrInput.trim());
  };

  const handleClose = () => {
    setQrInput("");
    setShowSuccess(false);
    setShowError(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Scan New Shticky</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Camera Preview Area */}
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <Camera className="h-16 w-16 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Camera preview will appear here</p>
              <p className="text-xs text-gray-400 mt-1">Feature coming soon</p>
            </div>
          </div>

          {/* Manual Input */}
          <div className="space-y-2">
            <Label htmlFor="qrInput">Or enter QR code manually:</Label>
            <Input
              id="qrInput"
              type="text"
              placeholder="Enter QR code string"
              value={qrInput}
              onChange={(e) => setQrInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleClaim()}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button 
              onClick={handleClaim}
              disabled={claimQrCodeMutation.isPending}
              className="flex-1"
            >
              {claimQrCodeMutation.isPending ? "Claiming..." : "Claim Shticky"}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>

          {/* Status Messages */}
          {showSuccess && (
            <Alert className="border-secondary bg-secondary/10">
              <CheckCircle className="h-4 w-4 text-secondary" />
              <AlertDescription className="text-secondary">
                Shticky claimed successfully!
              </AlertDescription>
            </Alert>
          )}

          {showError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {errorMessage}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
