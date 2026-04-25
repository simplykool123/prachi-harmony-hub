import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "pf-cta inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-body text-[13px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm",
        destructive: "bg-destructive text-destructive-foreground shadow-sm",
        outline: "border border-button-outline bg-transparent text-foreground hover:border-accent",
        secondary: "bg-secondary text-secondary-foreground shadow-sm",
        ghost: "text-muted-foreground hover:text-foreground",
        link: "text-accent underline-offset-4 hover:underline",
        hero: "bg-primary text-primary-foreground px-8 py-3.5",
        porcelain: "border border-button-outline bg-transparent px-8 py-3.5 text-foreground hover:border-accent",
        whatsapp: "bg-whatsapp text-primary-foreground",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-9",
        icon: "h-10 w-10",
        circle: "h-13 w-13",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
