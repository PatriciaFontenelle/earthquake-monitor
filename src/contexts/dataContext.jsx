import { createContext, useContext, useState } from "react";
import {
  subtractDaysFromDate,
  toIso08601NoTZ,
  toIso08601,
} from "../helpers/utils";
import api from "../helpers/api";

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  const { data, setData, filters, setFilters, initialFilterValues, getData } =
    context;
  return { data, setData, filters, setFilters, initialFilterValues, getData };
};

export const DataProvider = ({ children }) => {
  const endDate = new Date();
  const startDate = subtractDaysFromDate(new Date(), 30);

  const initialFilterValues = {
    endtime: toIso08601NoTZ(endDate),
    starttime: toIso08601NoTZ(startDate),
    minmagnitude: 0,
    maxmagnitude: 10,
    latitude: "",
    longitude: "",
    maxradiuskm: 20000,
    orderby: "time",
  };

  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(initialFilterValues);

  const getData = () => {
    const params = { ...filters };
    params.starttime = toIso08601(params.starttime);
    params.endtime = toIso08601(params.endtime);

    if (!params.latidude || !params.longitude) {
        delete params.latidude,
        delete params.longitude,
        delete params.maxradiuskm;
    }

    api
      .get("/query", {
        params: params,
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
        getData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
