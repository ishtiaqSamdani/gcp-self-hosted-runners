import { useCallback, useEffect, useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import {
  EachTransactionType,
  QuickbookCategoriesType,
} from '../../../utils/types';
import {
  addQuickbookIdToTransaction,
  deleteTransactionById,
  getAllQuickBooks,
  getAllTransactions,
} from '../../../services/transaction-service';
import { useAuth } from '../../../contexts/AuthContext';

const useTransactions = (
  handleQuickBookSelect: (
    selectedQuickBook: QuickbookCategoriesType | undefined,
    vendor: string,
  ) => void,
) => {
  const [transactionData, setTransactionData] = useState<EachTransactionType[]>(
    [],
  );
  const [filteredTransactionData, setFilteredTransactionData] = useState<
    EachTransactionType[]
  >([]);
  const [quickBookData, setQuickBookData] = useState<QuickbookCategoriesType[]>(
    [],
  );
  const [searchValue, setSearchValue] = useState<string>('');
  const [dropdownValues, setDropdownValues] = useState<string[]>([]);
  const [checkboxes, setCheckboxes] = useState<boolean[]>();
  const [selectedTransactionIds, setSelectedTransactionIds] = useState<
    number[]
  >([]);
  const [transactionCount, setTransactionCount] = useState<number>(0);
  const { user } = useAuth();

  useEffect(() => {
    fetchTransactionData();
    fetchQuickbookData();
  }, []);

  useEffect(() => {
    setCheckboxes(Array(transactionData.length).fill(false));
    setTransactionCount(transactionData.length);
  }, [transactionData]);

  useEffect(() => {
    if (searchValue !== '') {
      setFilteredTransactionData(
        transactionData.filter((data) => {
          return data.vendorName
            .toLowerCase()
            .includes(searchValue.toLowerCase());
        }),
      );
    } else {
      setFilteredTransactionData(transactionData);
    }
  }, [searchValue]);

  const fetchTransactionData = async () => {
    try {
      const transactions = await getAllTransactions();
      setTransactionData(transactions);
      setFilteredTransactionData(transactions);
    } catch (error) {
      alert(error);
    }
  };

  const fetchQuickbookData = async () => {
    try {
      const quickBooks = await getAllQuickBooks(user?.id ?? 0);
      setQuickBookData(quickBooks);
    } catch (error) {
      alert(error);
    }
  };

  const updateTransactions = async (
    quickbookId: number,
    transactionId: number,
  ) => {
    try {
      await addQuickbookIdToTransaction(transactionId, quickbookId);
    } catch (error) {
      alert(error);
    }
  };

  const handleSelectChange = (
    event: SelectChangeEvent<unknown>,
    eachTransaction: EachTransactionType,
    index: number,
  ) => {
    const selectedQuickBookId = parseInt(event.target.value as string);
    updateTransactions(selectedQuickBookId, eachTransaction.id);

    const selectedQuickBook = quickBookData.find(
      (quickBook) => quickBook.id === selectedQuickBookId,
    );
    localStorage.setItem(
      'merchantRule',
      JSON.stringify({
        vendorName: eachTransaction.vendorName,
        quickbookName: selectedQuickBook?.name ?? 'Travel',
      }),
    );

    const newDropDownValues = { ...dropdownValues };
    newDropDownValues[index] = selectedQuickBook?.name ?? '';
    setDropdownValues(newDropDownValues);
    handleQuickBookSelect(selectedQuickBook, eachTransaction.vendorName);
  };

  const handleSearchClick = (searchText: string) => {
    setSearchValue(searchText);
  };

  const handleCheckboxClick = useCallback(
    (transactionId: number, index: number) => {
      setCheckboxes(
        (prevCheckboxes) =>
          prevCheckboxes?.map((checked, checkBoxIndex) => {
            if (checkBoxIndex === index) {
              if (!checked) {
                setSelectedTransactionIds((prevTransactionIds) => [
                  ...prevTransactionIds,
                  transactionId,
                ]);
              } else {
                setSelectedTransactionIds((prevIds) =>
                  prevIds.filter((id) => id !== transactionId),
                );
              }

              return !checked;
            }

            return checked;
          }),
      );
    },
    [],
  );

  const deleteTransaction = async (transactionId: number) => {
    try {
      await deleteTransactionById(transactionId);
    } catch (error) {
      alert(error);
    }
  };

  const handleDeleteTransactionClick = async () => {
    try {
      await Promise.all(
        selectedTransactionIds.map(async (transactionId) => {
          await deleteTransaction(transactionId);
        }),
      );

      await fetchTransactionData();
      setSelectedTransactionIds([]);
    } catch (error) {
      console.error('Error ', error);
    }
  };

  return {
    filteredTransactionData,
    quickBookData,
    dropdownValues,
    checkboxes,
    selectedTransactionIds,
    transactionCount,
    handleCheckboxClick,
    handleSelectChange,
    handleSearchClick,
    handleDeleteTransactionClick,
  };
};

export default useTransactions;
