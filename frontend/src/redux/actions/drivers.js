import axios from "axios";
import { server } from "../../server";

// get all drivers --- admin
export const getAllDrivers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllDriversRequest",
    });

    const { data } = await axios.get(`${server}/charity/admin-all-drivers`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllDriversSuccess",
      payload: data.drivers,
    });
  } catch (error) {
    dispatch({
      type: "getAllDriverFailed",
    //   payload: error.response.data.message,
    });
  }
};
