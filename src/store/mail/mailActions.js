import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendMail = createAsyncThunk(
  "mail/sendMail",
  async (mail, { rejectWithValue }) => {
    try {
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      const response = await api.post("/mail", mail);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getMails = createAsyncThunk(
  "mail/getMails",
  async (body, { rejectWithValue }) => {
    try {
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      const response = await api.get("/mail");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
