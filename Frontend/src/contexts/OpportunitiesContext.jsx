// src/contexts/OpportunitiesContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const OppCtx = createContext();
const BACKEND_URL = 'http://127.0.0.1:8000';

export function OpportunitiesProvider({ children }) {
  const [opportunities, setOpportunities] = useState([]);

  // Load from backend API on mount
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/opportunities/`);
        if (!response.ok) throw new Error('Failed to load opportunities');
        const data = await response.json();
        setOpportunities(data);
      } catch (err) {
        console.error('Error loading opportunities:', err);
      }
    };

    fetchOpportunities();
  }, []);

  // Add a new opportunity
  const addOpportunity = async (newOpportunity) => {
    const token = localStorage.getItem('authToken'); // ✅ Make sure this exists
    if (!token) {
      console.error('No auth token found. Please log in.');
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/opportunities/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(newOpportunity),
      });

      if (!res.ok) throw new Error('Failed to post opportunity');

      const saved = await res.json();
      setOpportunities((prev) => [saved, ...prev]);
    } catch (err) {
      console.error('Error posting opportunity:', err);
    }
  };

  return (
    <OppCtx.Provider value={{ opportunities, addOpportunity }}>
      {children}
    </OppCtx.Provider>
  );
}

export const useOpportunities = () => useContext(OppCtx);
