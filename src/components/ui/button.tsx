import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[1.25rem] text-sm font-black ring-offset-background transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 uppercase tracking-[0.5px]",
  {
    variants: {
      variant: {
        default: "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90 border-2 border-transparent font-black text-shadow-soft",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 font-black text-shadow-soft",
        outline:
          "border-2 border-slate-900 bg-background text-slate-900 hover:bg-primary/5 hover:border-primary hover:text-primary font-black",
        secondary:
          "bg-slate-900 text-white hover:bg-slate-800 font-black text-shadow-soft",
        ghost: "text-primary font-black hover:bg-primary/10",
        link: "text-primary underline-offset-4 hover:underline font-black",
        white: "bg-white text-primary border-2 border-primary/10 shadow-xl font-black",
      },
      size: {
        default: "h-14 px-6 py-2 text-[16px]",
        sm: "h-11 rounded-xl px-4 text-[14px]",
        lg: "h-18 rounded-[1.5rem] px-10 text-[20px]",
        icon: "h-12 w-12 rounded-2xl",
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
