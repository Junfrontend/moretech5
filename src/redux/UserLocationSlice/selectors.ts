import { RootState } from "../store";

export const getCurrentUserLocation = (state: RootState) => ({
  lat: state.UserLocationSlice.lat,
  lng: state.UserLocationSlice.lng,
});

export const getCurrentUserLocationWatchId = (state: RootState) =>
  state.UserLocationSlice.userLocationWatchId;

export const getOfficeList = (state: RootState) =>
  state.UserLocationSlice.officesList;
