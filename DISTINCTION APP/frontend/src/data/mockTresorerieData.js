export const mockComptes = [
  {
    id: 1,
    nom: 'Compte principal',
    solde: 1500000,
    devise: 'XOF',
    type: 'principal'
  },
  {
    id: 2,
    nom: 'Compte de caisse',
    solde: 250000,
    devise: 'XOF',
    type: 'caisse'
  },
  {
    id: 3,
    nom: 'Compte bancaire',
    solde: 5000000,
    devise: 'XOF',
    type: 'bancaire'
  }
];

export const mockTransactions = [
  {
    id: 1,
    date: '2025-05-18',
    type: 'depot',
    montant: 500000,
    modePaiement: 'espece',
    compte: 'Compte principal',
    description: 'Dépôt de caisse',
    devise: 'XOF'
  },
  {
    id: 2,
    date: '2025-05-17',
    type: 'retrait',
    montant: 200000,
    modePaiement: 'espece',
    compte: 'Compte de caisse',
    description: 'Retrait pour achat',
    devise: 'XOF'
  },
  {
    id: 3,
    date: '2025-05-16',
    type: 'depot',
    montant: 1000000,
    modePaiement: 'virement',
    compte: 'Compte bancaire',
    description: 'Versement fournisseur',
    devise: 'XOF'
  }
];

export const mockStats = {
  total: 7000000,
  mouvementsParCompte: [
    { compte: 'Compte principal', montant: 1500000 },
    { compte: 'Compte de caisse', montant: 250000 },
    { compte: 'Compte bancaire', montant: 5000000 }
  ],
  fluxParModePaiement: [
    { mode: 'espece', montant: 700000 },
    { mode: 'virement', montant: 1000000 }
  ]
};
