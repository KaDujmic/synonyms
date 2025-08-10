'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface ClickOutsideAwareComponentProps {
  /** The content to wrap */
  children: ReactNode;
  /** Callback function triggered when clicking outside */
  onOutsideClick: () => void;
  /** CSS classes to apply to the wrapper div */
  className?: string;
  /** Whether the click outside detection is enabled */
  enabled?: boolean;
  /** CSS selectors for elements to exclude from outside click detection */
  excludeElements?: string[];
}

/**
 * A reusable React component that detects clicks outside of a specified element and triggers a callback function.
 * 
 * @param children - The content to wrap
 * @param onOutsideClick - The callback function triggered when clicking outside
 * @param className - The CSS classes to apply to the wrapper div
 * @param enabled - Whether the click outside detection is enabled
 * @param excludeElements - The CSS selectors for elements to exclude from outside click detection
 * @returns 
 */
export const ClickOutsideAwareComponent = ({
  children,
  onOutsideClick,
  className = '',
  enabled = true,
  excludeElements = []
}: ClickOutsideAwareComponentProps) => {
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Check if click is inside the component
      if (componentRef.current && componentRef.current.contains(target)) {
        return;
      }

      // Check if click is on excluded elements
      const isExcluded = excludeElements.some(selector => {
        const element = document.querySelector(selector);
        return element && element.contains(target);
      });

      if (isExcluded) {
        return;
      }

      // If click is outside and not on excluded elements, trigger callback
      onOutsideClick();
    };

    // Add event listener with a small delay to avoid immediate triggering
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onOutsideClick, enabled, excludeElements]);

  return (
    <div ref={componentRef} className={className}>
      {children}
    </div>
  );
};
