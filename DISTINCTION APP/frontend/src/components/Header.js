import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Badge, Avatar } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';

function Header({ onOpenMessages, onOpenNotifications }) {
  // Données fictives pour le badge
  const unreadMessages = 3;
  const unreadNotifications = 5;

  return (
    <AppBar position="static" elevation={0} color="inherit" sx={{ borderBottom: '1px solid #e0e0e0', bgcolor: 'background.paper' }}>
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 64 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Logo" sx={{ width: 40, height: 40, bgcolor: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1, color: 'primary.main' }}>
            DISTINCTION APP
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="inherit" onClick={onOpenMessages}>
            <Badge badgeContent={unreadMessages} color="error">
              <MailIcon fontSize="medium" />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={onOpenNotifications}>
            <Badge badgeContent={unreadNotifications} color="error">
              <NotificationsIcon fontSize="medium" />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header; 