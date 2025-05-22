import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Button,
  Box,
} from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';

export default function PressingServiceCard({ service, addToCart }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {service.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {service.description}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          {service.services.map((item, index) => (
            <Chip
              key={index}
              label={`${item.quantity}x ${item.type}`}
              size="small"
            />
          ))}
        </Stack>
        <Typography variant="h6" color="primary">
          {service.prix.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' })}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Temps de livraison : {service.temps}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ShoppingCartIcon />}
            onClick={() => addToCart(service)}
            fullWidth
          >
            Commander
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
