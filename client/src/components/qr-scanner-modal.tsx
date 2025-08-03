import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Download, Camera, X, Keyboard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
// QR Scanner temporarily disabled - missing qr-scanner dependency
// import QrScanner from "qr-scanner";

interface QrScannerModalProps {
  open: boolean;
  onClose: () => void;
}

export default function QrScannerModal({ open, onClose }: QrScannerModalProps) {
  const [claimCode, setClaimCode] = useState("");
  const [placementDescription, setPlacementDescription] = useState("");
  const [showCamera, setShowCamera] = useState(false); // Disabled until qr-scanner is available
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<any>(null); // Temporarily disabled
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Function to extract and validate Shticky QR code from scanned data
  const extractShticky = (scannedData: string): string | null => {
    // Remove any website prefix and extract SH code
    const shtickPattern = /SH-T\d+-[A-Z0-9]+/i;
    const match = scannedData.match(shtickPattern);
    
    if (match) {
      return match[0].toUpperCase();
    }
    
    return null;
  };

  // Initialize QR Scanner - temporarily disabled
  useEffect(() => {
    if (showCamera && videoRef.current && !qrScannerRef.current) {
      // Temporarily disabled until qr-scanner dependency is installed
      console.log("QR Scanner not available - missing qr-scanner dependency");
    }

    return () => {
      // QR Scanner cleanup temporarily disabled
      console.log("QR Scanner cleanup skipped - dependency not available");
    };
  }, [showCamera, toast]);

  // Start/stop scanner when showCamera changes - temporarily disabled
  useEffect(() => {
    // Temporarily disabled until qr-scanner dependency is installed
    console.log("QR Scanner start/stop skipped - dependency not available");
  }, [showCamera, toast]);

  // Clean up on modal close and auto-start camera
  useEffect(() => {
    if (!open) {
      setShowCamera(false);
      setIsScanning(false);
      setClaimCode("");
      setPlacementDescription("");
      if (qrScannerRef.current) {
        qrScannerRef.current.stop();
      }
    } else if (open) {
      // Auto-start camera when modal opens
      setShowCamera(true);
    }
  }, [open]);

  const startScanning = () => {
    setShowCamera(true);
  };

  const stopScanning = () => {
    setShowCamera(false);
    setIsScanning(false);
  };

  const claimQRMutation = useMutation({
    mutationFn: async (data: { claimCode: string; placementDescription: string }) => {
      return await apiRequest("POST", "/api/qr-codes/claim", data);
    },
    onSuccess: () => {
      toast({
        title: "QR Code Claimed",
        description: "Your QR code has been successfully claimed!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/user/dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["/api/qr-codes"] });
      setClaimCode("");
      setPlacementDescription("");
      onClose();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleClaim = () => {
    if (!claimCode.trim() || !placementDescription.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both the claim code and placement description.",
        variant: "destructive",
      });
      return;
    }

    // Validate and extract Shticky code for manual entry
    const validatedCode = extractShticky(claimCode);
    if (!validatedCode) {
      toast({
        title: "Invalid Shticky Code",
        description: "Please enter a valid Shticky code (format: SH-T1-XXX)",
        variant: "destructive",
      });
      return;
    }

    claimQRMutation.mutate({ claimCode: validatedCode, placementDescription });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md shadow-xl border-0 bg-white/90 backdrop-blur-sm" style={{borderRadius: '15px'}}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-black" style={{color: '#1D2915'}}>
            <QrCode className="h-6 w-6" style={{color: '#9A7B60'}} />
            Scan Shticky QR Code
          </DialogTitle>

        </DialogHeader>
        
        <div className="space-y-6">
          {!claimCode ? (
            <div className="space-y-4">
              <div className="relative" style={{borderRadius: '15px', overflow: 'hidden', backgroundColor: '#F5F3F1'}}>
                <video
                  ref={videoRef}
                  className="w-full h-64 object-cover"
                  style={{borderRadius: '15px'}}
                />
                {isScanning && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="text-white font-bold text-lg">Scanning for QR codes...</div>
                  </div>
                )}
              </div>
              <div className="flex justify-center">
                <Button 
                  onClick={onClose}
                  variant="outline"
                  className="font-bold border-2"
                  style={{borderColor: '#686346', color: '#686346', borderRadius: '15px'}}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-green-800">QR Code Scanned Successfully!</p>
                    <p className="text-green-600 text-sm">Code: {claimCode}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="placement" className="text-base font-bold" style={{color: '#1D2915'}}>
                  Where will you place this sticker? *
                </Label>
                <Input
                  id="placement"
                  placeholder="e.g., Coffee shop window, park bench, community board"
                  value={placementDescription}
                  onChange={(e) => setPlacementDescription(e.target.value)}
                  className="liquid-glass-input text-gray-900 font-medium"
                />
                <p className="text-sm font-medium" style={{color: '#686346'}}>
                  Describe the specific location where this sticker is or will be placed.
                </p>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleClaim}
                  disabled={claimQRMutation.isPending || !placementDescription.trim()}
                  className="flex-1 font-black text-white text-lg py-3 shadow-xl transform hover:scale-105 transition-all duration-300"
                  style={{background: 'linear-gradient(135deg, #9A7B60, #A89182, #686346)', borderRadius: '15px'}}
                >
                  {claimQRMutation.isPending ? "CLAIMING..." : "CLAIM SHTICKY"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={onClose}
                  className="border-2 font-bold py-3"
                  style={{borderColor: '#686346', color: '#686346', borderRadius: '15px'}}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}