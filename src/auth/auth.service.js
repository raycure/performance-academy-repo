import axios from "../pages/api/axios.js";

export const register = async ({ registerData }) => {
    try {
      const response = await axios.post(
        "/api/products",
        registerData
      );
    } catch (error) {
      console.log(error);
      
    }
  };
