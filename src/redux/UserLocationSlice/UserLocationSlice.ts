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

const initialState: any = {
  userLocationWatchId: null,
  lat: null,
  lng: null,
  currentOffice: null,
  officesList: [
    {
      id: 1,
      salePointName: "ДО «На Баранова» Филиала № 7701 Банка ВТБ (ПАО)",
      address:
        "141500, Московская область, г. Солнечногорск, ул. Баранова, д. 1, 1-й этаж",
      status: "открытая",
      openHours: [
        {
          days: "пн",
          hours: "10:00-20:00",
        },
        {
          days: "вт",
          hours: "10:00-20:00",
        },
        {
          days: "ср",
          hours: "10:00-20:00",
        },
        {
          days: "чт",
          hours: "10:00-20:00",
        },
        {
          days: "пт",
          hours: "10:00-20:00",
        },
        {
          days: "сб",
          hours: "10:00-19:00",
        },
        {
          days: "вс",
          hours: "10:00-20:00",
        },
      ],
      rko: "нет РКО",
      openHoursIndividual: [
        {
          days: "пн-пт",
          hours: "09:00-20:00",
        },
        {
          days: "сб",
          hours: "10:00-17:00",
        },
        {
          days: "в",
          hours: "выходной",
        },
      ],
      officeType: "Да",
      salePointFormat: "Стандарт",
      suoAvailability: null,
      hasRamp: null,
      latitude: 56.183239,
      longitude: 36.9757,
      metroStation: null,
      distance: 62343,
      kep: null,
      myBranch: false,
      cardsService: true,
      carCreditService: true,
      creditService: false,
      mortgageService: false,
      depositsService: false,
      workload: {
        cardsService: [
          {
            day: 0,
            count: 14,
          },
          {
            day: 1,
            count: 7,
          },
          {
            day: 2,
            count: 12,
          },
          {
            day: 3,
            count: 18,
          },
          {
            day: 4,
            count: 14,
          },
          {
            day: 5,
            count: 12,
          },
          {
            day: 6,
            count: 10,
          },
        ],
        carCreditService: [
          {
            day: 0,
            count: 21,
          },
          {
            day: 1,
            count: 16,
          },
          {
            day: 2,
            count: 16,
          },
          {
            day: 3,
            count: 17,
          },
          {
            day: 4,
            count: 15,
          },
          {
            day: 5,
            count: 22,
          },
          {
            day: 6,
            count: 17,
          },
        ],
      },
      queueLoad: {
        cardsService: {
          count: 4,
          time: 40,
        },
        carCreditService: {
          count: 2,
          time: 26,
        },
      },
    },
  ],
  isDrawerOpen: false,
  drawerType: DRAWER_TYPES.DEFAULT,
  dataDisplayType: DATA_DISPLAY_TYPE.MAP,
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
  setCurrentOffice,
} = UserLocationSlice.actions;
