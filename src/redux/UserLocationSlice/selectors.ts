import { RootState } from "../store";

export const getCurrentUserLocation = (state: RootState) => ({
  lat: state.UserLocationSlice.lat,
  lng: state.UserLocationSlice.lng,
});

export const getCurrentUserLocationWatchId = (state: RootState) =>
  state.UserLocationSlice.userLocationWatchId;

export const getOfficeList = (state: RootState) =>
  state.UserLocationSlice.officesList;

export const getIsDrawerOpen = (state: RootState) =>
  state.UserLocationSlice.isDrawerOpen;

export const getCurrentDrawerType = (state: RootState) =>
  state.UserLocationSlice.drawerType;

export const getDataDisplayType = (state: RootState) =>
  state.UserLocationSlice.dataDisplayType;

export const getCurrentOffice = (state: RootState) =>
  state.UserLocationSlice.currentOffice;
