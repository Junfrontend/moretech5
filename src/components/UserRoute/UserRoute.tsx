import { useDispatch } from 'react-redux';
import {setDrawerClose, setDrawerOpen, setUserLocation} from '../../redux/UserLocationSlice/UserLocationSlice';
import {FormEvent, useEffect, useState} from 'react';
import {useAppSelector} from '../../redux/hooks';
import {getCurrentUserLocation} from '../../redux/UserLocationSlice/selectors';
import {useMap} from '../../hooks/useMap';
import {getJSONFromOfficies} from '../../utils';
import {officesData} from '../../mocks/offices';

const Transport = {
  Car: 'car',
  Public: 'public',
  Walking: 'walking',
  Bicycle: 'bicycle',
  Taxi: 'taxi'
}

export default function UserRoute({branchLocation}: any) {
  const dispatch = useDispatch();
  const currentLocation = useAppSelector(getCurrentUserLocation);
  const [transport, setTransport] = useState('');
  const {
    getMap,
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
    //@ts-ignore
    mapCotainer.innerHTML = '';
  };

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

    let myMap = getMap({
      controls: [trafficButton, resetButton],
      loc: branchLocation
    });
    myMap.geoObjects.add(multiRoute);
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

    let myMap = getMap({
      loc: branchLocation,
      controls: [resetButton],
    });
    //@ts-ignore
    myMap.geoObjects.add(multiRoute);
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

    let myMap = getMap({
      loc: branchLocation,
      controls: [resetButton],
    });

    myMap.geoObjects.add(multiRoute);
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

    let myMap = getMap({
      loc: branchLocation,
      controls: [resetButton],
    });

    myMap.geoObjects.add(multiRoute);
  };


  const setTaxiRoute = () => {
    const ymaps = window.ymaps;
    clearMap();

    let myMap = getMap({
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

    myMap.controls.add(routePanelControl).add(zoomControl);
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

    const myMap = getMap({
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
      myMap.geoObjects.add(result.geoObjects);
      //@ts-ignore
      myMap.setCenter(branchLocation || [currentLocation.lat, currentLocation.lng], 10, {duration: 300});
    });

    myMap.geoObjects.add(objectManager);
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

  // TODO отрисовать кнопку сброса

  const isChecked = (value: string) => {
    return value === transport;
  };

  return (
    <>
      <div>Маршрут {branchLocation}</div>
      <form onSubmit={handleRouteSelect}>
        <label>
          Личный автомобиль
          <input
            name="transport"
            type="radio"
            value={Transport.Car}
            checked={isChecked(Transport.Car)}
            onChange={() => setTransport(Transport.Car)}
          />
        </label>

        <label>
          Общественный транспорт
          <input
            name="transport"
            type="radio"
            value={Transport.Public}
            checked={isChecked(Transport.Public)}
            onChange={() => setTransport(Transport.Public)}
          />
        </label>

        <label>
          Пеший
          <input
            name="transport"
            type="radio"
            value={Transport.Walking}
            checked={isChecked(Transport.Walking)}
            onChange={() => setTransport(Transport.Walking)}
          />
        </label>

        <label>
          Велосипед
          <input
            name="transport"
            type="radio"
            value={Transport.Bicycle}
            checked={isChecked(Transport.Bicycle)}
            onChange={() => setTransport(Transport.Bicycle)}
          />
        </label>

        <label>
          Такси
          <input
            name="transport"
            type="radio"
            value={Transport.Taxi}
            checked={isChecked(Transport.Taxi)}
            onChange={() => setTransport(Transport.Taxi)}
          />
        </label>
        <button type="submit">Сюда</button>
      </form>
    </>
  );
}
