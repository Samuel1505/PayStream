import type { FC } from 'react';
import { Box, Button } from '@mui/material';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import { PaymentTab } from '../../types/payment';

interface PaymentTabsProps {
  selectedTab: PaymentTab;
  onTabChange: (tab: PaymentTab) => void;
}

const PaymentTabs: FC<PaymentTabsProps> = ({ selectedTab, onTabChange }) => {
  return (
    <Box className="flex gap-4 mb-6">
      <Button
        startIcon={<CreditCardOutlinedIcon />}
        onClick={() => onTabChange(PaymentTab.PAYMENT)}
        sx={{
          backgroundColor: selectedTab === PaymentTab.PAYMENT ? '#1A1A1A' : 'transparent',
          color: '#FFFFFF',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          px: 3,
          py: 1.5,
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.95rem',
          '&:hover': {
            backgroundColor: selectedTab === PaymentTab.PAYMENT ? '#1A1A1A' : 'rgba(255, 255, 255, 0.05)',
          },
        }}
      >
        Payment
      </Button>

      <Button
        startIcon={<ScheduleOutlinedIcon />}
        onClick={() => onTabChange(PaymentTab.SCHEDULED_PAYMENT)}
        sx={{
          backgroundColor: selectedTab === PaymentTab.SCHEDULED_PAYMENT ? '#1A1A1A' : 'transparent',
          color: '#FFFFFF',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          px: 3,
          py: 1.5,
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.95rem',
          '&:hover': {
            backgroundColor: selectedTab === PaymentTab.SCHEDULED_PAYMENT ? '#1A1A1A' : 'rgba(255, 255, 255, 0.05)',
          },
        }}
      >
        Payment
      </Button>
    </Box>
  );
};

export default PaymentTabs;