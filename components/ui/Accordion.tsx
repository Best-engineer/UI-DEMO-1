'use client';

import React, { useState } from 'react';
import Typography from './Typography';

export interface AccordionItem {
  question: string;
  answer: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  defaultOpenIndex?: number;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  className = '',
  defaultOpenIndex
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex ?? null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-[var(--color-border-primary)] rounded-lg overflow-hidden bg-[var(--color-bg-secondary)]"
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[var(--color-bg-tertiary)] transition-colors"
          >
            <Typography variant="h6" className="flex-1 pr-4">
              {item.question}
            </Typography>
            <svg
              className={`w-5 h-5 text-[var(--color-text-tertiary)] transition-transform flex-shrink-0 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openIndex === index && (
            <div className="px-6 py-4 border-t border-[var(--color-border-primary)] bg-[var(--color-bg-level1)]">
              <Typography variant="body" color="secondary">
                {item.answer}
              </Typography>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;

