import { createContext, useContext, useState, useEffect } from 'react';

const OppCtx = createContext();

export function OpportunitiesProvider({ children }) {
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('talanta_opps') || '[]');
    setOpportunities(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('talanta_opps', JSON.stringify(opportunities));
  }, [opportunities]);

  const addOpportunity = (opp) =>
    setOpportunities((prev) => [opp, ...prev]);

  return (
    <OppCtx.Provider value={{ opportunities, addOpportunity }}>
      {children}
    </OppCtx.Provider>
  );
}

export const useOpportunities = () => useContext(OppCtx);