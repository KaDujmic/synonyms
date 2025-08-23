import { useState } from "react";

interface PopoverProps {
  children: React.ReactNode;
  popoverTarget: string;
  popoverContent: React.ReactNode;
  className?: string;
}

export const Popover = ({ children, popoverTarget, popoverContent, className }: PopoverProps) => {
  const [displayPopover, setDisplayPopover] = useState(false);

  return (
    <div 
      onMouseOver={() => setDisplayPopover(true)}
      onMouseLeave={() => setDisplayPopover(false)}
      className={`relative ${className}`}
      popoverTarget={popoverTarget}
    >
      {children}
      {displayPopover && (
        <>
          <div 
            id={popoverTarget} 
            className="absolute top-9 left-0 min-w-[200px] max-w-[300px] bg-white border border-blue-200 rounded-lg shadow-lg p-4 z-50"
          >
            {popoverContent}
          </div>
          <div className="absolute top-8 left-4 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-white z-[60]"></div>
          <div className="absolute top-8 left-4 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[5px] border-l-transparent border-r-transparent border-b-blue-200 z-[55]"></div>
        </>
      )}
    </div>
  );
};