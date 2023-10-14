import {
    setDrawerOpen,
  setUserLocation,
  setUserLocationWatchId,
} from "../../redux/UserLocationSlice/UserLocationSlice";
import { getCurrentUserLocation } from "../../redux/UserLocationSlice/selectors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { DRAWER_TYPES } from "../../types";

const LocateUser = () => {
  const { lat, lng } = useAppSelector(getCurrentUserLocation);
  const dispatch = useAppDispatch();
  // 1. Глобальный стор +
  // 2. Из него тянем функцию на апдейт текущего гео (текущее updateLocation) +
  // 3. При размаунте компонента очищаем userLocationWatchId

  const handleUserGeoReceive = (position: any) => {
    console.log(position, "call");

    dispatch(
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    );
  };

  const handleUserGeoRequest = () => {
    // if ("geolocation" in navigator) {
    //   navigator.geolocation.getCurrentPosition(handleUserGeoReceive);

    //   const userLocationWatchId =
    //     navigator.geolocation.watchPosition(handleUserGeoReceive);
    //   setUserLocationWatchId(userLocationWatchId);
    // } else {
    //   alert("Гео недоступно");
    // }
  };

  return (
    <button onClick={handleUserGeoRequest}>
      Определить гео<span>{`${lat} ${lng}`}</span>
    </button>
  );
};

export default LocateUser;
