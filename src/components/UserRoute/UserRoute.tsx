import { useDispatch } from 'react-redux';
import {setDrawerClose, setUserLocation} from '../../redux/UserLocationSlice/UserLocationSlice';
import {FormEvent, useEffect, useState} from 'react';
import {useAppSelector} from '../../redux/hooks';
import {getCurrentUserLocation} from '../../redux/UserLocationSlice/selectors';

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
      boundsAutoApply: true
    });

    let trafficButton = new ymaps.control.Button({
      data: { content: "Учитывать пробки" },
      options: { selectOnClick: true }
    });

    let viaPointButton = new ymaps.control.Button({
      data: { content: "Добавить транзитную точку" },
      options: { selectOnClick: true }
    });

    trafficButton.events.add('select', function () {
      multiRoute.model.setParams({ avoidTrafficJams: true }, true);
    });

    trafficButton.events.add('deselect', function () {
      multiRoute.model.setParams({ avoidTrafficJams: false }, true);
    });

    viaPointButton.events.add('select', function () {
      let referencePoints = multiRoute.model.getReferencePoints();
      referencePoints.splice(1, 0, "Москва, ул. Солянка, 7");
      multiRoute.model.setReferencePoints(referencePoints, [1]);
    });

    viaPointButton.events.add('deselect', function () {
      let referencePoints = multiRoute.model.getReferencePoints();
      referencePoints.splice(1, 1);
      multiRoute.model.setReferencePoints(referencePoints, []);
    });

    clearMap();

    let myMap = new ymaps.Map('map', {
      center: [55.750625, 37.626],
      zoom: 7,
      controls: [trafficButton, viaPointButton]
    }, {
      //@ts-ignore
      buttonMaxWidth: 300
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

    let myMap = new ymaps.Map('map', {
      center: [55.739625, 37.54120],
      zoom: 12,
      controls: [changeLayoutButton]
    }, {
      //@ts-ignore
      buttonMaxWidth: 350
    });

    // Добавляем мультимаршрут на карту.
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

    let myMap = new ymaps.Map('map', {
      center: [55.739625, 37.54120],
      zoom: 12,
      controls: [changePointsButton]
    }, {
      //@ts-ignore
      buttonMaxWidth: 300
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

    let myMap = new ymaps.Map('map', {
      center: [55.739625, 37.54120],
      zoom: 12,
      controls: [changePointsButton]
    }, {
      //@ts-ignore
      buttonMaxWidth: 300
    });

    myMap.geoObjects.add(multiRoute);
  };


  const setTaxiRoute = () => {
    const ymaps = window.ymaps;
    clearMap();

    let myMap = new ymaps.Map('map', {
      center: [55.77, 37.60],
      zoom: 13,
      controls: []
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
          Пешеходный (?)
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
          Самокат
          <input
            name="transport"
            type="radio"
            value="scooter"
            checked={isChecked('scooter')}
            onChange={() => setTransport('scooter')}
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
