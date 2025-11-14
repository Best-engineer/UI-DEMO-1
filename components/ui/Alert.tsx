import React from 'react';

export interface AlertProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  className?: string;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  title,
  className = '',
  onClose
}) => {
  const baseStyles = 'rounded-lg border p-4';
  
  const variantStyles = {
    info: 'bg-[var(--color-semantic-blue)]/10 border-[var(--color-semantic-blue)]/30 text-[var(--color-semantic-blue)]',
    success: 'bg-[var(--color-semantic-green)]/10 border-[var(--color-semantic-green)]/30 text-[var(--color-semantic-green)]',
    warning: 'bg-[var(--color-semantic-yellow)]/10 border-[var(--color-semantic-yellow)]/30 text-[var(--color-semantic-yellow)]',
    error: 'bg-[var(--color-semantic-red)]/10 border-[var(--color-semantic-red)]/30 text-[var(--color-semantic-red)]'
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold mb-1">{title}</h4>
          )}
          <div className="text-sm">{children}</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-current opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Close"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;

