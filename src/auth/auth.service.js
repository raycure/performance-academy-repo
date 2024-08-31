import axios from "../pages/api/axios.js";
import { API_BASE_URL } from "../config/serverApiConfig.js";
import { useDispatch } from "react-redux";
import { fetchData } from "../redux/auth/authStateSlice.js";

export const register =
  ({ registerData }) =>
  async (dispatch) => {
    try {
      const response = await dispatch(
        fetchData({ method: "POST", url: "/register", data: registerData })
      );
      return response.payload;
    } catch (err) {
      console.log(err);
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
      return response.payload;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
