import React, { useEffect, useState } from 'react';
import { Box, TextField, styled } from '@mui/material';
import theme from '../../../theme';
import IconComponent from '../../atoms/Icon';
import QuestionMark from '../../../../public/assets/icons/questionMark.svg';
import Typography from '../../atoms/Typography';
import {
  ALL_CARDS_BOX_TEXT,
  APPROVE,
  CLEAR_FILTER,
  DELETE,
  FILTER,
  REJECT,
  SEARCH_COMPONENT_PLACEHOLDER,
  SEARCH_HEADER_TEXT,
  SEARCH_TIPS,
  SYNC,
  TRANSACTIONS,
} from '../../../utils/constants';
import Search from '../../../../public/assets/icons/search.svg';
import TypographyWithIcon from '../../molecules/TypographyWithIcon';
import GiftBox from '../../../../public/assets/icons/giftBox.svg';
import ClearFilterIcon from '../../../../public/assets/icons/clearfiltericon.svg';
import FilterIcon from '../../../../public/assets/icons/filtericon.svg';
import FilledDeleteIcon from '../../../../public/assets/icons/deletefilledicon.svg';
import FilledTrashIcon from '../../../../public/assets/icons/filledtrashicon.svg';
import TickIcon from '../../../../public/assets/icons/approveicon.svg';
import RejectIcon from '../../../../public/assets/icons/rejecticon.svg';
import Button from '../../atoms/Button';

interface SuggestionCardProps {
  showRightButtons: boolean;
}

interface SearchComponentProps extends SuggestionCardProps {
  selectedTransaction?: boolean;
  onSearchItemClick: (searchText: string) => void;
  handleDeleteClick?: () => void;
  selectedBill?: boolean;
  handleApproveClick?: () => void;
}

const SuggestionCardMainContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.accent.main,
  border: `1px solid ${theme.palette.stroke[100]}`,
  borderRadius: '0.375rem',
  boxShadow: `${theme.shadows[1]} ${theme.shadows[2]}`,
  width: '43.04%',
  zIndex: '1',
  position: 'absolute',
  marginTop: '2.5rem',
  marginLeft: '.5rem',
});

const SearchComponentBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
});

const SearchComponentMainContainer = styled(Box)({
  display: 'flex',
  gap: '1.12rem',
  alignItems: 'center',
  width: '50%',
});

const SuggestionCardHeader = styled(Box)({
  borderBottom: `1px solid ${theme.palette.stroke[50]}`,
  background: theme.palette.accent.main,
  padding: '1rem 1.63rem 0.5rem',
});

const SuggestionCardMiddleContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '0.5rem 1.63rem 1.25rem',
});

const SuggestionCardFooter = styled(Box)({
  backgroundColor: theme.palette.structural[50],
  display: 'flex',
  alignItems: 'center',
  borderRadius: '0rem 0rem 0.3125rem 0.3125rem',
  height: '5.2vh',
  width: '100%',
});

const SuggestionCardFooterInnerContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
  paddingLeft: '1.56rem',
  width: '100%',
});

const StyledRightTextfieldBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
  justifyContent: 'end',
  width: '35%',
});

const ClickableSearchIconContainer = styled(Box)({
  cursor: 'pointer',
});

const AllCardsBox = styled(Box)({
  borderRadius: '0.75rem',
  border: `1px solid ${theme.palette.stroke[50]}`,
  backgroundColor: theme.palette.accent.main,
  width: '20%',
  padding: '0.25rem 0.5rem',
  height: '1.75rem',
});

const StyledIconWithTextBox = styled(Box)({
  display: 'flex',
  padding: '.188rem .5rem .313rem .5rem',
});

const StyledSearchTextBox = styled(Box)({
  display: 'flex',
  borderRadius: '6.25rem',
  border: `1px solid ${theme.palette.stroke[50]}`,
  padding: `.25rem .5rem .25rem .5rem`,
});

const StyledTextField = styled(TextField)({
  width: '70%',
  justifyContent: 'center',
  height: theme.spacing(7),
  borderRadius: '0.75rem',
  padding: '0.25rem 0.5rem',
  '& .MuiOutlinedInput-root': {
    height: '1.75rem',
    gap: '0.5rem',
    border: `1px solid ${theme.palette.stroke[50]}`,
    '&: hover': {
      outline: 'none',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent !important',
  },
  '& .MuiInputBase-root': {
    borderRadius: '0.75rem',
    color: `${theme.palette.highEmphasis.main}`,
    fontFamily: theme.typography.caption2.fontFamily,
    fontSize: theme.typography.caption2.fontSize,
    fontWeight: theme.typography.caption2.fontWeight,
    '&::placeholder': {
      color: theme.palette.lowEmphasis.main,
    },
  },
});

export const StyledApprovalBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '1.5rem',
});

