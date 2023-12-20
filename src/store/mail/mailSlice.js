import { getMails, sendMail } from "./mailActions";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  loading: false,
  message: null,
  error: null,
  getMailsLoading: false,
  mails: null,
  getMailsError: null,
};

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

    builder
      .addCase(getMails.pending, (state) => {
        state.getMailsLoading = true;
        state.mails = null;
        state.getMailsError = null;
      })
      .addCase(getMails.fulfilled, (state, { payload }) => {
        state.getMailsLoading = false;
        state.mails = payload?.data?.mails;
        state.getMailsError = null;
      })
      .addCase(getMails.rejected, (state, { payload }) => {
        state.getMailsLoading = false;
        state.mails = null;
        if (payload?.response?.data?.message) {
          state.getMailsError = payload?.response?.data?.message;
        } else {
          state.getMailsError = payload?.message;
        }
      });
  },
});

export default mailSlice.reducer;
export const { resetMailData } = mailSlice.actions;
