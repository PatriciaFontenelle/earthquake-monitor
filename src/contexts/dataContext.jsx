import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  const { data, setData, filters, setFilters } = context;
  return { data, setData, filters, setFilters };
};

export const DataProvider = ({children}) => {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({});

    return (
        <DataContext.Provider value={{data, setData, filters, setFilters}}>
            {children}
        </DataContext.Provider>
    )
}
