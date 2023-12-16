import { fetchUsers } from "./usersActions";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = { loading: false, users: null, error: "" };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetUsersData: (state) => {
      state.loading = false;
      state.users = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.users = null;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users = payload?.data?.users;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, { payload }) => {
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

export default usersSlice.reducer;
export const { resetUsersData } = usersSlice.actions;
