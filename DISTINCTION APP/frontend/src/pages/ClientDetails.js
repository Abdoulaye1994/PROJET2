import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import MesuresForm from '../components/MesuresForm';

// Exemple de données fictives
const historiqueAchats = [
  { date: '12/06/2024', article: 'Agbada', montant: 85000, boutique: 'DISTINCTION Paris' },
  { date: '05/05/2024', article: 'Dashiki', montant: 60000, boutique: 'DISTINCTION Lyon' },
  { date: '20/04/2024', article: 'Robe', montant: 45000, boutique: 'DISTINCTION Paris' },
];

const mesures = {
  dos: 45,
  poitrine: 100,
  ventre: 90,
  centure: 85,
  fesses: 98,
  cuisse: 55,
  longueur_genoux: 50,
  longeur_de_genoux_1: 48,
  longeur_de_genoux_2: 49,
  tour_de_genoux: 40,
  tendon: 22,
  bas: 20,
  longueur_pantalon: 105,
  longueur_habit: 110,
  longueur_bras_1: 60,
  longueur_bras_2: 61,
  longueur_bras_3: 62,
  longueur_bras_4: 63,
  tour_de_bras_1: 30,
  tour_de_bras_2: 31,
  tour_de_bras_3: 32,
  poignee_1: 18,
  poignee_2: 19,
  cou: 40,
  tour_de_tete: 56,
  longueur_agbada: 130,
  largeur_agbada: 80,
  longueur_robe: 120,
};

const formatMontant = (montant) => `${montant.toLocaleString('fr-FR')} XOF`;

function ClientDetails() {
  const { id } = useParams();
  // Exemple d'infos client
  const client = {
    nom: 'Kouadio Jean',
    telephone: '+225 07 00 00 00',
    email: 'jean.kouadio@email.com',
    adresse: "Abidjan, Côte d'Ivoire",
    dateInscription: '01/03/2023',
  };

  const [openMesuresForm, setOpenMesuresForm] = React.useState(false);
  const [mesuresState, setMesuresState] = React.useState(mesures);

  const handleOpenMesuresForm = () => setOpenMesuresForm(true);
  const handleCloseMesuresForm = () => setOpenMesuresForm(false);
  const handleSaveMesures = (newMesures) => setMesuresState(newMesures);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Fiche Client {id && <span style={{fontSize: '1rem', color: '#888'}}>#{id}</span>}
        </Typography>
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6">Informations principales</Typography>
                <List>
                  <ListItem>
                    <ListItemText primary="Nom" secondary={client.nom} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Téléphone" secondary={client.telephone} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Email" secondary={client.email} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Adresse" secondary={client.adresse} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Date d'inscription" secondary={client.dateInscription} />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Mesures</Typography>
                  <Button size="small" variant="outlined" onClick={handleOpenMesuresForm}>Modifier les mesures</Button>
                </Box>
                <Grid container spacing={1}>
                  {Object.entries(mesuresState).map(([cle, valeur]) => (
                    <Grid item xs={6} sm={4} key={cle}>
                      <Typography variant="body2" color="textSecondary">
                        {cle.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Typography>
                      <Typography variant="subtitle1">{valeur} cm</Typography>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <MesuresForm 
          open={openMesuresForm}
          handleClose={handleCloseMesuresForm}
          mesures={mesuresState}
          onSave={handleSaveMesures}
        />

        <Typography variant="h5" gutterBottom>
          Historique des achats
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Article</TableCell>
                <TableCell>Boutique</TableCell>
                <TableCell>Montant</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historiqueAchats.map((achat, idx) => (
                <TableRow key={idx}>
                  <TableCell>{achat.date}</TableCell>
                  <TableCell>{achat.article}</TableCell>
                  <TableCell>{achat.boutique}</TableCell>
                  <TableCell>{formatMontant(achat.montant)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default ClientDetails; 