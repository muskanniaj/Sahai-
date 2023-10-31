import axios from "axios";
import { server } from "../../server";

// create drive
export const createDrive = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "driveCreateRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/drive/create-drive`,
      newForm,
      config
    );
    dispatch({
      type: "driveCreateSuccess",
      payload: data.drive,
    });
  } catch (error) {
    dispatch({
      type: "driveCreateFail",
      payload: error.response.data.message,
    });
  }
};

// get All Drives of a charity
export const getAllDrivesCharity = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllDrivesCharityRequest",
    });

    const { data } = await axios.get(
      `${server}/drive/get-all-drives-charity/${id}`
    );
    dispatch({
      type: "getAllDrivesCharitySuccess",
      payload: data.drives,
    });
  } catch (error) {
    dispatch({
      type: "getAllDrivesCharityFailed",
      payload: error.response.data.message,
    });
  }
};

// delete drive of a charity
export const deleteDrive = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteDriveRequest",
    });

    const { data } = await axios.delete(
      `${server}/drive/delete-charity-drive/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteDriveSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteDriveFailed",
      payload: error.response.data.message,
    });
  }
};

// get all drives
export const getAllDrives = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllDrivesRequest",
    });

    const { data } = await axios.get(`${server}/drive/get-all-drives`);
    dispatch({
      type: "getAllDrivesSuccess",
      payload: data.drives,
    });
  } catch (error) {
    dispatch({
      type: "getAllDrivesFailed",
      payload: error.response.data.message,
    });
  }
};
