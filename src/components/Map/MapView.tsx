


import { MapContainer, TileLayer, Marker, CircleMarker } from "react-leaflet";
import ResizeMap from "./ResizeMap";
import LiveLocation from "./LiveLocation";
import Routing from "./Routing";
import { volunteerIcon } from "./icons";

// ✅ Adjust path if needed
import { mockRequests, mockVolunteers } from "../../data/mockData";

const URGENCY_COLOR: Record<string, string> = {
  low: "#94a3b8",
  medium: "#0ea5e9",
  high: "#f59e0b",
  critical: "#ef4444",
};

export default function MapView() {
  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={5}
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      <ResizeMap />
      <LiveLocation />

      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* ✅ Routing (safe check to avoid crash) */}
      {mockVolunteers?.length > 0 && mockRequests?.length > 0 && (
        <Routing
          from={mockVolunteers[0]?.location}
          to={mockRequests[0]?.location}
        />
      )}

      {/* ✅ Requests */}
      {mockRequests?.map((r) => (
        <CircleMarker
          key={r.id}
          center={[r.location.lat, r.location.lng]}
          radius={
            r.urgency === "critical"
              ? 14
              : r.urgency === "high"
              ? 11
              : 9
          }
          pathOptions={{
            color: URGENCY_COLOR[r.urgency] || "#000",
            fillColor: URGENCY_COLOR[r.urgency] || "#000",
            fillOpacity: 0.6,
            weight: 2,
          }}
        />
      ))}

      {/* ✅ Volunteers */}
      {mockVolunteers?.map((v) => (
        <Marker
          key={v.id}
          position={[v.location.lat, v.location.lng]}
          icon={volunteerIcon}
        />
      ))}
    </MapContainer>
  );
}