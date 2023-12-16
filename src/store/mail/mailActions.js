import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendMail = createAsyncThunk(
  "mail/sendMail",
  async (email, { rejectWithValue }) => {
    try {
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      const response = await api.post("/mail", email);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
