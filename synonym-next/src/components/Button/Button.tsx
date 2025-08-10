'use client';

import { ReactNode } from 'react';

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = ({ 
  onClick, 
  className = '', 
  children, 
  disabled = false,
  type = 'button',
  variant = 'primary',
  size = 'md',
  loading = false
}: ButtonProps) => {
  // Base button classes
  const baseClasses = 'inline-flex items-center justify-center gap-2 border-none rounded-lg font-medium cursor-pointer transition-all duration-150 font-inherit text-decoration-none relative whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-0.2 hover:shadow-lg focus:ring-blue-500 active:translate-y-0',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 hover:-translate-y-0.2 hover:shadow-lg focus:ring-gray-500 active:translate-y-0',
    outline: 'bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white hover:-translate-y-0.5 hover:shadow-lg focus:ring-blue-500 active:translate-y-0',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:ring-gray-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 hover:-translate-y-0.2 hover:shadow-lg focus:ring-red-500 active:translate-y-0'
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm min-h-[36px]',
    md: 'px-6 py-3 text-base min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[52px]'
  };
  
  // State classes
  const disabledClasses = disabled ? 'cursor-not-allowed opacity-60' : '';
  const loadingClasses = loading ? 'pointer-events-none' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${loadingClasses} ${className}`}
    >
      {loading && (
        <div className="inline-block w-4 h-4 border-2 border-transparent border-t-current rounded-full animate-spin">
          <div className="w-full h-full"></div>
        </div>
      )}
      <span className={loading ? 'opacity-0' : ''}>
        {children}
      </span>
    </button>
  );
};
