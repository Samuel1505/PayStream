import type { FC } from 'react';
import { Card, CardContent, Typography, Box, List, ListItem, Link } from '@mui/material';
import { formatTimestamp } from '../../utils/formatters';
import type { ActivityItem } from '../../types/dashboard';

interface ActivityFeedProps {
  activities: ActivityItem[];
  onViewAll: () => void;
}

const ActivityFeed: FC<ActivityFeedProps> = ({ activities, onViewAll }) => {
  return (
    <Card
      sx={{
        background: 'rgba(26, 26, 26, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        p: 3,
        height: '100%',
      }}
    >
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
        <Box className="flex justify-between items-center mb-4">
          <Typography
            variant="h3"
            sx={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: '#FFFFFF',
            }}
          >
            Recent Activity
          </Typography>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onViewAll();
            }}
            sx={{
              color: '#E91E8C',
              textDecoration: 'none',
              fontSize: '0.875rem',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            View all
          </Link>
        </Box>

        <List sx={{ p: 0 }}>
          {activities.map((activity, index) => (
            <ListItem
              key={activity.id}
              sx={{
                p: 2,
                mb: index < activities.length - 1 ? 2 : 0,
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '8px',
                display: 'flex',
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'rgba(233, 30, 140, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Typography sx={{ color: '#E91E8C', fontSize: '1.25rem' }}>
                  {activity.type === 'loan_payment_received' ? '↓' : '↑'}
                </Typography>
              </Box>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    color: '#FFFFFF',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    mb: 0.5,
                  }}
                >
                  {activity.title}
                </Typography>
                <Typography
                  sx={{
                    color: '#B0B0B0',
                    fontSize: '0.875rem',
                  }}
                >
                  {activity.description}
                </Typography>
                <Typography
                  sx={{
                    color: '#808080',
                    fontSize: '0.75rem',
                    mt: 0.5,
                  }}
                >
                  {formatTimestamp(activity.timestamp)}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;