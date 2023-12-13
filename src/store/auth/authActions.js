import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signup = createAsyncThunk(
  "auth/signup",
  async (userDetails, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/signup", userDetails);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userDetails, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/login", userDetails);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
