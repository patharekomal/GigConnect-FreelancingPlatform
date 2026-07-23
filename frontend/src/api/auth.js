import api from "./api";

export const login = (loginData) => {
  return api.post("/users/signin", loginData);
};

export const register = (registerData) => {
  return api.post("/users/signup", registerData);
};