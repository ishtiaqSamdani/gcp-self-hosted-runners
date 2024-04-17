import React from 'react';
import { Box, Stack } from '@mui/material';
import styled from '@emotion/styled';
import TextField from '../../atoms/Textfield';
import SearchIcon from '../../../../public/assets/icons/searchicon.svg';
import IconComponent from '../../atoms/Icon';
import { PAYMENT_TYPES, SEARCH_AND_FILTER } from '../../../utils/constants';
import SelectComponent from '../SelectComponent';
import Graph from '../../../../public/assets/images/graph.svg';
import theme from '../../../theme';
import DatePickerImg from '../../../../public/assets/images/DatePicker.png';

const StyledGraphWithSearchBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(6.25),
});

const StyledSearchBar = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
});

const StyledSearchBox = styled(StyledSearchBar)({
  maxWidth: '55%',
});

const StyledFilterBox = styled(Stack)({
  flexDirection: 'row',
  width: '14%',
  gap: theme.spacing(4),
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
            disabled={false}
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
          <IconComponent
            src={DatePickerImg}
            iconAlt={'datepicker-icon'}
            width={theme.spacing(60)}
            height={theme.spacing(8.5)}
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
