import { createContext, useContext, useState, useEffect } from 'react';

const TalentContext = createContext();

export function TalentProvider({ children }) {
  const [talents, setTalents] = useState([]);

  // 🔐 Get token from localStorage
  const getToken = () => {
    const userObj = JSON.parse(localStorage.getItem('talanta_user'));
    return userObj?.token;
  };


  // 🔄 Load all talents on mount
  useEffect(() => {
    const token = getToken();
    if (!token) {
      console.warn('No token found. Please log in.');
      return;
    }

    fetch('http://127.0.0.1:8000/api/talents/', {
      headers: {
        'Authorization': `Token ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch talents');
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setTalents(data);
        } else {
          console.error("Talents fetch did not return an array:", data);
        }
      })
      .catch(err => console.error("Failed to load talents:", err));
  }, []);

  // ➕ Upload new talent
  const addTalent = async (talentObj) => {
    const token = getToken();
    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/talents/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(talentObj),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from backend:", errorData);
        throw new Error("Failed to add talent");
      }

      const newTalent = await response.json();
      setTalents((prev) => [newTalent, ...prev]);
    } catch (err) {
      console.error("Failed to add talent:", err);
    }
  };

  return (
    <TalentContext.Provider value={{ talents, addTalent }}>
      {children}
    </TalentContext.Provider>
  );
}

export function useTalent() {
  return useContext(TalentContext);
}
