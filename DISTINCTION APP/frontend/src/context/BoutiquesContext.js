import React from 'react';
import { boutiques as boutiquesData } from '../data/boutiques';

const BoutiquesContext = React.createContext();

export function BoutiquesProvider({ children }) {
  const [boutiques, setBoutiques] = React.useState(boutiquesData);

  // Fonction pour obtenir les boutiques par pays
  const getBoutiquesByCountry = (pays) => {
    return boutiques.filter(boutique => boutique.pays === pays);
  };

  // Fonction pour obtenir les boutiques par type
  const getBoutiquesByType = (type) => {
    return boutiques.filter(boutique => boutique.type === type);
  };

  // Fonction pour obtenir les boutiques par ville
  const getBoutiquesByCity = (ville) => {
    return boutiques.filter(boutique => boutique.ville === ville);
  };

  return (
    <BoutiquesContext.Provider
      value={{
        boutiques,
        getBoutiquesByCountry,
        getBoutiquesByType,
        getBoutiquesByCity
      }}
    >
      {children}
    </BoutiquesContext.Provider>
  );
}

export default BoutiquesContext;
