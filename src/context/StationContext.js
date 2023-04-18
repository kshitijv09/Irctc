import React, { useContext, createContext, useState, useEffect } from "react";

const StationContext = createContext();

export function useStation() {
  return useContext(StationContext);
}

export function StationProvider({ children }) {
  const [fromStation, setFromStation] = useState("ABC");
  const [toStation, setToStation] = useState("XYZ");

  useEffect(() => {
    console.log("In station context", fromStation);
    console.log("In station context", toStation);
  }, [fromStation, toStation]);

  const StationHandler = (station1, station2) => {
    setFromStation(station1);
    setToStation(station2);
  };

  const value = {
    fromStation,
    toStation,

    StationHandler,
  };
  return (
    <StationContext.Provider value={value}>{children}</StationContext.Provider>
  );
}
