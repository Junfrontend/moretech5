import axios from "axios";
import { ApiRoutes } from "../consts/ApiRoutes";
import { PointEnum } from "../types/office";
import { ServiceEnum } from "../components/NavBar/NavBar";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

export const createApi = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: 45000,
  });

  return api;
};

const apiAxios = createApi();

// export const sendContactData = async (data: SendContactDataPropsI) => {
//   const response = await apiAxios.post(
//     `${BASE_URL}/${ApiRoutes.UserContact}`,
//     data
//   );

//   return response?.data;
// };

export const getOffices = async (downLimitLatitude: number,
  upLimitLatitude: number,
  leftLimitLongitude: number,
  rightLimitLongitude: number,
  pointType: PointEnum,
  serviceType?: ServiceEnum,
  hasRamp?: boolean) => {
  const response = await apiAxios.get(`${BASE_URL}/${ApiRoutes.Offices}`, { params: { downLimitLatitude, upLimitLatitude, leftLimitLongitude, rightLimitLongitude, pointType, serviceType, hasRamp } });

  return response.data;
};
