import { useEffect, useState } from "react";
import { useNav } from "../contexts/NavContext";
import { formatDate, toIso08601 } from "../helpers/utils";
import { Filter, X } from "react-feather";
import { useData } from "../contexts/dataContext";

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
      } transition-[left] duration-300 ease-in-out flex absolute top-[63px] h-[calc(100dvh-63px)] max-h-[calc(100dvh-64px)] overflow-hidden z-6 bg-base-100 md:top-[64px]`}
    >
      <FilterDrawer setShow={setFilterOpened} />
      <div
        id="earthquackes-list"
        className={`w-[100dvw] overflow-auto bg-base-100 animate-[--animate-drawer] md:w-[350px] md:left-0 md:top-[64px]`}
      >
        <ul className="list">
          <li className="list-row font-bold">
            <div className="list-col-grow flex justify-between items-center">
              <span>LATEST EARTHQUAKES</span>
              <button
                onClick={() => setFilterOpened((prev) => !prev)}
                className="btn btn-sm"
                disabled={filterOpened}
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

const FilterDrawer = ({ setShow }) => {
  const { initialFilterValues, filters, setFilters } = useData();

  const updateFilters = (item) => {
    if (item.name == "maxradiuskm" && item.value > 20000) item.value = 20000;

    if (item.name == "latitude" && item.value < -90) item.value = -90;
    if (item.name == "latitude" && item.value > 90) item.value = 90;

    if (item.name == "longitude" && item.value < -180) item.value = -180;
    if (item.name == "longitude" && item.value > 180) item.value = 180;

    setFilters({ ...filters, [item.name]: item.value });
  };

  return (
    <div
      className={`min-w-[100dvw] bg-base-100 p-4 md:w-[350px] overflow-x-hidden overflow-y-auto md:min-w-0`}
    >
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
            name="starttime"
            value={filters.starttime}
            onChange={(e) => updateFilters(e.target)}
          />

          <label className="label">End Date</label>
          <input
            type="datetime-local"
            className="input input-sm"
            name="endtime"
            value={filters.endtime}
            onChange={(e) => updateFilters(e.target)}
          />
        </fieldset>

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 grid-cols-2">
          <legend className="fieldset-legend">Magnitude</legend>

          <div>
            <label className="label">{`Min - ${filters.minmagnitude}`}</label>
            <input
              type="range"
              min="0"
              max="9"
              step=".1"
              className="range range-sm [--range-fill:0]"
              name="minmagnitude"
              value={filters.minmagnitude}
              onChange={(e) => updateFilters(e.target)}
            />
          </div>

          <div>
            <label className="label">{`Max - ${filters.maxmagnitude}`}</label>
            <input
              type="range"
              min="1"
              max="10"
              step=".1"
              className="range range-sm [--range-fill:0]"
              name="maxmagnitude"
              value={filters.maxmagnitude}
              onChange={(e) => updateFilters(e.target)}
            />
          </div>
        </fieldset>

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Location</legend>

          <label className="label">Latitude</label>
          <input
            type="number"
            className="input input-sm"
            name="latitude"
            min="-90"
            max="90"
            step=".000001"
            value={filters.latitude}
            onChange={(e) => updateFilters(e.target)}
          />

          <label className="label">Longitude</label>
          <input
            type="number"
            className="input input-sm"
            name="longitude"
            min="-180"
            max="180"
            step=".000001"
            value={filters.longitude}
            onChange={(e) => updateFilters(e.target)}
          />

          <label className="label">Radius</label>
          <div className="flex relative">
            <input
              type="number"
              min="1"
              max="20000"
              step="0.1"
              className="input input-sm"
              name="maxradiuskm"
              value={filters.maxradiuskm}
              onChange={(e) => updateFilters(e.target)}
            />
            <div className="label p-2 bg-base-200 h-[32px] border-[1px] border-[rgba(0,0,0,0.2)] rounded-r-[4px] absolute right-0">
              km
            </div>
          </div>
          <p className="label -mt-1 ml-1 font-semibold text-[.65rem]">
            Max: 20000km
          </p>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Order by</legend>
          <select
            className="select select-sm"
            name="orderby"
            value={filters.orderby}
            onChange={(e) => updateFilters(e.target)}
          >
            <option value="time">Time</option>
            <option value="time-asc">Time Asc.</option>
            <option value="magnitude">Magnitude</option>
            <option value="magnitude-asc">Magnitude Asc.</option>
          </select>
        </fieldset>
      </div>

      <div id="#filters-footer" className="flex gap-2 my-4 justify-end">
        <button
          onClick={() => setFilters(initialFilterValues)}
          className="btn btn-sm"
        >
          Clear Filters
        </button>
        <button type="submit" className="btn btn-outline btn-sm">
          Apply
        </button>
      </div>
    </div>
  );
};

export default ListDrawer;
