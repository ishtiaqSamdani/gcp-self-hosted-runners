export function formatCurrency(number: number) {
  if (typeof number !== 'number' || isNaN(number)) {
    throw new Error('Invalid input. Please provide a valid number.');
  }

  const formattedNumber = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);

  return formattedNumber;
}

export const validateInput = (input: string, regex: RegExp) => {
  return input === '' || !!input.match(regex);
};
