import type { FC } from 'react';
import { Typography, Box, Stack } from '@mui/material';
import DeviceHubOutlinedIcon from '@mui/icons-material/DeviceHubOutlined';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import FeatureCard from './FeatureCard';

const KeyFeatures: FC = () => {
  const features = [
    {
      icon: (
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #9B59B6 0%, #E91E8C 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <DeviceHubOutlinedIcon sx={{ fontSize: 40, color: '#FFFFFF' }} />
        </Box>
      ),
      title: 'Seamless Integration',
      description:
        'Easily integrate PayRoll into your existing payroll system with support for leading HR and accounting tools.',
    },
    {
      icon: (
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFD700 0%, #4A90E2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <PriceChangeOutlinedIcon sx={{ fontSize: 40, color: '#0A0A0A' }} />
        </Box>
      ),
      title: 'Low Transaction Fee',
      description:
        'Enjoy minimal processing costs and maximize savings with our efficient wallet-to-wallet systems.',
    },
    {
      icon: (
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #9B59B6 0%, #FFD700 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LanguageOutlinedIcon sx={{ fontSize: 40, color: '#FFFFFF' }} />
        </Box>
      ),
      title: 'Global Accessibility',
      description:
        'Pay employees across borders without the hassle of traditional banks or intermediaries.',
    },
  ];

  return (
    <Box
      className="py-24 px-8"
      sx={{
        background: 'linear-gradient(180deg, #1A3A1A 0%, #0A0A0A 100%)',
      }}
    >
      <Box className="max-w-7xl mx-auto">
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 700,
            textAlign: 'center',
            mb: 2,
          }}
        >
          Key Features
        </Typography>

        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            color: '#B0B0B0',
            mb: 8,
            maxWidth: '600px',
            mx: 'auto',
          }}
        >
          PayRoll is designed and enhance your payroll process, offering benefit to both employer and employees
        </Typography>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          className="justify-center items-stretch"
        >
          {features.map((feature, index) => (
            <Box key={index} sx={{ flex: 1, maxWidth: { md: '400px' } }}>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default KeyFeatures;