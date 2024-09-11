import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const navigate = useNavigate();

    const logout = () => {
        // Remove userRole from localStorage
        localStorage.removeItem("userRole");
        localStorage.removeItem("userToken");

        // Redirect to the login page
        navigate("/login");
        window.alert("Logged out successfully");

        // console.log("Logged out successfully");
    };

    return logout;
};

export default useLogout;
