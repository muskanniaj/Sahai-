import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrdersOfDonor } from "../../redux/actions/order";

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { donor } = useSelector((state) => state.donor);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfDonor(donor._id));    
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      {" "}
      <>
        {data?.status === "Processing" ? (
          <h1 className="text-[20px]">
            Waiting for Acknowledgement
          </h1>
        ) : data?.status === "Delivered" ? (
          <h1 className="text-[20px]">
            Your donations are provided to Drive Managers and being used up for the cause.
          </h1>
        // ) : 
        // data?.status === "Received" ? (
        //   <h1 className="text-[20px]">
        //     Your Order is in your city. Our Delivery man will deliver it.
        //   </h1>
        // ) : data?.status === "On the way" ? (
        //   <h1 className="text-[20px]">
        //     Our Delivery man is going to deliver your order.
        //   </h1>
        // ) : data?.status === "Delivered" ? (
        //   <h1 className="text-[20px]">Your order is delivered!</h1>
        // // ) : data?.status === "Processing refund" ? (
        // //   <h1 className="text-[20px]">Your refund is processing!</h1>
        // // ) : data?.status === "Refund Success" ? (
        // //   <h1 className="text-[20px]">Your Refund is success!</h1>
        ) :
         null}
      </>
    </div>
  );
};

export default TrackOrder;
