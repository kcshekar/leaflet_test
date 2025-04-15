'use client';

import { MapContainer, TileLayer, Marker, Popup, Circle, CircleMarker, Polyline, Polygon, Rectangle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';
import data from './data';
import json from './locations.json';

// Fix for missing marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function LeafletMap() {

    const { center, polyline, multiPolyline, polygon, multiPolygon, rectangle, fillBlueOptions, blackOptions, limeOptions, purpleOptions, redOptions, } = data;

    useEffect(() => {
        // This effect makes sure the map only renders on the client
    }, []);

    return (
        <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: '500px', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {json.slice(0, 10000).map((location, index) => (
                <Marker key={index} position={[location.lat, location.lng]}>
                    <Popup>
                        {location.name} {location.description}
                    </Popup>
                </Marker>
            ))}
            <Circle center={center} pathOptions={fillBlueOptions} radius={200} />
            <CircleMarker center={[51.51, -0.12]} pathOptions={redOptions} radius={20}>
                <Popup>Popup in CircleMarker</Popup>
            </CircleMarker>
            <Polyline pathOptions={limeOptions} positions={polyline} />
            <Polyline pathOptions={limeOptions} positions={multiPolyline} />
            <Polygon pathOptions={purpleOptions} positions={polygon} />
            <Polygon pathOptions={purpleOptions} positions={multiPolygon} />
            <Rectangle bounds={rectangle} pathOptions={blackOptions} />
        </MapContainer>
    );
}
