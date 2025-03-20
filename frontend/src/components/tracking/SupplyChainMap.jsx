import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const SupplyChainMap = ({ orders }) => {
  const defaultPosition = [13.0827, 80.2707]; // Default to London for demo

  return (
    <MapContainer
      center={defaultPosition}
      zoom={5}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {orders.map((order) => (
        <Marker
          key={order.id}
          position={
            order.supplier?.location_coords || defaultPosition // Assume location_coords is [lat, lng]
          }
        >
          <Popup>
            Order #{order.id} <br />
            Supplier: {order.supplier?.name || 'N/A'} <br />
            Status: {order.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default SupplyChainMap;