'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Stack } from '@mui/material';
import { useAccount } from '@starknet-react/core';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import MetricCard from '../../components/dashboard/MetricCard';
import ActivityFeed from '../../components/dashboard/ActivityFeed';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { mockStore, mockQuery } from '../../data/dashboardMockData';
import { formatCurrency } from '../../utils/formatters';

export default function DashboardPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    console.log('Dashboard - Connected:', isConnected);
    console.log('Dashboard - Address:', address);
    
    // Optional: Redirect to home if not connected
    // if (!isConnected) {
    //   router.push('/');
    // }
  }, [isConnected, address, router]);

  const handleViewAllActivities = () => {
    console.log('View all activities');
  };

  return (
    <DashboardLayout>
      <DashboardHeader />

      {/* First row of metrics */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 3 }}>
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
            label="Total Employers"
            value={mockStore.totalEmployers}
            icon={<BusinessOutlinedIcon sx={{ fontSize: 24, color: '#FFFFFF' }} />}
            iconColor="rgba(155, 89, 182, 0.2)"
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

      {/* Second row - Activity feed and additional metrics */}
      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
        <Box sx={{ flex: 2 }}>
          <ActivityFeed 
            activities={mockQuery.recentActivities} 
            onViewAll={handleViewAllActivities}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Stack spacing={3}>
            <MetricCard
              label="Salary Advanced"
              value={mockStore.salaryAdvanced}
              icon={<DescriptionOutlinedIcon sx={{ fontSize: 24, color: '#FFFFFF' }} />}
              iconColor="rgba(155, 89, 182, 0.2)"
              showArrow
            />
            <MetricCard
              label="Pending Payroll Volume"
              value={`$${formatCurrency(mockStore.pendingPayrollVolume)}`}
              icon={<AttachMoneyOutlinedIcon sx={{ fontSize: 24, color: '#0A0A0A' }} />}
              iconColor="rgba(255, 215, 0, 0.8)"
            />
          </Stack>
        </Box>
      </Stack>
    </DashboardLayout>
  );
}