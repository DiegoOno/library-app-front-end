import * as React from "react"

import { cn } from "@/lib/utils"
import { cva } from 'class-variance-authority'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: "default"
  }

const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#F2F2F2] text-[#F2F2F2]/2 hover:bg-[#F2F2F2]/90 border-black-opacity-10 text-[#868686]", 
      },
    },
    defaultVariants: {
      variant: "default",
    }
  },
)

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          inputVariants({
            variant,
          }),
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
