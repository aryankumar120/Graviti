import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const MapComponent = ({ origin, destination, stops }) => {
  const center = origin ? { lat: origin.lat, lng: origin.lng } : { lat: 0, lng: 0 };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBuM5ExRiA0E0xu-Fg_dsM6rv5PtBRs3TA">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {origin && <Marker position={{ lat: origin.lat, lng: origin.lng }} />}
        {destination && <Marker position={{ lat: destination.lat, lng: destination.lng }} />}
        {stops.map((stop, index) => (
          <Marker key={index} position={{ lat: stop.lat, lng: stop.lng }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(MapComponent);
