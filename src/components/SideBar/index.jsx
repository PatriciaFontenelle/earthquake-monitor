import { useState } from "react";
import { useNav } from "@/contexts/navContext";
import FilterDrawer from "./FilterDrawer";
import ListDrawer from "./ListDrawer";

const SideBar = () => {
  const { listOpened } = useNav();
  const [filterOpened, setFilterOpened] = useState(false);

  return (
    <div
      className={`${
        !listOpened && filterOpened
          ? "left-[-200vw] md:left-0"
          : !listOpened && !filterOpened
          ? "left-[-200vw] md:left-[-350px]"
          : filterOpened
          ? "left-[0]"
          : "left-[-100vw] md:left-[-350px]"
      } absolute transition-[left] ease-in-out duration-300 z-5 flex bg-base-100 overflow-hidden h-[calc(100dvh-63px)] ${filterOpened ? "w-[100vw]" : "w-[200vw]"} md:w-[700px]  md:h-[calc(100dvh-64px)]`}
    >
      <div className="w-[100vw] md:w-[350px]">
        {filterOpened && <FilterDrawer setFilterOpened={setFilterOpened} />}
      </div>
      <ListDrawer
        filterOpened={filterOpened}
        setFilterOpened={setFilterOpened}
      />
    </div>
  );
};

export default SideBar;
