import { createContext, useContext, useState, useEffect } from 'react';

/* ------------------------------------------------------------------ */
/*  TalentContext – provides global talent list + helper to add       */
/* ------------------------------------------------------------------ */
const TalentContext = createContext();

export function TalentProvider({ children }) {
  /* ---------- 1. 100 % EMPTY at start -------------- */
  const [talents, setTalents] = useState([]);

  /* ---------- 2. OPTIONAL localStorage persistence-- */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('talantahub_talents') || '[]');
    if (saved.length) setTalents(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('talantahub_talents', JSON.stringify(talents));
  }, [talents]);

  /* ---------- 3. helper to add new talent ---------- */
  const addTalent = (talentObj) =>
    setTalents((prev) => [{ id: Date.now(), ...talentObj }, ...prev]);

  return (
    <TalentContext.Provider value={{ talents, addTalent }}>
      {children}
    </TalentContext.Provider>
  );
}

export function useTalent() {
  return useContext(TalentContext);
}