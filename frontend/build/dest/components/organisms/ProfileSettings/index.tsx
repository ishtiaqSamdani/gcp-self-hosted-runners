import React, { useState } from 'react';
import { Box, Stack, styled } from '@mui/material';
import theme from '../../../theme';
import Typography from '../../atoms/Typography';
import {
  ACTION_ITEMS,
  MY_RAMP_HEAD,
  MY_RAMP_OPTIONS,
} from '../../../utils/constants';
import DividerComponent from '../../atoms/Divider';
import TypographyWithIcon from '../../molecules/TypographyWithIcon';
import { ActionItemType, RampOptionType } from '../../../utils/types';
import { useAuth } from '../../../contexts/AuthContext';
import CreateRampCategory from '../CreateRampCategory';

const Maincontainer = styled(Box)({
  width: '11rem',
  padding: '0.5rem',
  borderRadius: '0.375rem',
  border: `1px solid ${theme.palette.stroke[100]}`,
  boxSizing: 'border-box',
  boxShadow: `0px 5px 15px 0px ${theme.palette.boxShadow.dark}, 0px 15px 35px 0px ${theme.palette.boxShadow.main}`,
  zIndex: 9999,
  position: 'absolute',
  backgroundColor: theme.palette.white.main,
});

const HoverContainer = styled(Box)({
  padding: '0.25rem',
  borderRadius: '0.25rem',
  width: '100%',
  backgroundColor: theme.palette.white.main,
  '&:hover': {
    backgroundColor: theme.palette.structural[50],
  },
});

const HeadContainer = styled(Box)({
  padding: '0.25rem',
});

const actionItemIconStyles = {
  height: '1rem',
  width: '1rem',
};

const ModalWrapper = styled(Stack)({
  position: 'absolute',
  width: '100%',
  height: '100vh',
});

const ProfileSettings = () => {
  const { logout } = useAuth();
  const [rampCategoryModal, setRampCategoryModal] = useState(false);
  const handleLogoutClick = () => {
    logout();
  };

  const handleCreateRampCategory = () => {
    setRampCategoryModal(true);
  };

  const onCancelClick = () => {
    setRampCategoryModal(false);
  };

  return (
    <Maincontainer>
      <HeadContainer>
        <Typography color={theme.palette.lowEmphasis.main} variant={'caption1'}>
          {MY_RAMP_HEAD}
        </Typography>
      </HeadContainer>
      {MY_RAMP_OPTIONS.map((option: RampOptionType) => {
        return (
          <HoverContainer
            onClick={
              option.label === 'Create Ramp category'
                ? handleCreateRampCategory
                : option.onClick
            }
            key={option.label}
          >
            <Typography
              color={theme.palette.mediumEmphasis.main}
              variant={'body2'}
            >
              {option.label}
            </Typography>
          </HoverContainer>
        );
      })}
      <DividerComponent />
      {ACTION_ITEMS.map((option: ActionItemType) => {
        return (
          <HoverContainer
            onClick={
              option.label === 'Log out' ? handleLogoutClick : option.onClick
            }
            key={option.label}
          >
            <TypographyWithIcon
              text={option.label}
              iconSrc={option.icon}
              iconAlt={option.alt}
              iconProps={actionItemIconStyles}
              typographyProps={{
                color: theme.palette.mediumEmphasis.main,
                variant: 'body2',
              }}
            />
          </HoverContainer>
        );
      })}
      {rampCategoryModal && (
        <ModalWrapper>
          <CreateRampCategory onCancelClick={onCancelClick} />
        </ModalWrapper>
      )}
    </Maincontainer>
  );
};

export default ProfileSettings;
