import { Filter } from "react-feather";
import { formatDate } from "@/helpers/utils";
import { useData } from "@/contexts/dataContext";
import { useNav } from "@/contexts/navContext";

const ListDrawer = ({ filterOpened, setFilterOpened }) => {
  const { data, filterApplied, removeFilters, loading } = useData();
  const { highlightedItem, setHighlightedItem, setListOpened } = useNav();

  const selectItem = (item) => {
    setHighlightedItem(item);
    setListOpened(false);
  };

  const onEnter = (e) => {
    if (e.key === "Enter") {
      setFilterOpened(true);
      setTimeout(() => {
        document.getElementById("close-filters-drawer").focus();
      }, 200);
    }
  };

  return (
    <div
      id="earthquackes-list"
      className={`max-h-[calc(100dvh-64px)] overflow-y-auto w-[100vw] md:w-[350px]`}
    >
      {loading ? (
        <div className="h-full flex flex-col justify-center items-center gap-2">
          <span className="loading loading-ring loading-xl"></span>
          <span className="font-bold text-[.75rem]">LOADING</span>
        </div>
      ) : (
        <ul className="list">
          <li className="list-row font-bold">
            <div className="list-col-grow flex justify-between items-center">
              <span>
                {filterApplied ? "FILTERED RESULT" : "LATEST EARTHQUAKES"}
              </span>
              {filterApplied ? (
                <button className="btn btn-sm" onClick={() => removeFilters()}>
                  Clear Filters
                </button>
              ) : (
                <button
                  onClick={() => setFilterOpened((prev) => !prev)}
                  onKeyDown={onEnter}
                  className="btn btn-sm"
                  disabled={filterOpened}
                  tabIndex={0}
                >
                  <Filter size={15} />
                  <span>Filter</span>
                </button>
              )}
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
                  <div className="font-bold min-w-fit">
                    {item.magnitude.toFixed(2)}
                  </div>
                </button>
              </li>
            );
          }) || null}
          <li>
            <span className=" p-4 label text-[.75rem] opacity-30">End of results</span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ListDrawer;
