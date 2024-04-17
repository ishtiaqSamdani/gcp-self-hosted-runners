import { DropDownItem } from '../components/organisms/PaymentDropdown';
import SettingsIcon from '../../public/assets/icons/settings.svg';
import LogoutIcon from '../../public/assets/icons/log_out.svg';
import {
  DraftType,
  EACH_PAYMENT_TYPE,
  EachTransactionType,
  QuickbookCategoriesType,
  ReportingDataType,
  ActionItemType,
  RampOptionType,
} from './types';
import theme from '../theme';

export const MERCHANT_RULE_HEAD = 'Save time with a merchant Rule';
export const MERCHANT_RULE_DESCRIPTION =
  'Save “Travel as the default Quickbooks category for all the future and unsynced transactions from “Lyft”.';
export const CHECKBOX_CLICKED = 'checkbox clicked';
export const TYPOGRAPHY = 'typography';
export const SUCCESS_MESSAGE = 'You have been successfully logged out';
export const CLICK = 'Click';
export const HERE = 'here';
export const TO_LOGIN_AGAIN = 'to login again';
export const MERCHANT_RULES = 'Merchant rules';
export const CATEGORY_RULES = 'Category rules';
export const MISSING_ITEMS = 'Missing items';
export const COUNTERS_HEADINGS: {
  counterName: string;
}[] = [
  {
    counterName: MISSING_ITEMS,
  },
  {
    counterName: MERCHANT_RULES,
  },
  {
    counterName: CATEGORY_RULES,
  },
  {
    counterName: 'Department rules',
  },
  {
    counterName: 'Location rules',
  },
];
export const ENTER_RAMP_CATEGORY = 'Enter Ramp category';
export const RAMP_CATEGORY = 'Ramp category';
export const SEARCH_TIPS = 'Search tips';
export const SEARCH_HEADER_TEXT = 'Show all results for ';
export const TRANSACTIONS = 'TRANSACTIONS';
export const SEARCH_COMPONENT_PLACEHOLDER = 'Search cards';
export const ALL_CARDS_BOX_TEXT = 'All cards';
export const SEARCH_ITEM_CLICK_TEXT = 'search item clicked';
export const REVIEW = 'Review';
export const BUTTON_CLICKED = 'button clicked';
export const CONTINUE = 'Continue';
export const CREATE_CATEGORY_RULE = 'Create category rule';
export const CREATE_RULE = 'Create rule';
export const SYNC_HISTORY = 'Sync history';
export const ICON_CLICKED = 'Icon clicked';
export const EMAIL_PLACEHOLDER = 'orders@supertodo.in';
export const RAMP_CATEGORY_PLACEHOLDER = 'Enter Ramp category';
export const SEARCH_CARDS = 'Search cards';
export const MY_RAMP_OPTIONS: RampOptionType[] = [
  {
    label: 'Create Ramp category',
    onClick: () => {
      console.log('clicked create ramp category !');
    },
  },
  {
    label: 'View Ramp category',
    onClick: () => {
      console.log('clicked view ramp category !');
    },
  },
  {
    label: 'Delete Ramp category',
    onClick: () => {
      console.log('clicked delete ramp category !');
    },
  },
];
export const ACTION_ITEMS: ActionItemType[] = [
  {
    label: 'Settings',
    icon: SettingsIcon,
    alt: 'settings-icon',
    onClick: () => {
      console.log('clicked on settings !');
    },
  },
  {
    label: 'Log out',
    icon: LogoutIcon,
    alt: 'logout-icon',
    onClick: () => {
      console.log('clicked on logout !');
    },
  },
];
export const MY_RAMP_HEAD = 'My Ramp';
export const CANCEL = 'Cancel';
export const MERCHANT_RULE_TEXT_LINE1 =
  'Set a default QuickBooks Category for ';
export const MERCHANT_RULE_TEXT_LINE2 =
  '. This rule will be applied automatically to all unsynced and future transactions from ';
