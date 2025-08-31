import { useEffect, useState } from "react";
import Map from "../components/Map";
import ListDrawer from "../components/ListDrawer";

import api from "../helpers/api";
import { useData } from "../contexts/dataContext";

const Home = () => {
  const {data, setData, filters} = useData();
  const [activeListItem, setActiveListItem] = useState(null);

  useEffect(() => {
    getData();

    const getRealtimeData = setInterval(() => {
      getData();
    }, 120000);

    return () => {
      clearInterval(getRealtimeData);
    };
  }, []);

  useEffect(() => {
    getData();
  }, [filters])

  const getData = () => {
    api.get("/query", {
      params: filters
    }).then((res) => {
      const newData = res.data.features.map((item, index) => {
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
    <div id="home-container" className="flex overflow-hidden z-2">
      <ListDrawer
        data={data}
        activeListItem={activeListItem}
        setActiveListItem={setActiveListItem}
      />
      <div className="h-[calc(100dvh-64px)] w-[100dvw] z-0 md:w-[calc(100dvw-350px)] md:ml-[350px]">
        <Map data={data} highlight={activeListItem} setHighlight={setActiveListItem} />
      </div>
    </div>
  );
};

export default Home;
