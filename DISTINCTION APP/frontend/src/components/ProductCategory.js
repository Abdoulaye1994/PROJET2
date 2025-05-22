import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  Divider,
  Paper,
} from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import PressingServiceCard from './PressingServiceCard';

export default function ProductCategory({ category, products, addToCart }) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {category}
      </Typography>
      <Divider sx={{ mb: 3 }} />
      
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            {product.type === 'service' ? (
              <PressingServiceCard service={product} addToCart={addToCart} />
            ) : (
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {product.description}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    {product.variants.colors.map((color) => (
                      <Chip
                        key={color}
                        label={color}
                        size="small"
                        sx={{
                          '& .MuiChip-label': {
                            color: color.toLowerCase() === 'noir' ? 'white' : 'black',
                          },
                        }}
                      />
                    ))}
                  </Stack>
                  <Typography variant="h6" color="primary">
                    {product.basePrice.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' })}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => addToCart(product)}
                    sx={{ mt: 2 }}
                  >
                    Ajouter au panier
                  </Button>
                </CardContent>
              </Card>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
