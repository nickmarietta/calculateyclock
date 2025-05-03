{/*Edited By :Nickmarietta*/}
{/*Edited By :Bryant Martinez*/}


import { createContext, useContext, useEffect, useState } from "react";

const ShiftsContext = createContext();

export function useShifts() {
  return useContext(ShiftsContext);
}

export function ShiftsProvider({ children }) {
  const [shifts, setShifts] = useState(() => {
    const storedShifts = localStorage.getItem("shifts");
    return storedShifts ? JSON.parse(storedShifts) : [];
  });

  useEffect(() => {
    localStorage.setItem("shifts", JSON.stringify(shifts));
  }, [shifts]);

  const addShift = (shift) => {
    setShifts((prev) => [...prev, shift]);
  };

  // Added delete functionality
  const deleteShift = (index) => {
    setShifts((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  // Added update functionality
  const updateShift = (index, updatedShift) => {
    setShifts((prev) => {
      const updated = [...prev];
      updated[index] = updatedShift;
      return updated;
    });
  };

  return (
    <ShiftsContext.Provider value={{ 
      shifts, 
      setShifts, 
      addShift, 
      deleteShift, 
      updateShift 
    }}>
      {children}
    </ShiftsContext.Provider>
  );
}