import {
  InvoiceInfoType,
  MappedBillData,
  NewBillFormData,
  QuickbookCategoriesType,
} from './types';

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

export function formatDateToEnUs(date: string) {
  const inputDate = new Date(date); //date format should be '2011-04-09'
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  };
  return inputDate.toLocaleDateString('en-US', options);
}

export const validateInput = (input: string, regex: RegExp) => {
  return input === '' || !!input.match(regex);
};

export function getMerchantRuleDialogBoxDescription() {
  const storedJsonString =
    localStorage.getItem('merchantRule') ??
    JSON.stringify({ vendorName: 'Lyft', quickbookName: 'Travel' });
  const ruleDetails = JSON.parse(storedJsonString);
  return `Save “${ruleDetails.quickbookName}“ as the default Quickbooks category for all the future and unsynced transactions from “${ruleDetails.vendorName}“.`;
}

export function getMerchantRuleModalBody() {
  const storedJsonString =
    localStorage.getItem('merchantRule') ??
    JSON.stringify({ vendorName: 'Lyft', quickbookName: 'Travel' });
  const ruleDetails = JSON.parse(storedJsonString);
  return `Set a default QuickBooks Category for "${ruleDetails.vendorName}". This rule will be applied automatically to all unsynced and future transactions from "${ruleDetails.vendorName}".`;
}

export const getQuickbookIdByName = (
  data: QuickbookCategoriesType[],
  searchName: string,
) => {
  const result = data.find((item) => item.name === searchName);
  return result ? result.id : 0;
};

export function extractInvoiceInfo(text: string | undefined) {
  const invoiceInfo: InvoiceInfoType = {
    memo: '21-00006',
    bill: [
      {
        amount: 0,
        quickbookDescription: 'Travelling Hotel Rent',
        category: 'Travel',
        class: 'Rent',
        customJob: 'Manager',
        id: 1,
      },
    ],
  };

  const invoiceNoPattern = /Invoice\s+Number\s+(\S+)/i;
  const invoiceDatePattern = /Invoice\s+Date\s+(\S+)/i;
  const locationPattern = /Address\s+((?:\S+\s+){0,8}\S+)/;
  const amountPattern = /Total\s+\$([\d.]+)/;
  const namePattern = /Name\s+(\w+\s+\w+)/;
  const emailPattern = /Email\s+(\S+@\S+)/i;

  if (text) {
    const invoiceNoMatch = text.match(invoiceNoPattern);
    const invoiceDateMatch = text.match(invoiceDatePattern);
    const locationMatch = text.match(locationPattern);
    const amountMatch = text.match(amountPattern);
    const nameMatch = text.match(namePattern);
    const emailMatch = text.match(emailPattern);

    const cleanText = (str: string) => str.replace(/\s+/g, ' ').trim();

    if (invoiceNoMatch) invoiceInfo.invoiceNo = cleanText(invoiceNoMatch[1]);
    if (invoiceDateMatch)
      invoiceInfo.invoiceDate = cleanText(invoiceDateMatch[1]);
    if (locationMatch) invoiceInfo.location = cleanText(locationMatch[1]);
    if (amountMatch) invoiceInfo.bill[0].amount = parseFloat(amountMatch[1]);
    if (nameMatch) invoiceInfo.name = cleanText(nameMatch[1]);
    if (emailMatch) invoiceInfo.email = cleanText(emailMatch[1]);
  }

  return invoiceInfo;
}

export function formatDateString(
  inputDate: string,
  addOneMonth: boolean = false,
): string {
  const [day, month, year] = inputDate.split('/');
  const formattedDay = day.length === 1 ? `0${day}` : day;

  let newYear = parseInt(year, 10);
  let newMonth = parseInt(month, 10);

  if (addOneMonth) {
    newMonth += 1;
    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }
  }

  return `${newYear}-${newMonth.toString().padStart(2, '0')}-${formattedDay}`;
}

export const mapPrefilledData = (prefilledData: InvoiceInfoType) => {
  const prefilledFormData: NewBillFormData = {
    employeeName: prefilledData.name ?? '',
    employeeContact: prefilledData.email ?? '',
    invoiceNumber: prefilledData.invoiceNo ?? '',
    invoiceDate: formatDateString(prefilledData.invoiceDate || '00/00/0000'),
    billDueDate: formatDateString(
      prefilledData.invoiceDate || '00/00/0000',
      true,
    ),
    quickBookLocation: prefilledData.location ?? '',
    memo: prefilledData.memo ?? '',
    invoiceTotal: prefilledData.bill[0].amount,
    bills: [
      {
        amount: prefilledData.bill[0].amount,
        quickbookDescription: 'Travelling Hotel Rent',
        category: 'Travel',
        class: 'Rent',
        customJob: 'Manager',
        id: 1,
      },
    ],
  };
  return prefilledFormData;
};

function generateRandom10DigitNumber() {
  const min = 1000000000;
  const max = 9999999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function mapBillData(data: NewBillFormData, user_id: number) {
  const {
    employeeName,
    invoiceNumber,
    invoiceDate,
    billDueDate,
    invoiceTotal,
  } = data;

  const account_number: string = generateRandom10DigitNumber().toString();
  const status: string = 'Pending';

  const mappedData: MappedBillData = {
    invoiceDate: invoiceDate,
    invoiceNumber: invoiceNumber,
    dueDate: billDueDate,
    amount: invoiceTotal,
    accountNumber: account_number,
    status: status,
    userId: user_id,
    employee: { name: employeeName, date: invoiceDate },
    transactionDate: invoiceDate,
  };

  return mappedData;
}
