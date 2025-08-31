import { useNav } from "../contexts/NavContext";
import { formatDate } from "../helpers/utils";

const ListDrawer = ({ data, activeListItem, setActiveListItem }) => {
  const { listOpened, setListOpened } = useNav();

  const selectItem = (item) => {
    setActiveListItem(item);
    setListOpened(false);
  }

  return (
    <div
      id="earthquackes-list"
      className={`${
        listOpened ? "w-[100dvw]" : "w-0"
      } max-h-[100dvh] overflow-auto absolute left-0 top-[62px] z-1000 bg-base-100 md:w-[350px] `}
    >
      <ul className="list">
        <li className="list-row font-bold">LATEST EARTHQUAKES</li>
        {data.map((item) => {
          return (
            <li
              className={
                activeListItem?.id == item.id ? "list-row active" : "list-row"
              }
              key={item.id}
            >
              <button
                onClick={() => selectItem(item)}
                className={`w-full cursor-pointer flex justify-between text-start list-col-grow bg-transparent`}
              >
                <div className="flex flex-col gap-2">
                  <div>{item.location}</div>
                  <div className="text-[.75rem] text-gray-400 font-semibold">
                    {formatDate(item.time)}
                  </div>
                </div>
                <div className="font-bold">{item.magnitude.toFixed(2)}</div>
              </button>
            </li>
          );
        }) || null}
      </ul>
    </div>
  );
};

export default ListDrawer;
