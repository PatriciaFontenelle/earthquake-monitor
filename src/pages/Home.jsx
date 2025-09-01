import { useEffect, useState } from "react";
import Map from "../components/Map";
import ListDrawer from "../components/ListDrawer";

import { useData } from "../contexts/dataContext";

const Home = () => {
  const {data, getData} = useData();
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
