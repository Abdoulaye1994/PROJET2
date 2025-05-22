import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import { useUsers } from '../context/UsersContext';

export default function Personnel() {
  const { boutique } = useParams();
  const { users } = useUsers();

  // Gérer le cas où les données ne sont pas encore chargées
  if (!users) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Chargement du personnel...
          </Typography>
        </Box>
      </Container>
    );
  }

  const personnel = users.filter(user => user.lieuTravail === decodeURIComponent(boutique));

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Personnel de {decodeURIComponent(boutique)}
        </Typography>

        {personnel.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            Aucun personnel trouvé pour cette boutique
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Téléphone</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Dernière connexion</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {personnel.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.nom}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.telephone}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.status}
                        color={user.status === 'Connecté' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(user.lastLogin).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Container>
  );
}
