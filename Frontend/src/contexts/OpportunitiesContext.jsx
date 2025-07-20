// src/contexts/OpportunitiesContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const OppCtx = createContext();

export function OpportunitiesProvider({ children }) {
  const [opportunities, setOpportunities] = useState([]);

  // Load from localStorage when component mounts
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('talanta_opps') || '[]');
    setOpportunities(saved);
  }, []);

  // Save to localStorage whenever opportunities change
  useEffect(() => {
    localStorage.setItem('talanta_opps', JSON.stringify(opportunities));
  }, [opportunities]);

  // Add a new opportunity
  const addOpportunity = (opp) => {
    const completeOpp = {
      ...opp,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    setOpportunities((prev) => [completeOpp, ...prev]);
  };

  return (
    <OppCtx.Provider value={{ opportunities, addOpportunity }}>
      {children}
    </OppCtx.Provider>
  );
}

export const useOpportunities = () => useContext(OppCtx);
