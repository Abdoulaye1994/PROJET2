export const productVariants = {
  sizes: {
    clothes: ['Mannequin', 'M', 'L', 'XL', 'XXL', 'XXXL', 'Enfant'],
    shoes: ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45']
  },
  ranges: ['Panier moyen', 'Leader', 'VIP', 'Royale', 'Présidentielle'],
  colors: [
    'Rouge', 'Bleu', 'Vert', 'Jaune', 'Orange', 'Rose', 'Violet',
    'Noir', 'Blanc', 'Gris', 'Beige', 'Bordeaux', 'Marron', 'Turquoise'
  ]
};

export const mockProducts = [
  {
    id: 1,
    name: 'Robe de soirée élégante',
    basePrice: 29990,
    category: 'Vêtements',
    type: 'robe',
    images: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
      'https://images.unsplash.com/photo-1521587760476-6c02646c568d'
    ],
    variants: {
      sizes: ['Mannequin', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      ranges: ['Panier moyen', 'Leader', 'VIP', 'Royale', 'Présidentielle'],
      colors: ['Rouge', 'Bleu', 'Noir', 'Beige', 'Rose', 'Violet', 'Jaune']
    },
    description: 'Robe élégante en soie avec détails brodés',
    stock: {
      'Mannequin': {
        'Panier moyen': { 'Rouge': 5, 'Bleu': 4, 'Noir': 3, 'Beige': 3, 'Rose': 2, 'Violet': 2, 'Jaune': 1 },
        'Leader': { 'Rouge': 4, 'Bleu': 3, 'Noir': 2, 'Beige': 2, 'Rose': 1, 'Violet': 1, 'Jaune': 1 },
        'VIP': { 'Rouge': 3, 'Bleu': 2, 'Noir': 1, 'Beige': 1, 'Rose': 1, 'Violet': 1, 'Jaune': 1 },
        'Royale': { 'Rouge': 2, 'Bleu': 1, 'Noir': 1, 'Beige': 1, 'Rose': 1, 'Violet': 1, 'Jaune': 1 },
        'Présidentielle': { 'Rouge': 1, 'Bleu': 1, 'Noir': 1, 'Beige': 1, 'Rose': 1, 'Violet': 1, 'Jaune': 1 }
      },
      'M': {
        'Panier moyen': { 'Rouge': 6, 'Bleu': 5, 'Noir': 4, 'Beige': 4, 'Rose': 3, 'Violet': 3, 'Jaune': 2 },
        'Leader': { 'Rouge': 5, 'Bleu': 4, 'Noir': 3, 'Beige': 3, 'Rose': 2, 'Violet': 2, 'Jaune': 1 },
        'VIP': { 'Rouge': 4, 'Bleu': 3, 'Noir': 2, 'Beige': 2, 'Rose': 1, 'Violet': 1, 'Jaune': 1 },
        'Royale': { 'Rouge': 3, 'Bleu': 2, 'Noir': 1, 'Beige': 1, 'Rose': 1, 'Violet': 1, 'Jaune': 1 },
        'Présidentielle': { 'Rouge': 2, 'Bleu': 1, 'Noir': 1, 'Beige': 1, 'Rose': 1, 'Violet': 1, 'Jaune': 1 }
      },
      'L': {
        'Panier moyen': { 'Rouge': 5, 'Bleu': 4, 'Noir': 3, 'Beige': 3, 'Rose': 2, 'Violet': 2, 'Jaune': 1 },
        'Leader': { 'Rouge': 4, 'Bleu': 3, 'Noir': 2, 'Beige': 2, 'Rose': 1, 'Violet': 1, 'Jaune': 1 },
        'VIP': { 'Rouge': 3, 'Bleu': 2, 'Noir': 1, 'Beige': 1, 'Rose': 1, 'Violet': 1, 'Jaune': 1 },
        'Royale': { 'Rouge': 2, 'Bleu': 1, 'Noir': 1, 'Beige': 1, 'Rose': 1, 'Violet': 1, 'Jaune': 1 },
        'Présidentielle': { 'Rouge': 1, 'Bleu': 1, 'Noir': 1, 'Beige': 1, 'Rose': 1, 'Violet': 1, 'Jaune': 1 }
      },
      'XL': {
        'Panier moyen': { 'Rouge': 4, 'Bleu': 3, 'Noir': 2, 'Beige': 2, 'Rose': 1, 'Violet': 1, 'Jaune': 1 },
        'Leader': { 'Rouge': 3, 'Bleu': 2, 'Noir': 1, 'Beige': 1, 'Rose': 1, 'Violet': 1, 'Jaune': 1 },
        'VIP': { 'Rouge': 2, 'Bleu': 1, 'Noir': 1, 'Beige': 1, 'Rose': 1, 'Violet': 1, 'Jaune': 1 },
        'Royale': { 'Rouge': 1, 'Bleu': 1, 'Noir': 1, 'Beige': 1, 'Rose': 1, 'Violet': 1, 'Jaune': 1 },
        'Présidentielle': { 'Rouge': 1, 'Bleu': 1, 'Noir': 1, 'Beige': 1, 'Rose': 1, 'Violet': 1, 'Jaune': 1 }
      },
      'XXL': {
        'Panier moyen': { 'Rouge': 3, 'Bleu': 2, 'Noir': 1, 'Beige': 1, 'Rose': 1, 'Violet': 1, 'Jaune': 1 },
        'Leader': { 'Rouge': 2, 'Bleu': 1, 'Noir': 1, 'Beige': 1, 'Rose': 1, 'Violet': 1, 'Jaune': 1 },
        'VIP': { 'Rouge': 1, 'Bleu': 1, 'Noir': 1, 'Beige': 1, 'Rose': 1, 'Violet': 1, 'Jaune': 1 },
        'Royale': { 'Rouge': 1, 'Bleu': 1, 'Noir': 1, 'Beige': 1, 'Rose': 1, 'Violet': 1, 'Jaune': 1 },
        'Présidentielle': { 'Rouge': 1, 'Bleu': 1, 'Noir': 1, 'Beige': 1, 'Rose': 1, 'Violet': 1, 'Jaune': 1 }
      },
      'XXXL': {
        'Panier moyen': { 'Rouge': 2, 'Bleu': 1, 'Noir': 1, 'Beige': 1, 'Rose': 1, 'Violet': 1, 'Jaune': 1 },
        'Leader': { 'Rouge': 1, 'Bleu': 1, 'Noir': 1, 'Beige': 1, 'Rose': 1, 'Violet': 1, 'Jaune': 1 },
        'VIP': { 'Rouge': 1, 'Bleu': 1, 'Noir': 1, 'Beige': 1, 'Rose': 1, 'Violet': 1, 'Jaune': 1 },
        'Royale': { 'Rouge': 1, 'Bleu': 1, 'Noir': 1, 'Beige': 1, 'Rose': 1, 'Violet': 1, 'Jaune': 1 },
        'Présidentielle': { 'Rouge': 1, 'Bleu': 1, 'Noir': 1, 'Beige': 1, 'Rose': 1, 'Violet': 1, 'Jaune': 1 }
      }
    }
  },
  {
    id: 2,
    name: 'Escarpins élégants',
    basePrice: 14990,
    category: 'Chaussures',
    type: 'escarpins',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      'https://images.unsplash.com/photo-1576091160399-112ba350f521'
    ],
    variants: {
      sizes: ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
      colors: ['Noir', 'Bleu', 'Rose', 'Beige', 'Rouge', 'Vert', 'Jaune']
    },
    description: 'Escarpins élégants en cuir verni',
    stock: {
      '35': { 'Noir': 5, 'Bleu': 4, 'Rose': 3, 'Beige': 3, 'Rouge': 2, 'Vert': 2, 'Jaune': 1 },
      '36': { 'Noir': 6, 'Bleu': 5, 'Rose': 4, 'Beige': 4, 'Rouge': 3, 'Vert': 3, 'Jaune': 2 },
      '37': { 'Noir': 5, 'Bleu': 4, 'Rose': 3, 'Beige': 3, 'Rouge': 2, 'Vert': 2, 'Jaune': 1 },
      '38': { 'Noir': 4, 'Bleu': 3, 'Rose': 2, 'Beige': 2, 'Rouge': 1, 'Vert': 1, 'Jaune': 1 },
      '39': { 'Noir': 3, 'Bleu': 2, 'Rose': 1, 'Beige': 1, 'Rouge': 1, 'Vert': 1, 'Jaune': 1 },
      '40': { 'Noir': 2, 'Bleu': 1, 'Rose': 1, 'Beige': 1, 'Rouge': 1, 'Vert': 1, 'Jaune': 1 },
      '41': { 'Noir': 1, 'Bleu': 1, 'Rose': 1, 'Beige': 1, 'Rouge': 1, 'Vert': 1, 'Jaune': 1 },
      '42': { 'Noir': 1, 'Bleu': 1, 'Rose': 1, 'Beige': 1, 'Rouge': 1, 'Vert': 1, 'Jaune': 1 },
      '43': { 'Noir': 1, 'Bleu': 1, 'Rose': 1, 'Beige': 1, 'Rouge': 1, 'Vert': 1, 'Jaune': 1 },
      '44': { 'Noir': 1, 'Bleu': 1, 'Rose': 1, 'Beige': 1, 'Rouge': 1, 'Vert': 1, 'Jaune': 1 },
      '45': { 'Noir': 1, 'Bleu': 1, 'Rose': 1, 'Beige': 1, 'Rouge': 1, 'Vert': 1, 'Jaune': 1 }
    }
  }
];
