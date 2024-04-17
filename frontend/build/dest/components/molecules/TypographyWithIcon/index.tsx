import React from 'react';
import { Stack, Typography } from '@mui/material';
import Icon from '../../atoms/Icon';

type IconPosition = 'start' | 'end';

export interface TypographyWithIconProps {
  text: string;
  iconSrc: string;
  iconAlt: string;
  iconPosition?: IconPosition;
  typographyProps?: React.ComponentProps<typeof Typography>;
  iconProps?: { width: string; height: string };
  handleClick?: () => void;
}

const TypographyWithIcon: React.FC<TypographyWithIconProps> = ({
  text,
  iconSrc,
  iconAlt,
  iconPosition = 'start',
  typographyProps,
  iconProps,
  handleClick,
}) => {
  const isIconAtStart = iconPosition === 'start';

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      {isIconAtStart && (
        <Icon
          width={iconProps?.width}
          height={iconProps?.height}
          src={iconSrc}
          iconAlt={iconAlt}
          onClick={handleClick}
        />
      )}
      <Typography {...typographyProps} onClick={handleClick}>
        {text}
      </Typography>
      {!isIconAtStart && (
        <Icon
          width={iconProps?.width}
          height={iconProps?.height}
          src={iconSrc}
          iconAlt={iconAlt}
          onClick={handleClick}
        />
      )}
    </Stack>
  );
};

export default TypographyWithIcon;
