import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { University, Smartphone, CreditCard, InfoIcon } from "lucide-react";

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const paymentMethodSchema = z.object({
  type: z.enum(["bank", "cashapp", "paypal"]),
  accountName: z.string().optional(),
  routingNumber: z.string().optional(),
  accountNumber: z.string().optional(),
  cashtag: z.string().optional(),
  paypalEmail: z.string().email().optional(),
});

type PaymentMethodForm = z.infer<typeof paymentMethodSchema>;

export default function WithdrawalModal({ isOpen, onClose }: WithdrawalModalProps) {
  const { toast } = useToast();

  const { data: userStats } = useQuery({
    queryKey: ["/api/users/me/stats"],
    enabled: isOpen,
  });

  const { data: existingPaymentMethod } = useQuery({
    queryKey: ["/api/payment-methods/me"],
    enabled: isOpen,
  });

  const form = useForm<PaymentMethodForm>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: "bank",
    },
  });

  const selectedMethod = form.watch("type");

  // Set form values when existing payment method is loaded
  useEffect(() => {
    if (existingPaymentMethod) {
      form.reset({
        type: existingPaymentMethod.type,
        accountName: existingPaymentMethod.accountName || "",
        routingNumber: existingPaymentMethod.routingNumber || "",
        accountNumber: existingPaymentMethod.accountNumber || "",
        cashtag: existingPaymentMethod.cashtag || "",
        paypalEmail: existingPaymentMethod.paypalEmail || "",
      });
    }
  }, [existingPaymentMethod, form]);

  const savePaymentMethodMutation = useMutation({
    mutationFn: async (data: PaymentMethodForm) => {
      await apiRequest("POST", "/api/payment-methods", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/payment-methods/me"] });
      toast({
        title: "Payment Method Saved",
        description: "Your payment method has been saved successfully.",
        variant: "default",
      });
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
        title: "Save Failed",
        description: error.message || "Failed to save payment method",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: PaymentMethodForm) => {
    // Validate required fields based on payment method
    const errors: string[] = [];

    if (data.type === "bank") {
      if (!data.accountName) errors.push("Account holder name is required");
      if (!data.routingNumber) errors.push("Routing number is required");
      if (!data.accountNumber) errors.push("Account number is required");
    } else if (data.type === "cashapp") {
      if (!data.cashtag) errors.push("Cashtag is required");
    } else if (data.type === "paypal") {
      if (!data.paypalEmail) errors.push("PayPal email is required");
    }

    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors.join(", "),
        variant: "destructive",
      });
      return;
    }

    savePaymentMethodMutation.mutate(data);
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Monthly Withdrawal Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Current Earnings Summary */}
          <Alert className="border-secondary bg-secondary/10">
            <InfoIcon className="h-4 w-4 text-secondary" />
            <AlertDescription>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Available for next monthly payout:</span>
                <span className="text-lg font-bold text-secondary">
                  ${userStats?.totalEarnings?.toFixed(2) || '0.00'}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Automatic withdrawal on last day of month (minimum $5.00)
              </p>
            </AlertDescription>
          </Alert>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Payment Method Selection */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Payment Method</Label>
              
              <RadioGroup
                value={selectedMethod}
                onValueChange={(value) => form.setValue("type", value as "bank" | "cashapp" | "paypal")}
              >
                {/* Bank Transfer */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="bank" id="bank" />
                    <div className="flex-1 flex items-center justify-between">
                      <div>
                        <Label htmlFor="bank" className="font-medium">Bank Transfer</Label>
                        <p className="text-sm text-gray-500">Direct deposit to your bank account</p>
                      </div>
                      <University className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  
                  {selectedMethod === "bank" && (
                    <div className="ml-6 space-y-3 p-3 bg-gray-50 rounded-lg">
                      <Input
                        placeholder="Account holder name"
                        {...form.register("accountName")}
                      />
                      <Input
                        placeholder="Routing number"
                        {...form.register("routingNumber")}
                      />
                      <Input
                        placeholder="Account number"
                        {...form.register("accountNumber")}
                      />
                    </div>
                  )}
                </div>

                {/* Cash App */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="cashapp" id="cashapp" />
                    <div className="flex-1 flex items-center justify-between">
                      <div>
                        <Label htmlFor="cashapp" className="font-medium">Cash App</Label>
                        <p className="text-sm text-gray-500">Transfer to your Cash App account</p>
                      </div>
                      <Smartphone className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  
                  {selectedMethod === "cashapp" && (
                    <div className="ml-6 p-3 bg-gray-50 rounded-lg">
                      <Input
                        placeholder="$CashTag (e.g. $YourUsername)"
                        {...form.register("cashtag")}
                      />
                    </div>
                  )}
                </div>

                {/* PayPal */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <div className="flex-1 flex items-center justify-between">
                      <div>
                        <Label htmlFor="paypal" className="font-medium">PayPal</Label>
                        <p className="text-sm text-gray-500">Transfer to your PayPal account</p>
                      </div>
                      <CreditCard className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  
                  {selectedMethod === "paypal" && (
                    <div className="ml-6 p-3 bg-gray-50 rounded-lg">
                      <Input
                        type="email"
                        placeholder="PayPal email address"
                        {...form.register("paypalEmail")}
                      />
                    </div>
                  )}
                </div>
              </RadioGroup>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button 
                type="submit" 
                disabled={savePaymentMethodMutation.isPending}
                className="flex-1 bg-secondary hover:bg-secondary/90"
              >
                {savePaymentMethodMutation.isPending ? "Saving..." : "Save Payment Method"}
              </Button>
              <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
                Cancel
              </Button>
            </div>
          </form>

          {/* Info Notice */}
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              <p className="text-sm">
                Withdrawals are processed automatically on the last day of each month for balances of $5.00 or more.
              </p>
            </AlertDescription>
          </Alert>
        </div>
      </DialogContent>
    </Dialog>
  );
}
