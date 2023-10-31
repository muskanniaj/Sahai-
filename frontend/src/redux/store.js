import { configureStore } from "@reduxjs/toolkit";
import { donorReducer } from "./reducers/donor";
import { driverReducer } from "./reducers/driver";
import { driveReducer } from "./reducers/drive";
// import { eventReducer } from "./reducers/event";
import { cartReducer } from "./reducers/cart";
import { wishlistReducer } from "./reducers/wishlist";
import { orderReducer } from "./reducers/order";


const Store = configureStore({
  reducer: {
    donor: donorReducer,
    driver: driverReducer,
    drives: driveReducer,
    // events: eventReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
  },
});

export default Store;
