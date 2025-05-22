export const categoriesHomme = {
  vetements: {
    types: ['Agbada', 'Danshiki', 'Goodluck', 'Albacoste'],
    variants: {
      sizes: ['Mannequin', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      ranges: ['Panier moyen', 'Leader', 'VIP', 'Royale', 'Présidentielle'],
      colors: ['Rouge', 'Bleu', 'Vert', 'Jaune', 'Orange', 'Rose', 'Violet', 'Noir', 'Blanc', 'Gris', 'Beige', 'Bordeaux', 'Marron', 'Turquoise']
    }
  },
  accessoires: {
    chaussures: {
      types: ['Souliers', 'Babouches', 'Tapettes'],
      variants: {
        sizes: ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
        colors: ['Noir', 'Bleu', 'Marron', 'Beige', 'Rouge', 'Vert', 'Jaune']
      }
    },
    autres: {
      types: ['Sacs', 'Montres', 'Chapeaux', 'Portefeuilles', 'Stylos', 'Bracelets'],
      variants: {
        colors: ['Noir', 'Bleu', 'Marron', 'Beige', 'Rouge', 'Vert', 'Jaune']
      }
    }
  }
};

export const mockProductsHomme = [
  // Agbada
  {
    id: 1,
    name: 'Agbada traditionnel',
    basePrice: 39990,
    category: 'Vêtements',
    type: 'Agbada',
    images: [
      'https://images.unsplash.com/photo-1576091160399-112ba350f521',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c'
    ],
    variants: categoriesHomme.vetements.variants,
    description: 'Agbada traditionnel en coton brodé à la main',
    stock: {
      'Mannequin': {
        'Panier moyen': { 'Rouge': 5, 'Bleu': 4, 'Noir': 3, 'Beige': 3, 'Rose': 2, 'Violet': 2 },
        'Leader': { 'Rouge': 4, 'Bleu': 3, 'Noir': 2, 'Beige': 2, 'Rose': 1, 'Violet': 1 },
        'VIP': { 'Rouge': 3, 'Bleu': 2, 'Noir': 1, 'Beige': 1, 'Rose': 1, 'Violet': 1 },
        'Royale': { 'Rouge': 2, 'Bleu': 1, 'Noir': 1, 'Beige': 1, 'Rose': 1, 'Violet': 1 },
        'Présidentielle': { 'Rouge': 1, 'Bleu': 1, 'Noir': 1, 'Beige': 1, 'Rose': 1, 'Violet': 1 }
      },
      // ... autres tailles
    }
  },
  // Danshiki
  {
    id: 2,
    name: 'Danshiki moderne',
    basePrice: 29990,
    category: 'Vêtements',
    type: 'Danshiki',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      'https://images.unsplash.com/photo-1576091160399-112ba350f521'
    ],
    variants: categoriesHomme.vetements.variants,
    description: 'Danshiki moderne en coton avec détails modernes',
    stock: {
      'Mannequin': {
        'Panier moyen': { 'Bleu': 5, 'Vert': 4, 'Jaune': 3, 'Orange': 3, 'Rose': 2, 'Violet': 2 },
        'Leader': { 'Bleu': 4, 'Vert': 3, 'Jaune': 2, 'Orange': 2, 'Rose': 1, 'Violet': 1 },
        'VIP': { 'Bleu': 3, 'Vert': 2, 'Jaune': 1, 'Orange': 1, 'Rose': 1, 'Violet': 1 },
        'Royale': { 'Bleu': 2, 'Vert': 1, 'Jaune': 1, 'Orange': 1, 'Rose': 1, 'Violet': 1 },
        'Présidentielle': { 'Bleu': 1, 'Vert': 1, 'Jaune': 1, 'Orange': 1, 'Rose': 1, 'Violet': 1 }
      },
      // ... autres tailles
    }
  },
  // ... autres produits
];
