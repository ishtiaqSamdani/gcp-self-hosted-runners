import React, { useState, useMemo, useCallback } from 'react';
import { Stack, styled } from '@mui/material';
import theme from '../../../theme';
import Modal from '../../molecules/Modal';
import Typography from '../../atoms/Typography';
import RampCardSelector from '../../molecules/RampCardSelector';
import TypographyWithIcon from '../../molecules/TypographyWithIcon';
import { createRampCategory } from '../../../services/ramp-category-service';
import {
  ADD_NEW,
  RAMP_CATEGORIES,
  RAMP_CATEGORY_DESCRIPTION,
  CREATE_RAMP_CATEGORY,
  NO_EMPTY_CATEGORIES,
} from '../../../utils/constants';
import AddIcon from '../../../../public/assets/icons/add.svg';
import { useAuth } from '../../../contexts/AuthContext';

export interface CreateRampCategoryProps {
  onCancelClick: () => void;
}

const StyledTypographyWithIcon = styled(Stack)({
  padding: theme.spacing(2),
  cursor: 'pointer',
});

const CreateRampCategory: React.FC<CreateRampCategoryProps> = ({
  onCancelClick,
}) => {
  const [rampValues, setRampValues] = useState<string[]>(Array(3).fill(''));

  const { user } = useAuth();

  const memoizedTextContent = useMemo(
    () => (
      <Stack gap={theme.spacing(1)}>
        <Typography variant="body2" color={theme.palette.highEmphasis.main}>
          {RAMP_CATEGORIES}
        </Typography>
        <Typography variant="body3" color={theme.palette.highEmphasis.main}>
          {RAMP_CATEGORY_DESCRIPTION}
        </Typography>
      </Stack>
    ),
    [],
  );

  const onCreateRuleClick = async () => {
    try {
      const nonEmptyCategories = rampValues.filter(
        (category: string) => category.trim() !== '',
      );

      if (nonEmptyCategories.length === 0) {
        alert(NO_EMPTY_CATEGORIES);
        return;
      }

      const promises = nonEmptyCategories.map(async (category) => {
        try {
          return await createRampCategory(user?.id ?? 0, category);
        } catch (error) {
          alert(error);
          return null;
        }
      });
      await Promise.all(promises);
      onCancelClick();
    } catch (error) {
      alert(error);
    }
  };

  const handleRampChange = useCallback((index: number, value: string) => {
    setRampValues((prevRampValues) => {
      const updatedValues = [...prevRampValues];
      updatedValues[index] = value;
      return updatedValues;
    });
  }, []);

  const handleAddNewCard = useCallback(() => {
    setRampValues((prevRampValues) => {
      const updatedValues = [...prevRampValues];
      updatedValues.push('');
      return updatedValues;
    });
  }, []);

  const handleCancelCard = useCallback(
    (index: number) => {
      if (rampValues && rampValues.length > 1) {
        setRampValues((prevRampValues) => {
          const updatedValues = [...prevRampValues];
          updatedValues.splice(index, 1);
          return updatedValues;
        });
      }
    },
    [rampValues],
  );

  const getTextFieldContent = () => {
    return (
      <Stack gap={theme.spacing(4)}>
        {rampValues.map((rampValue, index) => (
          <RampCardSelector
            key={index}
            rampValue={rampValue}
            handleRampChange={(value) => handleRampChange(index, value)}
            onCancelClick={
              rampValues.length > 1 ? () => handleCancelCard(index) : () => {}
            }
          />
        ))}
        <StyledTypographyWithIcon onClick={handleAddNewCard}>
          <TypographyWithIcon
            text={ADD_NEW}
            iconSrc={AddIcon}
            iconAlt={'add'}
            typographyProps={{
              variant: 'body2',
              color: theme.palette.primary[500],
            }}
            iconProps={{ width: theme.spacing(3), height: theme.spacing(3) }}
          />
        </StyledTypographyWithIcon>
      </Stack>
    );
  };

  return (
    <Modal
      width="30%"
      height={'41.625rem'}
      headingContent={CREATE_RAMP_CATEGORY}
      handleCancelClick={onCancelClick}
      handleCreateRuleClick={onCreateRuleClick}
      textContent={memoizedTextContent}
      textFieldContents={getTextFieldContent()}
    />
  );
};

CreateRampCategory.displayName = 'CreateRampCategory';

export default React.memo(CreateRampCategory);
