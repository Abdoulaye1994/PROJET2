import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { mockComptes, mockTransactions, mockStats } from '../data/mockTresorerieData';

const TresorerieContext = createContext();

export const TresorerieProvider = ({ children }) => {
  const [comptes, setComptes] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    mouvementsParCompte: [],
    fluxParModePaiement: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchComptes(),
          fetchTransactions(),
          fetchStats()
        ]);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        // Utiliser les données mockées en cas d'erreur
        setComptes(mockComptes);
        setTransactions(mockTransactions);
        setStats(mockStats);
        setError('Serveur non disponible - données simulées affichées');
        setLoading(false);
        
        // Réinitialiser l'erreur après 5 secondes
        setTimeout(() => {
          setError(null);
        }, 5000);
      }
    };

    fetchData();
  }, []);

  const fetchComptes = async () => {
    try {
      const response = await api.get('/tresorerie/comptes');
      if (response.data) {
        setComptes(response.data);
      } else {
        throw new Error('Données invalides reçues du serveur');
      }
    } catch (err) {
      console.error('Erreur lors du chargement des comptes:', err);
      throw err;
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await api.get('/tresorerie/transactions');
      if (Array.isArray(response.data)) {
        setTransactions(response.data);
      } else {
        throw new Error('Données invalides reçues du serveur');
      }
    } catch (err) {
      console.error('Erreur lors du chargement des transactions:', err);
      throw err;
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/tresorerie/stats');
      if (response.data && typeof response.data === 'object') {
        setStats(response.data);
      } else {
        throw new Error('Données invalides reçues du serveur');
      }
    } catch (err) {
      console.error('Erreur lors du chargement des statistiques:', err);
      throw err;
    }
  };

  const ajouterTransaction = async (transaction) => {
    try {
      const response = await api.post('/tresorerie/transactions', transaction);
      setTransactions(prev => [...prev, response.data]);
      await fetchStats(); // Mettre à jour les stats
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Erreur lors de l\'ajout de la transaction');
    }
  };

  const modifierTransaction = async (id, transaction) => {
    try {
      const response = await api.put(`/tresorerie/transactions/${id}`, transaction);
      setTransactions(prev => 
        prev.map(t => t.id === id ? response.data : t)
      );
      await fetchStats();
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Erreur lors de la modification');
    }
  };

  const supprimerTransaction = async (id) => {
    try {
      await api.delete(`/tresorerie/transactions/${id}`);
      setTransactions(prev => prev.filter(t => t.id !== id));
      await fetchStats();
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Erreur lors de la suppression');
    }
  };

  return (
    <TresorerieContext.Provider
      value={{
        comptes,
        transactions,
        loading,
        error,
        stats,
        ajouterTransaction,
        modifierTransaction,
        supprimerTransaction,
      }}
    >
      {children}
    </TresorerieContext.Provider>
  );
};

export const useTresorerie = () => {
  const context = useContext(TresorerieContext);
  if (!context) {
    throw new Error('useTresorerie doit être utilisé dans un TresorerieProvider');
  }
  return context;
};

export default TresorerieContext;
