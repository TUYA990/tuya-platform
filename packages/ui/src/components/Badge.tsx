import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold',
  {
    variants: {
      variant: {
        default: 'bg-[#FF6B35] text-white',
        secondary: 'bg-[#004E89] text-white',
        success: 'bg-[#06A77D] text-white',
        warning: 'bg-[#FFB703] text-white',
        error: 'bg-[#D62828] text-white',
        outline: 'border border-[#E0E0E0] text-[#1A1A1A]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  )
);

Badge.displayName = 'Badge';
