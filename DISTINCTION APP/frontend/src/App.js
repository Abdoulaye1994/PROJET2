import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import Sidebar from './components/Sidebar';
import Ventes from './pages/Ventes';
import Stocks from './pages/Stocks';
import Clients from './pages/Clients';
import Boutiques from './pages/Boutiques';
import Personnel from './pages/Personnel';
import Statistiques from './pages/Statistiques';
import ClientDetails from './pages/ClientDetails';
import BoutiqueEnLigne from './pages/BoutiqueEnLigne';
import Utilisateurs from './pages/Utilisateurs';
import Rapports from './pages/Rapports';
import Approvisionnement from './pages/Approvisionnement';
import { CartProvider } from './context/CartContext';
import { PointsProvider } from './context/PointsContext';
import { UsersProvider } from './context/UsersContext';
import { TresorerieProvider } from './context/TresorerieContext';
import Tresorerie from './pages/Tresorerie';
import AtelierProduction from './pages/AtelierProduction';
import { BoutiquesProvider } from './context/BoutiquesContext';
import { ApprovisionnementProvider } from './context/ApprovisionnementContext';
import { PresenceProvider } from './context/PresenceContext';
import ControlePresence from './pages/ControlePresence';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Login from './pages/Login';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f7f9fb',
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <CartProvider>
            <PointsProvider>
              <UsersProvider>
                <TresorerieProvider>
                  <BoutiquesProvider>
                    <ApprovisionnementProvider>
                      <PresenceProvider>
                        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
                          <Sidebar />
                          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                            <Routes>
                              <Route path="/" element={<Statistiques />} />
                              <Route path="/ventes" element={<Ventes />} />
                              <Route path="/stocks" element={<Stocks />} />
                              <Route path="/clients" element={<Clients />} />
                              <Route path="/boutiques" element={<Boutiques />} />
                              <Route path="/clients/:id" element={<ClientDetails />} />
                              <Route path="/statistiques" element={<Statistiques />} />
                              <Route path="/rapports" element={<Rapports />} />
                              <Route path="/approvisionnement" element={<Approvisionnement />} />
                              <Route path="/tresorerie" element={<Tresorerie />} />
                              <Route path="/atelier-production" element={<AtelierProduction />} />
                              <Route path="/personnel/:boutique" element={<Personnel />} />
                              <Route path="/boutique-en-ligne" element={<BoutiqueEnLigne />} />
                              <Route path="/utilisateurs" element={<Utilisateurs />} />
                              <Route path="/controle-presence" element={<ControlePresence />} />
                              <Route path="/login" element={<Login />} />
                            </Routes>
                          </Box>
                        </Box>
                      </PresenceProvider>
                    </ApprovisionnementProvider>
                  </BoutiquesProvider>
                </TresorerieProvider>
              </UsersProvider>
            </PointsProvider>
          </CartProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}
