import React, { useEffect, useState } from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  DrivesPage,
  BestCausePage,
  // EventsPage,
  // FAQPage,
  CheckoutPage,
  PaymentPage,
  OrderSuccessPage,
  DriveDetailsPage,
  ProfilePage,
  CharityCreatePage,
  DriverActivationPage,
  CharityLoginPage,
  OrderDetailsPage,
  TrackOrderPage,
  DonorInbox,
} from "./routes/Routes.js";
import {
  CharityDashboardPage,
  CharityCreateDrive,
  CharityAllDrives,
  // CharityCreateEvents,
  // CharityAllEvents,
  // CharityAllCoupouns,
  CharityPreviewPage,
  CharityAllOrders,
  CharityOrderDetails,
  // CharityAllRefunds,
  CharitySettingsPage,
  // CharityWithDrawMoneyPage,
  CharityInboxPage,
} from "./routes/CharityRoutes";
import {
  AdminDashboardPage,
  AdminDashboardDonors,
  AdminDashboardDrivers,
  AdminDashboardOrders,
  AdminDashboardDrives,
  // AdminDashboardEvents,
  // AdminDashboardWithdraw
} from "./routes/AdminRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store";
import { loadDriver, loadDonor } from "./redux/actions/donor";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import { CharityHomePage } from "./CharityRoutes.js";
import DriverProtectedRoute from "./routes/DriverProtectedRoute";
import { getAllDrives } from "./redux/actions/drive";
// import { getAllEvents } from "./redux/actions/event";
import axios from "axios";
import { server } from "./server";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const App = () => {
  const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  }
  useEffect(() => {
    Store.dispatch(loadDonor());
    Store.dispatch(loadDriver());
    Store.dispatch(getAllDrives());
    // Store.dispatch(getAllEvents());
    getStripeApikey();
  }, []);

  return (
    <BrowserRouter>
      {stripeApikey && (
        <Elements stripe={loadStripe(stripeApikey)}>
          <Routes>
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Elements>
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route
          path="/driver/activation/:activation_token"
          element={<DriverActivationPage />}
        />
        <Route path="/drives" element={<DrivesPage />} />
        <Route path="/drive/:id" element={<DriveDetailsPage />} />
        <Route path="/best-cause" element={<BestCausePage />} />
        {/* <Route path="/events" element={<EventsPage />} /> */}
        {/* <Route path="/faq" element={<FAQPage />} /> */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route path="/order/success" element={<OrderSuccessPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inbox"
          element={
            <ProtectedRoute>
              <DonorInbox />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donor/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donor/track/order/:id"
          element={
            <ProtectedRoute>
              <TrackOrderPage />
            </ProtectedRoute>
          }
        />
        <Route path="/charity/preview/:id" element={<CharityPreviewPage />} />
        {/* charity Routes */}
        <Route path="/charity-create" element={<CharityCreatePage />} />
        <Route path="/charity-login" element={<CharityLoginPage />} />
        <Route
          path="/charity/:id"
          element={
            <DriverProtectedRoute>
              <CharityHomePage />
            </DriverProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <DriverProtectedRoute>
              <CharitySettingsPage />
            </DriverProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <DriverProtectedRoute>
              <CharityDashboardPage />
            </DriverProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-drive"
          element={
            <DriverProtectedRoute>
              <CharityCreateDrive />
            </DriverProtectedRoute>
          }
        />
        <Route
          path="/dashboard-orders"
          element={
            <DriverProtectedRoute>
              <CharityAllOrders />
            </DriverProtectedRoute>
          }
        />
        {/* <Route
          path="/dashboard-refunds"
          element={
            <DriverProtectedRoute>
              <CharityAllRefunds />
            </DriverProtectedRoute>
          }
        /> */}

        <Route
          path="/order/:id"
          element={
            <DriverProtectedRoute>
              <CharityOrderDetails />
            </DriverProtectedRoute>
          }
        />
        <Route
          path="/dashboard-drives"
          element={
            <DriverProtectedRoute>
              <CharityAllDrives />
            </DriverProtectedRoute>
          }
        />
        {/* <Route
          path="/dashboard-create-event"
          element={
            <DriverProtectedRoute>
              <CharityCreateEvents />
            </DriverProtectedRoute>
          }
        /> */}
        {/* <Route
          path="/dashboard-events"
          element={
            <DriverProtectedRoute>
              <CharityAllEvents />
            </DriverProtectedRoute>
          }
        /> */}
        {/* <Route
          path="/dashboard-coupouns"
          element={
            <DriverProtectedRoute>
              <CharityAllCoupouns />
            </DriverProtectedRoute>
          } */}
        {/* /> */}
        {/* <Route
          path="/dashboard-withdraw-money"
          element={
            <DriverProtectedRoute>
              <CharityWithDrawMoneyPage />
            </DriverProtectedRoute>
          } */}
        {/* /> */}
        <Route
          path="/dashboard-messages"
          element={
            <DriverProtectedRoute>
              <CharityInboxPage />
            </DriverProtectedRoute>
          }
        />
        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-donors"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardDonors />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-drivers"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardDrivers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-orders"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardOrders />
            </ProtectedAdminRoute>
          }
        />
         <Route
          path="/admin-drives"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardDrives />
            </ProtectedAdminRoute>
          }
        />
         {/* <Route
          path="/admin-events"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardEvents />
            </ProtectedAdminRoute>
          } */}
        {/* /> */}
         {/* <Route
          path="/admin-withdraw-request"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardWithdraw />
            </ProtectedAdminRoute>
          }
        /> */}
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
};

export default App;
