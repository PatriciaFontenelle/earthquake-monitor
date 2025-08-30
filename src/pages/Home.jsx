import { useEffect, useState } from "react";
import api from "../helpers/api";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/query").then((res) => {
        const newData = res.data.features.map((item) => {
            return({
                location: item.properties.place,
                magnitude: item.properties.mag,
                time: item.properties.time
            })
        })

        setData(newData)
    });
  }, []);

  return (
    <div>
      <div>
        <ul className="list">
            {data.map((item) => {
                return(
                    <li className="list-row">
                        {item.location}
                    </li>
                )
            })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
