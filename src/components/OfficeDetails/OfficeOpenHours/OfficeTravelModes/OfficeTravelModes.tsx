import React, {FormEvent, useState} from 'react';
import IconYaCar from '../../../Icons/IconYaCar';
import IconYaBus from '../../../Icons/IconYaBus';
import IconYaWalk from '../../../Icons/IconYaWalk';
import IconYaMoto from '../../../Icons/IconYaMoto';
import { IconYaTaxi } from '../../../Icons/IconYaTaxi';
import './office-travel-modes.css';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../../../redux/hooks';
import {getCurrentOffice, getCurrentUserLocation } from '../../../../redux/UserLocationSlice/selectors';
import {useMap} from '../../../../hooks/useMap';
import {
  setCurrentOffice,
  setDrawerClose,
  setDrawerOpen,
  setUserLocation
} from '../../../../redux/UserLocationSlice/UserLocationSlice';
import {getJSONFromOfficies} from '../../../../utils';
import {officesData} from '../../../../mocks/offices';
import IconClue from '../../../Icons/IconClue';
import {DRAWER_TYPES} from '../../../../types';


const Transport = {
  Car: 'car',
  Public: 'public',
  Walking: 'walking',
  Bicycle: 'bicycle',
  Taxi: 'taxi'
}

export const OfficeTravelModes = () => {
  const dispatch = useDispatch();
  const currentLocation = useAppSelector(getCurrentUserLocation);
  const currentOffice = useAppSelector(getCurrentOffice);
  const branchLocation = [currentOffice.latitude, currentOffice.longitude];

  let map: any = null;

  const [transport, setTransport] = useState('');
  const {
    setMap,
    getManager,
    setPins
  } = useMap(currentLocation);

  //@ts-ignore
  let resetButton = new window.ymaps.control.Button({
    data: { content: "Сбросить" },
    options: { selectOnClick: true }
  });

  resetButton.events.add('click', function () {
    resetMap();
  });

  const handleUserGeoReceive = (position: any) => {
    dispatch(
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    );
  };

  navigator.geolocation.getCurrentPosition(handleUserGeoReceive);

  const clearMap = () => {
    const mapCotainer = document.querySelector('#map');
    // @ts-ignore
    mapCotainer.innerHTML = '';
  };

  // todo если маршруты не найдены
  const setCarMapRoute = () => {
    const ymaps = window.ymaps;
    //@ts-ignore
    let multiRoute = new ymaps.multiRouter.MultiRoute({
      referencePoints: [
        [currentLocation.lat, currentLocation.lng],
        branchLocation
      ],
      params: {
        results: 2
      }
    }, {
      boundsAutoApply: true,
      wayPointStartIconColor: "#FFFFFF",
      wayPointStartIconFillColor: "#B3B3B3",
      // Внешний вид линии активного маршрута.
      routeActiveStrokeWidth: 8,
      routeActiveStrokeStyle: 'solid',
      routeActiveStrokeColor: "#002233",
      // Внешний вид линий альтернативных маршрутов.
      routeStrokeStyle: 'dot',
      routeStrokeWidth: 3,
    });


    let trafficButton = new ymaps.control.Button({
      data: { content: "Учитывать пробки" },
      options: { selectOnClick: true }
    });

    trafficButton.events.add('select', function () {
      multiRoute.model.setParams({ avoidTrafficJams: true }, true);
    });

    trafficButton.events.add('deselect', function () {
      multiRoute.model.setParams({ avoidTrafficJams: false }, true);
    });

    clearMap();

    map = setMap({
      controls: [trafficButton, resetButton],
      loc: branchLocation
    });
    map.geoObjects.add(multiRoute);
  };

  const setPublicTransportRoute = () => {
    const ymaps = window.ymaps;

    let multiRoute = new ymaps.multiRouter.MultiRoute({
      referencePoints: [
        [currentLocation.lat, currentLocation.lng],
        branchLocation
      ],
      params: {
        routingMode: 'masstransit'
      }
    }, {
      boundsAutoApply: true
    });



    let changeLayoutButton = new ymaps.control.Button({
      data: { content: "Изменить макет подписи для пеших сегментов"},
      options: { selectOnClick: true }
    });

    changeLayoutButton.events.add('select', function () {
      //@ts-ignore
      multiRoute.options.set(
        "routeWalkMarkerIconContentLayout",
        ymaps.templateLayoutFactory.createClass('{{ properties.duration.text }}')
      );
    });

    changeLayoutButton.events.add('deselect', function () {
      //@ts-ignore
      multiRoute.options.unset("routeWalkMarkerIconContentLayout");
    });

    clearMap();

    map = setMap({
      loc: branchLocation,
      controls: [resetButton],
    });
    //@ts-ignore
    map.geoObjects.add(multiRoute);
  };

  const setWalkingRoute = () => {
    const ymaps = window.ymaps;
    const currentPoint = [currentLocation.lat, currentLocation.lng];
    let multiRoute = new ymaps.multiRouter.MultiRoute({
      referencePoints: [
        currentPoint,
        branchLocation
      ],
      params: {
        routingMode: 'pedestrian'
      }
    }, {
      boundsAutoApply: true
    });

    let changePointsButton = new ymaps.control.Button({
      data: {content: "Поменять местами точки А и В"},
      options: {selectOnClick: true}
    });

    changePointsButton.events.add('select', function () {
      multiRoute.model.setReferencePoints([branchLocation, currentPoint]);
    });

    changePointsButton.events.add('deselect', function () {
      multiRoute.model.setReferencePoints([currentPoint, branchLocation]);
    });

    clearMap();

    map = setMap({
      loc: branchLocation,
      controls: [resetButton],
    });

    map.geoObjects.add(multiRoute);
  };


  const setBicycleRoute = () => {
    const ymaps = window.ymaps;
    const currentPoint = [currentLocation.lat, currentLocation.lng];
    let multiRoute = new ymaps.multiRouter.MultiRoute({
      referencePoints: [
        currentPoint,
        branchLocation
      ],
      params: {
        //@ts-ignore
        routingMode: 'bicycle'
      }
    }, {
      boundsAutoApply: true
    });

    let changePointsButton = new ymaps.control.Button({
      data: {content: "Поменять местами точки А и В"},
      options: {selectOnClick: true}
    });

    changePointsButton.events.add('select', function () {
      multiRoute.model.setReferencePoints([branchLocation, currentPoint]);
    });

    changePointsButton.events.add('deselect', function () {
      multiRoute.model.setReferencePoints([currentPoint, branchLocation]);
    });

    clearMap();

    map = setMap({
      loc: branchLocation,
      controls: [resetButton],
    });

    map.geoObjects.add(multiRoute);
  };


  const setTaxiRoute = () => {
    const ymaps = window.ymaps;
    clearMap();

    map = setMap({
      loc: branchLocation,
      controls: [resetButton],
    });

    let routePanelControl = new ymaps.control.RoutePanel({
      options: {

        showHeader: true,
        title: 'Вызов такси',
        //@ts-ignore
        routePanelTypes: { taxi: true },
        maxWidth: '210px'
      }
    });

    //@ts-ignore
    routePanelControl.routePanel.state.set({
      type: "taxi",
      to: branchLocation,
      toEnabled: false
    });

    let zoomControl = new ymaps.control.ZoomControl({
      options: {
        size: 'small',
        //@ts-ignore
        float: 'none',
        position: {
          bottom: 145,
          right: 10
        }
      }
    });

    map.controls.add(routePanelControl).add(zoomControl);
    // Зададим местоположение пользователя в качестве начальной точки маршрута.
    //@ts-ignore
    routePanelControl.routePanel.geolocate('from');
  };

  const resetMap = () => {
    clearMap();

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

    map = setMap({
      loc: branchLocation
    });
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
      map.geoObjects.add(result.geoObjects);
      //@ts-ignore
      myMap.setCenter(branchLocation || [currentLocation.lat, currentLocation.lng], 10, {duration: 300});
    });

    map.geoObjects.add(objectManager);

    map.geoObjects.events.add('click', function(e: any) {
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
  };

  const handleRouteSelect = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(setDrawerClose());

    switch(transport) {
      case 'car': {
        setCarMapRoute();
        break;
      }
      case 'public': {
        setPublicTransportRoute();
        break;
      }
      case 'walking': {
        setWalkingRoute();
        break;
      }
      case 'bicycle': {
        setBicycleRoute();
        break;
      }
      case 'taxi': {
        setTaxiRoute();
        break;
      }
      default: {
        resetMap();
        break;
      }
    }
  };

  const isChecked = (value: string) => {
    return value === transport;
  };
  return (
    <>
      <form onSubmit={handleRouteSelect}>
        <div className='office-travel-modes'>
          <div className='mode-toggle'>
            <label>
              <input
                type='radio'
                name='mode'
                value={Transport.Public}
                checked={isChecked(Transport.Public)}
                onChange={() => setTransport(Transport.Public)}
              >
              </input>
              <span className='mode-toggle-icon'>
                <IconYaBus />
              </span>
            </label>
          </div>
          <div className='mode-toggle'>
            <label>
              <input
                type='radio'
                name='mode'
                value={Transport.Car}
                checked={isChecked(Transport.Car)}
                onChange={() => setTransport(Transport.Car)}
              >
              </input>
              <span className='mode-toggle-icon'>
                <IconYaCar />
              </span>
            </label>
          </div>
          <div className='mode-toggle'>
            <label>
              <input
                type='radio'
                name='mode'
                value={Transport.Walking}
                checked={isChecked(Transport.Walking)}
                onChange={() => setTransport(Transport.Walking)}
              >
              </input>
              <span className='mode-toggle-icon'>
                <IconYaWalk />
              </span>
            </label>
          </div>
          <div className='mode-toggle'>
            <label>
              <input
                type='radio'
                name='mode'
                value={Transport.Bicycle}
                checked={isChecked(Transport.Bicycle)}
                onChange={() => setTransport(Transport.Bicycle)}
              >
              </input>
              <span className='mode-toggle-icon'>
                <IconYaMoto />
              </span>
            </label>
          </div>
          <div className='mode-toggle'>
            <label>
              <input
                type='radio'
                name='mode'
                value={Transport.Taxi}
                checked={isChecked(Transport.Taxi)}
                onChange={() => setTransport(Transport.Taxi)}
              >
              </input>
              <span className='mode-toggle-icon'>
                <IconYaTaxi />
              </span>
            </label>
          </div>
        </div>
        <button type='submit' className='office-details-btn' disabled={!transport}>
          <IconClue />
          сюда
        </button>
      </form>
    </>
  );
};
