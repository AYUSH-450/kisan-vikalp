import * as React from "react"
import { cn } from "../../utils/cn"

// Since we didn't install class-variance-authority and @radix-ui/react-slot yet,
// I'll build a simplified version of a button without them, or I should install them.
// Let's just build a simple button with standard react props to keep dependencies minimal as requested.

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-surface-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            'bg-primary-600 text-white hover:bg-primary-700': variant === 'default',
            'border border-surface-200 bg-white hover:bg-surface-100 hover:text-surface-900': variant === 'outline',
            'hover:bg-surface-100 hover:text-surface-900': variant === 'ghost',
            'bg-red-500 text-white hover:bg-red-600': variant === 'destructive',
            'bg-surface-100 text-surface-900 hover:bg-surface-200': variant === 'secondary',
            'h-10 px-4 py-2': size === 'default',
            'h-9 rounded-md px-3': size === 'sm',
            'h-11 rounded-md px-8': size === 'lg',
            'h-10 w-10': size === 'icon',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
