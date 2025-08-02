import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface QrScannerModalProps {
  open: boolean;
  onClose: () => void;
}

export default function QrScannerModal({ open, onClose }: QrScannerModalProps) {
  const [claimCode, setClaimCode] = useState("");
  const [placementDescription, setPlacementDescription] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const claimQRMutation = useMutation({
    mutationFn: async (data: { claimCode: string; placementDescription: string }) => {
      return await apiRequest("/api/qr-codes/claim", "POST", data);
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
    claimQRMutation.mutate({ claimCode, placementDescription });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-card dark:bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground dark:text-foreground">
            <QrCode className="h-5 w-5" />
            Claim QR Code
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="claimCode" className="text-foreground dark:text-foreground">Claim Code</Label>
            <Input
              id="claimCode"
              placeholder="Enter your claim code"
              value={claimCode}
              onChange={(e) => setClaimCode(e.target.value)}
              className="bg-background dark:bg-background border-border dark:border-border"
            />
          </div>
          
          <div>
            <Label htmlFor="placement" className="text-foreground dark:text-foreground">Where will you place this sticker?</Label>
            <Input
              id="placement"
              placeholder="e.g., Coffee shop window, park bench"
              value={placementDescription}
              onChange={(e) => setPlacementDescription(e.target.value)}
              className="bg-background dark:bg-background border-border dark:border-border"
            />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button 
              onClick={handleClaim}
              disabled={claimQRMutation.isPending}
              className="flex-1 bg-primary dark:bg-primary text-primary-foreground dark:text-primary-foreground hover:bg-primary/90 dark:hover:bg-primary/90"
            >
              {claimQRMutation.isPending ? "Claiming..." : "Claim QR Code"}
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="border-border dark:border-border text-foreground dark:text-foreground hover:bg-muted dark:hover:bg-muted"
            >
              Cancel
            </Button>
          </div>
          
          <div className="text-center pt-2">
            <Button 
              variant="link" 
              className="text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground"
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