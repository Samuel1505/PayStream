// Enum for navigation menu items
export enum NavigationItem {
  OVERVIEW = 'overview',
  PAYMENT = 'payment',
  RECIPIENT = 'recipient',
  LEAVE_MANAGEMENT = 'leave_management',
  SETTING = 'setting',
}

// Enum for activity types
export enum ActivityType {
  LOAN_PAYMENT_RECEIVED = 'loan_payment_received',
  LOAN_ISSUED = 'loan_issued',
}

// Types for dashboard data
export interface MetricCardData {
  label: string;
  value: number | string;
  icon: string;
  iconColor: string;
  currency?: string;
}

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: Date;
  amount?: number;
}

// Props types
export interface DashboardProps {
  currentPage: NavigationItem;
}

export interface SidebarProps {
  currentPage: NavigationItem;
  onNavigate: (page: NavigationItem) => void;
}

export interface MetricCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  iconColor: string;
  currency?: string;
  showArrow?: boolean;
}

export interface ActivityFeedProps {
  activities: ActivityItem[];
  onViewAll: () => void;
}

// Store types
export interface DashboardStore {
  walletBalance: number;
  totalEmployers: number;
  activeUsers: number;
  salaryAdvanced: number;
  pendingPayrollVolume: number;
  walletAddress: string;
}

// Query types
export interface DashboardQuery {
  recentActivities: ActivityItem[];
}