export const CREATE_MERCHANT_RULE = 'Create merchant rule';
export const POTENTIAL_SAVINGS = 'Potential Savings';
export const GO_TO_PARTNER_REWARD = 'Go to partner reward';
export const REPORTING_DATA: ReportingDataType[] = [
  {
    id: 1,
    heading: 'Partner reward found',
    textContent:
      'You are paying for Amazon Web Services - leverage our partnership',
    amount: '$5,000.00',
  },
  {
    id: 2,
    heading: 'Lower pricing plan found',
    textContent:
      'Lower your annual cost for Asana by switching to an annual plan.',
    amount: '$250.00',
  },
  {
    id: 3,
    heading: 'Lower pricing plan found',
    textContent:
      'Lower your annual cost for Asana by switching to an annual plan.',
    amount: '$430.00',
  },
  {
    id: 4,
    heading: 'Lower pricing plan found',
    textContent:
      'Lower your annual cost for Asana by switching to an annual plan.',
    amount: '$250.00',
  },
];
export const RAMP_CHANGED = 'Ramp changed';
export const AIRLINE = 'Airline';
export const FUEL_AND_GAS = 'Fuel and Gas';
export const SAVE_TIME_UPLOADING_INVOICE = 'Save time with uploading invoice';
export const SKIP_PREFILLING_CONTENT =
  'Upload an invoice on the right and Ramp will read the invoice and prefill the bill for you. Or alternatively, do it the old fashioned way :';
