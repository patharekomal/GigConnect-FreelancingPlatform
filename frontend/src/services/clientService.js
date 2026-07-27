import * as clientApi from "../api/clientApi";

export const fetchClientById = async (clientId) => {
  const response = await clientApi.getClientById(clientId);
  return response.data;
};