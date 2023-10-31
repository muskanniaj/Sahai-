import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const driveReducer = createReducer(initialState, {
  driveCreateRequest: (state) => {
    state.isLoading = true;
  },
  driveCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.drive = action.payload;
    state.success = true;
  },
  driveCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // get all drives of charity
  getAllDrivesCharityRequest: (state) => {
    state.isLoading = true;
  },
  getAllDrivesCharitySuccess: (state, action) => {
    state.isLoading = false;
    state.drives = action.payload;
  },
  getAllDrivesCharityFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // delete drive of a charity
  deleteDriveRequest: (state) => {
    state.isLoading = true;
  },
  deleteDriveSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteDriveFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all drives
  getAllDrivesRequest: (state) => {
    state.isLoading = true;
  },
  getAllDrivesSuccess: (state, action) => {
    state.isLoading = false;
    state.allDrives = action.payload;
  },
  getAllDrivesFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  
  clearErrors: (state) => {
    state.error = null;
  },
});
