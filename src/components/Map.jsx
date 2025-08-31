import { useEffect } from "react";
import {
  MapContainer,
  CircleMarker,
  TileLayer,
  Popup,
  useMap,
} from "react-leaflet";
import { X } from "react-feather";

const Highlight = ({ el }) => {
  const map = useMap();

  useEffect(() => {
    if (el) {
      map.flyTo([el.lat, el.lng], 10);
      map.openPopup(`${el.location} - ${el.magnitude.toFixed(2)}`, [
        el.lat,
        el.lng,
      ]);
    } else {
      map.flyTo([0, 0], 3);
      map.closePopup();
    }
  }, [el]);

  return null;
};

const Map = ({ data, highlight, setHighlight }) => {
  return (
    <div className="h-full w-full relative">
      { highlight &&
        <button
          onClick={() => setHighlight(null)}
          className="absolute right-[50%] bottom-10 btn btn-circle btn-lg z-5"
        >
          <X />
        </button>
      }
      <MapContainer
        className="h-full w-full z-4"
        center={[0, 0]}
        zoomControl={false}
        zoom={3}
        scrollWheelZoom={false}
        minZoom={2}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((item, index) => {
          if (!highlight || highlight.id !== item.id) {
            return (
              <CircleMarker key={index} center={[item.lat, item.lng]}>
                <Popup>{`${item.location} - ${item.magnitude}`}</Popup>
              </CircleMarker>
            );
          } else {
            return (
              <CircleMarker
                key={index}
                center={[item.lat, item.lng]}
                fillOpacity={100}
              >
                <Popup>{`${item.location} - ${item.magnitude.toFixed(
                  2
                )}`}</Popup>
              </CircleMarker>
            );
          }
        })}
        <Highlight el={highlight} />
      </MapContainer>
    </div>
  );
};

export default Map;
