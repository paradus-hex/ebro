import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import mapPointer from '/images/mapPointer.png';

// import myCustomMarkerIcon from './path/to/your/custom-marker-icon.png'; // Replace with the path to your custom marker icon image

const customIcon = new L.Icon({
  // @ts-ignore
  iconUrl: '/images/mapPointer.png',
  iconSize: [32, 32], // Adjust the size as needed
  iconAnchor: [16, 32], // Adjust the anchor point if necessary
});

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import L from 'leaflet';

const apiKey = 'imiWDMZVVfUMgl4VXQ80';

const SearchField = ({ apiKey }) => {
  const provider = new OpenStreetMapProvider();

  // @ts-ignore
  const searchControl = new GeoSearchControl({
    provider: provider,
    showMarker: true,
    showPopup: true,
    marker: {
      // optional: L.Marker    - default L.Icon.Default
      icon: customIcon,
      draggable: true,
    },
    popupFormat: ({ query, result }) => result.label, // optional: function    - default returns result label,
    resultFormat: ({ result }) => result.label,
  });

  const map = useMap();
  // @ts-ignore
  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, []);

  return null;
};
function MyComponent() {
  const map = useMap();
  console.log('map center:', map.getCenter());
  return null;
}
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
            attribution='&copy; <a href="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=imiWDMZVVfUMgl4VXQ80">OpenStreetMap</a> contributors'
            url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=imiWDMZVVfUMgl4VXQ80"
          />
          {/* {showSearch && <SearchField apiKey={apiKey} />} */}
          {/* <DraggableMarker /> */}
          <SearchField apiKey={apiKey} />
        </div>
      </MapContainer>
    </div>
  );
}
