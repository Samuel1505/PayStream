'use client';

import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import { NavigationItem } from '../../types/dashboard';

interface DashboardLayoutProps {
  children: ReactNode;
  currentPage?: NavigationItem;
}

const DRAWER_WIDTH = 240;

const DashboardLayout: FC<DashboardLayoutProps> = ({ 
  children, 
  currentPage = NavigationItem.OVERVIEW 
}) => {
  const [selectedPage, setSelectedPage] = useState<NavigationItem>(currentPage);

  const handleNavigate = (page: NavigationItem) => {
    setSelectedPage(page);
    // In a real app, this would trigger routing
    console.log('Navigate to:', page);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#0A0A0A' }}>
      <Sidebar currentPage={selectedPage} onNavigate={handleNavigate} />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          ml: `${DRAWER_WIDTH}px`,
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;