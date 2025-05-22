import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Avatar,
  Chip,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Person as PersonIcon,
  BarChart as BarChartIcon,
  ShoppingCart as ShoppingCartIcon,
  ProductionQuantityLimits as ProductionQuantityLimitsIcon,
  Settings as SettingsIcon,
  Assignment as AssignmentIcon,
  AttachMoney as AttachMoneyIcon,
  Description as DescriptionIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Timeline as TimelineIcon,
  Star as StarIcon,
  ThumbUp as ThumbUpIcon,
  Event as EventIcon,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';

// Mock data pour les statistiques
const mockStats = {
  sales: {
    total: 500000,
    monthly: 120000,
    yearly: 1500000,
    trend: 'up',
  },
  products: {
    total: 250,
    monthly: 50,
    yearly: 600,
    trend: 'up',
  },
  performance: {
    rating: 4.5,
    feedbacks: 120,
    satisfaction: 95,
    trend: 'up',
  },
  attendance: {
    present: 25,
    total: 30,
    percentage: 83.3,
    trend: 'up',
  },
};

function StatCard({ title, value, icon, trend, description }) {
  const theme = useTheme();
  const trendIcon = trend === 'up' ? <TrendingUpIcon sx={{ color: 'success.main' }} /> : <TrendingDownIcon sx={{ color: 'error.main' }} />;

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: theme.palette.secondary.main, mr: 2 }}>
            {icon}
          </Avatar>
          <Typography variant="h6">{title}</Typography>
        </Box>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {value}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', color: trend === 'up' ? 'success.main' : 'error.main' }}>
          {trendIcon}
          <Typography variant="body2" sx={{ ml: 1 }}>
            {description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

function UserTimeline({ stats }) {
  const timelineItems = [
    { date: 'Aujourd\'hui', value: stats.sales.monthly, icon: <ShoppingCartIcon /> },
    { date: 'Ce mois', value: stats.products.monthly, icon: <ProductionQuantityLimitsIcon /> },
    { date: 'Cette année', value: stats.sales.yearly, icon: <BarChartIcon /> },
  ];

  return (
    <List>
      {timelineItems.map((item, index) => (
        <ListItem key={index} divider={index < timelineItems.length - 1}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {item.icon}
          </Avatar>
          <ListItemText
            primary={item.date}
            secondary={
              <Typography variant="h6" component="span" sx={{ color: 'primary.main' }}>
                {item.value} FCFA
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

function UtilisateurDetails() {
  const { id } = useParams();
  const [stats, setStats] = useState(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    // Ici vous devrez implémenter l'appel à votre API pour récupérer les statistiques de l'utilisateur
    // Pour l'exemple, nous utilisons les données mock
    setStats(mockStats);
  }, [id]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!stats) {
    return <div>Chargement...</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Statistiques de l'utilisateur
      </Typography>

      <Tabs value={value} onChange={handleChange} sx={{ mb: 4 }}>
        <Tab label="Vue d\'ensemble" />
        <Tab label="Ventes" />
        <Tab label="Performance" />
        <Tab label="Présence" />
      </Tabs>

      <Grid container spacing={3}>
        {value === 0 && (
          <>
            <Grid item xs={12} md={6}>
              <StatCard
                title="Total des ventes"
                value={`${stats.sales.total} FCFA`}
                icon={<AttachMoneyIcon />}
                trend={stats.sales.trend}
                description="+20% par rapport à l\'année dernière"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StatCard
                title="Produits vendus"
                value={stats.products.total}
                icon={<ShoppingCartIcon />}
                trend={stats.products.trend}
                description="+15% par rapport à l\'année dernière"
              />
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Timeline des performances
                </Typography>
                <UserTimeline stats={stats} />
              </Paper>
            </Grid>
          </>
        )}

        {value === 1 && (
          <>
            <Grid item xs={12} md={6}>
              <StatCard
                title="Ventes mensuelles"
                value={`${stats.sales.monthly} FCFA`}
                icon={<BarChartIcon />}
                trend={stats.sales.trend}
                description="+15% par rapport au mois dernier"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StatCard
                title="Produits mensuels"
                value={stats.products.monthly}
                icon={<ProductionQuantityLimitsIcon />}
                trend={stats.products.trend}
                description="+10% par rapport au mois dernier"
              />
            </Grid>
          </>
        )}

        {value === 2 && (
          <>
            <Grid item xs={12} md={6}>
              <StatCard
                title="Note de performance"
                value={`${stats.performance.rating}/5`}
                icon={<StarIcon />}
                trend={stats.performance.trend}
                description="+0.5 points cette année"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StatCard
                title="Satisfaction client"
                value={`${stats.performance.satisfaction}%`}
                icon={<ThumbUpIcon />}
                trend={stats.performance.trend}
                description="+5% cette année"
              />
            </Grid>
          </>
        )}

        {value === 3 && (
          <>
            <Grid item xs={12} md={6}>
              <StatCard
                title="Présence"
                value={`${stats.attendance.percentage}%`}
                icon={<TimelineIcon />}
                trend={stats.attendance.trend}
                description="25 jours présents sur 30"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StatCard
                title="Total des jours"
                value={stats.attendance.total}
                icon={<EventIcon />}
                trend={stats.attendance.trend}
                description="30 jours dans le mois"
              />
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
}

export default UtilisateurDetails;
