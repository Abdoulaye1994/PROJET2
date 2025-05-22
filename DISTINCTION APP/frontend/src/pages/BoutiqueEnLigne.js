import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  TextField,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  useTheme,
  useMediaQuery,
  AppBar,
  Tabs,
  Tab,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Badge,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  FilterList as FilterListIcon,
  Close as CloseIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@mui/icons-material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useCart } from '../context/CartContext';
import ProductCategory from '../components/ProductCategory';
import { createPayment } from '../components/FedapayWrapper';
import { mockProducts } from '../data/products';
import { mockProductsHomme, categoriesHomme } from '../data/productsHomme';
import { mockProductsDame, categoriesDame } from '../data/productsDame';
import { mockServicesPressing } from '../data/servicesPressing';
import { UsersContext } from '../context/UsersContext';

const categories = [
  { id: 1, name: 'Homme', icon: 'shirt' },
  { id: 2, name: 'Dame', icon: 'dress' },
  { id: 3, name: 'Enfants', icon: 'child_care' },
  { id: 4, name: 'Accessoires', icon: 'accessories' },
  { id: 5, name: 'Boutiques', icon: 'store' },
  { id: 6, name: 'Contact', icon: 'contact_support' },
];

const filters = [
  { id: 1, name: 'Prix', options: ['Croissant', 'Décroissant'] },
  { id: 2, name: 'Gamme', options: ['Panier moyen', 'Leader', 'VIP', 'Royale', 'Présidentielle'] },
  { id: 3, name: 'Couleur', options: [
    'Rouge', 'Bleu', 'Vert', 'Jaune', 'Orange', 'Rose', 'Violet',
    'Noir', 'Blanc', 'Gris', 'Beige', 'Bordeaux', 'Marron', 'Turquoise'
  ] },
];

const fetchProducts = async () => {
  // Ici vous devrez implémenter l'appel à votre API pour récupérer les produits
  // Pour l'exemple, nous utilisons les produits mock
  return mockProducts;
};

