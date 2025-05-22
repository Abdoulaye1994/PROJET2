import React, { createContext, useState, useEffect } from 'react';

export const UsersContext = createContext();

export const useUsers = () => {
  const context = React.useContext(UsersContext);
  if (!context) {
    throw new Error('useUsers doit être utilisé dans un UsersProvider');
  }
  return context;
};

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const initialUsers = [
          {
            id: 1,
            nom: 'Elodie ZONVIDE',
            email: 'elodie.zonvide@distinction.com',
            role: 'Cheffe d\'Agence',
            telephone: '+228 70 718 067',
            status: 'Connecté',
            lastLogin: '2025-05-17T15:00:00Z',
            lieuTravail: 'Nyékonakpoè'
          },
          {
            id: 2,
            nom: 'Antoine ZONVIDE',
            email: 'antoine.zonvide@distinction.com',
            role: 'Vendeur',
            telephone: '+228 91 851 073',
            status: 'Connecté',
            lastLogin: '2025-05-17T14:30:00Z',
            lieuTravail: 'Nyékonakpoè'
          },
          {
            id: 3,
            nom: 'Emefa AYISSOU',
            email: 'emefa.ayissou@distinction.com',
            role: 'Vendeuse',
            telephone: '+228 90 436 764',
            status: 'Connecté',
            lastLogin: '2025-05-17T16:00:00Z',
            lieuTravail: 'Pressing'
          },
          {
            id: 4,
            nom: 'Prisca Olga ZONVIDE',
            email: 'prisca.zonvide@distinction.com',
            role: 'Cheffe d\'Agence',
            telephone: '+228 97 198 517',
            status: 'Connecté',
            lastLogin: '2025-05-17T15:45:00Z',
            lieuTravail: 'Agoè Minamadou'
          },
          {
            id: 5,
            nom: 'Adèle KABISSA',
            email: 'adele.kabissa@distinction.com',
            role: 'Vendeuse',
            telephone: '+228 93 777 975',
            status: 'Connecté',
            lastLogin: '2025-05-17T15:30:00Z',
            lieuTravail: 'Agoè Minamadou'
          },
          {
            id: 6,
            nom: 'Adjo Micheline NELA',
            email: 'adjo.nela@distinction.com',
            role: 'Vendeuse',
            telephone: '+228 98 153 047',
            status: 'Connecté',
            lastLogin: '2025-05-17T15:15:00Z',
            lieuTravail: 'Agoè Minamadou'
          }
        ];
        console.log('Données chargées:', initialUsers);
        setUsers(initialUsers);
        setUsersCount(initialUsers.length);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider value={{ users, usersCount }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
