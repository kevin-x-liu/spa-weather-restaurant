import React, { useState, createContext } from "react";

const LocationContext = createContext();

export default function LocationProvider({ children }) {
  const [location, setLocation] = useState("22902");

  const [city, setCity] = useState(false);

  return (
    <LocationContext.Provider value={{ location, setLocation, city, setCity }}>
      {children}
    </LocationContext.Provider>
  );
}

export { LocationContext };
