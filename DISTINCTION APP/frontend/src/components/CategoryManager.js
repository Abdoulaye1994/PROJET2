import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from '@mui/material';

const CategoryManager = ({ categories, setCategories, open, onClose }) => {
  const [categoryName, setCategoryName] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState('');

  const handleAddCategory = () => {
    if (!categoryName.trim()) {
      setError('Veuillez entrer un nom de catégorie');
      return;
    }

    const newCategory = {
      name: categoryName.trim(),
      subcategories: [],
    };

    setCategories(prev => [
      ...prev,
      newCategory
    ]);
    setCategoryName('');
    setError('');
  };

  const handleAddSubCategory = () => {
    if (!selectedCategory || !subCategoryName.trim()) {
      setError('Veuillez sélectionner une catégorie et entrer un nom de sous-catégorie');
      return;
    }

    setCategories(prev => prev.map(category => {
      if (category.name === selectedCategory) {
        return {
          ...category,
          subcategories: [
            ...category.subcategories,
            subCategoryName.trim()
          ]
        };
      }
      return category;
    }));

    setSubCategoryName('');
    setSelectedCategory('');
    setError('');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Gestion des Catégories</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Nouvelle catégorie"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={handleAddCategory}
            disabled={!categoryName.trim()}
          >
            Ajouter catégorie
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Sélectionner une catégorie</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              label="Sélectionner une catégorie"
            >
              {categories.map(category => (
                <MenuItem key={category.name} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Nouvelle sous-catégorie"
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={handleAddSubCategory}
            disabled={!selectedCategory || !subCategoryName.trim()}
          >
            Ajouter sous-catégorie
          </Button>
        </Box>

        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

        <Typography variant="h6" sx={{ mt: 3 }}>Catégories existantes:</Typography>
        {categories.map(category => (
          <Box key={category.name} sx={{ mt: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {category.name}:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {category.subcategories.length > 0 ? category.subcategories.join(', ') : 'Aucune sous-catégorie'}
            </Typography>
          </Box>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryManager;
