import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Download, Camera, X, Keyboard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import QrScanner from "qr-scanner";

interface QrScannerModalProps {
  open: boolean;
  onClose: () => void;
}

export default function QrScannerModal({ open, onClose }: QrScannerModalProps) {
  const [claimCode, setClaimCode] = useState("");
  const [placementDescription, setPlacementDescription] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);
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

  // Initialize QR Scanner
  useEffect(() => {
    if (showCamera && videoRef.current && !qrScannerRef.current) {
      qrScannerRef.current = new QrScanner(
        videoRef.current,
        (result) => {
          const extractedCode = extractShticky(result.data);
          
          if (extractedCode) {
            setClaimCode(extractedCode);
            setShowCamera(false);
            setIsScanning(false);
            toast({
              title: "Shticky QR Code Found!",
              description: `Successfully scanned: ${extractedCode}`,
            });
          } else {
            toast({
              title: "Invalid QR Code",
              description: "This QR code doesn't contain a valid Shticky code (SH-T1-XXX format)",
              variant: "destructive",
            });
          }
        },
        {
          onDecodeError: (error) => {
            console.log("QR decode error:", error);
          },
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );
    }

    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.stop();
        qrScannerRef.current.destroy();
        qrScannerRef.current = null;
      }
    };
  }, [showCamera, toast]);

  // Start/stop scanner when showCamera changes
  useEffect(() => {
    if (showCamera && qrScannerRef.current) {
      setIsScanning(true);
      qrScannerRef.current.start().catch((error) => {
        console.error("Failed to start QR scanner:", error);
        toast({
          title: "Camera Error",
          description: "Failed to access camera. Please check permissions.",
          variant: "destructive",
        });
        setShowCamera(false);
        setIsScanning(false);
      });
    } else if (!showCamera && qrScannerRef.current) {
      qrScannerRef.current.stop();
      setIsScanning(false);
    }
  }, [showCamera, toast]);

  // Clean up on modal close
  useEffect(() => {
    if (!open) {
      setShowCamera(false);
      setIsScanning(false);
      if (qrScannerRef.current) {
        qrScannerRef.current.stop();
      }
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
          <DialogDescription className="text-base font-medium" style={{color: '#686346'}}>
            Scan a QR code from your sticker or enter the claim code manually.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {showCamera ? (
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
              <div className="flex gap-2">
                <Button 
                  onClick={stopScanning}
                  variant="outline"
                  className="flex-1 font-bold border-2"
                  style={{borderColor: '#686346', color: '#686346', borderRadius: '15px'}}
                >
                  <X className="mr-2 h-4 w-4" />
                  Stop Scanning
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button 
                  onClick={startScanning}
                  className="flex-1 font-black text-white shadow-lg"
                  style={{background: 'linear-gradient(135deg, #9A7B60, #A89182)', borderRadius: '15px'}}
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Scan with Camera
                </Button>
                <Button 
                  onClick={() => setShowCamera(false)}
                  variant="outline"
                  className="font-bold border-2"
                  style={{borderColor: '#686346', color: '#686346', borderRadius: '15px'}}
                >
                  <Keyboard className="mr-2 h-4 w-4" />
                  Enter Code
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="claimCode" className="text-base font-bold" style={{color: '#1D2915'}}>
                  Claim Code (if entering manually)
                </Label>
                <Input
                  id="claimCode"
                  placeholder="Enter your claim code from the sticker"
                  value={claimCode}
                  onChange={(e) => setClaimCode(e.target.value)}
                  className="liquid-glass-input text-gray-900 font-medium"
                />
              </div>
            </div>
          )}
          
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
              disabled={claimQRMutation.isPending || !claimCode.trim() || !placementDescription.trim()}
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
          
          <div className="text-center pt-2 border-t border-gray-200">
            <Button 
              variant="link" 
              className="font-medium hover:no-underline"
              style={{color: '#9A7B60'}}
              onClick={() => window.open('/api/qr-codes/download', '_blank')}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Blank QR Codes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}