import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useLocation } from 'react-router-dom';

const PresenceContext = createContext();

export const PresenceProvider = ({ children }) => {
  const { user, role } = useAuth();
  const location = useLocation();
  const [currentPresence, setCurrentPresence] = useState(null);
  const [presenceHistory, setPresenceHistory] = useState([]);
  const [isTrackingLocation, setIsTrackingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [isLate, setIsLate] = useState(false);
  const [workHours, setWorkHours] = useState({
    start: '09:00',
    end: '17:00',
    lunchStart: '12:00',
    lunchEnd: '13:00'
  });

  const startLocationTracking = () => {
    if (navigator.geolocation) {
      setIsTrackingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          checkLocation(position.coords);
        },
        (error) => {
          setLocationError(error.message);
        }
      );
    } else {
      setLocationError('La géolocalisation n\'est pas supportée par votre navigateur');
    }
  };

  const checkLocation = (coords) => {
    // TODO: Implémenter la vérification de la localisation avec les coordonnées de la boutique
    const isAtWork = true; // À implémenter avec les coordonnées réelles
    if (!isAtWork) {
      handleLogout();
    }
  };

  const handleLogin = (userLocation) => {
    const now = new Date();
    const isLate = now.getHours() > 9; // À ajuster selon les horaires réels

    const newPresence = {
      id: Date.now(),
      userId: user.id,
      date: now.toISOString(),
      arrivalTime: now,
      departureTime: null,
      isLate,
      location: userLocation,
      status: isLate ? 'late' : 'present'
    };

    setCurrentPresence(newPresence);
    setIsLate(isLate);
    startLocationTracking();
  };

  const handleLogout = () => {
    if (currentPresence) {
      const now = new Date();
      const updatedPresence = {
        ...currentPresence,
        departureTime: now,
        duration: (now - new Date(currentPresence.arrivalTime)) / 1000 / 60 // Durée en minutes
      };
      setCurrentPresence(updatedPresence);
      setIsTrackingLocation(false);
      
      // Sauvegarder la présence dans l'historique
      setPresenceHistory(prev => [...prev, updatedPresence]);
    }
  };

  const getPresenceStats = () => {
    if (!presenceHistory.length) return null;

    const today = new Date().toISOString().split('T')[0];
    const todayPresences = presenceHistory.filter(
      p => p.date.split('T')[0] === today
    );

    const stats = {
      totalDays: presenceHistory.length,
      lateDays: presenceHistory.filter(p => p.isLate).length,
      totalHours: presenceHistory.reduce((acc, p) => acc + (p.duration || 0), 0) / 60,
      todayStatus: todayPresences.length > 0 ? 
        (todayPresences[0].departureTime ? 'departed' : 'present') : 'absent'
    };

    return stats;
  };

  return (
    <PresenceContext.Provider value={{
      currentPresence,
      presenceHistory,
      isTrackingLocation,
      locationError,
      isLate,
      workHours,
      handleLogin,
      handleLogout,
      getPresenceStats,
      startLocationTracking
    }}>
      {children}
    </PresenceContext.Provider>
  );
};

export const usePresence = () => useContext(PresenceContext);
