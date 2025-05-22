import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Grid,
  IconButton,
  Tooltip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useBoutiques } from '../hooks/useBoutiques';

const initialBoutique = {
  nom: '',
  adresse: '',
  ville: '',
  pays: '',
  telephone: '+228',
  email: '',
  type: 'Boutique',
  description: '',
  horaires: {
    lundi: '',
    mardi: '',
    mercredi: '',
    jeudi: '',
    vendredi: '',
    samedi: '',
    dimanche: ''
  },
  localisation: {
    latitude: '',
    longitude: '',
    googleMapsLink: ''
  }
};

export default function BoutiqueForm({ open, handleClose, boutique }) {
  const { boutiques } = useBoutiques();
  // Initialisation des données avec une localisation par défaut si nécessaire
  const initialData = boutique ? {
    ...boutique,
    localisation: boutique.localisation || { latitude: '', longitude: '' }
  } : initialBoutique;
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleHorairesChange = (e, jour) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      horaires: {
        ...formData.horaires,
        [jour]: value
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici vous pouvez ajouter la logique pour sauvegarder les données
    console.log('Boutique:', formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {boutique ? 'Modifier Boutique' : 'Nouvelle Boutique'}
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Nom de la Boutique"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Adresse"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Ville"
                  name="ville"
                  value={formData.ville}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Pays</InputLabel>
                  <Select
                    required
                    name="pays"
                    value={formData.pays}
                    onChange={handleChange}
                    label="Pays"
                  >
                    <MenuItem value="Togo">Togo</MenuItem>
                    <MenuItem value="Cameroun">Cameroun</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Latitude"
                  name="localisation.latitude"
                  value={formData.localisation.latitude}
                  onChange={(e) => {
                    const { value } = e.target;
                    setFormData({
                      ...formData,
                      localisation: {
                        ...formData.localisation,
                        latitude: value
                      }
                    });
                  }}
                  type="number"
                  InputProps={{
                    inputProps: {
                      step: "any"
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Longitude"
                  name="localisation.longitude"
                  value={formData.localisation.longitude}
                  onChange={(e) => {
                    const { value } = e.target;
                    setFormData({
                      ...formData,
                      localisation: {
                        ...formData.localisation,
                        longitude: value
                      }
                    });
                  }}
                  type="number"
                  InputProps={{
                    inputProps: {
                      step: "any"
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Lien Google Maps"
                  name="localisation.googleMapsLink"
                  value={formData.localisation.googleMapsLink}
                  onChange={(e) => {
                    const { value } = e.target;
                    setFormData({
                      ...formData,
                      localisation: {
                        ...formData.localisation,
                        googleMapsLink: value
                      }
                    });
                  }}
                  placeholder="https://maps.google.com/..."
                  helperText="Lien vers la localisation sur Google Maps"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Téléphone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder="+228"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    label="Type"
                  >
                    <MenuItem value="Boutique">Boutique</MenuItem>
                    <MenuItem value="Atelier">Atelier</MenuItem>
                    <MenuItem value="Pressing">Pressing</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                  Horaires d'ouverture
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Lundi"
                      name="lundi"
                      value={formData.horaires.lundi}
                      onChange={(e) => handleHorairesChange(e, 'lundi')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Mardi"
                      name="mardi"
                      value={formData.horaires.mardi}
                      onChange={(e) => handleHorairesChange(e, 'mardi')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Mercredi"
                      name="mercredi"
                      value={formData.horaires.mercredi}
                      onChange={(e) => handleHorairesChange(e, 'mercredi')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Jeudi"
                      name="jeudi"
                      value={formData.horaires.jeudi}
                      onChange={(e) => handleHorairesChange(e, 'jeudi')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Vendredi"
                      name="vendredi"
                      value={formData.horaires.vendredi}
                      onChange={(e) => handleHorairesChange(e, 'vendredi')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Samedi"
                      name="samedi"
                      value={formData.horaires.samedi}
                      onChange={(e) => handleHorairesChange(e, 'samedi')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Dimanche"
                      name="dimanche"
                      value={formData.horaires.dimanche}
                      onChange={(e) => handleHorairesChange(e, 'dimanche')}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} startIcon={<CancelIcon />}>
            Annuler
          </Button>
          <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
            {boutique ? 'Modifier' : 'Créer'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}