import { useEffect } from "react";
import {
  MapContainer,
  CircleMarker,
  TileLayer,
  Popup,
  useMap,
} from "react-leaflet";
import { X } from "react-feather";
import { useNav } from "@/contexts/navContext";
import { useData } from "@/contexts/dataContext";

const Highlight = () => {
  const { highlightedItem } = useNav();
  const map = useMap();

  useEffect(() => {
    if (highlightedItem) {
      map.flyTo([highlightedItem.lat, highlightedItem.lng], 10);
      map.openPopup(
        `${highlightedItem.location} - ${highlightedItem.magnitude.toFixed(2)}`,
        [highlightedItem.lat, highlightedItem.lng]
      );
    } else {
      map.flyTo([0, 0], 3);
      map.closePopup();
    }
  }, [highlightedItem]);

  return null;
};

const Map = () => {
  const { highlightedItem, setHighlightedItem } = useNav();
  const { data } = useData();

  return (
    <div className="h-full w-full relative">
      {highlightedItem && (
        <button
          onClick={() => setHighlightedItem(null)}
          id="cancel-selection-btn"
          className="absolute right-[50%] bottom-10 btn btn-circle btn-lg z-5 focus:border-base-content focus:border-2"
        >
          <X />
        </button>
      )}
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
          if (!highlightedItem || highlightedItem.id !== item.id) {
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
        <Highlight />
      </MapContainer>
    </div>
  );
};

export default Map;
