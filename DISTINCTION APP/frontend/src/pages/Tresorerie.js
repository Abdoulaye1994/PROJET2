import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
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
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Box as MuiBox,
  CircularProgress,
  Alert,
  useTheme,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTresorerie } from '../context/TresorerieContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { AccountBalanceIcon } from '@mui/icons-material';
import TabPanel from '../components/TabPanel';

const Tresorerie = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    montant: '',
    date: new Date().toISOString().split('T')[0],
    modePaiement: '',
    description: '',
    compte: '',
  });
  const [error, setError] = useState(null);

  const { 
    comptes, 
    transactions, 
    ajouterTransaction, 
    loading,
    stats,
    error: contextError 
  } = useTresorerie();

  useEffect(() => {
    if (contextError) {
      setError(contextError);
    }
  }, [contextError]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      type: '',
      montant: '',
      date: new Date().toISOString().split('T')[0],
      modePaiement: '',
      description: '',
      compte: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      await ajouterTransaction(formData);
      handleCloseDialog();
    } catch (err) {
      setError(err.message);
    }
  };

  const renderTransactions = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Montant</TableCell>
            <TableCell>Mode de paiement</TableCell>
            <TableCell>Compte</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{format(new Date(transaction.date), 'dd/MM/yyyy', { locale: fr })}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.montant.toLocaleString('fr-FR', { style: 'currency', currency: transaction.devise })}</TableCell>
              <TableCell>{transaction.modePaiement}</TableCell>
              <TableCell>{transaction.compte}</TableCell>
              <TableCell>{transaction.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderStats = () => (
    <Grid container spacing={3}>
      {comptes.map((compte) => (
        <Grid item xs={12} sm={6} md={4} key={compte.id}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {compte.nom}
              </Typography>
              <Typography variant="h4" color="primary">
                {compte.solde.toLocaleString('fr-FR', { style: 'currency', currency: compte.devise })}
              </Typography>
              <Typography color="textSecondary">
                Solde actuel
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderChart = () => (
    <Box sx={{ height: 400, width: '100%' }}>
      <ResponsiveContainer>
        <BarChart data={stats.mouvementsParCompte}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="compte" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="montant" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ mt: 4 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      </Box>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestion de Trésorerie
        </Typography>

        {/* Onglets */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="tabs">
            <Tab label="Vue Générale" />
            <Tab label="Comptes" />
            <Tab label="Transactions" />
            <Tab label="Statistiques" />
          </Tabs>
        </Box>

        {/* Contenu des onglets */}
        <TabPanel value={activeTab} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Statistiques de Trésorerie
              </Typography>
              {renderChart()}
            </Grid>
            <Grid item xs={12}>
              {renderStats()}
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Grid container spacing={3}>
            {comptes.map((compte) => (
              <Grid item xs={12} sm={6} key={compte.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {compte.nom}
                    </Typography>
                    <Typography variant="h4" color="primary">
                      {compte.solde.toLocaleString('fr-FR', { style: 'currency', currency: compte.devise })}
                    </Typography>
                    <Typography color="textSecondary">
                      Solde actuel
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button variant="contained" color="primary" onClick={handleOpenDialog}>
              Nouvelle Transaction
            </Button>
          </Box>
          {renderTransactions()}
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Évolution des Soldes
              </Typography>
              {renderChart()}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Répartition par Mode de Paiement
              </Typography>
              {renderChart()}
            </Grid>
          </Grid>
        </TabPanel>
      </Container>

      {/* Composant de dialogue */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Ajouter une transaction</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                label="Type"
              >
                <MenuItem value="depot">Dépôt</MenuItem>
                <MenuItem value="retrait">Retrait</MenuItem>
                <MenuItem value="vente">Vente</MenuItem>
                <MenuItem value="achat">Achat</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              type="number"
              label="Montant"
              name="montant"
              value={formData.montant}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Mode de paiement</InputLabel>
              <Select
                name="modePaiement"
                value={formData.modePaiement}
                onChange={handleChange}
                label="Mode de paiement"
              >
                <MenuItem value="espece">Espèces (FCFA)</MenuItem>
                <MenuItem value="euro">Espèces (EUR)</MenuItem>
                <MenuItem value="dollar">Espèces (USD)</MenuItem>
                <MenuItem value="tpe">TPE</MenuItem>
                <MenuItem value="cheque">Chèque</MenuItem>
                <MenuItem value="carte">Carte bancaire</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Compte</InputLabel>
              <Select
                name="compte"
                value={formData.compte}
                onChange={handleChange}
                label="Compte"
              >
                {comptes.map((compte) => (
                  <MenuItem key={compte.id} value={compte.id}>
                    {compte.nom} ({compte.devise})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Messages d'erreur */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </>
  );
};

export default Tresorerie;
