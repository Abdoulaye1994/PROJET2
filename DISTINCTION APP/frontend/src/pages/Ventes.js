import React, { useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { mockProducts } from '../data/products';
import { mockSellers } from '../data/sellers';
import { boutiques } from '../data/boutiques';

const Ventes = () => {
  try {
    console.log('Ventes component mounted');
    
    const navigate = useNavigate();
    const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
    console.log('Cart context:', { cart });

    if (!cart) {
      console.error('Cart context is not available');
      return (
        <Container maxWidth="lg">
          <Box sx={{ my: 4, textAlign: 'center' }}>
            <Typography variant="h4" color="error">
              Erreur : Le contexte du panier n'est pas disponible
            </Typography>
          </Box>
        </Container>
      );
    }

    const [openVente, setOpenVente] = useState(false);
    const [openCommande, setOpenCommande] = useState(false);
    const [openConfection, setOpenConfection] = useState(false);
    const [selectedClient, setSelectedClient] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedSeller, setSelectedSeller] = useState('');
    const [selectedBoutique, setSelectedBoutique] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [retouche, setRetouche] = useState(false);
    const [clients] = useState(['Client 1', 'Client 2', 'Client 3']);

    const handleAddToCart = () => {
      if (!selectedClient || !selectedProduct) {
        alert('Veuillez sélectionner un client et un produit');
        return;
      }

      const product = mockProducts.find(p => p.id === parseInt(selectedProduct));
      if (!product) return;

      const variant = {
        size: '',
        range: '',
        color: ''
      };

      addToCart({
        ...product,
        variant,
        quantity,
        client: selectedClient,
        sellerId: selectedSeller,
        boutiqueId: selectedBoutique,
        retouche
      });
      setOpenVente(false);
    };

    const handleRemoveFromCart = (product) => {
      removeFromCart(product);
    };

    const handleUpdateQuantity = (product, newQuantity) => {
      updateQuantity(product, newQuantity);
    };

    const handleFinalizeSale = () => {
      if (cart.length === 0) {
        alert('Le panier est vide');
        return;
      }

      console.log('Enregistrement de la vente:', cart);
      alert('Vente enregistrée avec succès !');
    };

    const ventes = [
      { id: 1, date: '2025-05-17', client: 'Marie Dupont', montant: 1500, statut: 'Payé', sellerId: 1, boutiqueId: 1 },
      { id: 2, date: '2025-05-16', client: 'Jean Martin', montant: 2300, statut: 'En attente', sellerId: 2, boutiqueId: 1 },
      { id: 3, date: '2025-05-15', client: 'Sophie Bernard', montant: 950, statut: 'Payé', sellerId: 3, boutiqueId: 2 },
      { id: 4, date: '2025-05-14', client: 'Pierre Dubois', montant: 1800, statut: 'Payé', sellerId: 4, boutiqueId: 3 },
      { id: 5, date: '2025-05-13', client: 'Marie Dupont', montant: 1200, statut: 'En attente', sellerId: 5, boutiqueId: 3 }
    ];

    return (
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Gestion des Ventes
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenVente(true)}
              sx={{ mr: 2 }}
            >
              Nouvelle Vente
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setOpenCommande(true)}
              sx={{ mr: 2 }}
            >
              Nouvelle Commande
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => setOpenConfection(true)}
            >
              Nouvelle Confection
            </Button>
          </Box>

          {/* Dialog Nouvelle Vente */}
          <Dialog open={openVente} onClose={() => setOpenVente(false)} maxWidth="md" fullWidth>
            <DialogTitle>Nouvelle Vente</DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Client</InputLabel>
                    <Select
                      value={selectedClient}
                      onChange={(e) => setSelectedClient(e.target.value)}
                      label="Client"
                    >
                      {clients.map(client => (
                        <MenuItem key={client} value={client}>{client}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Produit</InputLabel>
                    <Select
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                      label="Produit"
                    >
                      {mockProducts.map(product => (
                        <MenuItem key={product.id} value={product.id}>
                          {product.name} - {product.price} FCFA
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Vendeur</InputLabel>
                    <Select
                      value={selectedSeller}
                      onChange={(e) => setSelectedSeller(e.target.value)}
                      label="Vendeur"
                    >
                      {mockSellers.map(seller => (
                        <MenuItem key={seller.id} value={seller.id}>
                          {seller.name} - {seller.role}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Boutique</InputLabel>
                    <Select
                      value={selectedBoutique}
                      onChange={(e) => setSelectedBoutique(e.target.value)}
                      label="Boutique"
                    >
                      {boutiques.map(boutique => (
                        <MenuItem key={boutique.id} value={boutique.id}>
                          {boutique.nom} ({boutique.ville})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Quantité</InputLabel>
                    <Select
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      label="Quantité"
                    >
                      {[1, 2, 3, 4, 5].map(qty => (
                        <MenuItem key={qty} value={qty}>{qty}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={retouche}
                        onChange={(e) => setRetouche(e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Box>
                        <Typography>Retouche</Typography>
                        {retouche && <Typography variant="caption">Selon mesures du client</Typography>}
                      </Box>
                    }
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenVente(false)}>Annuler</Button>
              <Button onClick={handleAddToCart} variant="contained" color="primary">
                Ajouter au Panier
              </Button>
            </DialogActions>
          </Dialog>

          {/* Panier */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Panier de Vente
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Produit</TableCell>
                    <TableCell>Client</TableCell>
                    <TableCell>Quantité</TableCell>
                    <TableCell>Retouche</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.client}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleUpdateQuantity(item, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                        >
                          <RemoveIcon />
                        </IconButton>
                        {item.quantity}
                        <IconButton
                          onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                        >
                          <AddIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        {item.retouche && 'Selon mesures du client'}
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleRemoveFromCart(item)}>
                          <RemoveIcon color="error" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="success"
                onClick={handleFinalizeSale}
                disabled={cart.length === 0}
              >
                Finaliser la Vente
              </Button>
            </Box>
          </Paper>

          {/* Historique des ventes */}
          <Typography variant="h6" gutterBottom>
            Historique des Ventes
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Client</TableCell>
                  <TableCell>Vendeur</TableCell>
                  <TableCell>Boutique</TableCell>
                  <TableCell>Montant</TableCell>
                  <TableCell>Statut</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ventes.map((vente) => {
                  const seller = mockSellers.find(s => s.id === vente.sellerId);
                  const boutique = boutiques.find(b => b.id === vente.boutiqueId);
                  return (
                    <TableRow key={vente.id}>
                      <TableCell>{new Date(vente.date).toLocaleDateString('fr-FR')}</TableCell>
                      <TableCell>{vente.client}</TableCell>
                      <TableCell>{seller?.name}</TableCell>
                      <TableCell>{boutique?.nom}</TableCell>
                      <TableCell>{vente.montant} FCFA</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="outlined"
                          color={vente.statut === 'Payé' ? 'success' : 'warning'}
                        >
                          {vente.statut}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    );
  } catch (error) {
    console.error('Erreur dans le composant Ventes:', error);
    return (
      <Container maxWidth="lg">
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h4" color="error">
            Une erreur est survenue : {error.message}
          </Typography>
        </Box>
      </Container>
    );
  }
};

export default Ventes;