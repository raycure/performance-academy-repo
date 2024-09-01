import axios from "../pages/api/axios.js";
import { API_BASE_URL } from "../config/serverApiConfig.js";
import { useDispatch } from "react-redux";
import { fetchData } from "../redux/auth/authStateSlice.js";

export const register =
  ({ registerData }) =>
  async (dispatch) => {
    console.log("service calisti");

    try {
      const response = await dispatch(
        fetchData({
          method: "POST",
          url: "/register",
          data: registerData,
        })
      );
      if (fetchData.rejected.match(response)) {
        console.log("authta promise rejectlendi");
        return Promise.reject(response.payload);
      }
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  };

export const login =
  ({ loginData }) =>
  async (dispatch) => {
    try {
      const response = await dispatch(
        fetchData({
          method: "POST",
          url: "/login",
          data: loginData,
        })
      );
      if (fetchData.rejected.match(response)) {
        return Promise.reject(response.payload);
      }
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  };
