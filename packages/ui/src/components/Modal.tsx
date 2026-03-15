import React from 'react';
import { cn } from '../utils/cn';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, onClose, className, children, ...props }, ref) => {
    if (!isOpen) return null;

    return (
      <>
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={onClose}
        />
        <div
          ref={ref}
          className={cn(
            'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-lg',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </>
    );
  }
);

Modal.displayName = 'Modal';

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center justify-between border-b border-[#E0E0E0] p-6', className)}
      {...props}
    />
  )
);

ModalHeader.displayName = 'ModalHeader';

export interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6', className)} {...props} />
  )
);

ModalContent.displayName = 'ModalContent';

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex justify-end gap-3 border-t border-[#E0E0E0] p-6', className)}
      {...props}
    />
  )
);

ModalFooter.displayName = 'ModalFooter';
