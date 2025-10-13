import { NavigationItem, ActivityType } from '../types/dashboard';
import type { ActivityItem } from '../types/dashboard';

// Mock data for dashboard metrics
export const mockStore = {
  walletBalance: 0.00,
  totalEmployers: 0,
  activeUsers: 0,
  salaryAdvanced: 0,
  pendingPayrollVolume: 0.00,
  walletAddress: '0xj1234567890abcdef1234567890abcdef0bx',
};

// Mock data for recent activities

export const mockQuery = {
  recentActivities: [
    {
      id: '1',
      type: ActivityType.LOAN_PAYMENT_RECEIVED,
      title: 'Loan Payment received',
      description: '$300 received from loan ID 1458',
      timestamp: new Date(Date.now() - 30 * 60000),
      amount: 300,
    },
    {
      id: '2',
      type: ActivityType.LOAN_ISSUED,
      title: 'Loan Issued',
      description: 'loan ID 1457 issued to user',
      timestamp: new Date(Date.now() - 2 * 60 * 60000),
    },
  ] as ActivityItem[],
};

export const mockRootProps = {
  currentPage: NavigationItem.OVERVIEW,
};