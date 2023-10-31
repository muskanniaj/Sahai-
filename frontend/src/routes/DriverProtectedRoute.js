import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";

const DriverProtectedRoute = ({ children }) => {
  const { isLoading, isDriver } = useSelector((state) => state.driver);
  if (isLoading === true) {
    return <Loader />;
  } else {
    if (!isDriver) {
      return <Navigate to={`/charity-login`} replace />;
    }
    return children;
  }
};

export default DriverProtectedRoute;
