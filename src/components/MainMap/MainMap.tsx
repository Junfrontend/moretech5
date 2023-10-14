import { useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import ExploreIcon from "@mui/icons-material/Explore";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
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
import {
  setUserLocation,
  setUserLocationWatchId,
} from "../../redux/UserLocationSlice/UserLocationSlice";

const MainMap = () => {
  const displayType = useAppSelector(getDataDisplayType);

  const { lat, lng } = useAppSelector(getCurrentUserLocation);
  const dispatch = useAppDispatch();

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
    // let geolocation = ymaps.geolocation;
    // geolocation
    //   .get({
    //     provider: "browser",
    //     mapStateAutoApply: true,
    //   })
    //   .then(function (result) {
    //     //@ts-ignore
    //     result.geoObjects.options.set("preset", "islands#blueCircleIcon");
    //     myMap.geoObjects.add(result.geoObjects);
    //   });

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

  useEffect(() => {
    const myMap = getMap();
    
    // @ts-ignore
    // const myGeoObject = new window.ymaps.GeoObject({
    //   geometry: {
    //     type: "Point", // тип геометрии - точка
    //     // @ts-ignore
    //     coordinates: [lat, lng], // координаты точки
    //   },
    // });

    // myMap.geoObjects.add(myGeoObject);
  }, [lat, lng]);

  const handleUserGeoReceive = (position: any) => {
    dispatch(
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    );
  };

  const handleUserGeoRequest = () => {
    // dispatch(setDrawerOpen(DRAWER_TYPES.FILTER));
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(handleUserGeoReceive);

      const userLocationWatchId =
        navigator.geolocation.watchPosition(handleUserGeoReceive);
      dispatch(setUserLocationWatchId(userLocationWatchId));
    } else {
      alert("Гео недоступно");
    }
  };

  return (
    <Stack direction={"column"}>
      <Stack direction={"column"} height={"100wh"}>
        <HeaderVisabilityType />
        {displayType === DATA_DISPLAY_TYPE.MAP && (
          <div id="map" className="map" />
        )}
        {displayType === DATA_DISPLAY_TYPE.LIST && <div>ШПЫСОК</div>}
      </Stack>
      <AppBar
        position="fixed"
        sx={{ top: "auto", bottom: 0, backgroundColor: "#FFF" }}
      >
        <Toolbar>
          <Stack
            justifyContent={"space-between"}
            alignItems={"center"}
            direction={"row"}
            width={"100%"}
          >
            <IconButton>
              <TuneIcon
                sx={{
                  color: "#000",
                }}
              />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: "#165BC6",
                borderRadius: "12px",
                position: "relative",
                bottom: "20px",
                margin: "0 auto",
              }}
            >
              <SearchIcon
                sx={{
                  color: "#FFF",
                }}
              />
            </IconButton>
            <IconButton onClick={handleUserGeoRequest}>
              <ExploreIcon
                sx={{
                  color: "#000",
                }}
              />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
    </Stack>
  );
};

export default MainMap;
