'use client';

import { Box } from 'lucide-react';
import DynamicLoader from '../template-builder/DynamicLoader';
import AddElement from '../template-builder/AddElement';
import { useTemplateBuilderStore } from '@/lib/store/useTemplateBuilderStore';
interface ContainerProps {
  __id: string;
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
  isContainer: true,
  propsDefault: {
    backgroundGradient: {
      from: "#4F46E5", // Indigo
      to: "#10B981", // Emerald
      direction: "bottom right"
    },
    spacingX: 50,
    spacingY: 50,
  },
}

export default function Container({
  __id,
  children,
  childrenData,
  backgroundColor,
  backgroundImage,
  backgroundGradient,
  spacingX = 50,
  spacingY = 50,
  borderRadius = 10,
  className = ''
}: ContainerProps) {
  const { mode } = useTemplateBuilderStore();
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

      { mode === "builder" && <AddElement parentID={ __id } /> }
    </div>
  );
}
