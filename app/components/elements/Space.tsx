'use client';

import { Space as SpaceIcon } from 'lucide-react';

interface SpaceProps {
  height?: number;
  className?: string;
}

export const explain = {
  name: "Space",
  icon: <SpaceIcon />,
  description: "A component that adds vertical spacing between elements"
}

const Space = ({ height = 20, className = '' }: SpaceProps) => {
  return (
    <div 
      style={{ height: `${height}px` }}
      className={className}
    />
  );
};

export default Space;

