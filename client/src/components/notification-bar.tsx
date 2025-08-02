import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { AlertTriangle, X } from "lucide-react";

export default function NotificationBar() {
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  const { data: notificationPreferences } = useQuery({
    queryKey: ["/api/notifications/preferences"],
    retry: false,
  });

  const dismissNotificationMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/notifications/dismiss");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notifications/preferences"] });
      setIsVisible(false);
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
    },
  });

  useEffect(() => {
    if (notificationPreferences) {
      const lastDismissed = notificationPreferences.lastDismissedAt;
      const now = new Date();
      
      // Show notification if:
      // 1. Never dismissed, OR
      // 2. Dismissed more than 24 hours ago
      if (!lastDismissed) {
        setIsVisible(true);
      } else {
        const timeSinceDismissal = now.getTime() - new Date(lastDismissed).getTime();
        const twentyFourHours = 24 * 60 * 60 * 1000;
        
        if (timeSinceDismissal > twentyFourHours) {
          setIsVisible(true);
        }
      }
    }
  }, [notificationPreferences]);

  const handleDismiss = () => {
    dismissNotificationMutation.mutate();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Alert className="bg-accent border-accent rounded-none">
      <AlertTriangle className="h-4 w-4 text-white" />
      <AlertDescription className="flex items-center justify-between w-full text-white">
        <span className="text-sm">
          Add a payment method to receive your monthly earnings!
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          disabled={dismissNotificationMutation.isPending}
          className="text-white hover:text-gray-200 hover:bg-transparent p-1 h-auto"
        >
          <X className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
}
