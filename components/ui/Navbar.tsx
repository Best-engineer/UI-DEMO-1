'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from './Button';

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavbarProps {
  logo?: React.ReactNode;
  logoText?: string;
  links?: NavLink[];
  ctaButton?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
  variant?: 'default' | 'transparent';
  sticky?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  logo,
  logoText = 'Logo',
  links = [],
  ctaButton,
  className = '',
  variant = 'default',
  sticky = true
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const baseStyles = 'w-full border-b transition-all';
  const variantStyles = {
    default: 'bg-[var(--color-bg-primary)] border-[var(--color-border-primary)]',
    transparent: 'bg-transparent border-transparent'
  };

  const stickyStyle = sticky ? 'sticky top-0 z-[var(--z-index-header)]' : '';

  return (
    <nav className={`${baseStyles} ${variantStyles[variant]} ${stickyStyle} ${className}`}>
      <div className="max-w-[1024px] mx-auto px-6">
        <div className="flex items-center justify-between h-[var(--spacing-header-height)]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-[var(--color-text-primary)] hover:opacity-80 transition-opacity">
            {logo || (
              <div className="w-8 h-8 rounded-md flex items-center justify-center overflow-hidden relative">
                <Image 
                  src="/images/kh_logo.png" 
                  alt="Logo" 
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
            )}
            {logoText && (
              <span className="font-semibold text-lg">{logoText}</span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link, index) => (
              link.external ? (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-sm font-medium"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={index}
                  href={link.href}
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-sm font-medium"
                >
                  {link.label}
                </Link>
              )
            ))}
            {ctaButton && (
              ctaButton.href && !ctaButton.onClick ? (
                <Link href={ctaButton.href}>
                  <Button variant="primary" size="small">
                    {ctaButton.label}
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="primary"
                  size="small"
                  onClick={ctaButton.onClick}
                >
                  {ctaButton.label}
                </Button>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <path
                  d="M3 12H21M3 6H21M3 18H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[var(--color-border-primary)]">
            <div className="flex flex-col gap-4">
              {links.map((link, index) => (
                link.external ? (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-sm font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-sm font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              ))}
              {ctaButton && (
                <div className="pt-2">
                  {ctaButton.href && !ctaButton.onClick ? (
                    <Link href={ctaButton.href} onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="primary" size="small" fullWidth>
                        {ctaButton.label}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="primary"
                      size="small"
                      fullWidth
                      onClick={() => {
                        ctaButton.onClick?.();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {ctaButton.label}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

