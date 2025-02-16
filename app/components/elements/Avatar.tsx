'use client';

import { UserRound } from 'lucide-react';

interface AvatarProps {
  image?: string;
  name: string;
  position?: string;
  size?: 'sm' | 'md' | 'lg';
  showInfo?: boolean;
  className?: string;
  imageClassName?: string;
  textClassName?: string;
  align?: 'left' | 'center' | 'right';
  nameColor?: string;
  positionColor?: string;
}

export const explain = {
  name: "Avatar",
  icon: <UserRound />,
  description: "A circular avatar component that displays an image, name and position"
}

const Avatar = ({ 
  image,
  name,
  position,
  size = 'md',
  showInfo = true,
  className = '',
  imageClassName = '',
  textClassName = '',
  align = 'left',
  nameColor = 'text-gray-900',
  positionColor = 'text-gray-500'
}: AvatarProps) => {
  const sizeClasses = {
    sm: {
      wrapper: 'w-8 h-8',
      text: 'text-sm',
      spacing: 'gap-2'
    },
    md: {
      wrapper: 'w-12 h-12',
      text: 'text-base',
      spacing: 'gap-3'
    },
    lg: {
      wrapper: 'w-16 h-16',
      text: 'text-lg',
      spacing: 'gap-4'
    }
  };

  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  };

  const baseClasses = 'rounded-full overflow-hidden flex items-center justify-center';
  const sizeClass = sizeClasses[size];

  const AvatarImage = () => {
    if (!image) {
      return (
        <div className={`${baseClasses} ${sizeClass.wrapper} ${imageClassName} bg-gray-200`}>
          <UserRound className="w-1/2 h-1/2 text-gray-400" />
        </div>
      );
    }

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={name}
        className={`${baseClasses} ${sizeClass.wrapper} ${imageClassName} object-cover`}
      />
    );
  };

  if (!showInfo) {
    return (
      <div className={`w-full flex ${alignClasses[align]}`}>
        <AvatarImage />
      </div>
    );
  }

  return (
    <div className={`w-full flex ${alignClasses[align]}`}>
      <div className={`flex items-center ${sizeClass.spacing} ${className}`}>
        <AvatarImage />
        <div className={`flex flex-col ${textClassName}`}>
          <span className={`font-medium ${sizeClass.text} ${nameColor}`}>{name}</span>
          {position && (
            <span className={`${positionColor} ${size === 'lg' ? 'text-base' : 'text-sm'}`}>
              {position}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Avatar;
