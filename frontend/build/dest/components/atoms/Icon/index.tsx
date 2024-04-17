import React from 'react';
import { Image as MuiImage } from 'mui-image';

export interface IconProps {
  src: string;
  iconAlt: string;
  height?: string;
  width?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const IconComponent = ({
  src,
  iconAlt,
  width,
  height,
  onClick,
  style,
}: IconProps) => {
  return (
    <MuiImage
      src={src}
      alt={iconAlt}
      width={width}
      height={height}
      onClick={onClick}
      duration={0}
      style={style}
    />
  );
};

export default IconComponent;
