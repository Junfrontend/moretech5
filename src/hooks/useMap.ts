export const useMap = (currentLoc: any) => {
  const DARK_MAP = "custom#dark";
  let map: any = null;
  //@ts-ignore
  const setMap = ({
    controls = [],
    loc = null,
  } : {
    controls?: any;
    loc?: number[] | null;
    //@ts-ignore
  }) => {
    destroyMap();

    map = new window.ymaps.Map(
      "map",
      {
        center: loc || currentLoc,
        zoom: 10,
        controls,
        //@ts-ignore
        type: DARK_MAP,
      }, {
        //@ts-ignore
        buttonMaxWidth: 300,
        searchControlProvider: 'yandex#search'
      });

    return map;
  }

  const destroyMap = () => {
    //@ts-ignore
    if (map) {
      //@ts-ignore
      map.destroy();
    }
  };

  //@ts-ignore
  const getManager = () => {
    //@ts-ignore
    const objectManager = new window.ymaps.ObjectManager({
      clusterize: true,
      gridSize: 32, // ??
      geoObjectOpenBalloonOnClick: false,
      clusterOpenBalloonOnClick: false,
    });

    //@ts-ignore
    let MyIconLayout = window.ymaps.templateLayoutFactory.createClass([
        '<svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">',
          `<circle cx="20" cy="20" r="20" fill={{properties.iconCaption}} />`,
          `<path fill-rule="evenodd" stroke="none" clip-rule="evenodd" fill="#4789EB" d="M13.2511 12.2217L11.8821 15.9717H30.8536L32.2226 12.2217H13.2511ZM11.1959 17.8462L9.8269 21.5953H28.7984L30.1674 17.8462H11.1959ZM7.77832 27.2198L9.14733 23.4706H28.118L26.7498 27.2198H7.77832Z"/>`,
          '</svg>',
        '</svg>',
    ].join(''));

    objectManager.objects.options.set({
      iconLayout: MyIconLayout,
      iconShape: {
        type: 'Circle',
        coordinates: [0, 0],
        radius: 30,
      }
    });

    //@ts-ignore
    let circleLayout = window.ymaps.templateLayoutFactory.createClass(
      '<div class="cluster-icon"><span class="cluster-text">{{ properties.geoObjects.length }}</span></div>'
    );

    objectManager.clusters.options.set({
      clusterIconLayout: circleLayout,
      clusterIconShape: {
        type: 'Circle',
        coordinates: [15, 15],
        radius: 20,
        fill: "#000000",
      },
      clusterNumbers: [10],
    });

    return objectManager;
  };

  const setPins = (objectManager: any, pins: any) => {
    objectManager.add({
      "type": "FeatureCollection",
      "features": pins,
    });
  };

  return {
    setMap,
    getManager,
    setPins,
  };
};
