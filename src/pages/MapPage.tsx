import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import { Card } from "@/components/ui/card";
import { mockRequests, mockVolunteers } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { UrgencyBadge } from "@/components/UrgencyBadge";

// Fix default marker icons (Leaflet + bundlers)
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconRetinaUrl, iconUrl, shadowUrl,
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const URGENCY_COLOR: Record<string, string> = {
  low: "#94a3b8", medium: "#0ea5e9", high: "#f59e0b", critical: "#ef4444",
};

export default function MapPage() {
  useEffect(() => {
    // ensure map fills container after layout
    setTimeout(() => window.dispatchEvent(new Event("resize")), 100);
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Live Map</h1>
        <p className="text-muted-foreground">Requests, volunteers, and activity across regions.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card className="overflow-hidden p-0 shadow-soft" style={{ height: 600 }}>
          <MapContainer center={[20.5937, 78.9629]} zoom={5} scrollWheelZoom className="h-full w-full">
            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {mockRequests.map((r) => (
              <CircleMarker
                key={r.id}
                center={[r.location.lat, r.location.lng]}
                radius={r.urgency === "critical" ? 14 : r.urgency === "high" ? 11 : 9}
                pathOptions={{ color: URGENCY_COLOR[r.urgency], fillColor: URGENCY_COLOR[r.urgency], fillOpacity: 0.6, weight: 2 }}
              >
                <Popup>
                  <div className="space-y-1">
                    <UrgencyBadge urgency={r.urgency} />
                    <p className="font-semibold">{r.title}</p>
                    <p className="text-xs text-muted-foreground">{r.location.area}, {r.location.city}</p>
                    <p className="text-xs">{r.peopleAffected} affected</p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
            {mockVolunteers.map((v) => (
              <Marker key={v.id} position={[v.location.lat, v.location.lng]}>
                <Popup>
                  <div>
                    <p className="font-semibold">{v.name}</p>
                    <p className="text-xs">{v.skills.join(", ")}</p>
                    <p className="text-xs text-muted-foreground">{v.available ? "Available" : "Busy"}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Card>

        <Card className="p-5 shadow-soft">
          <h3 className="font-semibold">Legend</h3>
          <div className="mt-3 space-y-2 text-sm">
            {(["critical", "high", "medium", "low"] as const).map((u) => (
              <div key={u} className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ background: URGENCY_COLOR[u] }} />
                <span className="capitalize">{u} urgency request</span>
              </div>
            ))}
            <div className="flex items-center gap-2 pt-2 border-t">
              <span className="h-4 w-3 rounded-sm bg-blue-500" />
              <span>Volunteer location</span>
            </div>
          </div>

          <h3 className="mt-6 font-semibold">Active hotspots</h3>
          <div className="mt-2 space-y-2">
            {mockRequests.filter((r) => r.urgency === "critical" || r.urgency === "high").slice(0, 4).map((r) => (
              <div key={r.id} className="rounded-lg border p-2 text-xs">
                <div className="flex items-center gap-2"><UrgencyBadge urgency={r.urgency} /><Badge variant="outline" className="text-[10px]">{r.location.city}</Badge></div>
                <p className="mt-1 font-medium">{r.title}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
