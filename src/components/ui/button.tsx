import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[1.5rem] text-sm font-bold ring-offset-background transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0 uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90 border-2 border-transparent font-black text-shadow-soft",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 font-black text-shadow-soft animate-emergency-pulse",
        outline:
          "border-2 border-slate-900 bg-background text-slate-900 hover:bg-primary/5 hover:border-primary hover:text-primary font-bold",
        secondary:
          "bg-slate-900 text-white hover:bg-slate-800 font-bold text-shadow-soft",
        ghost: "text-primary font-bold hover:bg-primary/10",
        link: "text-primary underline-offset-4 hover:underline font-bold",
        white: "bg-white text-primary border-2 border-primary/10 shadow-xl font-black",
      },
      size: {
        default: "h-16 px-8 py-3 text-[16px]",
        sm: "h-12 rounded-xl px-5 text-[14px]",
        lg: "h-20 rounded-[1.75rem] px-12 text-[20px]",
        icon: "h-14 w-14 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
