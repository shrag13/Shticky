"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Simplified tooltip implementation without Radix UI
const TooltipProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>

const Tooltip = ({ children }: { children: React.ReactNode }) => <>{children}</>

const TooltipTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & { asChild?: boolean; children: React.ReactNode }
>(({ children, ...props }, ref) => (
  <span {...props} ref={ref as any}>{children}</span>
))

const TooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
