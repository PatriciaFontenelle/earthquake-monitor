import axios from "axios";

const api = axios.create({
  baseURL: "https://earthquake.usgs.gov/fdsnws/event/1/",
  params: {
    format: "geojson",
    orderby: "time",
    limit: 50,
  },
});

export default api;
