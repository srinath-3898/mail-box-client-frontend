import { login, signup } from "./authActions";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  loading: false,
  token: null,
  message: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    setMessage: (state, { payload }) => {
      state.message = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
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

    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload?.data?.token;
        state.message = payload?.message;
        state.error = null;
      })
      .addCase(login.rejected, (state, { payload }) => {
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
export const { setLoading, setToken, setMessage, setError } = authSlice.actions;
