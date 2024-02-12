import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  isLoading: false,
  isError: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.isLoading = true;
    },
    signInSuccessful: (state, action) => {
      (state.isLoading = false),
        (state.isError = false),
        (state.userData = action.payload);
    },
    signInFailure: (state, action) => {
      (state.isLoading = false), (state.isError = action.payload);
    },
    updateStart: (state) => {
      state.isLoading = true;
    },
    updateSuccessful: (state, action) => {
      (state.isLoading = false),
        (state.isError = false),
        (state.userData = action.payload);
    },
    updateFailure: (state, action) => {
      (state.isLoading = false), (state.isError = action.payload);
    },
    deleteSuccessful: (state) => {
      (state.isLoading = false),
        (state.isError = false),
        (state.userData = null);
    },
    deleteFailure: (state, action) => {
      (state.isLoading = false), (state.isError = action.payload);
    },
    userSignOut: (state) => {
      (state.isLoading = false),
        (state.isError = false),
        (state.userData = null);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  signInStart,
  signInSuccessful,
  signInFailure,
  updateStart,
  updateSuccessful,
  updateFailure,
  deleteStart,
  deleteSuccessful,
  deleteFailure,
  userSignOut,
} = userSlice.actions;

export default userSlice.reducer;
