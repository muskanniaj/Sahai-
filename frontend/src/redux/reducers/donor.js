import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const donorReducer = createReducer(initialState, {
  LoadDonorRequest: (state) => {
    state.loading = true;
  },
  LoadDonorSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.donor = action.payload;
  },
  LoadDonorFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  // update donor information
  updateDonorInfoRequest: (state) => {
    state.loading = true;
  },
  updateDonorInfoSuccess: (state, action) => {
    state.loading = false;
    state.donor = action.payload;
  },
  updateDonorInfoFailed: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  // update donor address
  updateDonorAddressRequest: (state) => {
    state.addressloading = true;
  },
  updateDonorAddressSuccess: (state, action) => {
    state.addressloading = false;
    state.successMessage = action.payload.successMessage;
    state.donor = action.payload.donor;
  },
  updateDonorAddressFailed: (state, action) => {
    state.addressloading = false;
    state.error = action.payload;
  },

  // delete donor address
  deleteDonorAddressRequest: (state) => {
    state.addressloading = true;
  },
  deleteDonorAddressSuccess: (state, action) => {
    state.addressloading = false;
    state.successMessage = action.payload.successMessage;
    state.donor = action.payload.donor;
  },
  deleteDonorAddressFailed: (state, action) => {
    state.addressloading = false;
    state.error = action.payload;
  },

  // get all donors --- admin
  getAllDonorsRequest: (state) => {
    state.donorsLoading = true;
  },
  getAllDonorsSuccess: (state,action) => {
    state.donorsLoading = false;
    state.donors = action.payload;
  },
  getAllDonorsFailed: (state,action) => {
    state.donorsLoading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessages: (state) => {
    state.successMessage = null;
  },
});
