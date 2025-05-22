export const categoriesDame = {
  vetements: {
    types: ['Robes', 'Boubous', 'Tailleur'],
    variants: {
      sizes: ['Mannequin', 'M', 'L', 'XL', 'XXL', 'XXXL', 'Enfant'],
      ranges: ['Panier moyen', 'Leader', 'VIP', 'Royale', 'Présidentielle'],
      colors: ['Rouge', 'Bleu', 'Vert', 'Jaune', 'Orange', 'Rose', 'Violet', 'Noir', 'Blanc', 'Gris', 'Beige', 'Bordeaux', 'Marron', 'Turquoise']
    }
  },
  accessoires: {
    chaussures: {
      types: ['Escarpins', 'Sandales', 'Balléres', 'Bottines'],
      variants: {
        sizes: ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44'],
        colors: ['Noir', 'Bleu', 'Marron', 'Beige', 'Rouge', 'Vert', 'Jaune', 'Rose']
      }
    },
    autres: {
      types: ['Sacs', 'Montres', 'Chapeaux', 'Portefeuilles', 'Stylos', 'Bracelets'],
      variants: {
        colors: ['Noir', 'Bleu', 'Marron', 'Beige', 'Rouge', 'Vert', 'Jaune', 'Rose']
      }
    }
  }
};

export const mockProductsDame = [
  // Robes
  {
    id: 1,
    name: 'Robe de soirée élégante',
    basePrice: 29990,
    category: 'Vêtements',
    type: 'Robe',
    images: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
      'https://images.unsplash.com/photo-1521587760476-6c02646c568d'
    ],
    variants: categoriesDame.vetements.variants,
    description: 'Robe élégante en soie avec détails brodés',
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
  // Boubous
  {
    id: 2,
    name: 'Boubou traditionnel',
    basePrice: 39990,
    category: 'Vêtements',
    type: 'Boubou',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      'https://images.unsplash.com/photo-1576091160399-112ba350f521'
    ],
    variants: categoriesDame.vetements.variants,
    description: 'Boubou traditionnel en coton brodé à la main',
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
