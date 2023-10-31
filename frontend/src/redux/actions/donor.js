import axios from "axios";
import { server } from "../../server";

// load donor
export const loadDonor = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadDonorRequest",
    });
    const { data } = await axios.get(`${server}/donor/getdonor`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadDonorSuccess",
      payload: data.donor,
    });
  } catch (error) {
    dispatch({
      type: "LoadDonorFail",
      payload: error.response.data.message,
    });
  }
};

// load driver
export const loadDriver = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadDriverRequest",
    });
    const { data } = await axios.get(`${server}/charity/getDriver`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadDriverSuccess",
      payload: data.driver,
    });
  } catch (error) {
    dispatch({
      type: "LoadDriverFail",
      payload: error.response.data.message,
    });
  }
};

// donor update information
export const updateDonorInformation =
  (name, email, phoneNumber, password) => async (dispatch) => {
    try {
      dispatch({
        type: "updateDonorInfoRequest",
      });

      const { data } = await axios.put(
        `${server}/donor/update-donor-info`,
        {
          email,
          password,
          phoneNumber,
          name,
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Credentials": true,
          },
        }
      );

      dispatch({
        type: "updateDonorInfoSuccess",
        payload: data.donor,
      });
    } catch (error) {
      dispatch({
        type: "updateDonorInfoFailed",
        payload: error.response.data.message,
      });
    }
  };

// update donor address
export const updatDonorAddress =
  (country, city, address1, address2, zipCode, addressType) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "updateDonorAddressRequest",
      });

      const { data } = await axios.put(
        `${server}/donor/update-donor-addresses`,
        {
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType,
        },
        { withCredentials: true }
      );

      dispatch({
        type: "updateDonorAddressSuccess",
        payload: {
          successMessage: "Donor address updated succesfully!",
          donor: data.donor,
        },
      });
    } catch (error) {
      dispatch({
        type: "updateDonorAddressFailed",
        payload: error.response.data.message,
      });
    }
  };

// delete donor address
export const deleteDonorAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteDonorAddressRequest",
    });

    const { data } = await axios.delete(
      `${server}/donor/delete-donor-address/${id}`,
      { withCredentials: true }
    );

    dispatch({
      type: "deleteDonorAddressSuccess",
      payload: {
        successMessage: "Donor deleted successfully!",
        donor: data.donor,
      },
    });
  } catch (error) {
    dispatch({
      type: "deleteDonorAddressFailed",
      payload: error.response.data.message,
    });
  }
};

// get all donors --- admin
export const getAllDonors = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllDonorsRequest",
    });

    const { data } = await axios.get(`${server}/donor/admin-all-donors`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllDonorsSuccess",
      payload: data.donors,
    });
  } catch (error) {
    dispatch({
      type: "getAllDonorsFailed",
      payload: error.response.data.message,
    });
  }
};
