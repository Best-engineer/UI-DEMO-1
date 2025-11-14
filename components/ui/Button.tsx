import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'cta' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  className = '',
  children,
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center font-semibold
    transition-all duration-[var(--animation-transition-default)]
    ease-[var(--animation-easing-default)]
    rounded-[var(--radius-md)]
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;
  
  const variantStyles = {
    primary: `
      bg-[var(--color-bg-primary)]
      text-[var(--color-brand-primary)]
      border border-[var(--color-border-default)]
      hover:bg-[var(--color-bg-gray)]
      focus:ring-[var(--color-brand-primary)]
      px-6 py-3
      text-base
    `,
    secondary: `
      bg-transparent
      text-[var(--color-brand-primary)]
      border border-[var(--color-brand-primary)]
      hover:bg-[var(--color-brand-primary)]/10
      focus:ring-[var(--color-brand-primary)]
      px-6 py-3
      text-base
    `,
    cta: `
      bg-[var(--color-brand-primary)]
      text-[var(--color-text-light)]
      border-none
      hover:bg-[var(--color-brand-secondary)]
      focus:ring-[var(--color-brand-primary)]
      px-8 py-4
      text-lg
    `,
    ghost: `
      bg-transparent
      text-[var(--color-text-primary)]
      border-none
      hover:bg-[var(--color-bg-gray)]
      focus:ring-[var(--color-border-default)]
    `,
    danger: `
      bg-[var(--color-status-error)]
      text-[var(--color-text-light)]
      border-none
      hover:opacity-90
      focus:ring-[var(--color-status-error)]
    `
  };

  const sizeStyles = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  // CTA variant는 고정 크기를 사용하므로 size 스타일을 적용하지 않음
  const shouldApplySize = variant !== 'cta';
  const finalSizeStyles = shouldApplySize ? sizeStyles[size] : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${finalSizeStyles} ${widthStyle} ${className}`.replace(/\s+/g, ' ').trim()}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

