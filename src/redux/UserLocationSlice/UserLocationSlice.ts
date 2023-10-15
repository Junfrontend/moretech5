import { OfficeType, PointEnum } from "../../types/office";
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
  pointType: PointEnum
  currentOffice: any,
  messageList: any,
}

const initialState: OfficeSliceType = {
  userLocationWatchId: null,
  lat: null,
  lng: null,
  isDrawerOpen: false,
  currentOffice: null,
  drawerType: DRAWER_TYPES.DEFAULT,
  dataDisplayType: DATA_DISPLAY_TYPE.MAP,
  officesList: null,
  isLoading: false,
  pointType: PointEnum.OFFICE,
  messageList: [],
}

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

    setMessageList: (state, action) => {
      console.log('set mess', action.payload);

      state.messageList = state.messageList.concat([action.payload])
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
      state.currentOffice = null;
    },

    setDataDisplayType: (state, action) => {
      if (action.payload) {
        state.dataDisplayType = action.payload;
      }
    },

    setCurrentOffice: (state, action) => {
      state.currentOffice = action.payload;
    },

    setOffices: (state, action) => {
      state.officesList = action.payload;
    },

    setOfficesLoadingStatus: (state, action) => {
      state.isLoading = action.payload;
    },

    setPointType: (state, action) => {
      state.pointType = action.payload;
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
  setOfficesLoadingStatus,
  setPointType,
  setMessageList,
  setCurrentOffice,
} = UserLocationSlice.actions;
