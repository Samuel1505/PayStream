'use client';

import { useState } from 'react';
import { Box, Stack } from '@mui/material';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import DashboardHeader from '../../../components/dashboard/DashboardHeader';
import MetricCard from '../../../components/dashboard/MetricCard';
import PaymentTabs from '../../../components/payment/PaymentTabs';
import PaymentForm from '../../../components/payment/PaymentForm';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import { PaymentTab, EmployeeGroup, PaymentSchedule } from '../../../types/payment';
import { mockStore, mockRootProps } from '../../../data/paymentMockData';
import { formatCurrency } from '../../../utils/formatters';
import { NavigationItem } from '../../../types/dashboard';

export default function PaymentPage() {
  const [selectedTab, setSelectedTab] = useState<PaymentTab>(mockRootProps.selectedTab);
  const [selectedGroup, setSelectedGroup] = useState<EmployeeGroup>(mockRootProps.selectedGroup);
  const [selectedCurrency, setSelectedCurrency] = useState(mockStore.selectedCurrency);
  const [totalAmount] = useState(mockStore.totalAmount);
  const [selectedSchedule, setSelectedSchedule] = useState<PaymentSchedule | null>(
    mockRootProps.selectedSchedule
  );

  return (
    <DashboardLayout currentPage={NavigationItem.PAYMENT}>
      <DashboardHeader walletAddress={mockStore.walletAddress || '0xj...0bx'} />

      {/* Header Metrics */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
        <Box sx={{ flex: 1 }}>
          <MetricCard
            label="Treasury Wallet Balance"
            value={formatCurrency(mockStore.walletBalance)}
            icon={<AccountBalanceWalletOutlinedIcon sx={{ fontSize: 24, color: '#FFFFFF' }} />}
            iconColor="rgba(0, 255, 0, 0.2)"
            showArrow
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <MetricCard
            label="Active User"
            value={mockStore.activeUsers}
            icon={<PeopleOutlinedIcon sx={{ fontSize: 24, color: '#0A0A0A' }} />}
            iconColor="rgba(255, 215, 0, 0.8)"
          />
        </Box>
      </Stack>

      {/* Payment Tabs */}
      <PaymentTabs selectedTab={selectedTab} onTabChange={setSelectedTab} />

      {/* Payment Form */}
      <PaymentForm
        selectedGroup={selectedGroup}
        selectedCurrency={selectedCurrency}
        totalAmount={totalAmount}
        selectedSchedule={selectedSchedule}
        onGroupChange={setSelectedGroup}
        onCurrencyChange={setSelectedCurrency}
        onScheduleChange={setSelectedSchedule}
      />
    </DashboardLayout>
  );
}