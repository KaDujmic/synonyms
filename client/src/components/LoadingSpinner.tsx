import type { ReactNode } from "react";

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const LoadingSpinner = ({ size = 'medium', className = '' }: LoadingSpinnerProps) => {
  return (
    <div className={`loading-spinner loading-spinner--${size} ${className}`}>
      <div className="loading-spinner__bar"></div>
    </div>
  );
}; 