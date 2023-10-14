import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  userLocationWatchId: null,
  lat: null,
  lng: null,
  officesList: null,
};

const UserLocationSlice = createSlice({
  name: "UserLocationSlice",
  initialState,
  reducers: {
    setUserLocation: (state, action: PayloadAction<any>) => {
      console.log(action.payload, 'action payload');
      
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
  },
});

export default UserLocationSlice;
export const { setUserLocation, clearLocation, setUserLocationWatchId } =
  UserLocationSlice.actions;
