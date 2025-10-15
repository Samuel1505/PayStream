'use client';

import type { FC } from 'react';
import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useAccount, useDisconnect } from '@starknet-react/core';
import { formatWalletAddress } from '../../utils/formatters';
import CreateRecipientModal from './CreateRecipientModal';

const DashboardHeader: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleDisconnect = () => {
    disconnect();
  };

  // Format Starknet address
  const formatAddress = (addr: string) => {
    if (!addr) return 'Not Connected';
    // Handle both short and long Starknet addresses
    if (addr.length < 10) return addr;
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Debug logs
  console.log('DashboardHeader - isConnected:', isConnected);
  console.log('DashboardHeader - address:', address);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 2,
          mb: 4,
        }}
      >
        <Button
          variant="contained"
          onClick={handleOpenModal}
          sx={{
            backgroundColor: '#FFFFFF',
            color: '#0A0A0A',
            borderRadius: '8px',
            px: 3,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
            '&:hover': {
              backgroundColor: '#F0F0F0',
            },
          }}
        >
          Create Participants
        </Button>

        <Button
          variant="outlined"
          onClick={isConnected ? handleDisconnect : undefined}
          sx={{
            borderColor: 'rgba(255, 255, 255, 0.2)',
            color: '#FFFFFF',
            borderRadius: '8px',
            px: 3,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.95rem',
            cursor: isConnected ? 'pointer' : 'default',
            '&:hover': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
              background: isConnected ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
            },
          }}
        >
          {address ? formatAddress(address) : 'Not Connected'}
        </Button>
      </Box>

      <CreateRecipientModal open={modalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default DashboardHeader;