import React, { createContext, useContext, useState, useEffect } from 'react';
const axios = require('axios/dist/axios');

const ApprovisionnementContext = createContext();

export const ApprovisionnementProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [historique, setHistorique] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour obtenir les articles nécessitant approvisionnement
  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/articles/approvisionnement');
      setArticles(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour obtenir l'historique des achats
  const fetchHistorique = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/approvisionnement/historique');
      setHistorique(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fonction pour obtenir les statistiques
  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/approvisionnement/stats');
      setStats(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fonction pour commander un article
  const commanderArticle = async (articleId, quantite) => {
    try {
      await axios.post('http://localhost:5000/api/approvisionnement/commander', {
        articleId,
        quantite
      });
      // Rafraîchir les données après la commande
      await fetchArticles();
      await fetchHistorique();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // Charger les données au montage
  useEffect(() => {
    fetchArticles();
    fetchHistorique();
    fetchStats();
  }, []);

  return (
    <ApprovisionnementContext.Provider
      value={{
        articles,
        historique,
        stats,
        loading,
        error,
        commanderArticle
      }}
    >
      {children}
    </ApprovisionnementContext.Provider>
  );
};

export const useApprovisionnement = () => {
  const context = useContext(ApprovisionnementContext);
  if (context === undefined) {
    throw new Error('useApprovisionnement doit être utilisé dans un ApprovisionnementProvider');
  }
  return context;
};
