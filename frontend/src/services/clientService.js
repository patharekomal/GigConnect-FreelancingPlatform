import * as clientApi from "../api/clientApi";
import { getDashboard as getDashboardApi } from "../api/clientApi";

export const fetchClientById = async (clientId) => {
  const response = await clientApi.getClientById(clientId);
  return response.data;
};

export const fetchMyProfile = async () => {
    const response = await clientApi.getMyProfile();
    return response.data;
};


export const fetchDashboard = async (clientId) => {
    const response = await getDashboardApi(clientId);
    return response.data;
};