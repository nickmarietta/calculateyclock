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

  return (
    <ShiftsContext.Provider value={{ shifts, addShift }}>
      {children}
    </ShiftsContext.Provider>
  );
}
