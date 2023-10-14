import { DRAWER_TYPES } from './../../types/index';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  userLocationWatchId: null,
  lat: null,
  lng: null,
  officesList: null,
  isDrawerOpen: false,
  drawerType: DRAWER_TYPES.DEFAULT
};

const UserLocationSlice = createSlice({
  name: "UserLocationSlice",
  initialState,
  reducers: {
    setUserLocation: (state, action: PayloadAction<any>) => {
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
    }
  },
});

export default UserLocationSlice;
export const { setUserLocation, clearLocation, setUserLocationWatchId, setDrawerClose, setDrawerOpen } =
  UserLocationSlice.actions;
