import { useState } from "react";
import { X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface NotificationBarProps {
  user: {
    lastDismissedAt?: Date | null;
  };
  hasActiveStickers: boolean;
  hasPaymentMethod: boolean;
}

export default function NotificationBar({ user, hasActiveStickers, hasPaymentMethod }: NotificationBarProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const dismissMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("/api/user/dismiss-notification", "POST");
    },
    onSuccess: () => {
      setIsDismissed(true);
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Show notification if user has active stickers but no payment method
  // and hasn't dismissed it recently (within last 7 days)
  const shouldShow = hasActiveStickers && !hasPaymentMethod && !isDismissed;
  
  const lastDismissed = user.lastDismissedAt;
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  
  if (lastDismissed && new Date(lastDismissed) > sevenDaysAgo) {
    return null;
  }

  if (!shouldShow) {
    return null;
  }

  return (
    <div className="bg-yellow-100 dark:bg-yellow-900/30 border-b border-yellow-200 dark:border-yellow-800 px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Action Required:</strong> You have active Shtickys earning money, but no payment method set up. 
            Add a payment method to receive your monthly payouts.
          </p>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => dismissMutation.mutate()}
          className="text-yellow-600 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-800/50"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}