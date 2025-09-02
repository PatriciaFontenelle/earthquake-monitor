import { Filter } from "react-feather";
import { formatDate } from "@/helpers/utils";
import { useData } from "@/contexts/dataContext";
import { useNav } from "@/contexts/navContext";
import { useEffect } from "react";

const ListDrawer = ({ filterOpened, setFilterOpened }) => {
  const { data, filterApplied, removeFilters } = useData();
  const { highlightedItem, setHighlightedItem, setListOpened } = useNav();

  const selectItem = (item) => {
    setHighlightedItem(item);
    setListOpened(false);
  };

  const onEnter = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      setFilterOpened(true);
      setTimeout(() => {
        document.getElementById("close-filters-drawer").focus();
      }, 500);
    }
  };

  return (
    <div
      id="earthquackes-list"
      className={`w-[100dvw] overflow-auto bg-base-100 animate-[--animate-drawer] md:w-[350px] md:left-0 md:top-[64px]`}
    >
      <ul className="list">
        <li className="list-row font-bold">
          <div className="list-col-grow flex justify-between items-center">
            <span>{filterApplied ? "FILTERED RESULT" : "LATEST EARTHQUAKES"}</span>
            {filterApplied ?
            (<button className="btn btn-sm" onClick={() => removeFilters()}>
              Clear Filters
            </button>)
            :
            (<button
              onClick={() => setFilterOpened((prev) => !prev)}
              onKeyDown={onEnter}
              className="btn btn-sm"
              disabled={filterOpened}
              tabIndex={0}
            >
              <Filter size={15} />
              <span>Filter</span>
            </button>)}
          </div>
        </li>
        {data.map((item) => {
          return (
            <li
              className={`${
                highlightedItem?.id == item.id && "active"
              } list-row p-0`}
              key={item.id}
            >
              <button
                onClick={() => selectItem(item)}
                className={`w-full cursor-pointer flex justify-between text-start list-col-grow bg-transparent p-4`}
                tabIndex={0}
              >
                <div className="flex flex-col gap-3">
                  <div>{item.location}</div>
                  <div className="text-[.75rem] text-gray-400 font-semibold">
                    {formatDate(item.time)}
                  </div>
                </div>
                <div className="font-bold min-w-fit">{item.magnitude.toFixed(2)}</div>
              </button>
            </li>
          );
        }) || null}
      </ul>
    </div>
  );
};

export default ListDrawer;
