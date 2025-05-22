import React, { createContext, useContext, useState, useEffect } from 'react';
import { POINTS_CONFIG } from '../data/pointsConfiguration';
import { mockProducts } from '../data/products';

const PointsContext = createContext();

export function PointsProvider({ children }) {
  const [sellers, setSellers] = useState([]);
  const [sales, setSales] = useState([]);
  const [customers, setCustomers] = useState(new Set());

  // Calcul des points pour une vente
  const calculatePoints = (sale) => {
    const product = mockProducts.find(p => p.id === sale.productId);
    if (!product) return 0;

    let points = 0;
    
    // Points de base selon le type de produit
    if (product.type === 'Agbada') {
      points += POINTS_CONFIG.productPoints['Agbada'];
    } else if (product.type === 'Danshiki') {
      points += POINTS_CONFIG.productPoints['Danshiki'];
    } else if (product.type === 'goodluck' && product.variant?.range) {
      points += product.variant.range === 'Panier moyen' 
        ? POINTS_CONFIG.productPoints['Goodluck Panier moyen']
        : POINTS_CONFIG.productPoints['Goodluck Premium'];
    } else if (['robe', 'boubou'].includes(product.type)) {
      points += POINTS_CONFIG.productPoints[product.type.charAt(0).toUpperCase() + product.type.slice(1)];
    } else if (sale.amount >= POINTS_CONFIG.thresholds.minSaleValue) {
      points += POINTS_CONFIG.productPoints['Autres tenues'];
    }

    // Bonus spéciaux
    if (sale.amount >= POINTS_CONFIG.thresholds.highValueSale) {
      points += POINTS_CONFIG.bonuses.highValueSale;
    }

    if (customers.has(sale.client)) {
      points += POINTS_CONFIG.bonuses.customerLoyalty;
    } else {
      customers.add(sale.client);
    }

    return points;
  };

  // Enregistrer une nouvelle vente
  const registerSale = (sale) => {
    const points = calculatePoints(sale);
    const seller = sellers.find(s => s.id === sale.sellerId) || {
      id: sale.sellerId,
      name: sale.sellerName,
      totalPoints: 0,
      dailyPoints: 0,
      weeklyPoints: 0,
      monthlyPoints: 0,
      sales: []
    };

    // Mise à jour des points
    const newSeller = {
      ...seller,
      totalPoints: seller.totalPoints + points,
      dailyPoints: seller.dailyPoints + points,
      weeklyPoints: seller.weeklyPoints + points,
      monthlyPoints: seller.monthlyPoints + points,
      sales: [...seller.sales, { ...sale, points }]
    };

    // Mise à jour des vendeurs
    setSellers(prev => 
      prev.map(s => s.id === sale.sellerId ? newSeller : s)
    );

    // Ajout de la vente
    setSales(prev => [...prev, { ...sale, points }]);
  };

  // Calcul des bonus
  useEffect(() => {
    const calculateBonuses = () => {
      // Bonus mensuel
      const monthlyTopSeller = sellers
        .sort((a, b) => b.monthlyPoints - a.monthlyPoints)[0];
      if (monthlyTopSeller) {
        monthlyTopSeller.monthlyPoints += POINTS_CONFIG.bonuses.monthlyTopSeller;
        monthlyTopSeller.totalPoints += POINTS_CONFIG.bonuses.monthlyTopSeller;
      }

      // Bonus hebdomadaire
      const weeklyTopSeller = sellers
        .sort((a, b) => b.weeklyPoints - a.weeklyPoints)[0];
      if (weeklyTopSeller) {
        weeklyTopSeller.weeklyPoints += POINTS_CONFIG.bonuses.weeklyTopSeller;
        weeklyTopSeller.totalPoints += POINTS_CONFIG.bonuses.weeklyTopSeller;
      }

      // Bonus quotidien
      const dailyTopSeller = sellers
        .sort((a, b) => b.dailyPoints - a.dailyPoints)[0];
      if (dailyTopSeller) {
        dailyTopSeller.dailyPoints += POINTS_CONFIG.bonuses.dailyTopSeller;
        dailyTopSeller.totalPoints += POINTS_CONFIG.bonuses.dailyTopSeller;
      }

      setSellers([...sellers]);
    };

    // Calculer les bonus toutes les 24h
    const timer = setInterval(calculateBonuses, 24 * 60 * 60 * 1000);
    calculateBonuses();

    return () => clearInterval(timer);
  }, []);

  // Classement des vendeurs
  const getSellerRanking = (period = 'total') => {
    const ranking = [...sellers];
    const sortKey = {
      'total': 'totalPoints',
      'daily': 'dailyPoints',
      'weekly': 'weeklyPoints',
      'monthly': 'monthlyPoints'
    }[period];

    return ranking.sort((a, b) => b[sortKey] - a[sortKey]);
  };

  // Statistiques
  const getSellerStats = (sellerId, period = 'total') => {
    const seller = sellers.find(s => s.id === sellerId);
    if (!seller) return null;

    const stats = {
      totalPoints: seller.totalPoints,
      sales: seller.sales.length,
      averagePoints: seller.sales.length > 0 
        ? seller.totalPoints / seller.sales.length
        : 0,
      topSales: seller.sales
        .sort((a, b) => b.points - a.points)
        .slice(0, 5)
    };

    switch (period) {
      case 'daily':
        stats.points = seller.dailyPoints;
        break;
      case 'weekly':
        stats.points = seller.weeklyPoints;
        break;
      case 'monthly':
        stats.points = seller.monthlyPoints;
        break;
      default:
        stats.points = seller.totalPoints;
    }

    return stats;
  };

  return (
    <PointsContext.Provider value={{
      sellers,
      sales,
      registerSale,
      getSellerRanking,
      getSellerStats
    }}>
      {children}
    </PointsContext.Provider>
  );
}

export function usePoints() {
  const context = useContext(PointsContext);
  if (!context) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
}
