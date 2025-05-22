import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AtelierProduction = () => {
  const navigate = useNavigate();

  // TODO: Implémenter la logique de l'atelier de production
  // Pour l'instant, afficher une page de base avec les sections principales

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Atelier de Production
      </Typography>

      <Grid container spacing={3}>
        {/* Section Production */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Production en cours
              </Typography>
              {/* TODO: Ajouter le tableau des productions */}
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate('/atelier-production/nouvelle-production')}>
                Nouvelle Production
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Section Stock Matières Premières */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Stock Matières Premières
              </Typography>
              {/* TODO: Ajouter le tableau des matières premières */}
            </CardContent>
          </Card>
        </Grid>

        {/* Section Planification */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Planification de Production
              </Typography>
              {/* TODO: Ajouter le calendrier de planification */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AtelierProduction;
