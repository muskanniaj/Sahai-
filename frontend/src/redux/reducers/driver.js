import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const driverReducer = createReducer(initialState, {
  LoadDriverRequest: (state) => {
    state.isLoading = true;
  },
  LoadDriverSuccess: (state, action) => {
    state.isDriver = true;
    state.isLoading = false;
    state.driver = action.payload;
  },
  LoadDriverFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isDriver = false;
  },

  // get all drivers ---admin
  getAllDriversRequest: (state) => {
    state.isLoading = true;
  },
  getAllDriversSuccess: (state, action) => {
    state.isLoading = false;
    state.drivers = action.payload;
  },
  getAllDriverFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
