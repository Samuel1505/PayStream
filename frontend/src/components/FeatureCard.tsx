import type { FC, ReactNode } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard: FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <Card
      className="glass-card"
      sx={{
        background: 'rgba(26, 26, 26, 0.6)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        p: 4,
        height: '100%',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(233, 30, 140, 0.15)',
        },
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box className="flex justify-center mb-6">
          {icon}
        </Box>
        
        <Typography
          variant="h3"
          sx={{
            fontSize: '1.5rem',
            fontWeight: 600,
            mb: 2,
            textAlign: 'center',
          }}
        >
          {title}
        </Typography>
        
        <Typography
          variant="body2"
          sx={{
            color: '#B0B0B0',
            textAlign: 'center',
            lineHeight: 1.7,
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;