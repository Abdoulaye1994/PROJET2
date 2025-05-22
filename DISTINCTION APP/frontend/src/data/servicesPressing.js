export const categoriesPressing = {
  types: ['Lavage ordinaire', 'Lavage à sec', 'Lavage express'],
  lingeTypes: {
    vêtements: ['Ensembles', 'Chemises', 'Pantalons', 'Robes', 'Jupes', 'Vestes'],
    accessoires: ['Cravates', 'Écharpes', 'Chapeaux'],
    autres: ['Drap', 'Serviettes', 'Nappes']
  },
  prix: {
    'Lavage ordinaire': 5000,
    'Lavage à sec': 7500,
    'Lavage express': 10000
  },
  temps: {
    'Lavage ordinaire': '24h',
    'Lavage à sec': '48h',
    'Lavage express': '3h'
  }
};

export const mockServicesPressing = [
  {
    id: 1,
    name: 'Forfait familiale',
    description: 'Lavage complet de 10 vêtements',
    services: [
      { type: 'Lavage ordinaire', quantity: 10 },
      { type: 'Lavage à sec', quantity: 2 },
      { type: 'Lavage express', quantity: 2 }
    ],
    prix: 120000,
    temps: '48h'
  },
  {
    id: 2,
    name: 'Forfait business',
    description: 'Lavage express pour professionnels',
    services: [
      { type: 'Lavage express', quantity: 5 },
      { type: 'Lavage à sec', quantity: 3 }
    ],
    prix: 85000,
    temps: '3h'
  },
  {
    id: 3,
    name: 'Forfait complet',
    description: 'Lavage complet de toutes vos affaires',
    services: [
      { type: 'Lavage ordinaire', quantity: 20 },
      { type: 'Lavage à sec', quantity: 5 },
      { type: 'Lavage express', quantity: 5 }
    ],
    prix: 250000,
    temps: '72h'
  }
];
