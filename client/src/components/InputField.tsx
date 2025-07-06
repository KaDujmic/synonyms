import React from 'react';

interface InputFieldProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'search';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  name?: string;
  id?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  title?: string;
}

export const InputField = (props: InputFieldProps) => {
  const {
    type = 'text',
    value,
    onChange,
    placeholder,
    className = '',
    disabled = false,
    required = false,
    autoFocus = false,
    name,
    id,
    maxLength,
    minLength,
    pattern,
    title
  } = props;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={`input-field ${className}`}
      disabled={disabled}
      required={required}
      autoFocus={autoFocus}
      name={name}
      id={id}
      maxLength={maxLength}
      minLength={minLength}
      pattern={pattern}
      title={title}
    />
  );
}; 