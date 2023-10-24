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
// import { Marker } from 'leaflet';
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

const SearchField = () => {
  const provider = new OpenStreetMapProvider();
  const { mapLocation, setMapLocation, showSearch, setShowSearch } =
    useCreatePageStore();

  // @ts-ignore
  const searchControl = new GeoSearchControl({
    provider: provider,
    showMarker: true,
    showPopup: true,
    updateMap: true,
    retainZoomLevel: false,
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
    map.on('geosearch/showlocation', function (e) {
      setShowSearch(true);
    });
    // map.on('geosearch/marker/dragend', function (e) {
    //   console.log(e);
    //   // @ts-ignore
    //   setMapLocation({ lat: e.location.lat, lng: e.location.lng });
    // });
    return () => map.removeControl(searchControl);
  }, []);

  return null;
};

export default function Map2() {
  const { mapLocation, showSearch, setShowSearch, setMapLocation } =
    useCreatePageStore();
  useEffect(() => {
    setShowSearch(false);
  }, []);

  return (
    <div className="flex justify-center items-center">
      {/* <h1>{mapLocation.lat}</h1>
      <h1>{mapLocation.lng}</h1> */}
      <MapContainer
        className="w-[90%] h-[600px]"
        center={[mapLocation.lat, mapLocation.lng]}
        zoom={13}
        scrollWheelZoom={false}
      >
        {/* <div className="w-[800px] h-screen"> */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* {showSearch && <SearchField apiKey={apiKey} />} */}
        {/* <DraggableMarker /> */}
        <SearchField />
        {!showSearch && (
          <Marker
            position={[mapLocation.lat, mapLocation.lng]}
            icon={customIcon}
            draggable={true}
            eventHandlers={{
              dragend: (e) => {
                setMapLocation({
                  lat: e.target._latlng.lat,
                  lng: e.target._latlng.lng,
                });
              },
            }}
          />
        )}

        {/* </div> */}
      </MapContainer>
    </div>
  );
}
