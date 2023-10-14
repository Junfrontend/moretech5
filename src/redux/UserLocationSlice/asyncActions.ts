import { AxiosInstance } from "axios";
import { RootState, AppDispatch } from "../../redux/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setOffices, setOfficesLoadingStatus } from "./UserLocationSlice";
import { getOffices } from "../../services/api";
import { PointEnum } from "../../types/office";
import { ServiceEnum } from "../../components/NavVar/NavBar";

export const fetchOfficesAction = createAsyncThunk<
  void,
  {
    downLimitLatitude: number,
    upLimitLatitude: number,
    leftLimitLongitude: number,
    rightLimitLongitude: number,
    pointType: PointEnum,
    serviceType?: ServiceEnum,
    hasRamp?: boolean
  },
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>("customLink/fetchOffices", async ({ downLimitLatitude, upLimitLatitude, leftLimitLongitude, rightLimitLongitude, pointType, serviceType, hasRamp }, { dispatch }) => {
  dispatch(setOfficesLoadingStatus(true));
  getOffices(downLimitLatitude, upLimitLatitude, leftLimitLongitude, rightLimitLongitude, pointType, serviceType, hasRamp)
    .then((data) => {
      console.log(data)
      dispatch(
        setOffices(data))
    })
    .catch((error) => {
      dispatch(
        setOffices([])
      );
      dispatch(setOfficesLoadingStatus(false));
    })
})