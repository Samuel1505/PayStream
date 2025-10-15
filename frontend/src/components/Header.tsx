'use client';

import type { FC } from 'react';
import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, Box, Typography } from '@mui/material';
import { useAccount, useConnect, useDisconnect } from '@starknet-react/core';

const Header: FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnectClick = () => {
    if (isConnected) {
      disconnect();
    } else {
      setOpenModal(true);
    }
  };

  const handleWalletSelect = (connector: any) => {
    connect({ connector });
    setOpenModal(false);
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold" style={{ 
          background: 'linear-gradient(135deg, #E91E8C 0%, #9B59B6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          PayStream
        </div>
        
        <Button
          variant="contained"
          onClick={handleConnectClick}
          sx={{
            backgroundColor: '#FFFFFF',
            color: '#0A0A0A',
            borderRadius: '24px',
            px: 4,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '1rem',
            '&:hover': {
              backgroundColor: '#F0F0F0',
            },
          }}
        >
          {isConnected ? formatAddress(address!) : 'Connect Wallet'}
        </Button>
      </header>

      <Dialog 
        open={openModal} 
        onClose={() => setOpenModal(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            background: '#1A1A1A',
            color: '#FFFFFF',
          }
        }}
      >
        <DialogTitle sx={{ 
          textAlign: 'center', 
          fontWeight: 700,
          fontSize: '1.5rem',
          pb: 1
        }}>
          Connect Wallet
        </DialogTitle>
        
        <DialogContent sx={{ pb: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            {connectors.map((connector) => (
              <Button
                key={connector.id}
                onClick={() => handleWalletSelect(connector)}
                variant="outlined"
                sx={{
                  borderRadius: '12px',
                  py: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderColor: '#E91E8C',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  '&:hover': {
                    borderColor: '#9B59B6',
                    backgroundColor: 'rgba(233, 30, 140, 0.1)',
                  },
                }}
              >
                {connector.id === 'argentX' && (
                  <Box 
                    component="span" 
                    sx={{ 
                      width: 24, 
                      height: 24, 
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #FF875B 0%, #FF5C00 100%)'
                    }} 
                  />
                )}
                {connector.id === 'braavos' && (
                  <Box 
                    component="span" 
                    sx={{ 
                      width: 24, 
                      height: 24, 
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
                    }} 
                  />
                )}
                {connector.name}
              </Button>
            ))}
          </Box>
          
          <Typography 
            variant="body2" 
            sx={{ 
              textAlign: 'center', 
              mt: 3, 
              color: '#888',
              fontSize: '0.875rem'
            }}
          >
            By connecting, you agree to our Terms of Service
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;