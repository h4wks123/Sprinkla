"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      //text, color, and roundness
      variant: {
        default: "bg-accent rounded-4xl",
        success: "bg-post rounded-4xl",
        update: "bg-put rounded-4xl",
        delete: "bg-delete rounded-4xl",
        white: "bg-white rounded-4xl",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        ghost: "",
      },
      // size, margins, and paddings
      size: {
        default: "w-44 h-10 font-semibold tracking-wide",
        icon: "w-10 h-10 tracking-wide rounded-full",
        small: "w-28 h-10 tracking-wide",
        full: "w-full h-10 tracking-wide",
        ghost: "",
      },
      text: {
        default: "text-md font-semibold",
        small: "text-sm font-semibold",
      },
      // hover and UX focus
      interaction: {
        default: "hover:scale-110 ease-in-out",
        store: "hover:bg-accent-light hover:text-accent",
        ghost: "",
      },
      position: {
        default: "",
        center: "mx-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      text: "default",
      position: "default",
      interaction: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, text, interaction, position, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({
            className,
            variant,
            size,
            text,
            interaction,
            position,
          })
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
