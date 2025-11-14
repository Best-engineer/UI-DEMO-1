import React from 'react';
import Image from 'next/image';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
  variant?: 'default' | 'elevated';
  onClick?: () => void;
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  };
  imagePosition?: 'top' | 'bottom';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'medium',
  variant = 'default',
  onClick,
  image,
  imagePosition = 'top'
}) => {
  const baseStyles = 'rounded-lg border transition-all overflow-hidden';
  
  const variantStyles = {
    default: 'bg-[var(--color-bg-secondary)] border-[var(--color-border-primary)]',
    elevated: 'bg-[var(--color-bg-tertiary)] border-[var(--color-border-secondary)] shadow-[var(--shadow-medium)]'
  };

  const paddingStyles = {
    none: '',
    small: 'p-3',
    medium: 'p-4',
    large: 'p-6'
  };

  const interactiveStyle = onClick ? 'cursor-pointer hover:border-[var(--color-border-secondary)]' : '';

  const imageComponent = image ? (
    <div className={`w-full ${imagePosition === 'top' ? 'mb-0' : 'mt-0'}`}>
      <div className="relative w-full h-48 bg-[var(--color-bg-level1)]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          style={{ objectFit: image.objectFit || 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  ) : null;

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${interactiveStyle} ${className} ${image ? 'p-0' : ''}`}
      onClick={onClick}
    >
      {imagePosition === 'top' && imageComponent}
      {image && (
        <div className={paddingStyles[padding]}>
          {children}
        </div>
      )}
      {!image && children}
      {imagePosition === 'bottom' && imageComponent}
    </div>
  );
};

export default Card;

