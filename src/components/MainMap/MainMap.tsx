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
import {DATA_DISPLAY_TYPE, DRAWER_TYPES} from "../../types";
import OfficeList from "../OfficeList/OfficeList";
import NavBar from "../NavVar/NavBar";
import {useDispatch} from 'react-redux';
import {setCurrentOffice, setDrawerOpen} from '../../redux/UserLocationSlice/UserLocationSlice';

const MainMap = () => {
  const displayType = useAppSelector(getDataDisplayType);
  const { lat, lng } = useAppSelector(getCurrentUserLocation);

  const dispatch = useDispatch();

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

    const myMap = getMap({});
    const objectManager = getManager();

    setPins(objectManager, getJSONFromOfficies(officesData));

    // локация юсера
    let geolocation = ymaps.geolocation
    geolocation.get({
      provider: 'browser',
      mapStateAutoApply: false,
    }).then(function (result) {
      //@ts-ignore
      result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
      myMap.geoObjects.add(result.geoObjects);
      //@ts-ignore
      myMap.setCenter(result.geoObjects.get(0).geometry.getCoordinates(), 13, {duration: 300});
    });

    myMap.geoObjects.add(objectManager);
    myMap.geoObjects.events.add('click', function(e) {
      let objectId = e.get('objectId');

      if (Number(objectId) <= 0) {
        return;
      }
      let currentOffice: any = null;
      // todo нужны ID!!!!
      for (let i = 0; i < officesData.length; i++) {
        //@ts-ignore
        if (i + 1 === Number(objectId)) {
          currentOffice = officesData[i];
          break;
        }
      }

      if (currentOffice) {
        dispatch(setDrawerOpen(DRAWER_TYPES.OFFICE));
        dispatch(setCurrentOffice(currentOffice))
      }
    });
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
