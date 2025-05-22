import React, { useState } from 'react';
import {
  Box,
  Button,
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
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { mockProducts } from '../data/products';

const GestionVentes = () => {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  const [openVente, setOpenVente] = useState(false);
  const [openCommande, setOpenCommande] = useState(false);
  const [openConfection, setOpenConfection] = useState(false);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
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

    // Logique d'enregistrement de la vente
    console.log('Enregistrement de la vente:', cart);
    alert('Vente enregistrée avec succès !');
    // Ici, vous pouvez ajouter l'appel à l'API pour enregistrer la vente
  };

  return (
    <Box sx={{ p: 3 }}>
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
                    <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Quantité"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                fullWidth
              />
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
      <Paper sx={{ p: 2, mt: 2 }}>
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
    </Box>
  );
};

export default GestionVentes;
