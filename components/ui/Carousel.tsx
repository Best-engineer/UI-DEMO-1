'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface CarouselItem {
  id: string | number;
  content: React.ReactNode;
}

export interface CarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showNavigation?: boolean;
  infinite?: boolean;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  autoPlay = false,
  autoPlayInterval = 3000,
  showIndicators = true,
  showNavigation = true,
  infinite = true,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalItems = items.length;

  const goToSlide = useCallback((index: number) => {
    if (infinite) {
      setCurrentIndex(index);
    } else {
      setCurrentIndex(Math.max(0, Math.min(index, totalItems - 1)));
    }
  }, [infinite, totalItems]);

  const goToNext = useCallback(() => {
    if (infinite) {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    } else {
      setCurrentIndex((prev) => (prev + 1 < totalItems ? prev + 1 : prev));
    }
  }, [infinite, totalItems]);

  const goToPrevious = useCallback(() => {
    if (infinite) {
      setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    } else {
      setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : 0));
    }
  }, [infinite, totalItems]);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && totalItems > 1) {
      intervalRef.current = setInterval(() => {
        goToNext();
      }, autoPlayInterval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isPlaying, autoPlayInterval, goToNext, totalItems]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPlaying(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrevious();
    }

    touchStartX.current = null;
    touchEndX.current = null;
    if (autoPlay) {
      setIsPlaying(true);
    }
  };

  if (totalItems === 0) {
    return null;
  }

  return (
    <div
      className={`relative w-full ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => {
        if (autoPlay) {
          setIsPlaying(true);
        }
      }}
    >
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="min-w-full flex-shrink-0"
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {showNavigation && totalItems > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-[var(--color-bg-tertiary)]/80 backdrop-blur-sm border border-[var(--color-border-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-quaternary)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-accent)]"
            aria-label="Previous slide"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-[var(--color-bg-tertiary)]/80 backdrop-blur-sm border border-[var(--color-border-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-quaternary)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-accent)]"
            aria-label="Next slide"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 15L12.5 10L7.5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && totalItems > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {items.map((item, index) => (
            <button
              key={item.id}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-[var(--color-brand-accent)]'
                  : 'w-2 bg-[var(--color-border-secondary)] hover:bg-[var(--color-border-tertiary)]'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;

