import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  Divider,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Collapse,
  Button
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import BarChartIcon from '@mui/icons-material/BarChart';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;
const drawerIconOnlyWidth = 72;

const menuItems = [
  { text: 'Tableau de bord', icon: <DashboardIcon />, path: '/' },
  { text: 'Ventes', icon: <ShoppingCartIcon />, path: '/ventes' },
  { text: 'Stocks', icon: <InventoryIcon />, path: '/stocks' },
  { text: 'Boutiques', icon: <StoreIcon />, path: '/boutiques' },
  { text: 'Boutique en ligne', icon: <ShoppingCartIcon />, path: '/boutique-en-ligne' },
  { text: 'Clients', icon: <PeopleIcon />, path: '/clients' },
  { text: 'Approvisionnement', icon: <ShoppingCartCheckoutIcon />, path: '/approvisionnement' },
  { text: 'Trésorerie', icon: <AccountBalanceWalletIcon />, path: '/tresorerie' },
  { text: 'Rapports', icon: <AnalyticsIcon />, path: '/rapports' },
  { text: 'Comptabilité', icon: <AccountBalanceIcon />, path: '/comptabilite' },
  { text: 'Paie', icon: <ReceiptLongIcon />, path: '/paie' },
  { text: 'Engagements', icon: <AssignmentIcon />, path: '/engagements' },
  { text: 'Contrôle de présence', icon: <PersonSearchIcon />, path: '/controle-presence' },
  { text: 'Atelier de production', icon: <ProductionQuantityLimitsIcon />, path: '/atelier-production' },
  { text: 'Utilisateurs', icon: <GroupIcon />, path: '/utilisateurs' },
  { text: 'Paramètres', icon: <SettingsIcon />, path: '/parametre' },
];

function Sidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const location = useLocation();

  const drawerContent = (
    <div>
      <Toolbar sx={{ justifyContent: 'center', py: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1, color: 'primary.main' }}>
          DISTINCTION
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            selected={location.pathname === item.path}
            sx={{
              borderRadius: 2,
              mx: 1,
              my: 0.5,
              bgcolor: location.pathname === item.path ? 'primary.light' : 'inherit',
              color: location.pathname === item.path ? 'primary.main' : 'inherit',
            }}
            onClick={() => {
              navigate(item.path);
              if (isMobile) setMobileOpen(false);
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box component="nav" sx={{ width: { md: isCollapsed ? drawerIconOnlyWidth : drawerWidth }, flexShrink: { md: 0 } }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={() => setMobileOpen(!mobileOpen)}
        sx={{ display: { md: 'none' } }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={isMobile ? () => setMobileOpen(false) : undefined}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: isCollapsed ? drawerIconOnlyWidth : drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: isCollapsed ? drawerIconOnlyWidth : drawerWidth }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1, color: 'primary.main' }}>
            DISTINCTION
          </Typography>
          <Button
            variant="text"
            onClick={() => setIsCollapsed(!isCollapsed)}
            sx={{
              display: { xs: 'none', md: 'block' },
              color: 'text.secondary'
            }}
          >
            {isCollapsed ? 'Expand' : 'Collapse'}
          </Button>
        </Box>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 2,
                mx: 1,
                my: 0.5,
                bgcolor: location.pathname === item.path ? 'primary.light' : 'inherit',
                color: location.pathname === item.path ? 'primary.main' : 'inherit',
                justifyContent: isCollapsed ? 'center' : 'flex-start',
              }}
              onClick={() => {
                navigate(item.path);
                if (isMobile) setMobileOpen(false);
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
              <Collapse in={!isCollapsed}>
                <ListItemText primary={item.text} />
              </Collapse>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

export default Sidebar;