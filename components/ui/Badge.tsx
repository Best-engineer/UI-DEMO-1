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
  const baseStyles = `
    inline-flex items-center font-semibold
    rounded-[var(--radius-sm)]
    transition-colors
    duration-[var(--animation-transition-fast)]
  `;
  
  const variantStyles = {
    default: `
      bg-[var(--color-bg-gray)]
      text-[var(--color-brand-primary)]
      px-2 py-1
      text-[13px]
    `,
    primary: `
      bg-[var(--color-bg-gray)]
      text-[var(--color-brand-primary)]
      px-2 py-1
      text-[13px]
    `,
    success: `
      bg-[var(--color-status-success-bg)]
      text-[rgb(0,150,50)]
      px-2 py-1
      text-[13px]
    `,
    warning: `
      bg-[var(--color-status-warning)]/20
      text-[var(--color-status-warning)]
      px-2 py-1
      text-[13px]
    `,
    error: `
      bg-[var(--color-status-error)]/20
      text-[var(--color-status-error)]
      px-2 py-1
      text-[13px]
    `,
    info: `
      bg-[var(--color-status-info-bg)]
      text-[var(--color-status-info)]
      px-2 py-1
      text-[13px]
    `
  };

  const sizeStyles = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-2 py-1 text-[13px]'
  };

  // variant 스타일에 이미 padding과 font-size가 포함되어 있으므로 size는 작은 경우에만 적용
  const finalSizeStyles = size === 'small' ? 'px-2 py-0.5 text-xs' : '';

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${finalSizeStyles} ${className}`.replace(/\s+/g, ' ').trim()}>
      {children}
    </span>
  );
};

export default Badge;

