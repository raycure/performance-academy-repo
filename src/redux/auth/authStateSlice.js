import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../pages/api/axios.js";

const initialState = {
  current: {},
  isLoggedIn: false,
  status: "idle",
  isLoading: false,
  isSuccess: false,
  error: null,
};

export const fetchData = createAsyncThunk(
  "auth/fetchStatus",
  async ({ method, url, data = null }, { rejectWithValue }) => {
    try {
      const response = await axios({ method, url, data });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.current = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoading = false;
        state.isSuccess = true;
        state.current = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.payload;
      });
  },
});

export const selectIsLoading = (state) => state.auth.isLoading;
export const selectAuthIsSuccess = (state) => state.auth.isSuccess;
export default authSlice.reducer;
export const { logout } = authSlice.actions;
