
import { useMap } from "react-leaflet";
import { useEffect } from "react";

export default function ResizeMap() {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
  }, [map]);

  return null;
}