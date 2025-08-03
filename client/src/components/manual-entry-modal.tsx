import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";

interface ManualEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ManualEntryModal({ isOpen, onClose }: ManualEntryModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [claimCode, setClaimCode] = useState("");
  const [placementDescription, setPlacementDescription] = useState("");

  const claimQRMutation = useMutation({
    mutationFn: async (data: { claimCode: string; placementDescription: string }) => {
      return await apiRequest("POST", "/api/qr-codes/claim", data);
    },
    onSuccess: () => {
      toast({
        title: "QR Code Claimed",
        description: "Your Shticky has been successfully claimed!",
        variant: "default",
      });
      setClaimCode("");
      setPlacementDescription("");
      queryClient.invalidateQueries({ queryKey: ["/api/qr-codes/me"] });
      queryClient.invalidateQueries({ queryKey: ["/api/users/me/stats"] });
      onClose();
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
      
      toast({
        title: "Claim Failed",
        description: error.message || "Failed to claim QR code",
        variant: "destructive",
      });
    },
  });

  const handleClaim = () => {
    if (!claimCode.trim() || !placementDescription.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both the claim code and placement description",
        variant: "destructive",
      });
      return;
    }

    claimQRMutation.mutate({
      claimCode: claimCode.trim(),
      placementDescription: placementDescription.trim(),
    });
  };

  const handleClose = () => {
    setClaimCode("");
    setPlacementDescription("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-white/95 backdrop-blur-md shadow-2xl border-0" style={{borderRadius: '15px'}}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-black" style={{color: '#1D2915'}}>
            Enter New Shticky
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="claimCode" className="text-base font-bold" style={{color: '#1D2915'}}>
              Claim Code *
            </Label>
            <Input
              id="claimCode"
              placeholder="Enter your claim code from the sticker (e.g., SH-T1-ABC)"
              value={claimCode}
              onChange={(e) => setClaimCode(e.target.value)}
              className="liquid-glass-input text-gray-900 font-medium"
            />
            <p className="text-sm font-medium" style={{color: '#686346'}}>
              Enter the code exactly as it appears on your Shticky sticker.
            </p>
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
              disabled={claimQRMutation.isPending || !claimCode.trim() || !placementDescription.trim()}
              className="flex-1 font-black text-white text-lg py-3 shadow-xl transform hover:scale-105 transition-all duration-300"
              style={{background: 'linear-gradient(135deg, #9A7B60, #A89182, #686346)', borderRadius: '15px'}}
            >
              {claimQRMutation.isPending ? "CLAIMING..." : "CLAIM SHTICKY"}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleClose}
              className="border-2 font-bold py-3"
              style={{borderColor: '#686346', color: '#686346', borderRadius: '15px'}}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}