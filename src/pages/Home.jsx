import { useEffect, useState, useRef } from "react";
import { formatDate } from "../helpers/utils";
import Map from "../components/Map";

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
      <div
        id="earthquackes-list"
        className="w-[350px] max-h-[100dvh] overflow-auto"
      >
        <ul className="list">
          <li className="list-row font-bold">LATEST EARTHQUAKES</li>
          {data.map((item) => {
            return (
              <li className={activeListItem?.id == item.id ? "list-row active" : "list-row"} key={item.id}>
                <button
                  onClick={() => setActiveListItem(item)}
                  className={`w-full cursor-pointer flex justify-between text-start list-col-grow bg-transparent`}
                >
                  <div className="flex flex-col gap-2">
                    <div>{item.location}</div>
                    <div className="text-[.75rem] text-gray-400 font-semibold">{formatDate(item.time)}</div>
                  </div>
                  <div className="font-bold">{item.magnitude.toFixed(2)}</div>
                </button>
              </li>
            );
          }) || null}
        </ul>
      </div>
      <div className="h-[100dvh] w-[calc(100dvw-350px)]">
        <Map data={data} highlight={activeListItem}/>
      </div>
    </div>
  );
};

export default Home;
