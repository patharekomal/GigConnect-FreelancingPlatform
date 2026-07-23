import * as authApi from "../api/auth";

export const loginUser = async (loginData) => {
  const response = await authApi.login(loginData);
  return response.data;
};

export const registerUser = async (registerData) => {
  const response = await authApi.register(registerData);
  return response.data;
};