import { useState } from "react";
import { useNav } from "@/contexts/navContext";
import FilterDrawer from "./FilterDrawer";
import ListDrawer from "./ListDrawer";

const SideBar = () => {
  const { setListOpened } = useNav();
  const [filterOpened, setFilterOpened] = useState(false);
  
  return (
    <div
      className={`${
        filterOpened
          ? "left-0"
          : setListOpened
          ? "left-0"
          : "left-[-100dvw]"
      } transition-[left] duration-300 ease-in-out flex absolute top-[63px] h-[calc(100dvh-63px)] max-h-[calc(100dvh-64px)] overflow-hidden z-6 bg-base-100 md:top-[64px]`}
    >
      {filterOpened && <FilterDrawer setFilterOpened={setFilterOpened} />}
      <ListDrawer filterOpened={filterOpened} setFilterOpened={setFilterOpened} />
    </div>
  );
};

export default SideBar;
