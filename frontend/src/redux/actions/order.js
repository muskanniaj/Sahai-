import axios from "axios";
import { server } from "../../server";

// get all orders of donor
export const getAllOrdersOfDonor = (donorId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersDonorRequest",
    });

    const { data } = await axios.get(
      `${server}/order/get-all-orders/${donorId}`
    );

    dispatch({
      type: "getAllOrdersDonorSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersDonorFailed",
      payload: error.response.data.message,
    });
  }
};

// get all orders of driver
export const getAllOrdersOfCharity = (charityId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersCharityRequest",
    });

    const { data } = await axios.get(
      `${server}/order/get-driver-all-orders/${charityId}`
    );

    dispatch({
      type: "getAllOrdersCharitySuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersCharityFailed",
      payload: error.response.data.message,
    });
  }
};

// get all orders of Admin
export const getAllOrdersOfAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "adminAllOrdersRequest",
    });

    const { data } = await axios.get(`${server}/order/admin-all-orders`, {
      withCredentials: true,
    });

    dispatch({
      type: "adminAllOrdersSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "adminAllOrdersFailed",
      payload: error.response.data.message,
    });
  }
};
