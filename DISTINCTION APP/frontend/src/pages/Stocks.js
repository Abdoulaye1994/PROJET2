import React, { useState } from 'react';
import Papa from 'papaparse';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Tooltip
} from '@mui/material';
import {
  Search,
  Edit,
  Delete,
  Download,
  FileCopy,
  Upload
} from '@mui/icons-material';
import ArticleForm from '../components/ArticleForm';
import CategoryManager from '../components/CategoryManager';

function Stocks() {
  const [openArticleForm, setOpenArticleForm] = useState(false);
  const [openImportForm, setOpenImportForm] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState([]);
  const [csvFile, setCsvFile] = useState(null);
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState('');
  const [categories, setCategories] = useState([
    {
      name: 'Vêtements',
      subcategories: ['Goodluck', 'Danshiki', 'Agbada', 'Provisoire', 'Robes', 'Boubous', 'Tailleurs']
    },
    {
      name: 'Accessoires',
      subcategories: ['Chaussures', 'Sacs', 'Chapeaux', 'Montres', 'Bracelets', 'Manchettes', 'Stylos', 'Portefeuilles', 'Parfums', 'Lunettes', 'Canne']
    },
    {
      name: 'Pressing',
      subcategories: []
    }
  ]);
  const [categoryManagerOpen, setCategoryManagerOpen] = useState(false);

  const handleOpenArticleForm = (article = null) => {
    setSelectedArticle(article);
    setOpenArticleForm(true);
  };

  const handleCloseArticleForm = () => {
    setOpenArticleForm(false);
    setSelectedArticle(null);
  };

  const handleOpenImportForm = () => {
    setOpenImportForm(true);
  };

  const handleCloseImportForm = () => {
    setOpenImportForm(false);
    setCsvFile(null);
    setImportError('');
    setImportSuccess('');
  };

  const handleDeleteArticle = async (articleId) => {
    try {
      await fetch(`http://localhost:5000/api/articles/${articleId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setArticles(prev => prev.filter(article => article.id !== articleId));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'article:', error);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCsvFile(file);
      setImportError('');
      setImportSuccess('');
    }
  };

  const handleImportSubmit = async () => {
    if (!csvFile) return;

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;
        const parsedData = Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          transform: (value) => value.trim(),
        }).data;

        const validArticles = parsedData.filter(row => 
          row.reference && row.nom && row.categorie && row.sousCategorie && 
          !isNaN(row.quantite) && !isNaN(row.prix)
        );

        if (validArticles.length === 0) {
          setImportError('Aucune ligne valide trouvée dans le fichier.');
          return;
        }

        const newArticles = await Promise.all(validArticles.map(async (article) => {
          const response = await fetch('http://localhost:5000/api/articles', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              reference: article.reference,
              nom: article.nom,
              categorie: article.categorie,
              sousCategorie: article.sousCategorie,
              quantite: parseInt(article.quantite),
              prix: parseFloat(article.prix),
              photos: article.photos ? [article.photos] : []
            }),
          });

          if (!response.ok) {
            throw new Error('Erreur lors de l\'importation de l\'article');
          }

          return response.json();
        }));

        setArticles(prev => [...prev, ...newArticles]);
        setImportSuccess(`Importation réussie de ${newArticles.length} articles`);
        setCsvFile(null);
      };

      reader.readAsText(csvFile);
    } catch (error) {
      console.error('Erreur lors de l\'importation:', error);
      setImportError(`Erreur lors de l\'importation: ${error.message}`);
    }
  };

  const handleUpdateArticle = (updatedArticle) => {
    setArticles(prev => prev.map(article => 
      article.id === updatedArticle.id ? updatedArticle : article
    ));
  };

  const filteredArticles = articles.filter(article =>
    article.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.reference?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestion des Stocks
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => handleOpenArticleForm()}
          >
            Nouvel Article
          </Button>
          <Button 
            variant="outlined" 
            color="primary"
            onClick={handleOpenImportForm}
            startIcon={<Download />}
          >
            Import/Export
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setCategoryManagerOpen(true)}
          >
            Gérer les catégories
          </Button>
          <TextField
            placeholder="Rechercher un article..."
            size="small"
            sx={{ ml: 'auto' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
          />
        </Box>

        <CategoryManager
          categories={categories}
          setCategories={setCategories}
          open={categoryManagerOpen}
          onClose={() => setCategoryManagerOpen(false)}
        />

        <Box sx={{ mt: 2 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Reference</TableCell>
                  <TableCell>Nom</TableCell>
                  <TableCell>Catégorie</TableCell>
                  <TableCell>Sous-catégorie</TableCell>
                  <TableCell>Quantité</TableCell>
                  <TableCell>Prix</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredArticles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell>{article.reference}</TableCell>
                    <TableCell>{article.nom}</TableCell>
                    <TableCell>{article.categorie}</TableCell>
                    <TableCell>{article.sousCategorie}</TableCell>
                    <TableCell>{article.quantite}</TableCell>
                    <TableCell>{article.prix}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenArticleForm(article)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteArticle(article.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <Dialog
        open={openArticleForm}
        onClose={handleCloseArticleForm}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{selectedArticle ? 'Modifier Article' : 'Nouvel Article'}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              {selectedArticle ? 'Modifier un article existant' : 'Ajouter un nouvel article'}
            </Typography>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="article-photo"
              multiple
              type="file"
              onChange={(e) => {
                if (selectedArticle) {
                  const files = Array.from(e.target.files);
                  setSelectedArticle(prev => ({
                    ...prev,
                    photos: files.map(file => URL.createObjectURL(file))
                  }));
                }
              }}
            />
            <label htmlFor="article-photo">
              <Button
                variant="outlined"
                component="span"
                fullWidth
                sx={{ mb: 2 }}
              >
                {selectedArticle && selectedArticle.photos?.length > 0
                  ? `${selectedArticle.photos.length} photos sélectionnées`
                  : 'Sélectionner des photos'}
              </Button>
            </label>
            {selectedArticle && selectedArticle.photos?.map((photo, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={photo}
                  alt={`Photo ${index + 1}`}
                />
                <CardActions>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => {
                      const newPhotos = [...selectedArticle.photos];
                      newPhotos.splice(index, 1);
                      setSelectedArticle(prev => ({
                        ...prev,
                        photos: newPhotos
                      }));
                    }}
                  >
                    Supprimer
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseArticleForm}>Annuler</Button>
          <Button
            onClick={() => {
              if (selectedArticle) {
                handleUpdateArticle(selectedArticle);
              }
              handleCloseArticleForm();
            }}
            variant="contained"
            color="primary"
          >
            {selectedArticle ? 'Modifier' : 'Ajouter'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openImportForm}
        onClose={handleCloseImportForm}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Importer un fichier CSV</DialogTitle>
        <DialogContent>
          {importError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {importError}
            </Alert>
          )}
          {importSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {importSuccess}
            </Alert>
          )}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Importer un fichier CSV
            </Typography>
            <input
              accept=".csv"
              style={{ display: 'none' }}
              id="csv-upload"
              type="file"
              onChange={handleFileUpload}
            />
            <label htmlFor="csv-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={csvFile ? <FileCopy /> : <Upload />}
              >
                {csvFile ? csvFile.name : 'Choisir un fichier CSV'}
              </Button>
            </label>
            {csvFile && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleImportSubmit}
                disabled={!csvFile}
                sx={{ ml: 2 }}
              >
                Importer
              </Button>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseImportForm}>Annuler</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={selectedArticle !== null}
        onClose={() => setSelectedArticle(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedArticle && (
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardMedia
                    component="img"
                    height="400"
                    image={selectedArticle.photos?.[0] || '/placeholder.jpg'}
                    alt={selectedArticle.nom}
                  />
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {selectedArticle.nom}
                    </Typography>
                    <Typography variant="body1">
                      Référence: {selectedArticle.reference}
                    </Typography>
                    <Typography variant="body1">
                      Catégorie: {selectedArticle.categorie}
                    </Typography>
                    <Typography variant="body1">
                      Sous-catégorie: {selectedArticle.sousCategorie}
                    </Typography>
                    <Typography variant="body1">
                      Quantité: {selectedArticle.quantite}
                    </Typography>
                    <Typography variant="body1">
                      Prix: {selectedArticle.prix} €
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenArticleForm(selectedArticle)}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteArticle(selectedArticle.id)}
                    >
                      Supprimer
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </Dialog>
    </Container>
  );
}

export default Stocks;