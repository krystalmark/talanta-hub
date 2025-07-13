import { createContext, useContext, useState } from 'react';

const TalentContext = createContext();

export function TalentProvider({ children }) {
  const [talents, setTalents] = useState([]);

  const addTalent = (talent) => {
    setTalents(prev => [...prev, talent]);
  };

  const deleteTalent = (index) => {
    setTalents(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <TalentContext.Provider value={{ talents, addTalent, deleteTalent }}>
      {children}
    </TalentContext.Provider>
  );
}

export function useTalent() {
  return useContext(TalentContext);
}
