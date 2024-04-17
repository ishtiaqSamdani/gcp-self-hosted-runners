import React, { ReactNode } from 'react';
import MenuItem, { MenuItemOwnProps } from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material';
import theme from '../../../theme';
import Typography from '../../atoms/Typography';
import { DropDownVariant } from '../../../utils/types';
import DropDownWhiteIcon from '../../../../public/assets/icons/whiteDownChevron.svg';
import DropDownBlackIcon from '../../../../public/assets/icons/blackDownChevron.svg';

interface DropDownProps extends StyledDropDownProps {
  items?: string[];
  value: string;
  placeholder: string;
  disabled?: boolean;
  handleChange?: (event: SelectChangeEvent<unknown>) => void;
  onSelectClick: (label: string) => void;
}

const StyledTypography = styled(Typography)({
  cursor: 'pointer',
});

interface StyledDropDownProps {
  height?: string;
  width?: string;
  dropDownVariant: DropDownVariant;
}

interface MenuItemProps extends MenuItemOwnProps {
  backgroundColor: string;
}

const StyledDropDown = styled(Select)(
  ({ width, height, dropDownVariant }: StyledDropDownProps) => ({
    width: width ?? '',
    height: height ?? '1.5rem',
    cursor: 'pointer',
    backgroundColor:
      dropDownVariant === 'active'
        ? theme.palette.primary[500]
        : theme.palette.accent.main,
    borderRadius: '2.5rem',
    paddingRight: '0.5rem',
    gap: '0.5rem',
    '& .MuiOutlinedInput-input': {
      paddingRight: '0px !important',
      cursor: 'pointer',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: `transparent !important`,
      cursor: 'pointer',
    },
    '& .MuiOutlinedInput-input.Mui-disabled': {
      WebkitTextFillColor:
        dropDownVariant === 'active'
          ? theme.palette.accent.main
          : theme.palette.highEmphasis.main,
    },
  }),
);

const StyledMenuItem = styled(MenuItem)(
  ({ backgroundColor }: MenuItemProps) => ({
    backgroundColor: `${backgroundColor} !important`,
  }),
);

const DropDown = ({
  value,
  items,
  height,
  placeholder,
  dropDownVariant,
  width,
  disabled,
  handleChange,
  onSelectClick,
}: DropDownProps) => {
  const renderDropdownIcon = () => {
    const downChevron =
      dropDownVariant === 'inactive' ? DropDownBlackIcon : DropDownWhiteIcon;
    return <img src={downChevron} alt="dorwn-arrow" />;
  };
  const renderValue = (): ReactNode => {
    const placeholderVariant =
      dropDownVariant === 'active' ? 'body2' : 'caption3';
    const placeholderColor =
      dropDownVariant === 'active'
        ? theme.palette.accent.main
        : theme.palette.highEmphasis.main;
    return (
      <StyledTypography variant={placeholderVariant} color={placeholderColor}>
        {placeholder}
      </StyledTypography>
    );
  };

  return (
    <StyledDropDown
      data-testid="dropdown"
      value={value}
      height={height}
      width={width}
      disabled={disabled}
      dropDownVariant={dropDownVariant}
      onChange={handleChange}
      IconComponent={renderDropdownIcon}
      renderValue={renderValue}
      onClick={() => {
        onSelectClick(placeholder);
      }}
      MenuProps={{
        PaperProps: {
          style: {
            borderRadius: '0.375rem',
            border: '1px solid ' + theme.palette.stroke[100],
            boxShadow: theme.shadows[2],
            background: 'theme.palette.accent.main',
            marginTop: '0.3rem',
            padding: 'none',
            cursor: 'pointer',
          },
        },
      }}
    >
      {items?.map((label: string) => (
        <StyledMenuItem
          data-testid="select-menu"
          key={label}
          value={label}
          backgroundColor={
            value === label
              ? theme.palette.primary[500]
              : theme.palette.accent.main
          }
        >
          <StyledTypography
            variant="body2"
            color={
              value === label
                ? theme.palette.accent.main
                : theme.palette.lowEmphasis.main
            }
          >
            {label}
          </StyledTypography>
        </StyledMenuItem>
      ))}
    </StyledDropDown>
  );
};

export default DropDown;
