import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'medium',
  className = ''
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full';
  
  const variantStyles = {
    default: 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]',
    primary: 'bg-[var(--color-brand-accent-tint)] text-[var(--color-brand-accent)]',
    success: 'bg-[var(--color-semantic-green)]/20 text-[var(--color-semantic-green)]',
    warning: 'bg-[var(--color-semantic-yellow)]/20 text-[var(--color-semantic-yellow)]',
    error: 'bg-[var(--color-semantic-red)]/20 text-[var(--color-semantic-red)]',
    info: 'bg-[var(--color-semantic-blue)]/20 text-[var(--color-semantic-blue)]'
  };

  const sizeStyles = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-2.5 py-1 text-sm'
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;

