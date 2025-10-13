import type { FC } from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import { NavigationItem } from '../../types/dashboard';

interface SidebarProps {
  currentPage: NavigationItem;
  onNavigate: (page: NavigationItem) => void;
}

const DRAWER_WIDTH = 240;

const Sidebar: FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const navigationItems = [
    { id: NavigationItem.OVERVIEW, label: 'Overview', icon: <PollOutlinedIcon /> },
    { id: NavigationItem.PAYMENT, label: 'Payment', icon: <PaymentOutlinedIcon /> },
    { id: NavigationItem.RECIPIENT, label: 'Recipient', icon: <PeopleOutlineOutlinedIcon /> },
    { id: NavigationItem.LEAVE_MANAGEMENT, label: 'Leave Management', icon: <EventNoteOutlinedIcon /> },
    { id: NavigationItem.SETTING, label: 'Setting', icon: <SettingsOutlinedIcon /> },
  ];

  const bottomItems = [
    { label: 'Help Centre', icon: <HelpOutlineOutlinedIcon />, onClick: () => {} },
    { label: 'Contact us', icon: <MailOutlineOutlinedIcon />, onClick: () => {} },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          background: '#0A0A0A',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      <Box sx={{ p: 3, mb: 2 }}>
        <Typography
          variant="h3"
          sx={{
            fontSize: '1.5rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #E91E8C 0%, #9B59B6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          PayStream
        </Typography>
      </Box>

      <List sx={{ px: 2, flex: 1 }}>
        {navigationItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              selected={currentPage === item.id}
              onClick={() => onNavigate(item.id)}
              sx={{
                borderRadius: '8px',
                '&.Mui-selected': {
                  background: 'rgba(233, 30, 140, 0.15)',
                  '&:hover': {
                    background: 'rgba(233, 30, 140, 0.2)',
                  },
                },
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: currentPage === item.id ? '#E91E8C' : '#B0B0B0',
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  '& .MuiListItemText-primary': {
                    color: currentPage === item.id ? '#FFFFFF' : '#B0B0B0',
                    fontSize: '0.95rem',
                    fontWeight: currentPage === item.id ? 500 : 400,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', mx: 2 }} />

      <List sx={{ px: 2, pb: 3, pt: 2 }}>
        {bottomItems.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={item.onClick}
              sx={{
                borderRadius: '8px',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: '#B0B0B0',
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  '& .MuiListItemText-primary': {
                    color: '#B0B0B0',
                    fontSize: '0.95rem',
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;