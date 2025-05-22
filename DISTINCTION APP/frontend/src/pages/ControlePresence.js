import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { usePresence } from '../context/PresenceContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

function ControlePresence() {
  const { role, user } = useAuth();
  const {
    currentPresence,
    presenceHistory,
    isTrackingLocation,
    locationError,
    isLate,
    workHours,
    handleLogin,
    handleLogout,
    getPresenceStats
  } = usePresence();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const stats = getPresenceStats();

  const formatTime = (time) => {
    return format(new Date(time), 'HH:mm', { locale: fr });
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  };



  const renderStatusCard = () => {
    if (role === 'admin') {
      return (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Vue d'ensemble
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>Utilisateur : {user?.name}</Typography>
                <Typography>Téléphone : {user?.phone}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>Nombre total de présences : {stats?.totalDays}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>Nombre de retards : {stats?.lateDays}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>Total des heures travaillées : {formatDuration(stats?.totalHours)}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      );
    }

    if (currentPresence?.departureTime) {
      return (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Dernière présence
            </Typography>
            <Typography>
              Date : {format(new Date(currentPresence.date), 'dd/MM/yyyy', { locale: fr })}
            </Typography>
            <Typography>
              Heure d'arrivée : {formatTime(currentPresence.arrivalTime)}
            </Typography>
            <Typography>
              Heure de départ : {formatTime(currentPresence.departureTime)}
            </Typography>
            <Typography>
              Durée : {formatDuration(currentPresence.duration)}
            </Typography>
            <Typography>
              Téléphone : {currentPresence.phone}
            </Typography>
            <Typography color={isLate ? 'error' : 'success'}>
              Statut : {isLate ? 'En retard' : 'À l\'heure'}
            </Typography>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Statut actuel
          </Typography>
          <Typography>
            Heure d'arrivée : {currentPresence ? formatTime(currentPresence.arrivalTime) : 'Non enregistrée'}
          </Typography>
          <Typography color={isLate ? 'error' : 'success'}>
            Statut : {isLate ? 'En retard' : 'À l\'heure'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
            disabled={!currentPresence}
          >
            Terminer la journée
          </Button>
        </CardActions>
      </Card>
    );
  };

  const renderHistoryTable = () => {
    if (presenceHistory.length === 0) {
      return (
        <Paper sx={{ p: 2 }}>
          <Typography>Aucune présence enregistrée</Typography>
        </Paper>
      );
    }

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Heure d'arrivée</TableCell>
              <TableCell>Heure de départ</TableCell>
              <TableCell>Durée</TableCell>
              <TableCell>Statut</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {presenceHistory.map((presence) => (
              <TableRow key={presence.id}>
                <TableCell>
                  {format(new Date(presence.date), 'dd/MM/yyyy', { locale: fr })}
                </TableCell>
                <TableCell>{formatTime(presence.arrivalTime)}</TableCell>
                <TableCell>{formatTime(presence.departureTime)}</TableCell>
                <TableCell>{formatDuration(presence.duration)}</TableCell>
                <TableCell>
                  <Typography color={presence.isLate ? 'error' : 'success'}>
                    {presence.isLate ? 'En retard' : 'À l\'heure'}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Contrôle de Présence
        </Typography>

        {locationError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {locationError}
          </Alert>
        )}

        {role === 'admin' ? (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Statistiques
            </Typography>
            {renderStatusCard()}
          </Box>
        ) : (
          <Box sx={{ mb: 4 }}>
            {currentPresence ? (
              renderStatusCard()
            ) : (
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Enregistrement de présence
                  </Typography>
                  <Typography>
                    Veuillez vous connecter pour enregistrer votre présence.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/login')}
                  >
                    Se connecter
                  </Button>
                </CardActions>
              </Card>
            )}
          </Box>
        )}

        <Typography variant="h6" gutterBottom>
          Historique des présences
        </Typography>
        {renderHistoryTable()}
      </Box>
    </Container>
  );
}

export default ControlePresence;
