import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { GeoSearchControl, MapBoxProvider } from 'leaflet-geosearch';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
function MyComponent() {
  const map = useMap();
  console.log('map center:', map.getCenter());
  return null;
}
const apiKey = 'imiWDMZVVfUMgl4VXQ80';
// import { useMap } from 'react-leaflet';
// const SearchField = ({ apiKey }) => {
//   const provider = new MapBoxProvider({
//     params: {
//       access_token: apiKey,
//     },
//   });

//   // @ts-ignore
//   const searchControl = new GeoSearchControl({
//     provider: provider,
//   });

//   const map = useMap();

//   useEffect(() => {
//     map.addControl(searchControl);
//     return map.removeControl(searchControl);
//   }, []);

//   return null;
// };

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
const center = {
  lat: 51.505,
  lng: -0.09,
};
function DraggableMarker() {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    [],
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? 'Marker is draggable'
            : 'Click here to make marker draggable'}
        </span>
      </Popup>
    </Marker>
  );
}

export default function Map2() {
  return (
    <div>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <div className="w-[100px] h-screen">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* {showSearch && <SearchField apiKey={apiKey} />} */}
          <DraggableMarker />
          {/* <SearchField apiKey={apiKey} /> */}
        </div>
      </MapContainer>
    </div>
  );
}
