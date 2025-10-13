import type { FC, ReactNode } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface MetricCardProps {
  label: string;
  value: number | string;
  icon: ReactNode;
  iconColor: string;
  currency?: string;
  showArrow?: boolean;
}

const MetricCard: FC<MetricCardProps> = ({ 
  label, 
  value, 
  icon, 
  iconColor, 
  currency,
  showArrow = false 
}) => {
  return (
    <Card
      sx={{
        background: 'rgba(26, 26, 26, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        p: 2.5,
        height: '100%',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
      }}
    >
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
        <Box className="flex justify-between items-start mb-3">
          <Typography
            variant="body2"
            sx={{
              color: '#B0B0B0',
              fontSize: '0.875rem',
            }}
          >
            {label}
          </Typography>
          {showArrow && (
            <ArrowForwardIcon sx={{ fontSize: 20, color: '#B0B0B0' }} />
          )}
        </Box>

        <Box className="flex items-center justify-between">
          <Typography
            variant="h3"
            sx={{
              fontSize: '2rem',
              fontWeight: 600,
              color: '#FFFFFF',
            }}
          >
            {value}
            {currency && (
              <Typography
                component="span"
                sx={{
                  fontSize: '0.875rem',
                  color: '#B0B0B0',
                  ml: 1,
                }}
              >
                {currency}
              </Typography>
            )}
          </Typography>

          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '8px',
              background: iconColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MetricCard;