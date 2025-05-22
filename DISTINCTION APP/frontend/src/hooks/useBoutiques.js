import { useContext } from 'react';
import BoutiquesContext from '../context/BoutiquesContext';
import { useUsers } from '../context/UsersContext';

export function useBoutiques() {
  const { boutiques } = useContext(BoutiquesContext);
  const { users } = useUsers();

  if (!boutiques || !users) {
    throw new Error('useBoutiques doit être utilisé dans un BoutiquesProvider et un UsersProvider');
  }

  const getBoutiquesByCountry = (pays) => {
    return boutiques.filter(boutique => boutique.pays === pays);
  };

  const getNumberOfUsersByBoutique = (boutique) => {
    if (!boutique.nom) return 0;
    return users.filter(user => user.lieuTravail === boutique.nom).length;
  };

  return { boutiques, getBoutiquesByCountry, getNumberOfUsersByBoutique };
}