function ProductCard({ product, addToCart, selectedVariant, setSelectedVariant }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    if (!selectedVariant) {
      alert('Veuillez sélectionner une variante du produit');
      return;
    }
    addToCart({
      ...product,
      variant: selectedVariant,
      price: product.basePrice * (selectedVariant.range === 'Panier moyen' ? 1 : 
                                selectedVariant.range === 'Leader' ? 1.2 : 
                                selectedVariant.range === 'VIP' ? 1.5 : 
                                selectedVariant.range === 'Royale' ? 2 : 2.5)
    });
  };

  return (
    <Card sx={{ maxWidth: 345, mb: 2 }}>
      <CardMedia
        component="img"
        height="240"
        image={product.images[0]}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        
        {/* Variants selection */}
        <Stack spacing={2} sx={{ mt: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Taille</InputLabel>
            <Select
              value={selectedVariant?.size || ''}
              onChange={(e) => setSelectedVariant(prev => ({
                ...prev,
                size: e.target.value
              }))}
              label="Taille"
            >
              {product.variants.sizes.map(size => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {product.variants.ranges && (
            <FormControl fullWidth>
              <InputLabel>Gamme</InputLabel>
              <Select
                value={selectedVariant?.range || ''}
                onChange={(e) => setSelectedVariant(prev => ({
                  ...prev,
                  range: e.target.value
                }))}
                label="Gamme"
              >
                {product.variants.ranges.map(range => (
                  <MenuItem key={range} value={range}>
                    {range}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <FormControl fullWidth>
            <InputLabel>Couleur</InputLabel>
            <Select
              value={selectedVariant?.color || ''}
              onChange={(e) => setSelectedVariant(prev => ({
                ...prev,
                color: e.target.value
              }))}
              label="Couleur"
            >
              {product.variants.colors.map(color => (
                <MenuItem key={color} value={color}>
                  {color}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedVariant && product.stock[selectedVariant.size] && product.stock[selectedVariant.size][selectedVariant.range] &&
            product.stock[selectedVariant.size][selectedVariant.range][selectedVariant.color] > 0 && (
              <Typography color="success.main" sx={{ mt: 1 }}>
                En stock : {product.stock[selectedVariant.size][selectedVariant.range][selectedVariant.color]} unités
              </Typography>
            )
          }
        </Stack>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Typography variant="h6" color="primary">
            {selectedVariant && product.basePrice * (selectedVariant.range === 'Panier moyen' ? 1 : 
                                                 selectedVariant.range === 'Leader' ? 1.2 : 
                                                 selectedVariant.range === 'VIP' ? 1.5 : 
                                                 selectedVariant.range === 'Royale' ? 2 : 2.5).toLocaleString()} FCFA
          </Typography>
          <IconButton onClick={() => setIsFavorite(!isFavorite)} color={isFavorite ? 'error' : 'default'}>
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleAddToCart} color="primary" disabled={!selectedVariant}>
          Ajouter au panier
        </Button>
      </CardActions>
    </Card>
  );
}

function FilterDrawer({ open, onClose, filters }) {
  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      onOpen={() => {}}
    >
      <Box sx={{ width: 320 }} role="presentation">
        <IconButton onClick={onClose} sx={{ p: 1, ml: 'auto' }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" sx={{ p: 2 }}>
          Filtrer
        </Typography>
        <List>
          {filters.map((filter) => (
            <ListItem key={filter.id}>
              <ListItemText primary={filter.name} />
              <TextField
                select
                size="small"
                defaultValue=""
                sx={{ ml: 2 }}
              >
                {filter.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
            </ListItem>
          ))}
        </List>
      </Box>
    </SwipeableDrawer>
  );
}

export default function BoutiqueEnLigne() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const { cart, addToCart, removeFromCart, checkout } = useCart();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { usersCount } = React.useContext(UsersContext);

  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const newProducts = await fetchProducts();
      setProducts(prev => [...prev, ...newProducts]);
      setHasMore(newProducts.length > 0);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await createPayment(
        cart.reduce((total, item) => total + item.price * item.quantity, 0),
        'XOF',
        'Achat sur DISTINCTION'
      );
      
      // Rediriger vers la page de paiement Fedapay
      window.location.href = response.redirect_url;
    } catch (error) {
      console.error('Erreur lors du paiement:', error);
    }
  };

  return (
    <UsersContext.Provider>
      <Box>
        <AppBar position="static">
          <Tabs value={selectedCategory} onChange={(e, v) => setSelectedCategory(v)}>
            {categories.map((cat) => (
              <Tab key={cat.id} label={cat.name} />
            ))}
          </Tabs>
          <Box sx={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)' }}>
            <Badge badgeContent={usersCount} color="primary" showZero>
              <Typography variant="body2" color="white">
                Utilisateurs connectés
              </Typography>
            </Badge>
          </Box>
        </AppBar>
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <ProductCategory
          category={categories.find(cat => cat.id === selectedCategory)?.name || 'Tous les produits'}
          products={products}
          addToCart={addToCart}
          setSelectedVariant={setSelectedVariant}
        />
      </Container>
      
      <Box sx={{ position: 'fixed', right: 20, bottom: 20, zIndex: 1000 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCartOpen(true)}
          startIcon={<ShoppingCartIcon />}
        >
          Panier ({cart.length})
        </Button>
      </Box>
      
      <FilterDrawer
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        filters={filters}
      />
      
      <Dialog open={cartOpen} onClose={() => setCartOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Panier</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {cart.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Paper>
                  <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.name}
                      sx={{ width: 80, height: 80, mr: 2 }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography>{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.price.toLocaleString()} FCFA x {item.quantity}
                      </Typography>
                    </Box>
                    <IconButton onClick={() => removeFromCart(item.id)}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCartOpen(false)}>Fermer</Button>
          <Button variant="contained" color="primary" onClick={handleCheckout}>
            Payer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    </UsersContext.Provider>
  );
}
