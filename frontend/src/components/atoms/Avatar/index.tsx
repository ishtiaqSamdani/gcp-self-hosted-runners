import { Avatar as MuiAvatar, AvatarProps, SxProps } from '@mui/material';
import React from 'react';

export interface AvatarComponentProps extends AvatarProps {
  avatarSrc: string;
  avatarAlt?: string;
  avatarSx?: SxProps;
}

const Avatar: React.FC<AvatarComponentProps> = (
  props: AvatarComponentProps,
) => {
  const { avatarSrc, avatarAlt, avatarSx } = props;
  return <MuiAvatar src={avatarSrc} alt={avatarAlt} sx={avatarSx} />;
};

export default Avatar;
