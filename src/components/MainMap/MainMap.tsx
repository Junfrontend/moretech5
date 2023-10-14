import { YMaps, useYMaps } from "@pbe/react-yandex-maps";
import { useAppSelector } from "../../redux/hooks";
import { getCurrentUserLocation } from "../../redux/UserLocationSlice/selectors";
import { Placemark, Map } from "@pbe/react-yandex-maps";
import { useEffect, useRef } from "react";

const MainMap = () => {
  const { lat, lng } = useAppSelector(getCurrentUserLocation);

  const mapRef = useRef(null);
  const ymaps = useYMaps(["Map", "Placemark"]);

  useEffect(() => {
    if (!ymaps || !mapRef.current) {
      return;
    }

    new ymaps.Map(mapRef.current, {
      center: [lat || 55.76, lng || 37.64],
      zoom: 14,
    });
  }, [ymaps]);

  useEffect(() => {
    if (!ymaps || !mapRef.current) {
      return;
    }
  }, [lat, lng, ymaps]);

  return <div ref={mapRef} style={{ width: "320px", height: "240px" }} />;
};

export default MainMap;
