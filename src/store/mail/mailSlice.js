import { sendMail } from "./mailActions";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = { loading: false, message: null, error: "" };

const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    resetMailData: (state) => {
      state.loading = false;
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMail.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(sendMail.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.message = payload?.message;
        state.error = null;
      })
      .addCase(sendMail.rejected, (state, { payload }) => {
        state.loading = false;
        state.users = null;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
        } else {
          state.error = payload?.message;
        }
      });
  },
});

export default mailSlice.reducer;
export const { resetMailData } = mailSlice.actions;
