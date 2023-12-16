import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (searchString, { rejectWithValue }) => {
    try {
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      const response = await api.post("/users", { searchString });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
