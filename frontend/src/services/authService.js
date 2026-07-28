import * as authApi from "../api/auth";

export const loginUser = async (loginData) => {
  const response = await authApi.login(loginData);

 console.log("Full response:", response.data);
  console.log("JWT:", response.data.jwt);


  const user = response.data;

  // Save user and JWT to localStorage
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", user.jwt);  // ← this was missing

  return user;
};

export const registerUser = async (registerData) => {
  const response = await authApi.register(registerData);
  return response.data;
};

// Call this on logout
export const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};