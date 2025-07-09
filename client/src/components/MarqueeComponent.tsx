import { useRef, useEffect, useState, type ReactNode } from 'react';

interface MarqueeComponentProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export const MarqueeComponent = ({
  children,
  className = '',
  speed = 10
}: MarqueeComponentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (containerRef.current && innerRef.current) {
      setShouldAnimate(innerRef.current.scrollWidth > containerRef.current.clientWidth);
    }
  }, [children]);

  return (
    <div className={`marquee-component ${className}`} ref={containerRef}>
      <span
        className={`marquee-component__inner ${shouldAnimate ? ' animate' : ''}`}
        ref={innerRef}
        style={shouldAnimate ? { animationDuration: `${speed}s` } : {}}
      >
        {children}
      </span>
    </div>
  );
}; 