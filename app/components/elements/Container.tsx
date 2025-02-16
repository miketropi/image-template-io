'use client';

import { Box } from 'lucide-react';
import DynamicLoader from '../template-builder/DynamicLoader';
interface ContainerProps {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  childrenData?: any;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundGradient?: {
    from: string;
    to: string;
    direction?: 'right' | 'left' | 'top' | 'bottom' | 'top right' | 'top left' | 'bottom right' | 'bottom left';
  };
  spacingX?: number;
  spacingY?: number;
  borderRadius?: number;
  className?: string;
}

export const explain = {
  name: "Container",
  icon: <Box />,
  description: "A flexible container component with customizable background and spacing options.",
}

export default function Container({
  children,
  childrenData,
  backgroundColor,
  backgroundImage,
  backgroundGradient,
  spacingX = 4,
  spacingY = 4,
  borderRadius = 10,
  className = ''
}: ContainerProps) {
  const getBackgroundStyles = () => {
    if (backgroundImage) {
      return ''; 
    }
    if (backgroundColor) {
      return backgroundColor;
    }
    return 'bg-white';
  };

  const getGradientDirection = (direction?: string) => {
    switch(direction) {
      case 'right': return '90deg';
      case 'left': return '270deg';
      case 'top': return '0deg';
      case 'bottom': return '180deg';
      case 'top right': return '45deg';
      case 'top left': return '315deg';
      case 'bottom right': return '135deg';
      case 'bottom left': return '225deg';
      default: return '90deg'; // default to right
    }
  };

  const getStyles = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const styles: any = {
      paddingTop: `${spacingY}px`,
      paddingBottom: `${spacingY}px`,
      paddingLeft: `${spacingX}px`,
      paddingRight: `${spacingX}px`,
      borderRadius: `${borderRadius}px`,
    };

    if (backgroundImage) {
      styles.backgroundImage = `url('${backgroundImage}')`;
      styles.backgroundSize = 'cover';
      styles.backgroundPosition = 'center';
    } else if (backgroundGradient) {
      const direction = getGradientDirection(backgroundGradient.direction);
      const fromColor = backgroundGradient.from.replace('bg-', '');
      const toColor = backgroundGradient.to.replace('bg-', '');
      styles.background = `linear-gradient(${direction}, ${fromColor}, ${toColor})`;
    }

    return styles;
  };

  return (
    <div 
      className={`
        ${getBackgroundStyles()}
        ${className}
      `} 
      style={getStyles()}
    >
      {children} 
      {childrenData && <DynamicLoader components={childrenData} />}
    </div>
  );
}
