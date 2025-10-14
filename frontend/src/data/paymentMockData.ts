import { PaymentTab, EmployeeGroup, PaymentSchedule } from '../types/payment';

// Mock data for payment page
export const mockStore = {
  walletBalance: 0.00,
  activeUsers: 0,
  selectedCurrency: 'STRK',
  totalAmount: 0.00,
  walletAddress: '0xj1234567890abcdef1234567890abcdef0bx',
};

export const mockQuery = {
  currencies: [
    { code: 'STRK', name: 'Starknet', icon: '/currency-strk.png' },
    { code: 'ETH', name: 'Ethereum', icon: '/currency-eth.png' },
  ],
};

export const mockRootProps = {
  selectedTab: PaymentTab.PAYMENT,
  selectedGroup: EmployeeGroup.ACTIVE,
  selectedSchedule: null as PaymentSchedule | null,
};