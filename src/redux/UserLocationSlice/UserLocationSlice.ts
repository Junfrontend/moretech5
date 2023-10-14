import { OfficeType } from "../../types/office";
import { DATA_DISPLAY_TYPE, DRAWER_TYPES } from "./../../types/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


function compareByDistance(a: any, b: any) {
  const distanceA = a.distance;
  const distanceB = b.distance;

  if (distanceA < distanceB) {
    return -1;
  } else if (distanceA > distanceB) {
    return 1;
  } else {
    return 0; // Элементы равны
  }
}

type OfficeSliceType = {
  userLocationWatchId: null,
  lat: null | number,
  lng: null | number,
  isDrawerOpen: boolean
  drawerType: string | boolean,
  dataDisplayType: string | boolean,
  officesList: OfficeType[] | null;
  isLoading: boolean,
}

const initialState: OfficeSliceType = {
  userLocationWatchId: null,
  lat: null,
  lng: null,
  isDrawerOpen: false,
  drawerType: DRAWER_TYPES.DEFAULT,
  dataDisplayType: DATA_DISPLAY_TYPE.MAP,
  officesList: null,
  isLoading: false,
}

const UserLocationSlice = createSlice({
  name: "UserLocationSlice",
  initialState,
  reducers: {
    setUserLocation: (state, action: PayloadAction<any>) => {
      console.log(action.payload, "action payload");

      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },

    clearLocation: (state) => {
      state.lat = null;
      state.lng = null;
    },

    setUserLocationWatchId: (state, action) => {
      state.userLocationWatchId = action.payload;
    },

    setDrawerOpen: (state, action) => {
      state.drawerType = action.payload;
      state.isDrawerOpen = true;
    },

    setDrawerClose: (state) => {
      state.drawerType = false;
      state.isDrawerOpen = false;
    },

    setDataDisplayType: (state, action) => {
      state.dataDisplayType = action.payload;
    },

    setOffices: (state, action) => {
      state.officesList = action.payload;
    },

    setOfficesLoadingStatus: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export default UserLocationSlice;
export const {
  setUserLocation,
  setDataDisplayType,
  clearLocation,
  setUserLocationWatchId,
  setDrawerClose,
  setDrawerOpen,
  setOffices,
  setOfficesLoadingStatus
} = UserLocationSlice.actions;
