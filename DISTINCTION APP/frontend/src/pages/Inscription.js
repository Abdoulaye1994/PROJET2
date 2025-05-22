import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Alert,
  CircularProgress,
} from '@mui/material';

const agences = [
  { id: 1, name: 'Agence Centrale' },
  { id: 2, name: 'Agence Nord' },
  { id: 3, name: 'Agence Sud' },
  { id: 4, name: 'Agence Ouest' },
  { id: 5, name: 'Agence Est' },
];

const postes = [
  { id: 1, name: 'Vendeur' },
  { id: 2, name: 'Comptable' },
  { id: 3, name: 'Directeur Général' },
  { id: 4, name: 'Chef d\'agence' },
  { id: 5, name: 'Chargé des approvisionnements' },
  { id: 6, name: 'Gestionnaire de stocks' },
  { id: 7, name: 'Directeur de production' },
  { id: 8, name: 'Secrétaire de production' },
  { id: 9, name: 'Chef atelier' },
  { id: 10, name: 'Coupeur' },
  { id: 11, name: 'Couturier' },
  { id: 12, name: 'Brodeur' },
  { id: 13, name: 'Agent de pressing' },
];

function Inscription() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    contact: '',
    email: '',
    poste: '',
    agence: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nom) newErrors.nom = 'Le nom est requis';
    if (!formData.prenom) newErrors.prenom = 'Le prénom est requis';
    if (!formData.contact) newErrors.contact = 'Le contact est requis';
    if (!formData.email) newErrors.email = 'L\'email est requis';
    if (!formData.poste) newErrors.poste = 'Le poste est requis';
    if (!formData.agence) newErrors.agence = 'L\'agence est requise';
    if (!formData.password) newErrors.password = 'Le mot de passe est requis';
    if (formData.password !== formData.confirmPassword) 
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setSuccess(false);

    try {
      // Ici vous devrez implémenter l'appel à votre API pour l'inscription
      // Pour l'exemple, nous simulons une réponse
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setErrors({});
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      setErrors({ general: 'Une erreur est survenue lors de l\'inscription' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Inscription
        </Typography>
        
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Votre inscription a été envoyée avec succès. Un administrateur va la valider.
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                error={!!errors.nom}
                helperText={errors.nom}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Prénom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                error={!!errors.prenom}
                helperText={errors.prenom}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Contact"
                name="contact"
                type="tel"
                value={formData.contact}
                onChange={handleChange}
                error={!!errors.contact}
                helperText={errors.contact}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.poste}>
                <InputLabel>Poste</InputLabel>
                <Select
                  required
                  name="poste"
                  value={formData.poste}
                  onChange={handleChange}
                  label="Poste"
                >
                  {postes.map(poste => (
                    <MenuItem key={poste.id} value={poste.name}>
                      {poste.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.poste}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.agence}>
                <InputLabel>Agence</InputLabel>
                <Select
                  required
                  name="agence"
                  value={formData.agence}
                  onChange={handleChange}
                  label="Agence"
                >
                  {agences.map(agency => (
                    <MenuItem key={agency.id} value={agency.name}>
                      {agency.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.agence}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Mot de passe"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Confirmer le mot de passe"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                size="large"
              >
                {loading ? <CircularProgress size={24} /> : 'S\'inscrire'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Inscription;
