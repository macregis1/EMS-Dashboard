import { useState } from "react";
import "./PostUser.css";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PostUser = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
        responsibility: ""
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
            const response = await fetch("/api/employee",{
                method: "POST",
                headers: { "content-type": "application/json"},
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log("employee created", data);
            window.alert("employee created successfully");
            navigate("/admin/employees");
        } catch (error) {
            console.log("error creating employee", error.message);
            window.alert("error creating employee");
            navigate("/admin/employees");
        }
    }
    return(
        <div className="center-form">
            <h1>Post New Employee</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="enter name"
                        value={formData.name}
                        onChange={handleIputChange}
                    />
                </Form.Group>
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
                        type="text"
                        name="phone"
                        placeholder="enter phone number"
                        value={formData.phone}
                        onChange={handleIputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicName">
                    <Form.Control
                        type="text"
                        name="department"
                        placeholder="enter department"
                        value={formData.department}
                        onChange={handleIputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicName">
                    <Form.Control
                        type="text"
                        name="responsibility"
                        placeholder="add responsibility"
                        value={formData.responsibility}
                        onChange={handleIputChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">Post Employee</Button>
                <Button variant="secondary" type="cancel" className="w-100 mt-1" onClick={() => navigate('/admin/employees')}>Back</Button>
            </Form>
        </div>
    )
};
export default PostUser;