export const SKIP_PREFILLING = 'Skip Prefilling';
export const QUICKBOOKS_CATEGORY_SELECT_PLACEHOLDER = 'Choose One';
export const QUICKBOOKS_CATEGORY_SELECT_OPTIONS = [
  'Expense',
  'Travel',
  'Travel Meals',
  'Hotels',
  'Automobile and Fuel',
  'Dues & Subscriptions',
];
export const TAB_NAMES: string[] = ['Reimbursement', 'Accounting'];
export const REIMBURSMENTS_DROPDOWN_OPTIONS: string[] = ['Drafts', 'Payments'];
export const REIMBURSEMENT = 'Reimbursement';
export const SEARCH_AND_FILTER = 'Search & filter';
export const PAYMENT_TYPES = 'Payment types';
export const DATE_PICKER_RANGE = 'May28-Jun3';
export const DAILY = 'Daily';
export const CHOOSE_ONE = 'Choose One';
export const SYNC = 'Sync';
export const VIRTUAL_7007 = 'Virtual 7007';
export const QUICKBOOK_CATEGORIES: QuickbookCategoriesType[] = [
  {
    name: 'Travel',
    id: 1,
  },
  {
    name: 'Expense',
    id: 2,
  },
  {
    name: 'Travel Meals',
    id: 3,
  },
  {
    name: 'Hotels',
    id: 4,
  },
  {
    name: 'Automobile and Fuel',
    id: 5,
  },
  {
    name: 'Dues & Subscriptions',
    id: 6,
  },
];
export const MAKE_READY = 'Make ready';
export const TRANSACTION_DATA: EachTransactionType[] = [
  {
    id: 1,
    vendor: {
      id: 1,
      shortName: 'shop123',
      displayName: 'Lyft',
    },
    amount: '$42,000',
    date: new Date('04-04-2004'),
    employee: { id: 1, name: 'David' },
    receipt: '#200257',
    memo: '21-00006',
    quickBook: { id: 1, name: 'Travel' },
  },
  {
    id: 2,
    vendor: {
      id: 1,
      shortName: 'shop123',
      displayName: 'Lyft',
    },
    amount: '$42,000',
    date: new Date('04-04-2004'),
    employee: { id: 1, name: 'David' },
    receipt: '#200257',
    memo: '21-00006',
    quickBook: null,
  },
];
export const ACH = 'ACH';
export const SCHEDULED = 'Scheduled';
export const PAYMENT_DATA: EACH_PAYMENT_TYPE[] = [
  {
    id: 1,
    amount: '$2864.50',
    paymentDate: new Date('10-02-2024'),
    employee: { id: 1, name: 'Julie Mendez' },
    dueDate: new Date('10-02-2024'),
    invoiceDate: new Date('10-02-2024'),
  },
  {
    id: 2,
    amount: '$2864.50',
    paymentDate: new Date('10-02-2024'),
    employee: { id: 1, name: 'Jimmy Hardy' },
    dueDate: new Date('10-02-2024'),
    invoiceDate: new Date('10-02-2024'),
  },
  {
    id: 3,
    amount: '$2864.50',
    paymentDate: new Date('10-02-2024'),
    employee: { id: 1, name: 'Elena Wilkins' },
    dueDate: new Date('10-02-2024'),
    invoiceDate: new Date('10-02-2024'),
  },
  {
    id: 4,
    amount: '$2864.50',
    paymentDate: new Date('10-02-2024'),
    employee: { id: 1, name: 'Allan Blair' },
    dueDate: new Date('10-02-2024'),
    invoiceDate: new Date('10-02-2024'),
  },
  {
    id: 5,
    amount: '$2864.50',
    paymentDate: new Date('10-02-2024'),
    employee: { id: 1, name: 'Loretta Jackson' },
    dueDate: new Date('10-02-2024'),
    invoiceDate: new Date('10-02-2024'),
  },
  {
    id: 6,
    amount: '$2864.50',
    paymentDate: new Date('10-02-2024'),
    employee: { id: 1, name: 'Meredith Carlson' },
    dueDate: new Date('10-02-2024'),
    invoiceDate: new Date('10-02-2024'),
  },
  {
    id: 7,
    amount: '$2864.50',
    paymentDate: new Date('10-02-2024'),
    employee: { id: 1, name: 'Wonder Woman' },
    dueDate: new Date('10-02-2024'),
    invoiceDate: new Date('10-02-2024'),
  },
];
export const QUICKBOOK_CATEGORY = 'Quickbooks category';
export const RAMP_CATEGORY_DATA = [
  'Airlines',
  'Fuel and Gas',
  'Saas / Software',
  'Advertising',
  'Shipping',
];
export const DROP_INVOICE = 'Drop your invoice or click here to upload';
export const RAMP = 'Ramp';
export const SIGNUP_PRE_TEXT = 'Don’t have an account?';
export const SIGNUP = 'Sign up';
export const SIGNIN_INNER_HEAD = 'Sign in to your account';
export const EMAIL = 'Email';
export const PASSWORD = 'Password';
export const SIGNIN_EMAIL_PLACEHOLDER = 'orders@supertodo.me';
export const SIGNIN_PASSWORD_PLACEHOLDER = 'password';
export const FORGOT_PASSWORD_TEXT = 'Forgot your password ?';
export const SIGNIN = 'Continue';
export const CHECKBOX_LABEL = 'Stay signed in for a week';
export const OR = 'OR';
export const GOOGLE_AUTH_SIGNIN_TEXT = 'Sign in with Google';
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const TRANSACTION_TABLE_HEAD = [
  'TRANSACTIONS',
  'AMOUNT',
  'DATE',
  'USER',
  'QUICKBOOKS CATEGORY',
  'RECEIPT',
  'MEMO',
  'SYNC',
];
export const DELETE = 'Delete';
export const CLEAR_FILTER = 'Clear filter';
export const FILTER = 'Filter';
export const CREATE_MERCHANT_RULE_BODY =
  'Set a default QuickBooks Category for "Lyft". This rule will be applied automatically to all unsynced and future transactions from "Lyft".';
