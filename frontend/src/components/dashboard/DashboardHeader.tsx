'use client';

import type { FC } from 'react';
import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { formatWalletAddress } from '../../utils/formatters';
import CreateRecipientModal from './CreateRecipientModal';

interface DashboardHeaderProps {
  walletAddress: string;
}

const DashboardHeader: FC<DashboardHeaderProps> = ({ walletAddress }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

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
        sx={{
          borderColor: 'rgba(255, 255, 255, 0.2)',
          color: '#FFFFFF',
          borderRadius: '8px',
          px: 3,
          py: 1.5,
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.95rem',
          '&:hover': {
            borderColor: 'rgba(255, 255, 255, 0.3)',
            background: 'rgba(255, 255, 255, 0.05)',
          },
        }}
      >
        {formatWalletAddress(walletAddress)}
      </Button>
      </Box>

      <CreateRecipientModal open={modalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default DashboardHeader;