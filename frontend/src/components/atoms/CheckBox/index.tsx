import React from 'react';
import { Checkbox } from '@mui/material';
import UnCheckedIcon from '../../../../public/assets/icons/uncheckedIcon.svg';
import CheckedIcon from '../../../../public/assets/icons/checkedIcon.svg';

interface CheckBoxProps {
  checked: boolean;
  handleCheckBoxChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => void;
}

const CheckboxIconStyles = {
  width: '24px',
  height: '24px',
};

const CheckBox = ({ checked, handleCheckBoxChange }: CheckBoxProps) => {
  return (
    <Checkbox
      data-testid={'check-box'}
      checked={checked}
      onChange={handleCheckBoxChange}
      disableRipple={true}
      icon={
        <img
          src={UnCheckedIcon}
          alt="UncheckedIcon"
          width={CheckboxIconStyles.width}
          height={CheckboxIconStyles.height}
        />
      }
      checkedIcon={
        <img
          src={CheckedIcon}
          alt="UncheckedIcon"
          width={CheckboxIconStyles.width}
          height={CheckboxIconStyles.height}
        />
      }
    />
  );
};

export default CheckBox;
