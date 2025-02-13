"use client";

import { useState, useRef, useEffect } from "react";

interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
}

/**
 * A Popover component that displays content in a floating panel.
 * 
 * @example
 * ```tsx
 * <Popover 
 *   trigger={<button>Click me</button>}
 *   content={<div>Popover content</div>}
 *   placement="bottom" // Optional: 'top' | 'bottom' | 'left' | 'right'
 * />
 * ```
 * 
 * The popover will be positioned relative to the trigger element based on the placement prop.
 * Clicking outside the popover or trigger will close the popover.
 */

export default function Popover({ trigger, content, placement = "bottom" }: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current && 
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPopoverStyles = () => {
    const baseStyles = "absolute z-50 bg-background border border-gray-200 rounded-lg shadow-lg p-4";
    
    switch (placement) {
      case "top":
        return `${baseStyles} bottom-full mb-2`;
      case "bottom":
        return `${baseStyles} top-full mt-2`;
      case "left":
        return `${baseStyles} right-full mr-2`;
      case "right":
        return `${baseStyles} left-full ml-2`;
      default:
        return `${baseStyles} top-full mt-2`;
    }
  };

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
      >
        {trigger}
      </div>
      
      {isOpen && (
        <div ref={popoverRef} className={getPopoverStyles()}>
          {content}
        </div>
      )}
    </div>
  );
}
