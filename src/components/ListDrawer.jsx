import { useEffect, useState } from "react";
import { useNav } from "../contexts/NavContext";
import { formatDate, toIso08601 } from "../helpers/utils";
import { Filter, X } from "react-feather";

const ListDrawer = ({ data, activeListItem, setActiveListItem }) => {
  const { listOpened, setListOpened } = useNav();
  const [filterOpened, setFilterOpened] = useState(false);

  const selectItem = (item) => {
    setActiveListItem(item);
    setListOpened(false);
  };

  return (
    <div
      className={`${
        filterOpened
          ? "left-0"
          : setListOpened
          ? "left-[-100dvw] md:left-[-350px]"
          : "left-[-200dvw]"
      } transition-[left] duration-300 ease-in-out flex absolute top-[63px] h-[calc(100dvh-63px)] overflow-x-hidden z-6 md:top-[64px]`}
    >
      <FilterDrawer show={filterOpened} setShow={setFilterOpened} />
      <div
        id="earthquackes-list"
        className={`w-[100dvw] max-h-[calc(100dvh-64px)] overflow-auto bg-base-100 animate-[--animate-drawer] md:w-[350px] md:left-0 md:top-[64px]`}
      >
        <ul className="list">
          <li className="list-row font-bold">
            <div className="list-col-grow flex justify-between items-center">
              <span>LATEST EARTHQUAKES</span>
              <button
                onClick={() => setFilterOpened((prev) => !prev)}
                className="btn btn-sm"
              >
                <Filter size={15} />
                <span>Filter</span>
              </button>
            </div>
          </li>
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
    </div>
  );
};

const FilterDrawer = ({ show, setShow }) => {
  const [filters, setFilters] = useState({});

  return (
    <div className={`min-w-[100dvw] bg-base-100 p-4 md:w-[350px] md:min-w-0`}>
      <div className="flex justify-between items-center">
        <span className="text-[.875rem] font-bold">FILTER OPTIONS</span>
        <button onClick={() => setShow(false)} className="btn icon-btn">
          <X />
        </button>
      </div>
      <div>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Date</legend>

          <label className="label">Start Date</label>
          <input
            type="datetime-local"
            className="input input-sm"
            onChange={(e) =>
              updateFilters("starttime", toIso08601(e.target.value))
            }
          />

          <label className="label">End Date</label>
          <input
            type="datetime-local"
            className="input input-sm"
            onChange={(e) =>
              updateFilters("endtime", toIso08601(e.target.value))
            }
          />
        </fieldset>

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 grid-cols-2">
          <legend className="fieldset-legend">Magnitude</legend>

          <div>
            <label className="label">Min</label>
            <input
              type="range"
              min={0}
              max={9}
              className="range range-sm [--range-fill:0]"
              // onChange={(e) => updateFilters("minmagnitude", e.target.value)}
            />
          </div>

          <div>
            <label className="label">Max</label>
            <input
              type="range"
              min={1}
              max={10}
              className="range range-sm [--range-fill:0]"
              // onChange={(e) => updateFilters("maxmagnitude", e.target.value)}
            />
          </div>
        </fieldset>

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Location</legend>

          <label className="label">Latitude</label>
          <input
            type="text"
            className="input input-sm"
            // onChange={(e) => updateFilters("latitude", e.target.value)}
          />

          <label className="label">Longitude</label>
          <input
            type="text"
            className="input input-sm"
            // onChange={(e) => updateFilters("longitude", e.target.value)}
          />

          <label className="label">Radius</label>
          <div className="flex">
            <input
              type="number"
              min={1}
              max={20000}
              step={0.1}
              className="input validator input-sm rounded-br-none rounded-tr-none border-r-0"
              // onChange={(e) => updateFilters("maxradiuskm", e.target.value)}
            />
            <div className="label p-2 bg-base-200 h-[32px] border-[1px] border-[rgba(0,0,0,0.2)] rounded-r-[4px]">
              km
            </div>
          </div>
          <p className="validator-hint">Must be between be 1 to 2000</p>
        </fieldset>
      </div>
      <div id="#filters-footer" className="flex gap-2 mt-4 justify-end">
        <button className="btn btn-sm">Clear Filters</button>
        <button type="submit" className="btn btn-outline btn-sm">
          Apply
        </button>
      </div>
    </div>
  );
};

export default ListDrawer;
