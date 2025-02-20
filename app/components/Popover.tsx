"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right" | "bottom-center" | "top-center";
}

/**
 * A Popover component that displays content in a floating panel.
 * 
 * @example
 * ```tsx
 * <Popover 
 *   trigger={<button>Click me</button>}
 *   content={<div>Popover content</div>}
 *   placement="bottom" // Optional: 'top' | 'bottom' | 'left' | 'right' | 'bottom-center' | 'top-center'
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

    function handleScroll() {
      if (isOpen) {
        // Update popover position when scrolling
        if (popoverRef.current) {
          const styles = getPopoverStyles();
          Object.assign(popoverRef.current.style, styles);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isOpen]);

  const getPopoverStyles = () => {
    const baseStyles = {
      position: 'fixed' as const,
      zIndex: 50,
      backgroundColor: 'var(--background)',
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      padding: '1rem'
    };
    
    const triggerRect = triggerRef.current?.getBoundingClientRect();
    const popoverRect = popoverRef.current?.getBoundingClientRect();
    
    if (!triggerRect) return baseStyles;

    const positionStyles: { [key: string]: string | number } = {};
    const gap = 8; // Gap between trigger and popover

    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    switch (placement) {
      case "top":
        positionStyles.top = `${triggerRect.top - (popoverRect?.height || 0) - gap}px`;
        positionStyles.left = `${triggerRect.left}px`;
        break;
      case "top-center":
        positionStyles.top = `${triggerRect.top - (popoverRect?.height || 0) - gap}px`;
        positionStyles.left = `${triggerRect.left + (triggerRect.width / 2)}px`;
        positionStyles.transform = 'translateX(-50%)';
        break;
      case "bottom":
        positionStyles.top = `${triggerRect.bottom + gap}px`;
        positionStyles.left = `${triggerRect.left}px`;
        break;
      case "bottom-center":
        positionStyles.top = `${triggerRect.bottom + gap}px`;
        positionStyles.left = `${triggerRect.left + (triggerRect.width / 2)}px`;
        positionStyles.transform = 'translateX(-50%)';
        break;
      case "left":
        positionStyles.top = `${triggerRect.top}px`;
        positionStyles.left = `${triggerRect.left - (popoverRect?.width || 0) - gap}px`;
        break;
      case "right":
        positionStyles.top = `${triggerRect.top}px`;
        positionStyles.left = `${triggerRect.right + gap}px`;
        break;
      default:
        positionStyles.top = `${triggerRect.bottom + gap}px`;
        positionStyles.left = `${triggerRect.left}px`;
    }

    return { ...baseStyles, ...positionStyles };
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: 'pointer' }}
      >
        {trigger}
      </div>
      
      {isOpen && createPortal(
        <div ref={popoverRef} style={getPopoverStyles()}>
          {content}
        </div>,
        document.body
      )}
    </div>
  );
}
