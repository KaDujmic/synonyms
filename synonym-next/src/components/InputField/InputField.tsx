'use client';

import { forwardRef } from 'react';

interface InputFieldProps {
  id: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  placeholder?: string;
  onFocus?: () => void;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ 
    id, 
    type, 
    value, 
    onChange, 
    onKeyDown, 
    placeholder, 
    onFocus, 
    className = '', 
    disabled = false,
    error = false,
    success = false
  }, ref) => {
    const baseClasses = 'w-full px-4 py-3 border-1 border-gray-300 rounded-lg text-base font-inherit bg-white text-gray-900 transition-all duration-150 outline-none';
    const focusClasses = 'focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30';
    const disabledClasses = disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed opacity-60' : '';
    const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' : '';
    const successClasses = success ? 'border-green-500 focus:border-green-500 focus:ring-green-500/30' : '';
    const placeholderClasses = 'placeholder:text-gray-400';

    return (
      <input
        ref={ref}
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        onFocus={onFocus}
        disabled={disabled}
        className={`${baseClasses} ${focusClasses} ${disabledClasses} ${errorClasses} ${successClasses} ${placeholderClasses} ${className}`}
      />
    );
  }
);

InputField.displayName = 'InputField';
