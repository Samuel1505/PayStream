import type { FC } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface CaseUseCardProps {
  title: string;
}

const CaseUseCard: FC<CaseUseCardProps> = ({ title }) => {
  return (
    <Card
      sx={{
        background: 'rgba(26, 26, 26, 0.8)',
        border: '2px solid #00FF00',
        borderRadius: '12px',
        p: 2.5,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0, 255, 0, 0.2)',
          borderColor: '#00FF00',
        },
      }}
    >
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
        <Box className="flex items-center gap-3">
          <CheckCircleOutlineIcon 
            sx={{ 
              color: '#00FF00',
              fontSize: 28,
            }} 
          />
          <Typography
            variant="body1"
            sx={{
              color: '#FFFFFF',
              fontWeight: 500,
              fontSize: '1rem',
            }}
          >
            {title}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CaseUseCard;