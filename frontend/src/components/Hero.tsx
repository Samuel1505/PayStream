import type { FC } from 'react';
import { Typography, Box } from '@mui/material';

const Hero: FC = () => {
  return (
    <Box
      className="relative min-h-screen flex items-center justify-center px-8"
      sx={{
        background: 'linear-gradient(180deg, #0A0A0A 0%, #1A3A1A 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Decorative flowing curves */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="curve1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#4A90E2', stopOpacity: 0.8 }} />
            <stop offset="50%" style={{ stopColor: '#9B59B6', stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: '#FFD700', stopOpacity: 0.4 }} />
          </linearGradient>
          <linearGradient id="curve2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 0.6 }} />
            <stop offset="50%" style={{ stopColor: '#E91E8C', stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: '#4A90E2', stopOpacity: 0.4 }} />
          </linearGradient>
        </defs>
        
        <path
          d="M 0 300 Q 300 200 600 300 T 1200 300"
          stroke="url(#curve1)"
          strokeWidth="3"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M 0 500 Q 400 400 800 500 T 1200 500"
          stroke="url(#curve2)"
          strokeWidth="3"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M 200 100 Q 500 50 800 150 T 1200 200"
          stroke="url(#curve1)"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
        />
      </svg>

      {/* Content */}
      <Box className="relative z-10 text-center max-w-4xl mx-auto">
        <Typography
          variant="h1"
          sx={{
            fontFamily: '"Inter", sans-serif',
            fontSize: { xs: '2.5rem', md: '4rem', lg: '64px' },
            fontWeight: 700,
            mb: 3,
            lineHeight: '100%',
            letterSpacing: '0%',
            textAlign: 'center',
          }}
        >
          Revolutionize Your{' '}
          <span style={{ 
            color: '#E91E8C',
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            fontSize: 'inherit',
            lineHeight: '100%',
            letterSpacing: '0%',
          }}>PayRoll</span>
          <br />
          with <span style={{ color: '#FFD700' }}>Crypto</span>
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', md: '1.125rem' },
            color: '#B0B0B0',
            maxWidth: '700px',
            mx: 'auto',
            lineHeight: 1.8,
          }}
        >
          PayRoll offers a seamless, cost-effective for businesses to disburse salaries directly to
          employees' crypto wallets. Experience the future of PayRoll with real time tracking, low
          fees, and global accessibility
        </Typography>
      </Box>
    </Box>
  );
};

export default Hero;