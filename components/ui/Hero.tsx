import React from 'react';
import Button from './Button';
import Typography from './Typography';

export interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  backgroundImage?: string;
  variant?: 'default' | 'centered' | 'split';
  className?: string;
  children?: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  backgroundImage,
  variant = 'default',
  className = '',
  children
}) => {
  const baseStyles = 'relative w-full overflow-hidden';
  const variantStyles = {
    default: 'py-24',
    centered: 'py-32 text-center',
    split: 'py-24'
  };

  const backgroundStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {};

  const overlayStyle = backgroundImage
    ? 'absolute inset-0 bg-[var(--color-bg-primary)]/80 backdrop-blur-sm'
    : '';

  return (
    <section
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={backgroundStyle}
    >
      {backgroundImage && <div className={overlayStyle} />}
      
      <div className="relative max-w-[1024px] mx-auto px-6">
        {variant === 'split' ? (
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              {subtitle && (
                <Typography variant="body" color="secondary" className="mb-4 uppercase tracking-wider text-xs font-semibold">
                  {subtitle}
                </Typography>
              )}
              <Typography variant="h1" className="mb-6">
                {title}
              </Typography>
              {description && (
                <Typography variant="body" color="secondary" className="mb-8 text-lg">
                  {description}
                </Typography>
              )}
              <div className="flex flex-wrap gap-4">
                {primaryAction && (
                  primaryAction.href && !primaryAction.onClick ? (
                    <a href={primaryAction.href}>
                      <Button variant="primary" size="large">
                        {primaryAction.label}
                      </Button>
                    </a>
                  ) : (
                    <Button
                      variant="primary"
                      size="large"
                      onClick={primaryAction.onClick}
                    >
                      {primaryAction.label}
                    </Button>
                  )
                )}
                {secondaryAction && (
                  secondaryAction.href && !secondaryAction.onClick ? (
                    <a href={secondaryAction.href}>
                      <Button variant="secondary" size="large">
                        {secondaryAction.label}
                      </Button>
                    </a>
                  ) : (
                    <Button
                      variant="secondary"
                      size="large"
                      onClick={secondaryAction.onClick}
                    >
                      {secondaryAction.label}
                    </Button>
                  )
                )}
              </div>
            </div>
            <div>
              {children}
            </div>
          </div>
        ) : (
          <div className={variant === 'centered' ? 'max-w-2xl mx-auto' : 'max-w-3xl'}>
            {subtitle && (
              <Typography
                variant="body"
                color="secondary"
                className={`mb-4 uppercase tracking-wider text-xs font-semibold ${variant === 'centered' ? 'text-center' : ''}`}
              >
                {subtitle}
              </Typography>
            )}
            <Typography
              variant="h1"
              className={`mb-6 ${variant === 'centered' ? 'text-center' : ''}`}
            >
              {title}
            </Typography>
            {description && (
              <Typography
                variant="body"
                color="secondary"
                className={`mb-8 text-lg ${variant === 'centered' ? 'text-center' : ''}`}
              >
                {description}
              </Typography>
            )}
            <div className={`flex flex-wrap gap-4 ${variant === 'centered' ? 'justify-center' : ''}`}>
              {primaryAction && (
                primaryAction.href && !primaryAction.onClick ? (
                  <a href={primaryAction.href}>
                    <Button variant="primary" size="large">
                      {primaryAction.label}
                    </Button>
                  </a>
                ) : (
                  <Button
                    variant="primary"
                    size="large"
                    onClick={primaryAction.onClick}
                  >
                    {primaryAction.label}
                  </Button>
                )
              )}
              {secondaryAction && (
                secondaryAction.href && !secondaryAction.onClick ? (
                  <a href={secondaryAction.href}>
                    <Button variant="secondary" size="large">
                      {secondaryAction.label}
                    </Button>
                  </a>
                ) : (
                  <Button
                    variant="secondary"
                    size="large"
                    onClick={secondaryAction.onClick}
                  >
                    {secondaryAction.label}
                  </Button>
                )
              )}
            </div>
            {children && (
              <div className={`mt-12 ${variant === 'centered' ? 'flex justify-center' : ''}`}>
                {children}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;

