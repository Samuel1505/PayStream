import type { FC } from 'react';
import { Typography, Box } from '@mui/material';
import CaseUseCard from './CaseUseCard';

const CaseUses: FC = () => {
  const caseUses = [
    'Tech Startup',
    'Remote Team',
    'Government & Civil Service Agencies',
    'Logistics & Delivery Platforms',
    'Freelance Platform',
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
            mb: 8,
          }}
        >
          Case uses
        </Typography>

        {/* Asymmetric Grid Layout */}
        <Box className="flex flex-col gap-6">
          {/* First Row - 2 cards */}
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CaseUseCard title={caseUses[0]} />
            <CaseUseCard title={caseUses[1]} />
          </Box>

          {/* Second Row - 1 wider card centered */}
          <Box className="flex justify-center">
            <Box sx={{ width: { xs: '100%', md: '66.666%' } }}>
              <CaseUseCard title={caseUses[2]} />
            </Box>
          </Box>

          {/* Third Row - 2 cards */}
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CaseUseCard title={caseUses[3]} />
            <CaseUseCard title={caseUses[4]} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CaseUses;