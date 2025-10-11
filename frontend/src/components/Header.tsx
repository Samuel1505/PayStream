import type { FC } from 'react';
import { Button } from '@mui/material';

const Header: FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center">
      <div className="text-2xl font-bold" style={{ 
        background: 'linear-gradient(135deg, #E91E8C 0%, #9B59B6 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        PayRoll
      </div>
      
      <Button
        variant="contained"
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
        Button
      </Button>
    </header>
  );
};

export default Header;