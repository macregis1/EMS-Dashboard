import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./users.css";

const PatchUser = () => {
    const {id} = useParams();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: ""
    })

    const handleIputChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/admin/user/${id}`);
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.log("error fetching user",error.message);
            }
        }
        fetchUser();
    }, [id]);

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/update/user/${id}`, {
                method: 'PATCH',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log("user updated",data);
            window.alert("user updated successfully");
            navigate('/admin/users');
        } catch (error) {
            console.log("error updating user",error.message);
        }
    };
    return(
        <div className="center-form">
            <h1>New User registration</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Control
                        type="text"
                        name="firstname"
                        placeholder="enter first name"
                        value={formData.firstName}
                        // onChange={handleIputChange}
                        readOnly={true}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicName">
                    <Form.Control
                        type="text"
                        name="lastname"
                        placeholder="enter last name"
                        value={formData.lastName}
                        // onChange={handleIputChange}
                        readOnly={true}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicName">
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="enter email address"
                        value={formData.email}
                        onChange={handleIputChange}
                        readOnly={true}
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
                <Form.Group controlId="formBasicName">
                    <Form.Control
                        type="text"
                        name="role"
                        placeholder="enter role"
                        value={formData.role}
                        onChange={handleIputChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">Update</Button>
                <Button variant="secondary" type="cancel" className="w-100 mt-1" onClick={() => navigate('/admin/users')}>Back</Button>
            </Form>
        </div>
    )
};

export default PatchUser;