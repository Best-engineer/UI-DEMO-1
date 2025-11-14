import React from 'react';
import NextLink from 'next/link';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  variant?: 'default' | 'primary';
  className?: string;
}

const Link: React.FC<LinkProps> = ({
  href,
  children,
  external = false,
  variant = 'default',
  className = '',
  ...props
}) => {
  const baseStyles = `
    transition-colors
    duration-[var(--animation-transition-fast)]
    ease-[var(--animation-easing-default)]
  `;

  const variantStyles = {
    default: `
      text-[var(--color-link-color)]
      hover:text-[var(--color-link-hover)]
      no-underline
    `,
    primary: `
      text-[var(--color-brand-primary)]
      hover:text-[var(--color-brand-secondary)]
      no-underline
    `
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`.trim();

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClassName}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink
      href={href}
      className={combinedClassName}
      {...props}
    >
      {children}
    </NextLink>
  );
};

export default Link;

