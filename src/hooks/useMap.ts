export const useMap = (currentLoc: any) => {
  const DARK_MAP = 'custom#dark';
  //@ts-ignore
  const getMap = () => new window.ymaps.Map('map', {
    center: currentLoc,
    zoom: 7,
    controls: ['geolocationControl', ], // отключение элементов управления geolocationControl - тек локация
    //@ts-ignore
    type: DARK_MAP,
  }, {
    //@ts-ignore
    searchControlProvider: 'yandex#search'
  });

  //@ts-ignore
  const getManager = () => {
    //@ts-ignore
    const objectManager = new window.ymaps.ObjectManager({
      clusterize: true,
      gridSize: 32, // ??
      geoObjectOpenBalloonOnClick: false,
      clusterOpenBalloonOnClick: false
    });
    // Чтобы задать опции одиночным объектам и кластерам,
    // обратимся к дочерним коллекциям ObjectManager.
    //@ts-ignore
    const iconContentLayout = window.ymaps.templateLayoutFactory.createClass(
      '<div class="wrapper-icon-outer">{{ properties.iconContent }}</div>');

    objectManager.objects.options.set({
      iconLayout:  'default#imageWithContent',
      iconImageHref: '',// todo icon
      iconImageSize: [30, 30],
      iconImageOffset: [0, 0],
      iconContentLayout: iconContentLayout,
    });

    //@ts-ignore
    let circleLayout = window.ymaps.templateLayoutFactory.createClass(
      '<div class="cluster-icon"><span class="cluster-text">{{ properties.geoObjects.length }}</span></div>');

    objectManager.clusters.options.set({
      clusterIconLayout: circleLayout,
      clusterIconShape: {
        type: 'Circle',
        // Круг описывается в виде центра и радиуса
        coordinates: [15, 15],
        radius: 20,
        fill: '#000000'
      },
      clusterNumbers: [10], // если больше, то будет 2 изображение
    });

    return objectManager;
  }


  const setPins = (objectManager: any, pins: any) => {
    objectManager.add({
      "type": "FeatureCollection",
      "features": pins,
    });
  };

  // const onClusterEvent = (e: any, objectManager: any) => {
    // let objectId = e.get('objectId');
    // console.log(e.get('objectId'))
    // if (e.get('type') == 'mouseenter') {
    //   objectManager.clusters.setClusterOptions(objectId, {
    //     preset: 'islands#yellowClusterIcons'
    //   });
    // } else {
    //   objectManager.clusters.setClusterOptions(objectId, {
    //     preset: 'islands#blueClusterIcons'
    //   });
    // }
  // };

  return {
    getMap,
    getManager,
    setPins,
  };
}
