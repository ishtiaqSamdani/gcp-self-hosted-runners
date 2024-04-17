import { format } from 'date-fns';

export const formatDate = (inputDate: Date | null) => {
  if (!inputDate) return '';
  const date = new Date(inputDate);
  if (isNaN(date.getTime())) return '';
  return format(date, 'yyyy-MM-dd');
};

export const dollarConvert = (amount: number) => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};
