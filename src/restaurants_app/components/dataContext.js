import React, { useState, createContext } from "react";

const DataContext = createContext();

function DataProvider({ children }) {
  const [data, setData] = useState(null);

  return (
    <DataContext.Provider value={(data, setData)}>
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
export { DataContext };
