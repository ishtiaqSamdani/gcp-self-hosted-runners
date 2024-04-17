import React from 'react';
import { Stack, StackProps, Typography, styled } from '@mui/material';
import Icon from '../../atoms/Icon';
import theme from '../../../theme';

type IconPosition = 'start' | 'end';

export interface TypographyWithIconProps {
  text: string;
  iconSrc: string;
  iconAlt: string;
  iconPosition?: IconPosition;
  typographyProps?: React.ComponentProps<typeof Typography>;
  iconProps?: { width: string; height: string };
  handleClick?: () => void;
  actionItem?: boolean;
}

interface MainContainerProps extends StackProps {
  actionItem?: boolean;
}

const MainContainer = styled(Stack)<MainContainerProps>(({ actionItem }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  cursor: actionItem ? 'pointer' : 'default',
  gap: theme.spacing(1),
}));

const TypographyWithIcon: React.FC<TypographyWithIconProps> = ({
  text,
  iconSrc,
  iconAlt,
  iconPosition = 'start',
  typographyProps,
  iconProps,
  handleClick,
  actionItem,
}) => {
  const isIconAtStart = iconPosition === 'start';

  return (
    <MainContainer actionItem={actionItem}>
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
    </MainContainer>
  );
};

export default TypographyWithIcon;
