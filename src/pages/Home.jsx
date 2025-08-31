import { useEffect, useState } from "react";
import Map from "../components/Map";
import ListDrawer from "../components/ListDrawer";

import api from "../helpers/api";

const Home = () => {
  const [data, setData] = useState([]);
  const [activeListItem, setActiveListItem] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    api.get("/query").then((res) => {
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
    <div id="home-container" className="flex overflow-hidden">
      <ListDrawer data={data} activeListItem={activeListItem} setActiveListItem={setActiveListItem} />
      <div className="h-[100dvh] w-[calc(100dvw-350px)]">
        <Map data={data} highlight={activeListItem}/>
      </div>
    </div>
  );
};

export default Home;
