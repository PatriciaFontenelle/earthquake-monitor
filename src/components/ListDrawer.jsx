import { formatDate } from "../helpers/utils";

const ListDrawer = ({data, activeListItem, setActiveListItem}) => {
    return (
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
    )
}

export default ListDrawer;