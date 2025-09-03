import { X } from "react-feather";
import { useData } from "@/contexts/dataContext";

const FilterDrawer = ({ setFilterOpened }) => {
  const {
    initialFilterValues,
    filters,
    setFilters,
    setFilterApplied,
  } = useData();

  const updateFilters = (item) => {
    if (item.name == "maxRadiusKm" && item.value > 20000) item.value = 20000;

    if (item.name == "latitude" && item.value < -90) item.value = -90;
    if (item.name == "latitude" && item.value > 90) item.value = 90;

    if (item.name == "longitude" && item.value < -180) item.value = -180;
    if (item.name == "longitude" && item.value > 180) item.value = 180;

    setFilters({ ...filters, [item.name]: item.value });
  };

  const applyFilters = () => {
    setFilterApplied(true);
    setFilterOpened(false);
  };

  return (
    <div
      className={`p-4 max-h-[calc(100vh-64px)] overflow-y-auto w-[100vw] md:w-[350px]`}
    >
      <div className="flex justify-between items-center">
        <span className="text-[.875rem] font-bold">FILTER OPTIONS</span>
        <button
          id="close-filters-drawer"
          onClick={() => setFilterOpened(false)}
          className="btn icon-btn focused-btn h-[28px]"
        >
          <X />
        </button>
      </div>
      <div className="flex flex-col items-center">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Date</legend>

          <label className="label">Start Date</label>
          <input
            type="datetime-local"
            className="input input-sm"
            name="startTime"
            value={filters.startTime}
            onChange={(e) => updateFilters(e.target)}
          />

          <label className="label">End Date</label>
          <input
            type="datetime-local"
            className="input input-sm"
            name="endTime"
            value={filters.endTime}
            onChange={(e) => updateFilters(e.target)}
          />
        </fieldset>

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 grid-cols-2">
          <legend className="fieldset-legend">Magnitude</legend>

          <div>
            <label className="label">{`Min - ${filters.minMagnitude}`}</label>
            <input
              type="range"
              min="0"
              max="9"
              step=".1"
              className="range range-sm [--range-fill:0]"
              name="minMagnitude"
              value={filters.minMagnitude}
              onChange={(e) => updateFilters(e.target)}
            />
          </div>

          <div>
            <label className="label">{`Max - ${filters.maxMagnitude}`}</label>
            <input
              type="range"
              min="1"
              max="10"
              step=".1"
              className="range range-sm [--range-fill:0]"
              name="maxMagnitude"
              value={filters.maxMagnitude}
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
              name="maxRadiusKm"
              value={filters.maxRadiusKm}
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

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Order by</legend>
          <select
            className="select select-sm"
            name="orderBy"
            value={filters.orderBy}
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
        <button
          onClick={() => applyFilters()}
          type="submit"
          className="btn btn-outline btn-sm"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterDrawer;
