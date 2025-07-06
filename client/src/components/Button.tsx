import React from 'react';

interface ButtonProps {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button = (props: ButtonProps) => {
	const { 
		className = '', 
		onClick, children, 
		type = 'button', 
		disabled = false 
	} = props;
  return (
    <button
      type={type}
      className={`button ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
