import React from 'react';

export interface TypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small' | 'tiny';
  color?: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  color = 'primary',
  className = '',
  as
}) => {
  const variantStyles = {
    h1: 'text-[2.5rem] font-bold leading-[1.1] tracking-[-0.022em]',
    h2: 'text-[2rem] font-bold leading-[1.125] tracking-[-0.022em]',
    h3: 'text-[1.5rem] font-semibold leading-[1.33] tracking-[-0.012em]',
    h4: 'text-[1.3125rem] font-semibold leading-[1.33] tracking-[-0.012em]',
    h5: 'text-[1.0625rem] font-semibold leading-[1.4] tracking-[-0.012em]',
    h6: 'text-[1rem] font-semibold leading-[1.4] tracking-[-0.012em]',
    body: 'text-[0.9375rem] leading-[1.6] tracking-[-0.011em]',
    small: 'text-[0.875rem] leading-[1.5] tracking-[-0.013em]',
    tiny: 'text-[0.625rem] leading-[1.5] tracking-[-0.015em]'
  };

  const colorStyles = {
    primary: 'text-[var(--color-text-primary)]',
    secondary: 'text-[var(--color-text-secondary)]',
    tertiary: 'text-[var(--color-text-tertiary)]',
    quaternary: 'text-[var(--color-text-quaternary)]'
  };

  const defaultTag = variant.startsWith('h') ? variant : 'p';
  const Tag = (as || defaultTag) as React.ElementType;

  return (
    <Tag className={`${variantStyles[variant]} ${colorStyles[color]} ${className}`}>
      {children}
    </Tag>
  );
};

export default Typography;

