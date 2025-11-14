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
  const baseStyles = `
    border
    transition-all
    duration-[var(--animation-transition-default)]
    ease-[var(--animation-easing-default)]
    overflow-hidden
  `;
  
  const variantStyles = {
    default: `
      bg-[var(--color-bg-primary)]
      border-[rgba(112,115,124,0.12)]
      rounded-[var(--radius-lg)]
      shadow-[var(--shadow-default)]
    `,
    elevated: `
      bg-[var(--color-bg-primary)]
      border-[rgba(112,115,124,0.12)]
      rounded-[var(--radius-lg)]
      shadow-[var(--shadow-md)]
    `
  };

  const paddingStyles = {
    none: '',
    small: 'p-3',
    medium: 'p-6',
    large: 'p-8'
  };

  const interactiveStyle = onClick ? 'cursor-pointer hover:shadow-[var(--shadow-md)]' : '';

  const imageComponent = image ? (
    <div className={`w-full ${imagePosition === 'top' ? 'mb-0' : 'mt-0'}`}>
      <div className="relative w-full h-48 bg-[var(--color-bg-gray)]">
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
      className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${interactiveStyle} ${className} ${image ? 'p-0' : ''}`.replace(/\s+/g, ' ').trim()}
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

