import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const { isAuthorized } = useSelector((state) => state.auth);

  return isAuthorized ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
