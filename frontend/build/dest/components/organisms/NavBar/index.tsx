import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Box, Chip, SelectChangeEvent } from '@mui/material';
import theme from '../../../theme';
import IconComponent from '../../atoms/Icon';
import RightArrowIcon from '../../../../public/assets/icons/rightarrow.svg';
import ProfileIcon from '../../../../public/assets/icons/profile.svg';
import {
  RAMP_PERKS,
  REIMBURSEMENT,
  REIMBURSMENTS_DROPDOWN_OPTIONS,
  SETUP_GUIDE,
  TAB_HEADINGS,
} from '../../../utils/constants';
import Typography from '../../atoms/Typography';
import DropDown from '../../molecules/DropDown';
import { useRampTabsContext } from '../../../contexts/RampTabsContext';
import ProfileSettings from '../ProfileSettings';

const StyledHeaderBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.structural[50],
  height: '44px',
  width: '100%',
  alignItems: 'center',
  borderRadius: '6px 6px 0 0',
});

const StyledHeaderLeftBox = styled(Box)({
  display: 'flex',
  justifyContent: 'end',
  width: '10.8%',
});

const StyledHeaderRightBox = styled(Box)({
  display: 'flex',
  justifyContent: 'start',
  width: '7%',
});

const StyledChip = styled(Chip)({
  borderRadius: '2.5rem',
  backgroundColor: theme.palette.structural[100],
  height: '1.5rem',
  color: theme.palette.primary[500],
  width: '75%',
  '. &MuiChip-label': {
    paddingRight: '5px',
    paddingLeft: '0px',
  },
});

const StyledTabsContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.accent.white,
  width: '100%',
  alignItems: 'center',
  paddingTop: '12px',
});

const LeftStyledTabsContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  width: '68%',
  alignItems: 'start',
  gap: '.5rem',
  paddingLeft: '3rem',
});

const RightStyledTabsContainer = styled(Box)({
  alignItems: 'end',
  width: '13.3%',
});

const StyledProfileBox = styled('div')({
  width: '100%',
  position: 'fixed',
  zIndex: 900,
  justifyContent: 'end',
  display: 'flex',
});

const NavBar = () => {
  const {
    activeTab,
    setCurrentTab,
    reimbursementTabValue,
    setCurrentReimbursementTab,
  } = useRampTabsContext();

  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const handleTabSelection = (tabName: string) => {
    if (activeTab === tabName) {
      return;
    }

    if (
      tabName === TAB_HEADINGS[0] ||
      tabName === TAB_HEADINGS[6] ||
      tabName === TAB_HEADINGS[7]
    ) {
      if (tabName === TAB_HEADINGS[6])
        setCurrentReimbursementTab(REIMBURSMENTS_DROPDOWN_OPTIONS[0]);
      setCurrentTab(tabName);
    }
  };

  const handleDropdownSelection = (event: SelectChangeEvent<unknown>) => {
    const selectedReimbursementOption = event.target.value as string;
    setCurrentReimbursementTab(selectedReimbursementOption);
  };

  const handleProfileOpen = () => {
    setIsProfileOpen((prevProfileOpen) => !prevProfileOpen);
  };

  const renderTabs = () => {
    return (
      <>
        {isProfileOpen && (
          <StyledProfileBox>
            <ProfileSettings />
          </StyledProfileBox>
        )}
        <StyledTabsContainer data-testid="tab">
          <LeftStyledTabsContainer>
            {TAB_HEADINGS.map((tab) => (
              <DropDown
                key={tab}
                dropDownVariant={tab === activeTab ? 'active' : 'inactive'}
                items={
                  tab === REIMBURSEMENT ? REIMBURSMENTS_DROPDOWN_OPTIONS : []
                }
                placeholder={tab}
                value={tab === REIMBURSEMENT ? reimbursementTabValue : tab}
                disabled={tab !== activeTab || tab !== REIMBURSEMENT}
                height={'1.5rem'}
                handleChange={handleDropdownSelection}
                onSelectClick={handleTabSelection}
              />
            ))}
          </LeftStyledTabsContainer>
          <RightStyledTabsContainer>
            <DropDown
              dropDownVariant="inactive"
              items={[]}
              placeholder={RAMP_PERKS}
              value={RAMP_PERKS}
              disabled={true}
              height={'1.5rem'}
              onSelectClick={() => {}}
            />
          </RightStyledTabsContainer>
        </StyledTabsContainer>
      </>
    );
  };

  const renderHeader = useMemo(() => {
    return (
      <StyledHeaderBox data-testid="header">
        <StyledHeaderLeftBox>
          <StyledChip
            data-testid="chip"
            deleteIcon={
              <IconComponent
                src={RightArrowIcon}
                iconAlt="RightArrow"
                width="1.5rem"
                height="1.5rem"
              />
            }
            onDelete={() => {}}
            label={
              <Typography color={theme.palette.primary[500]} variant={'body2'}>
                {SETUP_GUIDE}
              </Typography>
            }
            variant={'filled'}
          />
        </StyledHeaderLeftBox>
        <StyledHeaderRightBox>
          <IconComponent
            src={ProfileIcon}
            width="1.5rem"
            height="1.5rem"
            iconAlt={'profile'}
            onClick={handleProfileOpen}
          />
        </StyledHeaderRightBox>
      </StyledHeaderBox>
    );
  }, []);

  return (
    <>
      {renderHeader}
      {renderTabs()}
    </>
  );
};

export default React.memo(NavBar);
