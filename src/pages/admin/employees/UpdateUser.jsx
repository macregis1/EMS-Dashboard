import "./PostUser.css";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
    const {id} = useParams();
    const navigate = useNavigate();
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
    };

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await fetch(`/api/admin/employee/${id}`);
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.log("error fetching user",error.message);
            }
        }
        fetchEmployee();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/admin/employee/${id}`, {
                method: 'PATCH',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log("user updated",data);
            window.alert("employee updated successfully");
            navigate('/admin/employees');
        } catch (error) {
            console.log("error updating user",error.message);
            window.alert("error updating employee");
            navigate("/admin/employees");
        }
    };
    
    return(
        <div className="center-form">
            <h1>Update Employee</h1>
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
                        placeholder="enter enter responsibility"
                        value={formData.responsibility}
                        onChange={handleIputChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">Update Employee</Button>
                <Button variant="secondary" type="cancel" className="w-100 mt-1" onClick={() => navigate('/admin/employees')}>Back</Button>
            </Form>
        </div>
    )
};
export default UpdateUser;