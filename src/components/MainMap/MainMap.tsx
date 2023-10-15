import { useEffect } from "react";

import { useAppSelector } from "../../redux/hooks";
import {
  getCurrentUserLocation,
  getDataDisplayType,
} from "../../redux/UserLocationSlice/selectors";

import { useMap } from "../../hooks/useMap";
import { getJSONFromOfficies } from "../../utils";
import { officesData } from "../../mocks/offices";

import "./MainMap.css";
import { Box, Stack } from "@mui/material";
import HeaderVisabilityType from "../HeaderVisabilityType/HeaderVisabilityType";
import { DATA_DISPLAY_TYPE } from "../../types";
import OfficeList from "../OfficeList/OfficeList";
import NavBar from "../NavBar/NavBar";

const MainMap = () => {
  const displayType = useAppSelector(getDataDisplayType);

  const { lat, lng } = useAppSelector(getCurrentUserLocation);

  const { getMap, getManager, setPins } = useMap([lat, lng]);

  function init() {
    const DARK_MAP = "custom#dark";
    //@ts-ignore
    const ymaps = window.ymaps;
    //@ts-ignore
    ymaps.layer.storage.add(DARK_MAP, function DarkLayer() {
      //@ts-ignore
      return new window.ymaps.Layer(
        "https://core-renderer-tiles.maps.yandex.net/tiles?l=map&theme=dark&%c&%l&scale={{ scale }}"
      );
    });
    //@ts-ignore
    ymaps.mapType.storage.add(
      DARK_MAP,
      new ymaps.MapType("Dark Map", [DARK_MAP])
    );

    const myMap = getMap();
    const objectManager = getManager();

    setPins(objectManager, getJSONFromOfficies(officesData));

    // objectManager.clusters.events.add(['mouseenter', 'mouseleave'], (e) => onClusterEvent(e, objectManager));

    // локация юсера
    let geolocation = ymaps.geolocation;
    geolocation
      .get({
        provider: "browser",
        mapStateAutoApply: true,
      })
      .then(function (result) {
        //@ts-ignore
        result.geoObjects.options.set("preset", "islands#blueCircleIcon");
        myMap.geoObjects.add(result.geoObjects);
      });

    myMap.geoObjects.add(objectManager);
  }

  useEffect(() => {
    //@ts-ignore
    if (window.ymaps && displayType === DATA_DISPLAY_TYPE.MAP) {
      //@ts-ignore
      const mapCotainer = document.querySelector("#map");
      //@ts-ignore
      mapCotainer.innerHTML = "";
      window.ymaps.ready(init);
    }
  }, [displayType]);

  // useEffect(() => {
  //   // const myMap = getMap();

  //   // @ts-ignore
  //   // const myGeoObject = new window.ymaps.GeoObject({
  //   //   geometry: {
  //   //     type: "Point", // тип геометрии - точка
  //   //     // @ts-ignore
  //   //     coordinates: [lat, lng], // координаты точки
  //   //   },
  //   // });

  //   // window.ymaps.geoObjects.add(myGeoObject);
  // }, [lat, lng]);

  return (
    <Stack direction={"column"}>
      <Stack direction={"column"} height={"100wh"}>
        <HeaderVisabilityType />
        {displayType === DATA_DISPLAY_TYPE.MAP && (
          <div id="map" className="map" />
        )}
        {displayType === DATA_DISPLAY_TYPE.LIST && <OfficeList />}
      </Stack>
      <NavBar />
    </Stack>
  );
};

export default MainMap;
