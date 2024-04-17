import React from 'react';
import { Stack } from '@mui/material';
import theme from '../../../theme';
import Avatar from '../../atoms/Avatar';
import Typography from '../../atoms/Typography';
import { formatCurrency } from '../../../utils/functins';
import { POTENTIAL_SAVINGS } from '../../../utils/constants';
import AwsIcon from '../../../../public/assets/icons/avatar.svg';

export interface SavingsCardProps {
  amount: number;
}

const AvatarStyles = {
  width: theme.spacing(7.5),
  height: theme.spacing(7.5),
  border: `0.5px solid ${theme.palette.stroke[50]}`,
};

const SavingsCard = ({ amount }: SavingsCardProps) => {
  return (
    <Stack direction={'row'} gap={theme.spacing(2.25)} alignItems={'center'}>
      <Avatar
        avatarSrc={AwsIcon}
        avatarAlt="aws"
        avatarSx={{
          width: AvatarStyles.width,
          height: AvatarStyles.height,
          border: AvatarStyles.border,
        }}
      />
      <Stack direction={'column'} gap={theme.spacing(1.25)}>
        <Typography
          variant="caption2"
          color={theme.palette.mediumEmphasis.main}
        >
          {POTENTIAL_SAVINGS}
        </Typography>
        <Typography variant="subtitle2" color={theme.palette.accent.green100}>
          {formatCurrency(amount)}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default SavingsCard;
