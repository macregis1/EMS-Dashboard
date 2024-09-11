import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useLogout from '../main/Logout';

// Mock function to get the current user's role and token
const getUserRole = () => {
  return localStorage.getItem('userRole');
};

const getUserToken = () => {
  return localStorage.getItem('userToken');
};

const PrivateRoute = ({ children, allowedRoles }) => {
  const userRole = getUserRole();
  const userToken = getUserToken();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If the user navigates back to the login page, log them out
    if (location.pathname === '/login') {
      // localStorage.removeItem('userRole');
      // localStorage.removeItem('userToken');
      useLogout();
      window.history.forward();
    }
  }, [location.pathname, navigate]);

  if (!userRole || !userToken || !allowedRoles.includes(userRole.toUpperCase())) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace onChange={ useLogout()}/>;
  }

  return children;
};

export default PrivateRoute;
