import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Paper, Tabs, Tab } from '@mui/material';
import useUsers from '../hooks/useUsers';

export default function Utilisateurs() {
  const { users, usersCount } = useUsers();
  React.useEffect(() => {
    console.log('Users:', users);
    console.log('Users count:', usersCount);
  }, [users, usersCount]);

  if (!users || users.length === 0) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ my: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
          <Typography variant="h6">Chargement des utilisateurs...</Typography>
        </Box>
      </Container>
    );
  }
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const getStatutColor = (statut) => {
    switch (statut) {
      case 'Connecté':
        return 'success';
      case 'Déconnecté':
        return 'error';
      default:
        return 'default';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Cheffe d\'Agence':
        return 'primary';
      case 'Vendeur':
      case 'Vendeuse':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestion des Utilisateurs
        </Typography>

        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Connectés" />
            <Tab label="Déconnectés" />
            <Tab label="Tous" />
          </Tabs>
        </Paper>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            Liste des Utilisateurs
          </Typography>
          <Button variant="contained" color="primary">
            Nouvel Utilisateur
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Téléphone</TableCell>
                <TableCell>Rôle</TableCell>
                <TableCell>Lieu de Travail</TableCell>
                <TableCell>Dernière Connexion</TableCell>
                <TableCell>Statut</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .filter(user => {
                  if (selectedTab === 0) return user.status === 'Connecté';
                  if (selectedTab === 1) return user.status === 'Déconnecté';
                  return true;
                })
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.nom}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.telephone}</TableCell>
                    <TableCell>
                      <Chip 
                        label={user.role} 
                        color={getRoleColor(user.role)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{user.lieuTravail}</TableCell>
                    <TableCell>
                      {new Date(user.lastLogin).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })} {new Date(user.lastLogin).toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={user.status} 
                        color={getStatutColor(user.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Button size="small" color="primary">
                        Modifier
                      </Button>
                      <Button size="small" color="error">
                        Supprimer
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
