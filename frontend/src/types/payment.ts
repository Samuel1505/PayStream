// Enum for payment tabs
export enum PaymentTab {
  PAYMENT = 'payment',
  SCHEDULED_PAYMENT = 'scheduled_payment',
}

// Enum for employee groups
export enum EmployeeGroup {
  ALL_EMPLOYEES = 'all_employees',
  ACTIVE = 'active',
  ON_LEAVE = 'on_leave',
}

// Enum for payment schedule
export enum PaymentSchedule {
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

// Types for payment page
export interface PaymentMetrics {
  walletBalance: number;
  activeUsers: number;
}

export interface Currency {
  code: string;
  name: string;
  icon: string;
}

export interface PaymentFormData {
  selectedTab: PaymentTab;
  selectedGroup: EmployeeGroup;
  selectedCurrency: string;
  totalAmount: number;
  selectedSchedule: PaymentSchedule | null;
}

// Props types
export interface PaymentPageProps {
  metrics: PaymentMetrics;
}

export interface PaymentTabsProps {
  selectedTab: PaymentTab;
  onTabChange: (tab: PaymentTab) => void;
}

export interface PaymentFormProps {
  selectedGroup: EmployeeGroup;
  selectedCurrency: string;
  totalAmount: number;
  selectedSchedule: PaymentSchedule | null;
  onGroupChange: (group: EmployeeGroup) => void;
  onCurrencyChange: (currency: string) => void;
  onScheduleChange: (schedule: PaymentSchedule) => void;
}

// Store types
export interface PaymentStore {
  walletBalance: number;
  activeUsers: number;
  selectedCurrency: string;
  totalAmount: number;
}

// Query types
export interface PaymentQuery {
  currencies: Currency[];
}