import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState, AppDispatch } from "../redux/store";
import { fetchSession } from "../redux/authSlice";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectPath = "/" 
}) => {
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const { authenticated, status } = useSelector((state: RootState) => state.auth);

  // Fetch session if not already done
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSession());
    }
  }, [dispatch, status]);

  // While checking authentication status, show loading 
  if (status === "loading") {
    return <div className="d-flex justify-content-center pt-5">Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!authenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // If authenticated, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;