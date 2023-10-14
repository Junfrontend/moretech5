import axios from "axios";
import { ApiRoutes } from "../consts/ApiRoutes";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

export const createApi = () => {
  const api = axios.create({
    withCredentials: true,
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

export const getTariffData = async (params: any) => {
  const response = await apiAxios.get(`${BASE_URL}/${ApiRoutes.Offices}${params || ''}`);

  return response?.data;
};
