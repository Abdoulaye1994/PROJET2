import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import StoreIcon from '@mui/icons-material/Store';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0, mr: 4 }}>
          DISTINCTION
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/ventes"
            startIcon={<ShoppingCartIcon />}
          >
            Ventes
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/stocks"
            startIcon={<InventoryIcon />}
          >
            Stocks
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/clients"
            startIcon={<PeopleIcon />}
          >
            Clients
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/boutiques"
            startIcon={<StoreIcon />}
          >
            Boutiques
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/statistiques"
            startIcon={<BarChartIcon />}
          >
            Statistiques
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 