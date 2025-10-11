import type { FC } from 'react';
import { Typography, Box, Stack } from '@mui/material';
import Image from 'next/image';
import FeatureCard from './FeatureCard';

const KeyFeatures: FC = () => {
  const features = [
    {
      icon: (
        <Box
          sx={{
            width: 80,
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Image
            src="/seamlessINT.png"
            alt="Seamless Integration"
            width={80}
            height={80}
            style={{ objectFit: 'cover' }}
          />
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Image
            src="/lowTransaction.png"
            alt="Low Transaction Fee"
            width={80}
            height={80}
            style={{ objectFit: 'cover' }}
          />
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Image
            src="/GlobalAccess.png"
            alt="Global Accessibility"
            width={80}
            height={80}
            style={{ objectFit: 'cover' }}
          />
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