import React, { ReactNode } from 'react';
import { styled } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '../../atoms/Typography';
import theme from '../../../theme';
import SelectIcon from '../../../../public/assets/icons/select.svg';
import { QuickbookCategoriesType } from '../../../utils/types';

interface SelectComponentProps extends StyledSelectProps {
  items: string[] | QuickbookCategoriesType[];
  value: string | number;
  placeholder: string;
  handleChange?: (event: SelectChangeEvent<unknown>) => void;
  disabled?: boolean;
}

interface StyledSelectProps {
  height?: string;
  width?: string;
}

const StyledSelect = styled(Select)(({ width, height }: StyledSelectProps) => ({
  width: width,
  height: height,
  border: `1px solid ${theme.palette.stroke[100]}`,
  borderRadius: '0.5rem',
  paddingRight: '0.5rem',
  backgroundColor: theme.palette.accent.main,
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiOutlinedInput-input': {
    paddingLeft: '7px',
  },
  '& .MuiOutlinedInput-input.Mui-disabled': {
    WebkitTextFillColor: theme.palette.highEmphasis.main,
  },
}));

const SelectComponent = ({
  value,
  items,
  placeholder,
  height,
  width,
  handleChange,
  disabled,
}: SelectComponentProps) => {
  const renderSelectIcon = () => {
    return <img src={SelectIcon} alt="select-svg" />;
  };

  const renderValue = (selected: unknown): ReactNode =>
    selected === '' ? (
      <Typography variant="body3" color={theme.palette.lowEmphasis.main}>
        {placeholder}
      </Typography>
    ) : (
      <Typography variant="body3" color={theme.palette.highEmphasis.main}>
        {selected as string}
      </Typography>
    );

  const getLabel = (labelOrQuickBook: string | QuickbookCategoriesType) => {
    return typeof labelOrQuickBook === 'string'
      ? labelOrQuickBook
      : labelOrQuickBook.id;
  };

  return (
    <StyledSelect
      data-testid="select-component"
      id="simple-select"
      value={value}
      displayEmpty
      onChange={handleChange}
      IconComponent={renderSelectIcon}
      renderValue={renderValue}
      height={height}
      width={width}
      disabled={disabled}
      MenuProps={{
        PaperProps: {
          style: {
            borderRadius: '0.375rem',
            border: '1px solid ' + theme.palette.stroke[100],
            boxShadow: theme.shadows[1],
            color: theme.palette.lowEmphasis.main,
            background: theme.palette.accent.main,
            marginTop: '0.3rem',
            padding: 'none',
          },
        },
      }}
    >
      {items.map((labelOrQuickBook) => (
        <MenuItem
          data-testid="select-menu"
          key={getLabel(labelOrQuickBook)}
          value={getLabel(labelOrQuickBook)}
        >
          <Typography variant="body2" color={theme.palette.lowEmphasis.main}>
            {typeof labelOrQuickBook === 'string'
              ? labelOrQuickBook
              : labelOrQuickBook.name}
          </Typography>
        </MenuItem>
      ))}
    </StyledSelect>
  );
};

export default SelectComponent;
