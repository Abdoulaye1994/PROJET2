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
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Stack
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const categories = [
  'Vêtements',
  'Accessoires',
  'Pressing'
];

const sousCategories = {
  Vêtements: [
    'Goodluck',
    'Danshiki',
    'Agbada',
    'Provisoire',
    'Robes',
    'Boubous',
    'Tailleurs'
  ],
  Accessoires: [
    'Chaussures',
    'Sacs',
    'Chapeaux',
    'Montres',
    'Bracelets',
    'Manchettes',
    'Stylos',
    'Portefeuilles',
    'Parfums',
    'Lunettes',
    'Canne'
  ],
  Pressing: []
};

export default function ArticleForm({ open, handleClose, article, onAdd, onUpdate }) {
  const [formData, setFormData] = React.useState({
    reference: article?.reference || '',
    nom: article?.nom || '',
    categorie: article?.categorie || '',
    sousCategorie: article?.sousCategorie || '',
    quantite: article?.quantite || 0,
    prix: article?.prix || 0,
    seuil: article?.seuil || 0,
    photos: article?.photos || [],
    variations: article?.variations || [],
    description: article?.description || '',
    poids: article?.poids || 0,
    dimensions: article?.dimensions || '',
    materiaux: article?.materiaux || '',
    origine: article?.origine || '',
    dateAjout: article?.dateAjout || new Date().toISOString(),
    dateMiseAJour: article?.dateMiseAJour || new Date().toISOString()
  });

  const [photoPreview, setPhotoPreview] = React.useState(null);
  const [newVariation, setNewVariation] = React.useState({
    nom: '',
    prix: 0,
    stock: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      categorie: value,
      sousCategorie: ''
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setFormData(prev => ({
          ...prev,
          photos: [...prev.photos, reader.result]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddVariation = () => {
    if (newVariation.nom && newVariation.prix >= 0) {
      setFormData(prev => ({
        ...prev,
        variations: [...prev.variations, {
          ...newVariation,
          id: Date.now()
        }]
      }));
      setNewVariation({ nom: '', prix: 0, stock: 0 });
    }
  };

  const handleRemoveVariation = (id) => {
    setFormData(prev => ({
      ...prev,
      variations: prev.variations.filter(variation => variation.id !== id)
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newArticle = {
      id: article?.id || Date.now(),
      reference: formData.reference,
      nom: formData.nom,
      categorie: formData.categorie,
      sousCategorie: formData.sousCategorie,
      photos: formData.photos,
      variations: formData.variations,
      quantite: parseInt(formData.quantite),
      prix: parseFloat(formData.prix),
      seuil: parseInt(formData.seuil),
      description: formData.description,
      poids: parseFloat(formData.poids),
      dimensions: formData.dimensions,
      materiaux: formData.materiaux,
      origine: formData.origine,
      dateAjout: formData.dateAjout,
      dateMiseAJour: formData.dateMiseAJour
    };

    if (article) {
      onUpdate(newArticle);
    } else {
      onAdd(newArticle);
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        {article ? 'Modifier l\'article' : 'Nouvel article'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Informations de base
              </Typography>
              <TextField
                name="reference"
                label="Référence"
                fullWidth
                value={formData.reference}
                onChange={handleChange}
                required
              />
              <TextField
                name="nom"
                label="Nom"
                fullWidth
                value={formData.nom}
                onChange={handleChange}
                required
              />
              <TextField
                name="description"
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={formData.description}
                onChange={handleChange}
              />
              <FormControl fullWidth>
                <InputLabel>Catégorie</InputLabel>
                <Select
                  name="categorie"
                  value={formData.categorie}
                  onChange={handleCategoryChange}
                  label="Catégorie"
                  required
                >
                  {categories.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Sous-catégorie</InputLabel>
                <Select
                  name="sousCategorie"
                  value={formData.sousCategorie}
                  onChange={handleChange}
                  label="Sous-catégorie"
                  required
                >
                  {sousCategories[formData.categorie]?.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Informations de stock
              </Typography>
              <TextField
                name="quantite"
                label="Quantité"
                type="number"
                fullWidth
                value={formData.quantite}
                onChange={handleChange}
                required
              />
              <TextField
                name="seuil"
                label="Stock de sécurité"
                type="number"
                fullWidth
                value={formData.seuil}
                onChange={handleChange}
                required
              />
              <TextField
                name="poids"
                label="Poids (kg)"
                type="number"
                fullWidth
                value={formData.poids}
                onChange={handleChange}
              />
              <TextField
                name="dimensions"
                label="Dimensions (LxHxP)"
                fullWidth
                value={formData.dimensions}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Informations de prix
              </Typography>
              <TextField
                name="prix"
                label="Prix de vente"
                type="number"
                fullWidth
                value={formData.prix}
                onChange={handleChange}
                required
              />
              <TextField
                name="origine"
                label="Origine"
                fullWidth
                value={formData.origine}
                onChange={handleChange}
              />
              <TextField
                name="materiaux"
                label="Matériaux"
                fullWidth
                value={formData.materiaux}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Photos
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                {formData.photos.map((photo, index) => (
                  <Card key={index} sx={{ maxWidth: 200 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={photo}
                      alt={`Photo ${index + 1}`}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        Photo {index + 1}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            photos: prev.photos.filter((_, i) => i !== index)
                          }));
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                ))}
              </Box>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="upload-photo"
                type="file"
                onChange={handlePhotoUpload}
                multiple
              />
              <label htmlFor="upload-photo">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<AddPhotoAlternateIcon />}
                >
                  Ajouter des photos
                </Button>
              </label>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Variations
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  name="variationNom"
                  label="Nom de la variation"
                  fullWidth
                  value={newVariation.nom}
                  onChange={(e) => setNewVariation({ ...newVariation, nom: e.target.value })}
                />
                <TextField
                  name="variationPrix"
                  label="Prix"
                  type="number"
                  fullWidth
                  value={newVariation.prix}
                  onChange={(e) => setNewVariation({ ...newVariation, prix: e.target.value })}
                />
                <TextField
                  name="variationStock"
                  label="Stock"
                  type="number"
                  fullWidth
                  value={newVariation.stock}
                  onChange={(e) => setNewVariation({ ...newVariation, stock: e.target.value })}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddVariation}
                  startIcon={<AddIcon />}
                >
                  Ajouter
                </Button>
              </Box>
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                {formData.variations.map((variation) => (
                  <Chip
                    key={variation.id}
                    label={`${variation.nom} - ${variation.prix} FCFA (Stock: ${variation.stock})`}
                    onDelete={() => handleRemoveVariation(variation.id)}
                  />
                ))}
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Photos
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                {formData.photos.map((photo, index) => (
                  <Card key={index} sx={{ maxWidth: 150 }}>
                    <CardMedia
                      component="img"
                      height="150"
                      image={photo}
                      alt={`Photo ${index + 1}`}
                    />
                  </Card>
                ))}
                <label htmlFor="photo-upload">
                  <Card sx={{ maxWidth: 150, cursor: 'pointer' }}>
                    <CardMedia
                      sx={{
                        height: 150,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'grey.200'
                      }}
                    >
                      <AddPhotoAlternateIcon sx={{ fontSize: 50 }} />
                    </CardMedia>
                  </Card>
                </label>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="photo-upload"
                  multiple
                  type="file"
                  onChange={handlePhotoUpload}
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Variations
              </Typography>
              <Box sx={{ mb: 2 }}>
                {formData.variations.map((variation) => (
                  <Card key={variation.id} sx={{ mb: 1 }}>
                    <CardContent>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Typography variant="subtitle2">
                          {variation.nom}
                        </Typography>
                        <Typography variant="subtitle2" color="primary">
                          {variation.prix} XOF
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                          Stock: {variation.stock}
                        </Typography>
                        <IconButton
                          onClick={() => handleRemoveVariation(variation.id)}
                          size="small"
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  name="nom"
                  label="Nom de la variation"
                  value={newVariation.nom}
                  onChange={(e) => {
                    setNewVariation(prev => ({
                      ...prev,
                      nom: e.target.value
                    }));
                  }}
                  required
                />
                <TextField
                  name="prix"
                  label="Prix"
                  type="number"
                  value={newVariation.prix}
                  onChange={(e) => {
                    setNewVariation(prev => ({
                      ...prev,
                      prix: e.target.value
                    }));
                  }}
                  required
                />
                <TextField
                  name="stock"
                  label="Stock"
                  type="number"
                  value={newVariation.stock}
                  onChange={(e) => {
                    setNewVariation(prev => ({
                      ...prev,
                      stock: e.target.value
                    }));
                  }}
                  required
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddVariation}
                >
                  Ajouter
                </Button>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <TextField
                name="quantite"
                label="Quantité totale"
                type="number"
                fullWidth
                value={formData.quantite}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                value={formData.prix}
                onChange={handleChange}
                required
                InputProps={{
                  endAdornment: '€'
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="seuil"
                label="Seuil d'alerte"
                type="number"
                fullWidth
                value={formData.seuil}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleSubmit}
          >
            {article ? 'Modifier' : 'Ajouter'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}