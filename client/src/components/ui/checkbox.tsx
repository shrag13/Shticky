import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

// Simplified checkbox implementation without Radix UI
const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  const [checked, setChecked] = React.useState(props.checked || false)
  
  return (
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        ref={ref}
        className="sr-only"
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked)
          props.onChange?.(e)
        }}
        {...props}
      />
      <div
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
          checked ? "bg-primary text-primary-foreground" : "bg-background",
          className
        )}
        onClick={() => {
          setChecked(!checked)
          const event = new Event('change', { bubbles: true })
          Object.defineProperty(event, 'target', { value: { checked: !checked } })
          props.onChange?.(event as any)
        }}
      >
        {checked && (
          <div className="flex items-center justify-center text-current">
            <Check className="h-4 w-4" />
          </div>
        )}
      </div>
    </div>
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }
