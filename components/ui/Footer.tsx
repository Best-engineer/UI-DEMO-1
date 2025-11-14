import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  logo?: React.ReactNode;
  logoText?: string;
  description?: string;
  columns?: FooterColumn[];
  bottomLinks?: FooterLink[];
  copyright?: string;
  className?: string;
}

const Footer: React.FC<FooterProps> = ({
  logo,
  logoText = 'Logo',
  description,
  columns = [],
  bottomLinks = [],
  copyright,
  className = ''
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`border-t border-[var(--color-border-primary)] bg-[var(--color-bg-primary)] ${className}`}>
      <div className="max-w-[1024px] mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-[var(--color-text-primary)] hover:opacity-80 transition-opacity mb-4">
              {logo || (
                <Image
                  src="/images/kh_logo.png"
                  alt="KH정보교육원"
                  width={32}
                  height={32}
                  className="rounded-md"
                />
              )}
              {logoText && (
                <span className="font-semibold text-lg">{logoText}</span>
              )}
            </Link>
            {description && (
              <p className="text-sm text-[var(--color-text-tertiary)] leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Link Columns */}
          {columns.map((column, columnIndex) => (
            <div key={columnIndex}>
              <h3 className="font-semibold text-[var(--color-text-primary)] mb-4 text-sm">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-[var(--color-border-primary)]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-6">
              {bottomLinks.map((link, index) => (
                link.external ? (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>
            <p className="text-sm text-[var(--color-text-quaternary)]">
              {copyright || `© ${currentYear} ${logoText}. All rights reserved.`}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

