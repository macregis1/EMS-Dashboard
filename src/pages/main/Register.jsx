import { useState } from "react";
import "./Main.css";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    })

    const handleIputChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await fetch("/api/register",{
                method: "POST",
                headers: { "content-type": "application/json"},
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log("user created successfully", data);
            navigate("/login");
        } catch (error) {
            console.log("error creating user", error.message);
        }
    }
    return(
        <div className="center-form">
            <h1>New User registration</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Control
                        type="text"
                        name="firstname"
                        placeholder="enter first name"
                        value={formData.firstname}
                        onChange={handleIputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicName">
                    <Form.Control
                        type="text"
                        name="lastname"
                        placeholder="enter last name"
                        value={formData.lastname}
                        onChange={handleIputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicName">
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="enter email address"
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
                <Button variant="primary" type="submit" className="w-100">Register</Button>
            </Form>
        </div>
    )
};
export default Register;