export const UNSYNCED_TRANSACTIONS = 'unsynced transactions';
export const TRANSACTION_COUNT = 42;
export const DRAFTS_TABLE_HEADS = [
  'EMPLOYEES',
  'AMOUNT',
  'DUE DATE',
  'INVOICE DATE',
  'INVOICE NO.',
  'INVOICE',
  'ACCOUNT NO.',
  'NEXT STEP',
];
export const DOWNLOAD = 'Download';
export const NEXT_STEP = 'NEXT STEP';
export const DRAFTS = 'Drafts';
export const NEW_BILL = 'New bill';
export const RESULT_NO = 919;
export const RESULTS = ' results';
export const PREVIOUS = 'Previous';
export const NEXT = 'Next';
export const DRAFTS_DATA: DraftType[] = [
  {
    employee: {
      name: 'Marvin McKinney',
      date: 'May 16, 2005',
    },
    amount: 46000,
    dueDate: new Date('Apr 09, 2011'),
    invoiceDate: new Date('Apr 09, 2011'),
    invoiceNumber: '#526587',
    accountNumber: '5205896212',
    id: 1,
    status: 'drafted',
  },
  {
    employee: {
      name: 'Leslie Alexander',
      date: 'May 16, 2005',
    },
    amount: 46000,
    dueDate: new Date('Apr 09, 2011'),
    invoiceDate: new Date('Apr 09, 2011'),
    invoiceNumber: '#526587',
    accountNumber: '5205896212',
    id: 2,
    status: 'drafted',
  },
  {
    employee: {
      name: 'Ralph Edwards',
      date: 'May 16, 2005',
    },
    amount: 46000,
    dueDate: new Date('Apr 09, 2011'),
    invoiceDate: new Date('Apr 09, 2011'),
    invoiceNumber: '#526587',
    accountNumber: '5205896212',
    id: 3,
    status: 'drafted',
  },
];
export const WHOS_IT_FOR = 'Who`s it for ?';
export const EMPLOYEE_CONTACT = 'Employee contact';
export const VENDOR_CONTACT = 'Vendor contact';
export const INVOICE_NUMBER = 'Invoice Number';
export const WHAT_FOR = 'What for ?';
export const INVOICE_DATE = 'Invoice date';
export const BILL_DUE_DATE = 'Bill due date';
export const INVOICE_DATE_PLACEHOLDER = 'Invoice date';
export const BILL_DUE_DATE_PLACEHOLDER = 'Bill due date';
export const DATE = 'Date';
export const QUICKBOOKS_LOCATION = 'Quickbooks location';
export const MEMO = 'Memo';
export const LOCATION = 'Location';
export const NEW_VENDOR_TEXT = 'No previous payment to this vendor.';
export const INVOICE_TOTAL = 'Invoice total';
export const ADD_OTHER_LINE = 'Add another line';
export const AMOUNT = 'Amount';
export const QUICKBOOK_DESCRIPTION = 'Quickbook description';
export const CATEGORY = 'Category';
export const CLASS = 'Class';
export const CUSTOM_JOB = 'Custom/Job';
export const BILLABLE = 'Billable';
export const PAYMENT_TYPE = 'Payment type';
export const SELECT = 'Select';
export const PAYMENT_OPTIONS: DropDownItem[] = [
  {
    head: 'ACH (Direct deposit)',
    description:
      'Ramp will mail a check to your vendor’s mailing address. You will be debited once the check is cashed',
  },
  {
    head: 'Check by mail',
    description:
      'Ramp will mail a check to your vendor’s mailing address. You will be debited once the check is cashed',
  },
  {
    head: 'One-time virtual card',
    description:
      'Create a ramp virtual card for this bill. The card will expire once used. 1.5% cashback.',
  },
];
export const PAYMENT_DETAILS = 'Payment Details';
export const SEND_DATE = 'ACH send date';
export const DELIVERY_TIME = 'ACH delivery time';
export const WORKING_DAYS = '5 working days';
export const RECIEVE_DATE = 'Vendor recieve date';
export const PAY_FROM = 'Pay from account';
export const PAY_TO = 'Send payment to';
export const PAY_FROM_AC = 'Manual Account (1873)';
export const PAY_TO_AC = 'Gold Mining Oufitters (8532)';
export const APPROVED_BY = 'To be approved by';
export const AUTO_APPROVED = 'Auto approved';
export const MOCK_DATE = '09/12/23';
export const CREATE_RAMP_CATEGORY = 'Create Ramp category';
export const RAMP_CATEGORIES = 'Ramp categories';
export const ADD_NEW = 'Add new';
export const NO_EMPTY_CATEGORIES = 'No non-empty categories to create.';
export const RAMP_CATEGORY_ERROR = 'Error creating one or more ramp categories';
export const RAMP_CATEGORY_DESCRIPTION =
  'Ramp automatically categorizes your card transactions. You can set a default QuickBooks Category for each Ramp Category below.';
