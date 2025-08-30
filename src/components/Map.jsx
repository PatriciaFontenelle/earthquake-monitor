import { useEffect } from "react";
import {
  MapContainer,
  CircleMarker,
  TileLayer,
  Popup,
  useMap,
} from "react-leaflet";

const Highlight = ({ el }) => {
  const map = useMap();

  useEffect(() => {
    if (el) {
      map.flyTo([el.lat, el.lng], 10);
    } else {
      map.flyTo([0, 0], 3);
    }
  }, [el]);

  return null;
};

const Map = ({ data, highlight }) => {
  return (
    <div className="h-full w-full">
      <MapContainer
        className="h-full w-full"
        center={[0, 0]}
        zoom={3}
        scrollWheelZoom={false}
        minZoom={2}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((item) => {
          return (
            <CircleMarker center={[item.lat, item.lng]} fillOpacity={100} fillColor={!highlight || highlight.id != item.id ? "blue" : "blue"}>
              <Popup>{`${item.location} - ${item.magnitude}`}</Popup>
            </CircleMarker>
          );
        })}
        <Highlight el={highlight} />
      </MapContainer>
    </div>
  );
};

export default Map;
