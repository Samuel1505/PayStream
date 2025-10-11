import type { FC } from 'react';
import { Typography, Box, Stack } from '@mui/material';
import BenefitCard from './BenefitCard';

const Benefits: FC = () => {
  const benefits = [
    {
      title: 'Attract Top Talent',
      description:
        'Offer a modern, flexible payment option that appeals to tech-savvy professionals and freelancers worldwide.',
      borderGradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
    },
    {
      title: 'Reduce Operational Costs',
      description:
        'Minimize expenses associated with international transfers, currency conversion, and administrative overhead.',
      borderGradient: 'linear-gradient(135deg, #E91E8C 0%, #9B59B6 100%)',
    },
    {
      title: 'Gain Real-Time Insights',
      description:
        'Track payroll disbursements in real-time, monitor transaction statuses, and generate transparent financial reports.',
      borderGradient: 'linear-gradient(135deg, #9B59B6 0%, #4A90E2 100%)',
    },
  ];

  return (
    <Box
      className="py-24 px-8"
      sx={{
        background: '#0A0A0A',
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
          Benefits for Your Business
        </Typography>

        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            color: '#B0B0B0',
            mb: 8,
            maxWidth: '700px',
            mx: 'auto',
          }}
        >
          PayRoll empowers your business with efficient, transparent, and cost-effective payroll solutions.
        </Typography>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          className="justify-center items-stretch"
        >
          {benefits.map((benefit, index) => (
            <Box key={index} sx={{ flex: 1, maxWidth: { md: '400px' } }}>
              <BenefitCard
                title={benefit.title}
                description={benefit.description}
                borderGradient={benefit.borderGradient}
              />
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Benefits;