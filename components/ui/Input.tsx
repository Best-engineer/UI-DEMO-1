import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const inputStyles = `
    w-full px-3 py-2 
    bg-[var(--color-bg-secondary)] 
    border border-[var(--color-border-primary)] 
    rounded-md 
    text-[var(--color-text-primary)] 
    placeholder:text-[var(--color-text-tertiary)]
    focus:outline-none 
    focus:ring-2 
    focus:ring-[var(--color-brand-accent)] 
    focus:border-[var(--color-brand-accent)]
    transition-all
    ${error ? 'border-[var(--color-semantic-red)] focus:ring-[var(--color-semantic-red)]' : ''}
    ${className}
  `;

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
          {label}
        </label>
      )}
      <input
        className={inputStyles}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-[var(--color-semantic-red)]">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-[var(--color-text-tertiary)]">{helperText}</p>
      )}
    </div>
  );
};

export default Input;

