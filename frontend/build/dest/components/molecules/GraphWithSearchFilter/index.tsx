import React from 'react';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
import TextField from '../../atoms/Textfield';
import SearchIcon from '../../../../public/assets/icons/searchicon.svg';
import IconComponent from '../../atoms/Icon';
import {
  DAILY,
  DATE_PICKER_RANGE,
  PAYMENT_TYPES,
  SEARCH_AND_FILTER,
} from '../../../utils/constants';
import SelectComponent from '../SelectComponent';
import CustomDatePicker from '../../atoms/DatePicker';
import Graph from '../../../../public/assets/images/graph.svg';

const StyledGraphWithSearchBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

const StyledSearchBar = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
});

const StyledSearchBox = styled(StyledSearchBar)({
  width: '60%',
});

const StyledFilterBox = styled(StyledSearchBar)({
  width: '17%',
});

const StyledDatePicker = styled(CustomDatePicker)({
  width: '8rem',
});

const TextfieldStyles = {
  width: '60%',
  height: '1.75rem',
  borderRadius: '.75rem',
};

const SearchIconStyles = {
  width: '.75rem',
  height: '0.75rem',
};

const DropdownStyles = {
  width: '37.7%',
  height: '1.75rem',
};

const IntervalDropdownStyles = {
  width: '6rem',
  height: '1.75rem',
};

const GraphImageStyles = {
  width: '100%',
  height: '40%',
};

const GraphWithSearchFilter = () => {
  return (
    <StyledGraphWithSearchBox data-testid="graph-with-search">
      <StyledSearchBar>
        <StyledSearchBox>
          <TextField
            variant={'outlined'}
            width={TextfieldStyles.width}
            height={TextfieldStyles.height}
            iconStart={
              <IconComponent
                src={SearchIcon}
                iconAlt={'search-icon'}
                width={SearchIconStyles.width}
                height={SearchIconStyles.height}
              />
            }
            placeholder={SEARCH_AND_FILTER}
            disabled={true}
            borderRadius={TextfieldStyles.borderRadius}
          />
          <SelectComponent
            items={[]}
            value={''}
            placeholder={PAYMENT_TYPES}
            width={DropdownStyles.width}
            height={DropdownStyles.height}
            disabled={true}
          />
        </StyledSearchBox>
        <StyledFilterBox>
          <StyledDatePicker text={DATE_PICKER_RANGE} isSelected={false} />
          <SelectComponent
            items={[]}
            value={DAILY}
            placeholder={DAILY}
            disabled={true}
            height={IntervalDropdownStyles.height}
            width={IntervalDropdownStyles.width}
          />
        </StyledFilterBox>
      </StyledSearchBar>
      <img
        src={Graph}
        alt={'graph'}
        width={GraphImageStyles.width}
        height={GraphImageStyles.height}
      />
    </StyledGraphWithSearchBox>
  );
};

export default GraphWithSearchFilter;
