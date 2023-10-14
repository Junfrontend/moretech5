import { useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { getCurrentUserLocation } from "../../redux/UserLocationSlice/selectors";


import { useMap } from '../../hooks/useMap';
import { getJSONFromOfficies } from '../../utils';
import { officesData } from '../../mocks/offices';

import './MainMap.css';

const MainMap = () => {
  let isFirstMount = true;

  const { lat, lng } = useAppSelector(getCurrentUserLocation);
  const {
    getMap,
    getManager,
    setPins,
  } = useMap([lat, lng]);

  function init () {
    const DARK_MAP = 'custom#dark';
    //@ts-ignore
    const ymaps = window.ymaps;
    //@ts-ignore
    ymaps.layer.storage.add(DARK_MAP, function DarkLayer() {
      //@ts-ignore
      return new window.ymaps.Layer(
        'https://core-renderer-tiles.maps.yandex.net/tiles?l=map&theme=dark&%c&%l&scale={{ scale }}',
      );
    });
    //@ts-ignore
    ymaps.mapType.storage.add(DARK_MAP, new ymaps.MapType('Dark Map', [DARK_MAP]));

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
  }


  useEffect(() => {
    if (isFirstMount) {
      isFirstMount = false;
      return;
    }
    //@ts-ignore
    if (window.ymaps) {
      //@ts-ignore
      window.ymaps.ready(init);
    }
  }, []);


  return (
    <div id='map' className='map'></div>
  );
};

export default MainMap;
