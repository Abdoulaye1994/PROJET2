export const POINTS_CONFIG = {
  // Points par type de produit
  productPoints: {
    'Agbada': 6,
    'Danshiki': 4,
    'Goodluck Premium': 3,
    'Goodluck Panier moyen': 2,
    'Robe': 2,
    'Boubou dame': 2,
    'Autres tenues': 1,
    'Pressing': 1
  },

  // Bonus spéciaux
  bonuses: {
    dailyTopSeller: 1,      // Bonus quotidien pour le meilleur vendeur
    weeklyTopSeller: 2,     // Bonus hebdomadaire pour le meilleur vendeur
    highValueSale: 1,       // Bonus pour vente >= 1.000.000 FCFA
    customerLoyalty: 2      // Bonus pour fidélisation client
  },

  // Seuils
  thresholds: {
    highValueSale: 1000000, // 1.000.000 FCFA
    minSaleValue: 50000     // 50.000 FCFA pour les points "Autres tenues"
  }
};
