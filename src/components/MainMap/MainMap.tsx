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
import { Box, Stack, useMediaQuery } from "@mui/material";
import HeaderVisabilityType from "../HeaderVisabilityType/HeaderVisabilityType";
import {DATA_DISPLAY_TYPE, DRAWER_TYPES} from "../../types";
import OfficeList from "../OfficeList/OfficeList";
import NavBar from "../NavVar/NavBar";
import { AppLogo } from "../AppLogo/AppLogo";

import {useDispatch} from 'react-redux';
import {setCurrentOffice, setDrawerOpen} from '../../redux/UserLocationSlice/UserLocationSlice';

const Map = () => {
  return <div id="map" className="map" />
}

const MainMap = () => {
  const isDesktop = useMediaQuery('(min-width:1024px)');
  const displayType = useAppSelector(getDataDisplayType);
  const { lat, lng } = useAppSelector(getCurrentUserLocation);

  let map:any = null;

  const dispatch = useDispatch();

  const {
    setMap,
    getManager,
    setPins,
  } = useMap([lat, lng]);

  const setLocation = (map: any) => {
    //@ts-ignore
    const ymaps = window.ymaps;
    let geolocation = ymaps.geolocation;

    geolocation.get({
      provider: 'browser',
      mapStateAutoApply: false,
    }).then(function (result) {
      //@ts-ignore
      result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
      map.geoObjects.add(result.geoObjects);
      //@ts-ignore
      map.setCenter(result.geoObjects.get(0).geometry.getCoordinates(), 13, {duration: 300});
    });
  };

  const setNewMap = () => {
    map = setMap({});
  };

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

    setNewMap();
    const objectManager = getManager();
    setPins(objectManager, getJSONFromOfficies(officesData));

    // локация юсера
    setLocation(map);
    map.geoObjects.add(objectManager);
    map.geoObjects.events.add('click', function(e: any) {
      let objectId: string = e.get('objectId');

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

  const setMapCenter = () => {
    const map = document.querySelector('#map');
    if (map?.innerHTML) {
      map.innerHTML = '';
    }
    init();
  };

  useEffect(() => {
    //@ts-ignore
    if (window.ymaps && displayType === DATA_DISPLAY_TYPE.MAP) {
      window.ymaps.ready(init);
    }
  }, [displayType]);

  return (
    <Stack direction={"column"}>
      <Stack className={isDesktop ? 'app-desktop' : ''} direction={isDesktop ? "row" : "column"} height={"100wh"}>
        {!isDesktop && <HeaderVisabilityType />}
        {isDesktop && <><AppLogo /><OfficeList /></>}
        {displayType === DATA_DISPLAY_TYPE.MAP && (
          <Map />
        )}
        {displayType === DATA_DISPLAY_TYPE.LIST && <OfficeList />}
      </Stack>
      <NavBar setMapCenter={setMapCenter} />
    </Stack>
  );
};

export default MainMap;
