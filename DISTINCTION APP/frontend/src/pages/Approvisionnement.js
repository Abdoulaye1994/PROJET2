import React, { useState, useEffect } from 'react';
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
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from '@mui/material';
import Box from '@mui/material/Box';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useApprovisionnement } from '../context/ApprovisionnementContext';
import { Download } from '@mui/icons-material';

const Approvisionnement = () => {
  const [articles, setArticles] = useState([]);
  const [stats, setStats] = useState(null);
  const [historique, setHistorique] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openCommande, setOpenCommande] = useState(false);
  const [articleCommande, setArticleCommande] = useState(null);
  const [quantiteCommande, setQuantiteCommande] = useState('');

  const { articles: articlesContext, commanderArticle } = useApprovisionnement();

  useEffect(() => {
    if (articlesContext) {
      setArticles(articlesContext);
      setLoading(false);
    }
  }, [articlesContext]);

  // Simuler les données de statistiques et historique
  const mockStats = {
    consommationMensuelle: 100,
    stockActuel: 500,
    joursRestants: 15,
    besoinUrgent: false,
  };

  const mockHistorique = [
    { date: '2024-01-01', quantite: 200 },
    { date: '2024-02-01', quantite: 150 },
    { date: '2024-03-01', quantite: 180 },
    { date: '2024-04-01', quantite: 220 },
    { date: '2024-05-01', quantite: 190 },
    { date: '2024-06-01', quantite: 210 },
  ];

  useEffect(() => {
    setStats(mockStats);
    setHistorique(mockHistorique);
  }, []);

  // Calculer les statistiques pour chaque article
  const getArticleStats = (article) => {
    const consommationMensuelle = stats?.consommationMensuelle || 0;
    const joursRestants = article.quantite / (consommationMensuelle / 30);
    
    return {
      consommationMensuelle,
      joursRestants,
      besoinUrgent: joursRestants <= 7,
    };
  };

  // Générer les données pour le graphique
  const generateChartData = () => {
    return historique.map(item => ({
      mois: item.date,
      quantite: item.quantite
    }));
  };

  useEffect(() => {
    // Simuler le chargement des données (à remplacer par votre API)
    const fetchData = async () => {
      try {
        // Ici, vous devriez faire une requête API pour obtenir les données réelles
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des données');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Approvisionnement
        </Typography>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 4 }}>
            {error}
          </Alert>
        )}

        {!loading && !error && (
          <>
            {/* Statistiques générales */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Total des articles en alerte
                    </Typography>
                    <Typography variant="h5">
                      {articles.length}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Stock moyen
                    </Typography>
                    <Typography variant="h5">
                      {stats.stockMoyen || 0}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Articles épuisés
                    </Typography>
                    <Typography variant="h5">
                      {stats.articlesEpuises || 0}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Valeur totale
                    </Typography>
                    <Typography variant="h5">
                      {stats.valeurTotale || 0} €
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Graphique des achats */}
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Historique des achats
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={generateChartData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="quantite" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Liste des articles nécessitant approvisionnement */}
            <Typography variant="h6" gutterBottom>
              Articles nécessitant approvisionnement
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nom</TableCell>
                    <TableCell>Catégorie</TableCell>
                    <TableCell>Stock actuel</TableCell>
                    <TableCell>Stock d'alerte</TableCell>
                    <TableCell>Consommation</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {articles.map((article) => {
                    const stats = getArticleStats(article);
                    return (
                      <TableRow key={article.id}>
                        <TableCell>{article.nom}</TableCell>
                        <TableCell>
                          <Chip
                            label={article.categorie}
                            color={article.categorie === 'Vêtements' ? 'primary' : 'secondary'}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={article.quantite}
                            color={article.quantite === 0 ? 'error' : 'success'}
                          />
                        </TableCell>
                        <TableCell>{article.stockAlerte}</TableCell>
                        <TableCell>
                          {stats.consommationMensuelle.toFixed(2)} / mois
                          <br />
                          {stats.joursRestants.toFixed(1)} jours restants
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color={stats.besoinUrgent ? 'error' : 'primary'}
                            onClick={() => handleOpenCommande(article)}
                          >
                            {stats.besoinUrgent ? 'Commander URGENT' : 'Commander'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {/* Dialogue de commande */}
        <Dialog open={openCommande} onClose={() => setOpenCommande(false)}>
          <DialogTitle>Commander {articleCommande?.nom}</DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <TextField
                label="Quantité"
                type="number"
                value={quantiteCommande}
                onChange={(e) => setQuantiteCommande(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Typography variant="body2" color="textSecondary">
                Stock actuel : {articleCommande?.quantite}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Stock d'alerte : {articleCommande?.stockAlerte}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCommande(false)}>Annuler</Button>
            <Button
              onClick={async () => {
                const handleCommander = async () => {
                  if (articleCommande && quantiteCommande > 0) {
                    try {
                      await commanderArticle(articleCommande.id, quantiteCommande);
                      setOpenCommande(false);
                      setQuantiteCommande('');
                    } catch (error) {
                      setError('Erreur lors de la commande');
                    }
                  }
                };
                handleCommander();
              }}
              variant="contained"
              color="primary"
            >
              Commander
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Approvisionnement;
