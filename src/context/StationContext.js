import React, { useContext, createContext, useState, useEffect } from "react";

const StationContext = createContext();

export function useStation() {
  return useContext(StationContext);
}

export function StationProvider({ children }) {
  const [fromStation, setFromStation] = useState("ABC");
  const [toStation, setToStation] = useState("XYZ");
  const [date, setDate] = useState("");

  useEffect(() => {
    console.log("In station context", fromStation);
    console.log("In station context", toStation);
  }, [fromStation, toStation, date]);

  const StationHandler = (station1, station2, currentDate) => {
    setFromStation(station1);
    setToStation(station2);
    setDate(currentDate);
  };

  const value = {
    fromStation,
    toStation,
    date,
    StationHandler,
  };
  return (
    <StationContext.Provider value={value}>{children}</StationContext.Provider>
  );
}
