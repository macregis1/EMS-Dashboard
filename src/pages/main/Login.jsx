import { useState, useEffect } from "react";
import "./Main.css";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {

    // useEffect(() => {
    //     window.history.forward(); // Prevents forward navigation
    //   }, []);
    // useEffect(() => {
    //     // Ensure the user is logged out when they hit the login page
    //     localStorage.removeItem('userRole');
    //     localStorage.removeItem('userToken');
    //   }, [navigate]);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const handleIputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/authenticate",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });

            if (!response.ok) {
                throw new Error("Login failed: " + response.statusText);
            }

            const data = await response.json();
            const userRole = data.roles || data.Roles; // Adjust this based on your API response structure
            const userName = data.names || data.Names;
            const userToken = data.token || data.Token;

            // Store the userRole in localStorage
            localStorage.setItem("userRole", userRole.toUpperCase());
            localStorage.setItem("userName", userName.toUpperCase());
            localStorage.setItem("userToken", userToken.toUpperCase());

            // Navigate based on the user's role
            if (userRole.toUpperCase() === "USER" && userToken) {
                navigate("/user");
                window.alert(`Welcome to EMS: user ${userName}`);
                //   console.log("Login successful", data);
            } else if (userRole.toUpperCase() === "ADMIN" && userToken) {
                navigate("/admin");
                window.alert(`Welcome to EMS: ADMIN ${userName} `);
                //   console.log("Login successful for admin", data);
            } else {
                //   console.error("Invalid user role:", userRole);
                window.alert(`INVALID USER ROLE: ${userName}`);
                // Handle invalid role (optional: display error message)
            }
        } catch (error) {
            console.error("Login error:", error.message);
            window.alert("Login error");
            navigate("/");
            // Handle login errors (optional: display error message)
        }
    };

    return (
        <div className="center-form">
            <h1>User Login</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="enter email"
                        value={formData.email}
                        onChange={handleIputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicName">
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="enter password"
                        value={formData.password}
                        onChange={handleIputChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">Login</Button>
            </Form>
        </div>
    )
};
export default Login;