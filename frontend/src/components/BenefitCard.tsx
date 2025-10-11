import type { FC } from 'react';
import { Card, CardContent, Typography, Box, Link } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface BenefitCardProps {
  title: string;
  description: string;
  borderGradient: string;
}

const BenefitCard: FC<BenefitCardProps> = ({ title, description, borderGradient }) => {
  return (
    <Card
      sx={{
        background: 'rgba(26, 26, 26, 0.8)',
        borderRadius: '16px',
        p: 0.5,
        position: 'relative',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          '&::before': {
            opacity: 1,
          },
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: '16px',
          padding: '2px',
          background: borderGradient,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: 0.8,
          transition: 'opacity 0.3s ease',
        },
      }}
    >
      <Box
        sx={{
          background: '#1A1A1A',
          borderRadius: '14px',
          p: 4,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardContent sx={{ p: 0, flex: 1, display: 'flex', flexDirection: 'column', '&:last-child': { pb: 0 } }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: '1.25rem',
              fontWeight: 600,
              mb: 2,
              color: '#FFFFFF',
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: '#B0B0B0',
              lineHeight: 1.7,
              mb: 4,
              flex: 1,
            }}
          >
            {description}
          </Typography>

          <Link
            href="#"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              color: '#FFFFFF',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: 500,
              transition: 'all 0.3s ease',
              '&:hover': {
                gap: 1.5,
                color: '#FFD700',
              },
            }}
          >
            Explore now
            <ArrowForwardIcon sx={{ fontSize: 18 }} />
          </Link>
        </CardContent>
      </Box>
    </Card>
  );
};

export default BenefitCard;