import axios from "../pages/api/axios.js";
import { API_BASE_URL } from '../config/serverApiConfig.js';

export const register = async ({ registerData }) => {
    try {
      const response = await axios.post(
        "/register",
        registerData
      );
      const { status, data } = response;
      return response;
    } catch (error) {
      console.log(error);
      
    }
  };

  export const login = async ({ loginData }) => {
    try {
      const response = await axios.post(
        "/login",
        loginData
      );
      const { status, data } = response;
      // return data; og
      return response; 
    } catch (error) {
      console.log(error);
      
    }
  };