const SearchComponent = ({
  onSearchItemClick,
  selectedTransaction,
  handleDeleteClick,
  showRightButtons,
  selectedBill,
  handleApproveClick,
}: SearchComponentProps) => {
  const [searchText, setSearchText] = useState<string>('');
  const [isOpenSearchPopUp, setIsOpenSearchPopUp] = useState<boolean>(false);
  const [isOpenSearchTextBox, setIsOpenSearchTextBox] =
    useState<boolean>(false);
  const [isSearchFieldDisabled, setIsSearchFieldDisabled] =
    useState<boolean>(false);

  useEffect(() => {
    setIsOpenSearchPopUp(searchText !== '');
  }, [searchText]);

  useEffect(() => {
    onSearchItemClick(searchText);
    setIsSearchFieldDisabled(isOpenSearchTextBox);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenSearchTextBox]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const searchTextClickHandler = () => {
    setIsOpenSearchPopUp(false);
    setIsOpenSearchTextBox(true);
  };

  const handleDeleteSearchClick = () => {
    setSearchText('');
    setIsOpenSearchPopUp(false);
    setIsOpenSearchTextBox(false);
  };

  const renderSuggestionCard = () => {
    return (
      <SuggestionCardMainContainer data-testid="suggestion-card">
        <SuggestionCardHeader>
          <Typography
            variant="subtitle3"
            color={theme.palette.lowEmphasis.main}
          >
            {SEARCH_HEADER_TEXT}
          </Typography>
          <Typography
            variant="subtitle3"
            color={theme.palette.mediumEmphasis.main}
          >
            {searchText}
          </Typography>
        </SuggestionCardHeader>
        <SuggestionCardMiddleContainer>
          <Typography
            variant="subtitle3"
            color={theme.palette.lowEmphasis.main}
          >
            {TRANSACTIONS}
          </Typography>

          <ClickableSearchIconContainer
            onClick={searchTextClickHandler}
            data-testid="clickable-search-text"
          >
            <Typography
              variant="subtitle3"
              color={theme.palette.highEmphasis.main}
            >
              {searchText}
            </Typography>
          </ClickableSearchIconContainer>
        </SuggestionCardMiddleContainer>
        <SuggestionCardFooter>
          <SuggestionCardFooterInnerContainer>
            <IconComponent
              src={QuestionMark}
              iconAlt="question"
              height="1.25rem"
              width="1.25rem"
            />
            <Typography
              variant="subtitle3"
              color={theme.palette.mediumEmphasis.main}
            >
              {SEARCH_TIPS}
            </Typography>
          </SuggestionCardFooterInnerContainer>
        </SuggestionCardFooter>
      </SuggestionCardMainContainer>
    );
  };

  const renderAllCardsItem = () => {
    return (
      <AllCardsBox>
        <TypographyWithIcon
          text={ALL_CARDS_BOX_TEXT}
          iconSrc={GiftBox}
          iconAlt={'gift-icon'}
          iconProps={{ height: '0.75rem', width: '0.75rem' }}
          typographyProps={{
            variant: 'caption1',
            color: theme.palette.lowEmphasis.main,
          }}
        />
      </AllCardsBox>
    );
  };

  return (
    <>
      <SearchComponentBox>
        <SearchComponentMainContainer data-testid="search-component">
          <StyledTextField
            placeholder={SEARCH_COMPONENT_PLACEHOLDER}
            onChange={handleChange}
            value={searchText}
            InputProps={{
              startAdornment: (
                <IconComponent
                  src={Search}
                  iconAlt="search"
                  height="0.75rem"
                  width="0.75rem"
                />
              ),
            }}
            disabled={isSearchFieldDisabled}
          />
          {renderAllCardsItem()}
          {isOpenSearchTextBox && (
            <StyledSearchTextBox data-testid="search-box">
              <TypographyWithIcon
                text={searchText}
                iconSrc={FilledDeleteIcon}
                iconAlt={'delete'}
                typographyProps={{
                  variant: 'caption1',
                  color: theme.palette.primary[500],
                }}
                iconProps={{ width: '12px', height: '12px' }}
                handleClick={handleDeleteSearchClick}
              />
            </StyledSearchTextBox>
          )}
        </SearchComponentMainContainer>
        <StyledRightTextfieldBox>
          {selectedTransaction && (
            <StyledIconWithTextBox>
              <TypographyWithIcon
                text={DELETE}
                iconSrc={FilledTrashIcon}
                iconAlt={'trash'}
                typographyProps={{
                  variant: 'body2',
                  color: theme.palette.lowEmphasis.main,
                }}
                iconProps={{ width: '16px', height: '16px' }}
                handleClick={handleDeleteClick}
              />
            </StyledIconWithTextBox>
          )}
          {showRightButtons && (
            <>
              <StyledIconWithTextBox>
                <TypographyWithIcon
                  text={CLEAR_FILTER}
                  iconSrc={ClearFilterIcon}
                  iconAlt={'clear'}
                  typographyProps={{
                    variant: 'body2',
                    color: theme.palette.lowEmphasis.main,
                  }}
                  iconProps={{ width: '20px', height: '20px' }}
                />
              </StyledIconWithTextBox>
              <StyledIconWithTextBox>
                <TypographyWithIcon
                  text={FILTER}
                  iconSrc={FilterIcon}
                  iconAlt={'filter'}
                  typographyProps={{
                    variant: 'body2',
                    color: theme.palette.primary[500],
                  }}
                  iconProps={{ width: '20px', height: '20px' }}
                />
              </StyledIconWithTextBox>
              <Button
                variant="outlined"
                backgroundColor={'white'}
                width={'9.125rem'}
                labelColor={theme.palette.mediumEmphasis.main}
                label={SYNC}
              />
            </>
          )}
        </StyledRightTextfieldBox>
        {selectedBill && (
          <StyledApprovalBox>
            <TypographyWithIcon
              text={APPROVE}
              iconSrc={TickIcon}
              iconAlt={'approve'}
              iconProps={{ width: '1.25rem', height: '1.25rem' }}
              typographyProps={{
                variant: 'body2',
                color: theme.palette.primary[500],
              }}
              handleClick={handleApproveClick}
            />
            <TypographyWithIcon
              text={REJECT}
              iconSrc={RejectIcon}
              iconAlt={'reject'}
              iconProps={{ width: '1.25rem', height: '1.25rem' }}
              typographyProps={{
                variant: 'body2',
                color: theme.palette.lowEmphasis.main,
              }}
            />
          </StyledApprovalBox>
        )}
      </SearchComponentBox>
      {isOpenSearchPopUp && renderSuggestionCard()}
    </>
  );
};

export default SearchComponent;
