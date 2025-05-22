import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Chip,
  LinearProgress,
  Skeleton,
} from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Statistiques = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    sales: [],
    sellers: [],
    products: [],
    countries: [],
    orders: [],
    bestSeller: null,
    lowStockProducts: [],
    topCustomers: [],
    alerts: [],
  });

  useEffect(() => {
    // Simuler l'API avec des données mockées
    const mockData = {
      sales: [
        { date: '2024-01', amount: 15000 },
        { date: '2024-02', amount: 18000 },
        { date: '2024-03', amount: 22000 },
        { date: '2024-04', amount: 25000 },
        { date: '2024-05', amount: 28000 },
      ],
      sellers: [
        { name: 'Jean Dupont', points: 1200, sales: 150 },
        { name: 'Marie Martin', points: 950, sales: 120 },
        { name: 'Pierre Dubois', points: 800, sales: 100 },
      ],
      countries: [
        { country: 'France', sales: 30000 },
        { country: 'Belgique', sales: 15000 },
        { country: 'Suisse', sales: 12000 },
      ],
      orders: {
        pending: 45,
        inProgress: 30,
        completed: 120,
      },
      lowStockProducts: [
        { name: 'Produit A', stock: 5, threshold: 10 },
        { name: 'Produit B', stock: 3, threshold: 5 },
      ],
      topCustomers: [
        { name: 'Client 1', orders: 25, total: 15000 },
        { name: 'Client 2', orders: 20, total: 12000 },
        { name: 'Client 3', orders: 18, total: 10000 },
      ],
      alerts: [
        { type: 'stock', message: 'Produit A en rupture', severity: 'error' },
        { type: 'order', message: 'Commandes en retard', severity: 'warning' },
      ],
    };

    // Simuler une requête API avec fetch
    // fetch('https://api.example.com/stats')
    //   .then(response => response.json())
    //   .then(data => setStats(data))
    //   .catch(error => console.error('Erreur:', error))
    //   .finally(() => setLoading(false));

    setStats(mockData);
    setLoading(false);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
    }).format(amount);
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat('fr-FR').format(number);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Skeleton variant="rectangular" height={150} />
          </Grid>
          <Grid item xs={12} md={3}>
            <Skeleton variant="rectangular" height={150} />
          </Grid>
          <Grid item xs={12} md={3}>
            <Skeleton variant="rectangular" height={150} />
          </Grid>
          <Grid item xs={12} md={3}>
            <Skeleton variant="rectangular" height={150} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Statistiques principales */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Chiffre d'affaires
              </Typography>
              <Typography variant="h4" component="div">
                {formatCurrency(stats.sales.reduce((acc, sale) => acc + sale.amount, 0))}
              </Typography>
              <Typography color="textSecondary">
                +12% vs mois précédent
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Meilleur vendeur
              </Typography>
              <Typography variant="h4" component="div">
                {stats.sellers[0]?.name || 'Non disponible'}
              </Typography>
              <Typography color="textSecondary">
                {formatNumber(stats.sellers[0]?.points || 0)} points
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Commandes en cours
              </Typography>
              <Typography variant="h4" component="div">
                {stats.orders.inProgress}
              </Typography>
              <Typography color="textSecondary">
                {stats.orders.pending} en attente
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Stocks en alerte
              </Typography>
              <Typography variant="h4" component="div">
                {stats.lowStockProducts.length}
              </Typography>
              <Typography color="textSecondary">
                {stats.lowStockProducts.map(p => p.name).join(', ')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Graphiques */}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Évolution des ventes" />
            <CardContent>
              <LineChart width={600} height={300} data={stats.sales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" />
              </LineChart>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Répartition des ventes par pays" />
            <CardContent>
              <PieChart width={600} height={300}>
                <Pie
                  data={stats.countries}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="sales"
                >
                  {stats.countries.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tableaux détaillés */}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Top vendeurs" />
            <CardContent>
              <Box sx={{ width: '100%' }}>
                {stats.sellers.map((seller, index) => (
                  <Box key={seller.name} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">
                      {index + 1}. {seller.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: '100%', mr: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={(seller.points / stats.sellers[0].points) * 100}
                        />
                      </Box>
                      <Box sx={{ minWidth: 35 }}>
                        <Typography variant="body2" color="text.secondary">
                          {formatNumber(seller.points)} points
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Meilleurs clients" />
            <CardContent>
              <Box sx={{ width: '100%' }}>
                {stats.topCustomers.map((customer, index) => (
                  <Box key={customer.name} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">
                      {index + 1}. {customer.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatNumber(customer.orders)} commandes - {formatCurrency(customer.total)}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Alertes */}
      <Grid item xs={12} sx={{ mt: 4 }}>
        <Card>
          <CardHeader title="Alertes" />
          <CardContent>
            {stats.alerts.map((alert, index) => (
              <Chip
                key={index}
                label={alert.message}
                color={alert.severity === 'error' ? 'error' : 'warning'}
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
}

export default Statistiques;