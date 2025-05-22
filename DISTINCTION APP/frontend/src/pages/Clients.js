import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  TextField,
  InputAdornment,
  Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClientForm from '../components/ClientForm';
import { useNavigate } from 'react-router-dom';

function Clients() {
  const [openForm, setOpenForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Données de test
  const clients = [
    { 
      id: 1, 
      nom: 'Dupont', 
      prenom: 'Marie', 
      email: 'marie.dupont@email.com', 
      telephone: '06 12 34 56 78',
      adresse: '123 rue de la Mode, Paris',
      statut: 'VIP',
      totalAchats: 15000
    },
    { 
      id: 2, 
      nom: 'Martin', 
      prenom: 'Jean', 
      email: 'jean.martin@email.com', 
      telephone: '06 23 45 67 89',
      adresse: '45 avenue des Champs-Élysées, Paris',
      statut: 'Régulier',
      totalAchats: 8500
    },
    { 
      id: 3, 
      nom: 'Bernard', 
      prenom: 'Sophie', 
      email: 'sophie.bernard@email.com', 
      telephone: '06 34 56 78 90',
      adresse: '78 boulevard Saint-Germain, Paris',
      statut: 'Nouveau',
      totalAchats: 3200
    },
  ];

  const handleOpenForm = (client = null) => {
    setSelectedClient(client);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedClient(null);
  };

  const getStatutColor = (statut) => {
    switch (statut) {
      case 'VIP':
        return 'success';
      case 'Régulier':
        return 'primary';
      case 'Nouveau':
        return 'warning';
      default:
        return 'default';
    }
  };

  const filteredClients = clients.filter(client =>
    client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestion des Clients
        </Typography>
        
        <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => handleOpenForm()}
          >
            Nouveau Client
          </Button>
          <Button variant="outlined" color="primary">
            Import/Export
          </Button>
          <TextField
            placeholder="Rechercher un client..."
            size="small"
            sx={{ ml: 'auto' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Prénom</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Téléphone</TableCell>
                <TableCell>Statut</TableCell>
                <TableCell>Total Achats</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.nom}</TableCell>
                  <TableCell>{client.prenom}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.telephone}</TableCell>
                  <TableCell>
                    <Chip 
                      label={client.statut} 
                      color={getStatutColor(client.statut)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{client.totalAchats} XOF</TableCell>
                  <TableCell>
                    <Button 
                      size="small" 
                      color="primary"
                      onClick={() => handleOpenForm(client)}
                    >
                      Modifier
                    </Button>
                    <Button size="small" color="error">
                      Supprimer
                    </Button>
                    <Button size="small" color="secondary" onClick={() => navigate(`/clients/${client.id}`)}>
                      Voir fiche
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <ClientForm 
        open={openForm} 
        handleClose={handleCloseForm}
        client={selectedClient}
      />
    </Container>
  );
}

export default Clients; 