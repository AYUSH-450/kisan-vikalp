import * as React from "react"
import { cn } from "../../utils/cn"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "border-transparent bg-primary-600 text-white hover:bg-primary-700": variant === "default",
          "border-transparent bg-surface-100 text-surface-900 hover:bg-surface-200": variant === "secondary",
          "border-transparent bg-red-500 text-white hover:bg-red-600": variant === "destructive",
          "border-transparent bg-amber-500 text-white hover:bg-amber-600": variant === "warning",
          "border-transparent bg-green-500 text-white hover:bg-green-600": variant === "success",
          "text-surface-900 border-surface-200": variant === "outline",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
