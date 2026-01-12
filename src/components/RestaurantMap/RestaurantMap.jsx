import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';





let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function RestaurantMap({ restaurant }) {
  if (!restaurant.branches) return null;

  return (
    <div className="map-section" style={{ marginTop: '40px' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>Наши филиалы</h2>
      <div style={{ height: '400px', width: '100%', borderRadius: '20px', overflow: 'hidden', border: '1px solid #333' }}>
        <MapContainer center={restaurant.mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
  attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
/>
          {restaurant.branches.map((branch) => (
            <Marker key={branch.id} position={branch.position}>
              <Popup>
                <strong>{branch.name}</strong> <br /> {branch.address}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default RestaurantMap;