


import { useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";

type Props = {
  from?: { lat: number; lng: number };
  to?: { lat: number; lng: number };
};

export default function Routing({ from, to }: Props) {
  const map = useMap();

  useEffect(() => {
    if (!from || !to) return;

    // ❗ FIX: Cast L to any to access Routing
    const routingControl = (L as any).Routing.control({
      waypoints: [
        L.latLng(from.lat, from.lng),
        L.latLng(to.lat, to.lng),
      ],
      addWaypoints: false,
      draggableWaypoints: false,
      show: false,
      lineOptions: {
        styles: [{ color: "blue", weight: 4 }],
      },
    }).addTo(map);

    return () => {
      if (routingControl) {
        map.removeControl(routingControl);
      }
    };
  }, [map, from, to]);

  return null;
}