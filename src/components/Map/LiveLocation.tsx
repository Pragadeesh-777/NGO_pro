
import { useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

export default function LiveLocation() {
  const map = useMap();

  useEffect(() => {
    map.locate({ setView: true, maxZoom: 13 });

    map.on("locationfound", (e: any) => {
      L.marker(e.latlng).addTo(map).bindPopup("You are here").openPopup();

      L.circle(e.latlng, {
        radius: e.accuracy,
        color: "blue",
        fillOpacity: 0.2,
      }).addTo(map);
    });
  }, [map]);

  return null;
}