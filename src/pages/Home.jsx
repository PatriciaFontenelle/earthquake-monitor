import { useEffect } from "react";
import { useData } from "@/contexts/dataContext";
import Map from "@/components/Map";
import SideBar from "@/components/SideBar";

const Home = () => {
  const {fetchData} = useData();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div id="home-container" className="flex overflow-hidden z-2">
      <SideBar />
      <div className="h-[calc(100dvh-64px)] w-[100dvw] z-0 md:w-[calc(100dvw-350px)] md:ml-[350px]">
        <Map />
      </div>
    </div>
  );
};

export default Home;
