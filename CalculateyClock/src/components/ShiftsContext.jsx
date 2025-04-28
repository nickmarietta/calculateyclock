import { createContext, useContext, useState } from "react";

const ShiftsContext = createContext();

export const useShifts = () => {
  const context = useContext(ShiftsContext);
  if (!context) {
    throw new Error("useShifts must be used within a ShiftsProvider");
  }
  return context;
};

export const ShiftsProvider = ({ children }) => {
  const [shifts, setShifts] = useState([]);

  const addShift = (newShift) => {
    setShifts((prevShifts) => [...prevShifts, newShift]);
  };

  return (
    <ShiftsContext.Provider value={{ shifts, addShift }}>
      {children}
    </ShiftsContext.Provider>
  );
};
