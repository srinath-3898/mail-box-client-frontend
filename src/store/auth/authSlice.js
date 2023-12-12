import { signup } from "./authActions";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  loading: false,
  message: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.message = payload.message;
        state.error = null;
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.loading = false;
        state.message = null;
        if (payload?.response?.data?.message) {
          state.error = payload?.response?.data?.message;
        } else {
          state.error = payload?.message;
        }
      });
  },
});

export default authSlice.reducer;
export const {} = authSlice.actions;
