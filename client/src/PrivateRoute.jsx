import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCookies, isTokenExpired } from "@utils/common";
import { logout, setAuthorized } from "@store/features/AuthSlice";

const PrivateRoutes = () => {
  const dispatch = useDispatch();
  const { isAuthorized } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkToken = async () => {
      try {
        // Check if token exists in cookies
        const token = getCookies("token");
        if (token) {
          // Check if token is expired
          const isExpired = await isTokenExpired(token); // Assuming isTokenExpired is asynchronous
          if (!isExpired) {
            // Token is valid
            dispatch(setAuthorized(true));
          } else {
            // Token is expired, logout the user
            dispatch(logout());
          }
        } else {
          // Token does not exist, redirect to login page
          dispatch(logout());
        }
      } catch (error) {
        // Handle errors
        console.error("Error checking token:", error);
        dispatch(logout());
      }
    };

    checkToken();
  }, [dispatch]); // Include dispatch as a dependency

  return isAuthorized ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
