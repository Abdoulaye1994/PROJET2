import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  Box
} from '@mui/material';
import MesuresForm from './MesuresForm';

const statuts = [
  'Nouveau',
  'Régulier',
  'VIP'
];

const defaultMesures = {
  dos: '', poitrine: '', ventre: '', centure: '', fesses: '', cuisse: '', longueur_genoux: '', longeur_de_genoux_1: '', longeur_de_genoux_2: '', tour_de_genoux: '', tendon: '', bas: '', longueur_pantalon: '', longueur_habit: '', longueur_bras_1: '', longueur_bras_2: '', longueur_bras_3: '', longueur_bras_4: '', tour_de_bras_1: '', tour_de_bras_2: '', tour_de_bras_3: '', poignee_1: '', poignee_2: '', cou: '', tour_de_tete: '', longueur_agbada: '', largeur_agbada: '', longueur_robe: ''
};

function ClientForm({ open, handleClose, client = null }) {
  const [formData, setFormData] = React.useState({
    nom: client?.nom || '',
    prenom: client?.prenom || '',
    email: client?.email || '',
    telephone: client?.telephone || '',
    adresse: client?.adresse || '',
    statut: client?.statut || 'Nouveau',
  });
  const [mesures, setMesures] = React.useState(client?.mesures || defaultMesures);
  const [openMesuresForm, setOpenMesuresForm] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implémenter la logique de sauvegarde avec mesures
    console.log('Données du formulaire:', { ...formData, mesures });
    handleClose();
  };

  const handleOpenMesuresForm = () => setOpenMesuresForm(true);
  const handleCloseMesuresForm = () => setOpenMesuresForm(false);
  const handleSaveMesures = (newMesures) => setMesures(newMesures);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {client ? 'Modifier le client' : 'Nouveau client'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="nom"
                label="Nom"
                fullWidth
                value={formData.nom}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="prenom"
                label="Prénom"
                fullWidth
                value={formData.prenom}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                type="email"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="telephone"
                label="Téléphone"
                fullWidth
                value={formData.telephone}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="adresse"
                label="Adresse"
                fullWidth
                multiline
                rows={2}
                value={formData.adresse}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="statut"
                label="Statut"
                select
                fullWidth
                value={formData.statut}
                onChange={handleChange}
                required
              >
                {statuts.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                <Button variant="outlined" onClick={handleOpenMesuresForm}>
                  {Object.values(mesures).some(val => val) ? 'Modifier les mesures' : 'Ajouter les mesures'}
                </Button>
                {Object.values(mesures).some(val => val) && <span style={{ color: '#1976d2', fontWeight: 500 }}>Mesures renseignées</span>}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button type="submit" variant="contained" color="primary">
            {client ? 'Modifier' : 'Ajouter'}
          </Button>
        </DialogActions>
      </form>
      <MesuresForm 
        open={openMesuresForm}
        handleClose={handleCloseMesuresForm}
        mesures={mesures}
        onSave={handleSaveMesures}
      />
    </Dialog>
  );
}

export default ClientForm; 