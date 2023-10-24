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
import { useCreatePageStore } from '../stores/createPageStore';
// import myCustomMarkerIcon from './path/to/your/custom-marker-icon.png'; // Replace with the path to your custom marker icon image

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import L from 'leaflet';

// @ts-ignore
const customIcon = new L.Icon({
  // @ts-ignore
  iconUrl: '/images/mapPointer.png',
  iconSize: [32, 32], // Adjust the size as needed
  iconAnchor: [16, 32], // Adjust the anchor point if necessary
});

const apiKey = '';

const SearchField = ({ apiKey }) => {
  const provider = new OpenStreetMapProvider();
  const { mapLocation, setMapLocation } = useCreatePageStore();

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
    popupFormat: ({ query, result }) => {
      setMapLocation({ lng: result.x, lat: result.y });
      console.log('result:', result);
      return result.label;
    }, // optional: function    - default returns result label,
    resultFormat: ({ result }) => result.label,
    // retainZoomLevel: true,
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
  const { mapLocation, setMapLocation } = useCreatePageStore();
  return (
    <div>
      {/* <h1>{mapLocation.lat}</h1>
      <h1>{mapLocation.lng}</h1> */}
      <MapContainer center={[60.472, 8.4689]} zoom={13} scrollWheelZoom={false}>
        <div className="w-[100px] h-screen">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* {showSearch && <SearchField apiKey={apiKey} />} */}
          {/* <DraggableMarker /> */}
          <SearchField apiKey={apiKey} />
        </div>
      </MapContainer>
    </div>
  );
}
