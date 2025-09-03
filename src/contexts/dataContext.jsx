import { createContext, useContext, useEffect, useState } from "react";
import {
  subtractDaysFromDate,
  toIso08601NoTZ,
  toIso08601,
} from "@/helpers/utils";
import api from "@/helpers/api";

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  const {
    data,
    setData,
    filters,
    setFilters,
    initialFilterValues,
    filterApplied,
    setFilterApplied,
    fetchData,
    removeFilters,
    loading,
    setLoading,
  } = context;
  return {
    data,
    setData,
    filters,
    setFilters,
    initialFilterValues,
    filterApplied,
    setFilterApplied,
    fetchData,
    removeFilters,
    loading,
    setLoading,
  };
};

export const DataProvider = ({ children }) => {
  const endDate = new Date();
  const startDate = subtractDaysFromDate(new Date(), 30);

  const initialFilterValues = {
    endTime: toIso08601NoTZ(endDate),
    startTime: toIso08601NoTZ(startDate),
    minMagnitude: 0,
    maxMagnitude: 10,
    latitude: "",
    longitude: "",
    maxRadiusKm: 20000,
    orderBy: "time",
  };

  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(initialFilterValues);
  const [filterApplied, setFilterApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();

    if (!filterApplied) {
      const getRealtimeData = setInterval(() => {
        fetchData();
      }, 120000);

      return () => {
        clearInterval(getRealtimeData);
      };
    }
  }, [filterApplied]);

  const removeFilters = () => {
    setFilterApplied(false);
    setFilters(initialFilterValues);
  };

  const fetchData = () => {
    setLoading(true);
    const applyLocalFilter = filters.latitude && filters.longitude;

    api
      .get("/query", {
        params: {
          endtime: toIso08601(filters.endTime),
          starttime: toIso08601(filters.startTime),
          minmagnitude: filters.minMagnitude,
          maxmagnitude: filters.maxMagnitude,
          latitude: applyLocalFilter ? filters.latitude : null,
          longitude: applyLocalFilter ? filters.longitude : null,
          maxradiuskm: applyLocalFilter ? filters.maxRadiusKm : null,
          orderby: filters.orderBy,
        },
      })
      .then((res) => {
        const newData = res.data.features.map((item) => {
          return {
            id: item.id,
            lat: item.geometry.coordinates[1],
            lng: item.geometry.coordinates[0],
            location: item.properties.place,
            magnitude: item.properties.mag,
            time: item.properties.time,
          };
        });

        setData([...newData]);
        setLoading(false);
      });
  };

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        filters,
        setFilters,
        initialFilterValues,
        filterApplied,
        setFilterApplied,
        fetchData,
        removeFilters,
        loading,
        setLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