export const PAYMENTS = 'Payments';
export const RESULT_LENGTH = 900;
export const PAYMENT_TABLE_HEADERS = [
  'EMPLOYEE/AMOUNT',
  'PAYMENT STATUS',
  'PAYMENT DATE',
  'DUE DATE',
  'INVOICE DATE',
];
export const CATEGORY_RULE_TEXT =
  'Ramp automatically categorizes your card transactions. You can set a default QuickBooks Category for each Ramp Category below.';
export const ACTIVE_RULES = 'Active rules';
export const RECENT_CATEGORIES = 'Recent categories';
export const SETUP_GUIDE = 'Setup guide';
export const TAB_HEADINGS: string[] = [
  'Insights',
  'Transaction',
  'Cards',
  'Company',
  'Bill pay',
  'Vendors',
  'Reimbursement',
  'Accounting',
];
export const RAMP_PERKS = 'Ramp perks';
export const NAVIGATE_DASHBOARD = '/';
export const NAVIGATE_NEW_BILL = '/new-bill';
export const NAVIGATE_ACCOUNTING = '/accounting';
export const NAVIGATE_DRAFTS = '/drafts';
export const NAVIGATE_PAYMENTS = '/payments';
export const INSIGHTS = 'Insights';
export const INVALID_PDF_ERROR = 'Please select a valid PDF file.';
export const EMAIL_ID = 'Email id';
export const FULL_NAME = 'Full name';
export const SIGNUP_NAME_PLACEHOLDER = 'John doe';
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
export const EMAIL_HELPER_TEXT = 'Please enter valid Email';
export const PASSWORD_HELPER_TEXT =
  'Password should contain alpha numerics, atleast one special character and minimum length of 8 characters';
export const NAVIGATE_SIGNUP = '/signup';
export const APPROVE = 'Approve';
export const REJECT = 'Reject';
export const RAMP_CARDS = 'Ramp cards';
export const SETTINGS = 'Settings';
export const SCROLLBAR_STYLES = {
  '&::-webkit-scrollbar': {
    width: theme.spacing(2),
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'darkgrey',
    borderRadius: theme.spacing(2),
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'lightgrey',
    borderRadius: theme.spacing(2),
  },
};
export const REPORTING = 'Reporting';
export const NAME_REGEX = /^[A-Za-z ]+$/;
export const NAME_HELPER_TEXT = 'Please enter valid Name';
export const ALREADY_HAVE_AN_ACCOUNT = 'Already have an account?';
export const SIGNIN_BUTTON_TEXT = 'Sign in';
export const SIGN_UP_TEXT = 'Sign Up';
export const GOOGLE_AUTH_SIGNUP_TEXT = 'Sign up with Google';
export const RAMP_CONTEXT_ERROR = 'Ramp context not provided';
export const NAVIGATE_LOGIN = '/';
export const CONNECTION_TYPE = 'google-oauth2';
export const EMPLOYEE_NAME = 'Julie Mendez';
export const PREFILLING_SUCCESS =
  'Ramp has retrieved data from this invoice and prefilled this bill';
export const ONE_LAST_LOOK = 'One last look';
export const PAY = 'Pay';
export const TO = 'to';
export const PAYMENT_METHOD = 'Payment method';
export const SCHEDULED_DATE = 'Scheduled date';
export const ESTIMATED_ARRIVAL = 'Estimated arrival';
export const RANDOM_DATE = 'August 31 2024';
export const SEND_TO = 'Send to';
export const SEND_TO_VALUE = 'Gold Mining Outfitters (8532)';
export const ADDED_BY = 'Added by';
export const WITHDRAW_FROM = 'Withdraw from';
export const WITHDRAW_FROM_VALUE = 'Manual Account (1873)';
export const SAVING_ACCOUNT = 'Saving account -';
export const RANDOM_MONEY = '$477,776,213.09';
export const GET_STARTED = 'Get started';
export const CREATE_BILL = 'Create bill';
export const EMPTY_DATE = '00-00-0000';
export const SAVE_CHANGES = 'Save changes';
export const EDIT = 'Edit';
