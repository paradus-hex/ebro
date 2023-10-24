import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import '@maptiler/geocoding-control/style.css';
// import './map.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import { GeocodingControl } from '@maptiler/geocoding-control/maplibregl';

export default function Map() {
  const apiKey = 'imiWDMZVVfUMgl4VXQ80';
  const mapContainer = useRef(null);
  const map = useRef(null);
  const tokyo = { lng: 139.753, lat: 35.6844 };
  const [zoom] = useState(14);
  maptilersdk.config.apiKey = 'imiWDMZVVfUMgl4VXQ80';

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once
    const gc = new GeocodingControl({ apiKey });
    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [tokyo.lng, tokyo.lat],
      zoom: zoom,
    });
    map.current.addControl(gc);

    new maptilersdk.Marker({ color: '#FF0000' })
      .setLngLat([139.7525, 35.6846])
      .addTo(map.current);
  }, [tokyo.lng, tokyo.lat, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
