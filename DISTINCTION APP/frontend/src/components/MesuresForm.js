import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField
} from '@mui/material';

const mesuresList = [
  { name: 'dos', label: 'Dos' },
  { name: 'poitrine', label: 'Poitrine' },
  { name: 'ventre', label: 'Ventre' },
  { name: 'centure', label: 'Cinture' },
  { name: 'fesses', label: 'Fesses' },
  { name: 'cuisse', label: 'Cuisse' },
  { name: 'longueur_genoux', label: 'Longueur genoux' },
  { name: 'longeur_de_genoux_1', label: 'Longueur de genoux 1' },
  { name: 'longeur_de_genoux_2', label: 'Longueur de genoux 2' },
  { name: 'tour_de_genoux', label: 'Tour de genoux' },
  { name: 'tendon', label: 'Tendon' },
  { name: 'bas', label: 'Bas' },
  { name: 'longueur_pantalon', label: 'Longueur pantalon' },
  { name: 'longueur_habit', label: 'Longueur habit' },
  { name: 'longueur_bras_1', label: 'Longueur bras 1' },
  { name: 'longueur_bras_2', label: 'Longueur bras 2' },
  { name: 'longueur_bras_3', label: 'Longueur bras 3' },
  { name: 'longueur_bras_4', label: 'Longueur bras 4' },
  { name: 'tour_de_bras_1', label: 'Tour de bras 1' },
  { name: 'tour_de_bras_2', label: 'Tour de bras 2' },
  { name: 'tour_de_bras_3', label: 'Tour de bras 3' },
  { name: 'poignee_1', label: 'Poignée 1' },
  { name: 'poignee_2', label: 'Poignée 2' },
  { name: 'cou', label: 'Cou' },
  { name: 'tour_de_tete', label: 'Tour de tête' },
  { name: 'longueur_agbada', label: 'Longueur Agbada' },
  { name: 'largeur_agbada', label: 'Largeur Agbada' },
  { name: 'longueur_robe', label: 'Longueur robe' },
];

function MesuresForm({ open, handleClose, mesures = {}, onSave }) {
  const [formData, setFormData] = React.useState(mesures);

  React.useEffect(() => {
    setFormData(mesures);
  }, [mesures]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Modifier les mesures</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            {mesuresList.map((mesure) => (
              <Grid item xs={12} sm={4} md={3} key={mesure.name}>
                <TextField
                  name={mesure.name}
                  label={mesure.label}
                  type="number"
                  fullWidth
                  value={formData[mesure.name] || ''}
                  onChange={handleChange}
                  InputProps={{ endAdornment: <span>cm</span> }}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button type="submit" variant="contained" color="primary">Enregistrer</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default MesuresForm; 