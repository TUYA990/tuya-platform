import React from 'react';
import { cn } from '../utils/cn';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-lg border border-[#E0E0E0] bg-white px-3 py-2 text-base placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
);

Input.displayName = 'Input';
