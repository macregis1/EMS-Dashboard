import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useAuthNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handlePopState = () => {
      const userToken = localStorage.getItem("userToken");
      // If the user is not authenticated and tries to go back to a protected route, redirect them to login
      if (!userToken && location.pathname !== '/login') {
        navigate('/login', { replace: true });
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [location, navigate]);
};

export default useAuthNavigation;
