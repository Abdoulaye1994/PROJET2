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
  Chip,
  Card,
  CardContent,
  Grid,
  Tabs,
  Tab,
  CardMedia
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StoreIcon from '@mui/icons-material/Store';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PeopleIcon from '@mui/icons-material/People';
import BoutiqueForm from '../components/BoutiqueForm';
import { useBoutiques } from '../hooks/useBoutiques';

function Boutiques() {
  const [openForm, setOpenForm] = useState(false);
  const [selectedBoutique, setSelectedBoutique] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const { boutiques, getBoutiquesByCountry, getNumberOfUsersByBoutique } = useBoutiques();

  const handleOpenForm = (boutique = null) => {
    setSelectedBoutique(boutique);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedBoutique(null);
  };

  const getStatutColor = (statut) => {
    switch (statut) {
      case 'Ouvert':
        return 'success';
      case 'Fermé':
        return 'error';
      default:
        return 'default';
    }
  };

  const filteredBoutiques = boutiques.filter(boutique =>
    boutique.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    boutique.adresse.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const countries = [...new Set(boutiques.map(b => b.pays))];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestion des Boutiques
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <StoreIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Total Boutiques</Typography>
                </Box>
                <Typography variant="h4">{boutiques.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            {countries.map((country, index) => (
              <Tab key={index} label={country} />
            ))}
          </Tabs>
        </Paper>

        <Grid container spacing={3}>
          {getBoutiquesByCountry(countries[selectedTab]).map((boutique) => (
            <Grid item xs={12} sm={6} md={4} key={boutique.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image="https://via.placeholder.com/300"
                  alt={boutique.nom}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {boutique.nom}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <LocationOnIcon sx={{ fontSize: 14, mr: 1 }} /> {boutique.adresse}, {boutique.ville}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <PhoneIcon sx={{ fontSize: 14, mr: 1 }} /> {boutique.telephone}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <EmailIcon sx={{ fontSize: 14, mr: 1 }} /> {boutique.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <PeopleIcon sx={{ fontSize: 14, mr: 1 }} />
                    <a href={`/personnel/${encodeURIComponent(boutique.nom)}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {getNumberOfUsersByBoutique(boutique)} employés
                    </a>
                  </Typography>
                  {boutique.localisation?.googleMapsLink && (
                    <Typography variant="body2" color="text.secondary">
                      <a href={boutique.localisation.googleMapsLink} target="_blank" rel="noopener noreferrer">
                        Voir sur Google Maps
                      </a>
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => handleOpenForm()}
          >
            Nouvelle Boutique
          </Button>
          <Button variant="outlined" color="primary">
            Statistiques
          </Button>
          <TextField
            placeholder="Rechercher une boutique..."
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
                <TableCell>Adresse</TableCell>
                <TableCell>Téléphone</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Statut</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBoutiques.map((boutique) => (
                <TableRow key={boutique.id}>
                  <TableCell>{boutique.nom}</TableCell>
                  <TableCell>{boutique.adresse}</TableCell>
                  <TableCell>{boutique.telephone}</TableCell>
                  <TableCell>{boutique.email}</TableCell>
                  <TableCell>
                    <Chip 
                      label={boutique.statut} 
                      color={getStatutColor(boutique.statut)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="small" 
                      color="primary"
                      onClick={() => handleOpenForm(boutique)}
                    >
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

      <BoutiqueForm 
        open={openForm} 
        handleClose={handleCloseForm}
        boutique={selectedBoutique}
      />
    </Container>
  );
}

export default Boutiques; 