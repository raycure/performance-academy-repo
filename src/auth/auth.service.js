import axios from "../pages/api/axios.js";
import { API_BASE_URL } from "../config/serverApiConfig.js";

export const register = async ({ registerData }) => {
  try {
    const response = await axios.post("/register", registerData);
    const { status, data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const login = async ({ loginData }) => {
  try {
    const response = await axios.post("/login", loginData);
    const { status, data } = response;
    console.log("currently looking for:", response);

    console.log("data", data);

    return data;
  } catch (error) {
    console.log(error);
  }
};
